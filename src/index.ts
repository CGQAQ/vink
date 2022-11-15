export * from "./vink-runtime";

import type { Component } from "vue";
import { renderVinkDomToScreen } from "./renderVinkDomToScreen";
import { VinkElement } from "./vink-dom";
import { createApp } from "./vink-runtime";
function createRootNode() {
    return new VinkElement("root", null);
}

export const DEFAULT_WIDTH = 80;

export type CreateVinkAppOpts = {
    width?: number;
};
export function createVinkApp(
    rootEl: Component,
    opts?: CreateVinkAppOpts,
): VinkElement {
    const root = createRootNode();
    const renderer = createApp(rootEl, {});
    renderer.mount(root);

    root.addListener(() => {
        renderVinkDomToScreen(root, { width: opts?.width ?? DEFAULT_WIDTH });
    });

    return root;
}
