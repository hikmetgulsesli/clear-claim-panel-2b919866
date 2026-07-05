import { StatusUtilityClearClaimPanel } from "./screens";
import {
  ClearClaimPanelStoreProvider,
  ClearClaimPanelWindowBridge,
} from "./features/clear-claim-panel/clear-claim-panel.store";

export default function App() {
  return (
    <ClearClaimPanelStoreProvider>
      <ClearClaimPanelWindowBridge />
      <main
        data-setfarm-root="clear-claim-panel"
        data-testid="setfarm-app-root"
        className="min-h-screen bg-slate-50 text-slate-950 flex items-center justify-center p-md"
      >
        <StatusUtilityClearClaimPanel />
      </main>
    </ClearClaimPanelStoreProvider>
  );
}