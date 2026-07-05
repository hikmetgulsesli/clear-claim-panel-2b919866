/**
 * Persistence adapter for Clear Claim Panel preferences.
 *
 * Wraps `localStorage` so the store can persist the selected status and last
 * refresh timestamp without coupling to the browser API directly. The loader
 * must classify unreadable or malformed JSON as `corrupted` so the UI can show
 * recoverable feedback (per the persistence contract).
 */

import {
  CLEAR_CLAIM_PANEL_STORAGE_KEY,
  type ClearClaimPanelPreferences,
  type ClearClaimPanelStatus,
  type ClearClaimPanelStorageStatus,
} from "./clear-claim-panel.types";

export interface ClearClaimPanelLoadResult {
  preferences: ClearClaimPanelPreferences | null;
  status: ClearClaimPanelStorageStatus;
  error: string | null;
}

const VALID_STATUS: ReadonlyArray<ClearClaimPanelStatus> = ["ready", "paused"];

function getStorage(): Storage | null {
  try {
    if (typeof window === "undefined" || !window.localStorage) return null;
    return window.localStorage;
  } catch {
    return null;
  }
}

function isValidPreferences(value: unknown): value is ClearClaimPanelPreferences {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.status !== "string") return false;
  if (!VALID_STATUS.includes(candidate.status as ClearClaimPanelStatus)) return false;
  if (typeof candidate.lastRefreshedAt !== "string") return false;
  const timestamp = Date.parse(candidate.lastRefreshedAt);
  if (Number.isNaN(timestamp)) return false;
  return true;
}

export function loadPreferences(): ClearClaimPanelLoadResult {
  const storage = getStorage();
  if (!storage) {
    return {
      preferences: null,
      status: "empty",
      error: "localStorage is not available in this environment.",
    };
  }

  let raw: string | null = null;
  try {
    raw = storage.getItem(CLEAR_CLAIM_PANEL_STORAGE_KEY);
  } catch (error) {
    return {
      preferences: null,
      status: "corrupted",
      error:
        error instanceof Error
          ? `Failed to read preferences: ${error.message}`
          : "Failed to read preferences.",
    };
  }

  if (raw === null || raw === "") {
    return { preferences: null, status: "empty", error: null };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return {
      preferences: null,
      status: "corrupted",
      error:
        error instanceof Error
          ? `Stored preferences are not valid JSON: ${error.message}`
          : "Stored preferences are not valid JSON.",
    };
  }

  if (!isValidPreferences(parsed)) {
    return {
      preferences: null,
      status: "corrupted",
      error: "Stored preferences did not match the expected schema.",
    };
  }

  return { preferences: parsed, status: "ok", error: null };
}

export function savePreferences(preferences: ClearClaimPanelPreferences): {
  ok: boolean;
  error: string | null;
} {
  const storage = getStorage();
  if (!storage) {
    return { ok: false, error: "localStorage is not available in this environment." };
  }
  try {
    storage.setItem(CLEAR_CLAIM_PANEL_STORAGE_KEY, JSON.stringify(preferences));
    return { ok: true, error: null };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? `Failed to persist preferences: ${error.message}`
          : "Failed to persist preferences.",
    };
  }
}

export function clearPreferences(): { ok: boolean; error: string | null } {
  const storage = getStorage();
  if (!storage) {
    return { ok: false, error: "localStorage is not available in this environment." };
  }
  try {
    storage.removeItem(CLEAR_CLAIM_PANEL_STORAGE_KEY);
    return { ok: true, error: null };
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? `Failed to clear preferences: ${error.message}`
          : "Failed to clear preferences.",
    };
  }
}