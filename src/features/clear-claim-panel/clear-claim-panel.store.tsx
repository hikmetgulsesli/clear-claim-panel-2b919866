/**
 * Clear Claim Panel shared app shell store.
 *
 * US-001 owns the shared app shell state, navigation state, selected entity,
 * storage status, last error, active panel, and item count. This module owns
 * the React Context, the reducer, the persistence bootstrap, and the
 * `window.app` test bridge.
 *
 * Downstream screen-owner stories must consume this store via `useStore()` and
 * must not reimplement the shell state.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

import {
  CLEAR_CLAIM_PANEL_DEFAULT_SURFACE,
  type ClearClaimPanelPanelId,
  type ClearClaimPanelState,
  type ClearClaimPanelStore,
  type ClearClaimPanelSurfaceId,
  type ClearClaimPanelWindowApi,
} from "./clear-claim-panel.types";
import {
  clearPreferences,
  loadPreferences,
  savePreferences,
} from "./clear-claim-panel.repo";
import { createInitialState } from "../../__fixtures__/clear-claim-panel.fixture";

const LOG_LIMIT = 5;
const STATUS_UTILITY_TIMESTAMP_FORMAT: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

function formatTimestamp(now: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", STATUS_UTILITY_TIMESTAMP_FORMAT);
    return formatter.format(now);
  } catch {
    return now.toISOString();
  }
}

function appendLog(state: ClearClaimPanelState, message: string, level: "INFO" | "WARN" | "ERROR") {
  const now = new Date();
  const next = {
    id: `log-${now.getTime()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: formatTimestamp(now),
    level,
    message,
  };
  const merged = [next, ...state.log].slice(0, LOG_LIMIT);
  return merged;
}

type Action =
  | { type: "BOOTSTRAP"; payload: ClearClaimPanelState }
  | { type: "REFRESH" }
  | { type: "TOGGLE_STATUS" }
  | { type: "SET_SELECTED_ITEM"; payload: string | null }
  | { type: "SET_ACTIVE_PANEL"; payload: ClearClaimPanelPanelId }
  | { type: "SET_LAST_ERROR"; payload: string | null }
  | { type: "RESET" };

function reducer(state: ClearClaimPanelState, action: Action): ClearClaimPanelState {
  switch (action.type) {
    case "BOOTSTRAP":
      return action.payload;
    case "REFRESH": {
      const now = new Date();
      const preferences = {
        status: state.preferences.status,
        lastRefreshedAt: now.toISOString(),
      };
      const counts = {
        ...state.counts,
        queueDepth: Math.max(0, state.counts.queueDepth - 1),
      };
      const log = appendLog(state, "Manual refresh completed.", "INFO");
      return { ...state, preferences, counts, log, lastError: null };
    }
    case "TOGGLE_STATUS": {
      const nextStatus = state.preferences.status === "ready" ? "paused" : "ready";
      const preferences = {
        status: nextStatus as "ready" | "paused",
        lastRefreshedAt: state.preferences.lastRefreshedAt,
      };
      const log = appendLog(
        state,
        nextStatus === "paused" ? "Processing paused by user." : "Processing resumed.",
        nextStatus === "paused" ? "WARN" : "INFO",
      );
      return { ...state, preferences, log };
    }
    case "SET_SELECTED_ITEM":
      return { ...state, selectedItem: action.payload };
    case "SET_ACTIVE_PANEL":
      return { ...state, activePanel: action.payload };
    case "SET_LAST_ERROR":
      return { ...state, lastError: action.payload };
    case "RESET":
      return createInitialState();
    default:
      return state;
  }
}

const ClearClaimPanelStoreContext = createContext<ClearClaimPanelStore | null>(null);

export interface ClearClaimPanelStoreProviderProps {
  children: ReactNode;
  initialSurface?: ClearClaimPanelSurfaceId;
  /** Disable persistence bootstrap (used by tests to keep state isolated). */
  disablePersistence?: boolean;
}

export function ClearClaimPanelStoreProvider(props: ClearClaimPanelStoreProviderProps) {
  const { children, initialSurface, disablePersistence = false } = props;
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const base = createInitialState();
    if (initialSurface) {
      return { ...base, activeSurface: initialSurface };
    }
    return base;
  });
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (disablePersistence) {
      if (!hasBootstrapped.current) {
        dispatch({
          type: "BOOTSTRAP",
          payload: {
            ...createInitialState(),
            activeSurface: initialSurface ?? CLEAR_CLAIM_PANEL_DEFAULT_SURFACE,
            storageStatus: "empty",
          },
        });
        hasBootstrapped.current = true;
      }
      return;
    }

    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;

    const loaded = loadPreferences();
    if (loaded.status === "ok" && loaded.preferences) {
      dispatch({
        type: "BOOTSTRAP",
        payload: {
          ...createInitialState(),
          activeSurface: initialSurface ?? CLEAR_CLAIM_PANEL_DEFAULT_SURFACE,
          storageStatus: "ok",
          preferences: loaded.preferences,
        },
      });
      return;
    }

    if (loaded.status === "corrupted") {
      const cleared = clearPreferences();
      dispatch({
        type: "BOOTSTRAP",
        payload: {
          ...createInitialState(),
          activeSurface: initialSurface ?? CLEAR_CLAIM_PANEL_DEFAULT_SURFACE,
          storageStatus: "corrupted",
          lastError: cleared.ok
            ? loaded.error ?? "Stored preferences were unreadable; defaults restored."
            : (loaded.error ?? "Stored preferences were unreadable.") +
              ` ${cleared.error ?? ""}`.trim(),
        },
      });
      return;
    }

    dispatch({
      type: "BOOTSTRAP",
      payload: {
        ...createInitialState(),
        activeSurface: initialSurface ?? CLEAR_CLAIM_PANEL_DEFAULT_SURFACE,
        storageStatus: loaded.status,
        lastError: loaded.error,
      },
    });
  }, [disablePersistence, initialSurface]);

  useEffect(() => {
    if (disablePersistence) return;
    if (state.storageStatus !== "ok") return;
    savePreferences(state.preferences);
  }, [state.preferences, state.storageStatus, disablePersistence]);

  const refresh = useCallback(() => {
    dispatch({ type: "REFRESH" });
  }, []);

  const toggleStatus = useCallback(() => {
    dispatch({ type: "TOGGLE_STATUS" });
  }, []);

  const setSelectedItem = useCallback((id: string | null) => {
    dispatch({ type: "SET_SELECTED_ITEM", payload: id });
  }, []);

  const setActivePanel = useCallback((panel: ClearClaimPanelPanelId) => {
    dispatch({ type: "SET_ACTIVE_PANEL", payload: panel });
  }, []);

  const setLastError = useCallback((error: string | null) => {
    dispatch({ type: "SET_LAST_ERROR", payload: error });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const value = useMemo<ClearClaimPanelStore>(
    () => ({
      ...state,
      refresh,
      toggleStatus,
      setSelectedItem,
      setActivePanel,
      setLastError,
      reset,
    }),
    [state, refresh, toggleStatus, setSelectedItem, setActivePanel, setLastError, reset],
  );

  return (
    <ClearClaimPanelStoreContext.Provider value={value}>
      {children}
    </ClearClaimPanelStoreContext.Provider>
  );
}

export function useClearClaimPanelStore(): ClearClaimPanelStore {
  const context = useContext(ClearClaimPanelStoreContext);
  if (!context) {
    throw new Error(
      "useClearClaimPanelStore must be used inside <ClearClaimPanelStoreProvider />.",
    );
  }
  return context;
}

export function useClearClaimPanelState(): ClearClaimPanelState {
  const store = useClearClaimPanelStore();
  return store;
}

/**
 * Install the `window.app` test bridge from inside the React tree.
 *
 * The bridge exposes the live store API to integration tests and to manual
 * debugging through the browser console. Mounting it as a component keeps the
 * install/exposure lifecycle tied to the provider.
 */
export function ClearClaimPanelWindowBridge() {
  const store = useClearClaimPanelStore();
  useEffect(() => {
    const api: ClearClaimPanelWindowApi = {
      get activeSurface() {
        return store.activeSurface;
      },
      get selectedItem() {
        return store.selectedItem;
      },
      get storageStatus() {
        return store.storageStatus;
      },
      get lastError() {
        return store.lastError;
      },
      get activePanel() {
        return store.activePanel;
      },
      get counts() {
        return store.counts;
      },
      get preferences() {
        return store.preferences;
      },
      get log() {
        return store.log;
      },
      refresh: () => store.refresh(),
      toggleStatus: () => store.toggleStatus(),
      setSelectedItem: (id) => store.setSelectedItem(id),
      setActivePanel: (panel) => store.setActivePanel(panel),
      setLastError: (error) => store.setLastError(error),
      reset: () => store.reset(),
    };
    window.app = api;
    return () => {
      if (window.app === api) {
        delete window.app;
      }
    };
  }, [
    store.activeSurface,
    store.selectedItem,
    store.storageStatus,
    store.lastError,
    store.activePanel,
    store.counts,
    store.preferences,
    store.log,
    store,
  ]);
  return null;
}