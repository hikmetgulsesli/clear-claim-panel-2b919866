/**
 * Action handler for the Status Utility - Clear Claim Panel screen.
 *
 * Implements `ACT_REFRESH_STATUS` for the shared Clear Claim Panel app shell.
 * The handler delegates to the store's `refresh` action which updates the
 * "Last sync" timestamp, decreases the queue depth by one, and appends an
 * INFO entry to the system log so the UI feedback is visible.
 *
 * US-002 owns this handler. It must remain a thin wrapper over the shared
 * store so US-001 keeps the canonical state mutation.
 */

import { useCallback } from "react";
import { useClearClaimPanelStore } from "../clear-claim-panel/clear-claim-panel.store";

export function useActRefreshStatus(): () => void {
  const store = useClearClaimPanelStore();
  return useCallback(() => {
    store.refresh();
  }, [store]);
}
