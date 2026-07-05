/**
 * Test bridge for the Clear Claim Panel app shell.
 *
 * Wraps the render helpers used by Vitest so tests can mount the full
 * provider tree, interact with `window.app`, and reset the store between
 * cases without touching `localStorage` directly.
 *
 * This file is `.ts` (not `.tsx`) by scope; it uses `createElement` directly
 * so it stays parseable by `tsc` without enabling JSX in this module.
 */

import { cleanup, render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { afterEach } from "vitest";
import { createElement, type ReactElement, type ReactNode } from "react";

import {
  CLEAR_CLAIM_PANEL_STORAGE_KEY,
  type ClearClaimPanelWindowApi,
} from "../features/clear-claim-panel/clear-claim-panel.types";
import {
  ClearClaimPanelStoreProvider,
  ClearClaimPanelWindowBridge,
} from "../features/clear-claim-panel/clear-claim-panel.store";

export interface RenderWithShellOptions extends Omit<RenderOptions, "wrapper"> {
  /** Disable the localStorage bootstrap so each test starts from defaults. */
  disablePersistence?: boolean;
}

function ShellWrapper({ children }: { children: ReactNode }) {
  return createElement(
    ClearClaimPanelStoreProvider,
    { disablePersistence: true, children: createElement(ClearClaimPanelWindowBridge, null, children) },
  );
}

export function renderWithShell(
  ui: ReactElement,
  options: RenderWithShellOptions = {},
): RenderResult & { windowApp: ClearClaimPanelWindowApi } {
  const { disablePersistence = true, ...renderOptions } = options;
  const result = render(ui, {
    wrapper: ShellWrapper,
    ...renderOptions,
  });
  const app = window.app;
  if (!app) {
    throw new Error(
      "renderWithShell: window.app was not installed. Did you forget <ClearClaimPanelWindowBridge />?",
    );
  }
  return Object.assign(result, { windowApp: app });
}

export function getWindowApp(): ClearClaimPanelWindowApi {
  const api = window.app;
  if (!api) {
    throw new Error(
      "getWindowApp: window.app is not installed. Mount the shell provider first.",
    );
  }
  return api;
}

export function resetClearClaimPanelStorage(): void {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.removeItem(CLEAR_CLAIM_PANEL_STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
}

export function installClearClaimPanelTestHooks(): void {
  afterEach(() => {
    cleanup();
    resetClearClaimPanelStorage();
    if (typeof window !== "undefined") {
      delete window.app;
    }
  });
}