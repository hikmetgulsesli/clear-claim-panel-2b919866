/**
 * Default fixture data for Clear Claim Panel.
 *
 * Provides a single, deterministic baseline so tests and story bootstraps use
 * the same initial counters, log entries, and preferences.
 */

import type {
  ClearClaimPanelCounts,
  ClearClaimPanelLogEntry,
  ClearClaimPanelPreferences,
  ClearClaimPanelState,
} from "../features/clear-claim-panel/clear-claim-panel.types";

export const CLEAR_CLAIM_PANEL_FIXTURE_COUNTS: ClearClaimPanelCounts = {
  systemHealthPct: 99.9,
  queueDepth: 12,
  activeWorkers: 4,
  maxWorkers: 5,
};

export const CLEAR_CLAIM_PANEL_FIXTURE_LOG: ReadonlyArray<ClearClaimPanelLogEntry> = [
  {
    id: "log-fixture-1",
    timestamp: "14:30:05",
    level: "INFO",
    message: "Sync completed successfully. Claims processed: 0.",
  },
  {
    id: "log-fixture-2",
    timestamp: "14:25:12",
    level: "INFO",
    message: "Worker pool scaled down to 4.",
  },
  {
    id: "log-fixture-3",
    timestamp: "14:15:00",
    level: "WARN",
    message: "High queue latency detected (>500ms).",
  },
  {
    id: "log-fixture-4",
    timestamp: "14:10:45",
    level: "INFO",
    message: "Claim batch #8892 processed.",
  },
];

export const CLEAR_CLAIM_PANEL_FIXTURE_PREFERENCES: ClearClaimPanelPreferences = {
  status: "ready",
  lastRefreshedAt: "2023-10-26T11:30:05.000Z",
};

export function createInitialState(): ClearClaimPanelState {
  return {
    activeSurface: "SURF_STATUS_UTILITY",
    selectedItem: null,
    storageStatus: "empty",
    lastError: null,
    activePanel: "system-state",
    counts: { ...CLEAR_CLAIM_PANEL_FIXTURE_COUNTS },
    preferences: { ...CLEAR_CLAIM_PANEL_FIXTURE_PREFERENCES },
    log: CLEAR_CLAIM_PANEL_FIXTURE_LOG.map((entry) => ({ ...entry })),
  };
}