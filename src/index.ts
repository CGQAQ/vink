export * from "./vink-runtime";

import { renderVinkDomToScreen } from "./renderVinkDomToScreen";
import { VinkElement } from "./vink-dom";
function createRootNode() {
  return new VinkElement("root", null);
}

export type CreateVinkAppOpts = {
  width?: number;
};
export function createVinkApp(opts: CreateVinkAppOpts): VinkElement {
  if (opts.width == null) {
    opts.width = 80;
  }

  const root = createRootNode();
  root.addListener(() => {
    renderVinkDomToScreen(root, opts);
  });

  return root;
}
