import { VinkElement } from "./vink-dom";

export type RenderToScreenOpts = {
  width: number;
};
export function renderVinkDomToScreen(
  dom: VinkElement,
  opts: RenderToScreenOpts
) {
  if (dom.type != "root") {
    throw new Error("Root node must be of type 'root'");
  }

  const { width } = opts;

  // ------------ Render logic starts here ------------
}
