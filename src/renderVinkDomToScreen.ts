import { VinkElement } from "./vink-dom";

export type RenderOpts = {
    width: number;
};
export function renderVinkDomToScreen(dom: VinkElement, opts: RenderOpts) {
    const renderResult = renderVinkDomToString(dom, opts);
    console.clear();
    console.log(renderResult);
}

export function renderVinkDomToString(
    dom: VinkElement,
    opts: RenderOpts,
): string {
    if (dom.type != "root") {
        throw new Error("Root node must be of type 'root'");
    }

    const { width } = opts;

    // ------------ Render logic starts here ------------

    return "";
}
