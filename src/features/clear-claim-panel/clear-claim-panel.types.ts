/**
 * Domain types for the Clear Claim Panel app shell.
 *
 * This module is the single source of truth for the shared app shell state
 * owned by US-001. Downstream screen-owner stories import from here so they
 * stay in sync with the store and the persistence layer.
 */

export const CLEAR_CLAIM_PANEL_STORAGE_KEY = "clear-claim-panel:preferences:v1";

export const CLEAR_CLAIM_PANEL_DEFAULT_SURFACE = "SURF_STATUS_UTILITY" as const;

export type ClearClaimPanelSurfaceId =
  | typeof CLEAR_CLAIM_PANEL_DEFAULT_SURFACE
  | (string & { readonly __clearClaimPanelSurfaceIdBrand: unique symbol });

export type ClearClaimPanelStatus = "ready" | "paused";

export type ClearClaimPanelStorageStatus = "ok" | "empty" | "corrupted";

export type ClearClaimPanelPanelId = "system-state" | "system-log";

export interface ClearClaimPanelPreferences {
  status: ClearClaimPanelStatus;
  lastRefreshedAt: string;
}

export interface ClearClaimPanelCounts {
  systemHealthPct: number;
  queueDepth: number;
  activeWorkers: number;
  maxWorkers: number;
}

export interface ClearClaimPanelLogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  message: string;
}

export interface ClearClaimPanelState {
  activeSurface: ClearClaimPanelSurfaceId;
  selectedItem: string | null;
  storageStatus: ClearClaimPanelStorageStatus;
  lastError: string | null;
  activePanel: ClearClaimPanelPanelId;
  counts: ClearClaimPanelCounts;
  preferences: ClearClaimPanelPreferences;
  log: ReadonlyArray<ClearClaimPanelLogEntry>;
}

export interface ClearClaimPanelStore extends ClearClaimPanelState {
  refresh: () => void;
  toggleStatus: () => void;
  setSelectedItem: (id: string | null) => void;
  setActivePanel: (panel: ClearClaimPanelPanelId) => void;
  setLastError: (error: string | null) => void;
  reset: () => void;
}

export interface ClearClaimPanelWindowApi {
  readonly activeSurface: ClearClaimPanelSurfaceId;
  readonly selectedItem: string | null;
  readonly storageStatus: ClearClaimPanelStorageStatus;
  readonly lastError: string | null;
  readonly activePanel: ClearClaimPanelPanelId;
  readonly counts: ClearClaimPanelCounts;
  readonly preferences: ClearClaimPanelPreferences;
  readonly log: ReadonlyArray<ClearClaimPanelLogEntry>;
  refresh: () => void;
  toggleStatus: () => void;
  setSelectedItem: (id: string | null) => void;
  setActivePanel: (panel: ClearClaimPanelPanelId) => void;
  setLastError: (error: string | null) => void;
  reset: () => void;
}

declare global {
  interface Window {
    app?: ClearClaimPanelWindowApi;
  }
}