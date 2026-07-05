/**
 * Action handler for the Status Utility - Clear Claim Panel screen.
 *
 * Implements `ACT_TOGGLE_STATUS` for the shared Clear Claim Panel app shell.
 * The handler delegates to the store's `toggleStatus` action which flips the
 * workflow status between "ready" and "paused" and appends a log entry so the
 * System State badge / Pause Processing toggle stays in sync with the
 * underlying state.
 *
 * US-002 owns this handler. It must remain a thin wrapper over the shared
 * store so US-001 keeps the canonical state mutation.
 */

import { useCallback } from "react";
import { useClearClaimPanelStore } from "../clear-claim-panel/clear-claim-panel.store";

export function useActToggleStatus(): () => void {
  const store = useClearClaimPanelStore();
  return useCallback(() => {
    store.toggleStatus();
  }, [store]);
}
