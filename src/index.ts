export * from "./vink-runtime";

import { renderVinkDomToScreen } from "./renderVinkDomToScreen";
import { VinkElement } from "./vink-dom";
function createRootNode() {
    return new VinkElement("root", null);
}

export const DEFAULT_WIDTH = 80;

export type CreateVinkAppOpts = {
    width?: number;
};
export function createVinkApp(opts: CreateVinkAppOpts): VinkElement {
    const root = createRootNode();
    root.addListener(() => {
        renderVinkDomToScreen(root, { width: opts.width ?? DEFAULT_WIDTH });
    });

    return root;
}
