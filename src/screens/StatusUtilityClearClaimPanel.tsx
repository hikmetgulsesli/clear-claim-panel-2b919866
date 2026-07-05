// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Status Utility - Clear Claim Panel
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { BadgeHelp, CheckCircle2, Clock, GripHorizontal, HeartPulse, RefreshCw } from "lucide-react";


export type StatusUtilityClearClaimPanelActionId = "refresh-status-1" | "force-sync-2";

export interface StatusUtilityClearClaimPanelProps {
  actions?: Partial<Record<StatusUtilityClearClaimPanelActionId, () => void>>;

}

export function StatusUtilityClearClaimPanel({ actions }: StatusUtilityClearClaimPanelProps) {
  return (
    <>
      <main className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-lg flex flex-col overflow-hidden shadow-sm">
      {/* Header */}
      <header className="flex justify-between items-center px-md py-sm border-b border-outline-variant bg-surface">
      <div className="flex items-center gap-sm">
      <HeartPulse  style={{fontVariationSettings: "'FILL' 1"}} className="text-primary" aria-hidden={true} focusable="false" />
      <h1 className="font-headline-md text-headline-md text-on-surface">System Monitor</h1>
      <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-sm py-xs rounded ml-sm border border-outline-variant/50">Clear Claim Panel</span>
      </div>
      <div className="flex items-center gap-md">
      <div className="text-right flex items-center gap-xs">
      <Clock className="text-on-surface-variant text-[16px]" aria-hidden={true} focusable="false" />
      <span className="font-data-mono text-data-mono text-on-surface-variant">Last sync: Oct 26, 2023, 14:30:05</span>
      </div>
      <button aria-label="Refresh Status" className="text-primary hover:bg-surface-container-low p-xs rounded transition-colors duration-150 flex items-center justify-center" title="Refresh Status" type="button" data-action-id="refresh-status-1" onClick={actions?.["refresh-status-1"]}>
      <RefreshCw className="text-[20px]" aria-hidden={true} focusable="false" />
      </button>
      </div>
      </header>
      {/* Utility Content Area */}
      <div className="p-md flex flex-col gap-md">
      {/* Action Row */}
      <div className="flex justify-between items-center bg-surface-container-low p-sm rounded border border-outline-variant">
      <div className="flex items-center gap-sm">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">System State</span>
      <div className="flex items-center gap-xs">
      <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
      </span>
      <span className="font-body-sm text-body-sm font-semibold text-secondary-container">Ready</span>
      </div>
      </div>
      <div className="flex items-center gap-sm">
      {/* Toggle Switch */}
      <label className="flex items-center cursor-pointer gap-sm" htmlFor="status-toggle">
      <span className="font-body-sm text-body-sm text-on-surface-variant">Pause Processing</span>
      <div className="relative">
      <input className="sr-only peer" id="status-toggle" type="checkbox" />
      <div className="w-8 h-4 bg-surface-dim rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline-variant after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-secondary"></div>
      </div>
      </label>
      <div className="w-[1px] h-4 bg-outline-variant mx-xs"></div>
      <button className="bg-primary hover:bg-primary/90 text-on-primary font-body-sm text-body-sm px-sm py-xs rounded flex items-center gap-xs transition-colors border border-transparent shadow-sm" type="button" data-action-id="force-sync-2" onClick={actions?.["force-sync-2"]}>
      <RefreshCw className="text-[16px]" aria-hidden={true} focusable="false" />
                              Force Sync
                          </button>
      </div>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
      {/* Metric Card 1: System Health */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-sm flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary"></div>
      <div className="flex justify-between items-start mb-sm mt-xs">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">System Health</span>
      <CheckCircle2  style={{fontVariationSettings: "'FILL' 1"}} className="text-secondary text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-baseline gap-xs">
      <span className="font-headline-md text-headline-md text-on-surface">Healthy</span>
      <span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">99.9% Uptime</span>
      </div>
      </div>
      {/* Metric Card 2: Queue Depth */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-sm flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-tertiary-fixed-dim"></div>
      <div className="flex justify-between items-start mb-sm mt-xs">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Queue Depth</span>
      <GripHorizontal className="text-tertiary-container text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-baseline gap-xs">
      <span className="font-headline-md text-headline-md text-on-surface font-data-mono">12</span>
      <span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">Claims pending</span>
      </div>
      </div>
      {/* Metric Card 3: Active Workers */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded p-sm flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>
      <div className="flex justify-between items-start mb-sm mt-xs">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Active Workers</span>
      <BadgeHelp className="text-primary text-[18px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-baseline gap-xs">
      <span className="font-headline-md text-headline-md text-on-surface font-data-mono">4</span>
      <span className="font-data-mono text-data-mono text-on-surface-variant text-[10px]">/ 5 Max</span>
      </div>
      </div>
      </div>
      {/* Recent Activity / Feedback Log */}
      <div className="bg-[#F8FAFC] border border-slate-200 rounded p-sm flex flex-col gap-xs h-32 overflow-y-auto">
      <div className="flex justify-between items-center mb-xs sticky top-0 bg-[#F8FAFC] pb-xs border-b border-slate-200">
      <span className="font-label-caps text-label-caps text-on-surface-variant">System Log</span>
      <span className="font-data-mono text-data-mono text-[10px] text-on-surface-variant">Viewing last 5 events</span>
      </div>
      {/* Log Entries */}
      <div className="flex items-start gap-sm font-data-mono text-data-mono text-on-surface py-[2px]">
      <span className="text-on-surface-variant w-[65px] flex-shrink-0">14:30:05</span>
      <span className="text-secondary flex-shrink-0">[INFO]</span>
      <span className="truncate">Sync completed successfully. Claims processed: 0.</span>
      </div>
      <div className="flex items-start gap-sm font-data-mono text-data-mono text-on-surface py-[2px]">
      <span className="text-on-surface-variant w-[65px] flex-shrink-0">14:25:12</span>
      <span className="text-secondary flex-shrink-0">[INFO]</span>
      <span className="truncate">Worker pool scaled down to 4.</span>
      </div>
      <div className="flex items-start gap-sm font-data-mono text-data-mono text-on-surface py-[2px]">
      <span className="text-on-surface-variant w-[65px] flex-shrink-0">14:15:00</span>
      <span className="text-tertiary-container flex-shrink-0">[WARN]</span>
      <span className="truncate">High queue latency detected (&gt;500ms).</span>
      </div>
      <div className="flex items-start gap-sm font-data-mono text-data-mono text-on-surface py-[2px]">
      <span className="text-on-surface-variant w-[65px] flex-shrink-0">14:10:45</span>
      <span className="text-secondary flex-shrink-0">[INFO]</span>
      <span className="truncate">Claim batch #8892 processed.</span>
      </div>
      </div>
      </div>
      </main>
      
    </>
  );
}
