import { useMemo } from "react";
import { StatusUtilityClearClaimPanel } from "./screens";
import {
  ClearClaimPanelStoreProvider,
  ClearClaimPanelWindowBridge,
} from "./features/clear-claim-panel/clear-claim-panel.store";
import { useActRefreshStatus } from "./features/surf-status-utility/act_refresh_status";
import { useActToggleStatus } from "./features/surf-status-utility/act_toggle_status";

/**
 * Inner body that lives inside <ClearClaimPanelStoreProvider /> so the
 * screen action hooks can read the store via context. US-002 wires the
 * generated screen's `actions` prop to the shared store actions here.
 *
 * The outer wrapper is a neutral div data-setfarm-root with stable viewport
 * height + positioning so the generated screen's absolute/fixed layers have
 * a real viewport frame. The generated screen renders its own <main>
 * landmark; we deliberately do NOT wrap it in another <main> here.
 */
function AppBody() {
  const refreshStatus = useActRefreshStatus();
  const toggleStatus = useActToggleStatus();

  const screenActions = useMemo(
    () => ({
      "refresh-status-1": refreshStatus,
      "force-sync-2": toggleStatus,
    }),
    [refreshStatus, toggleStatus],
  );

  return (
    <div
      data-setfarm-root="clear-claim-panel"
      data-testid="setfarm-app-root"
      className="relative min-h-screen w-full overflow-hidden"
    >
      <StatusUtilityClearClaimPanel actions={screenActions} />
    </div>
  );
}

export default function App() {
  return (
    <ClearClaimPanelStoreProvider>
      <ClearClaimPanelWindowBridge />
      <AppBody />
    </ClearClaimPanelStoreProvider>
  );
}
