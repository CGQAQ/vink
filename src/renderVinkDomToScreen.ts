import { TextNode, VinkElement, VinkNode } from "./vink-dom";
import { normalizeVinkNodeArray } from "./utils";

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
    if (dom.type != "__#VP_Root") {
        throw new Error(
            "Root node must be of type 'root', but got " + dom.type,
        );
    }

    const { width } = opts;

    // ------------ Render logic starts here ------------
    const children = normalizeVinkNodeArray(dom.children);
    const lines: string[] = [];
    for (const child of children) {
        const line = renderVinkNodeToString(child, { width });
        lines.push(line);
    }

    return lines.join("\n");
}

function renderVinkNodeToString(node: VinkNode, opts: RenderOpts) {
    let result: string[] = [];

    switch (node.type) {
        case "__#VP_Root":
        case "__#VP_Comment":
        case "__#VP_Unknown": {
            if (node.children.length > 0) {
                const children = normalizeVinkNodeArray(node.children);
                for (const child of children) {
                    const line = renderVinkNodeToString(child, opts);
                    result.push(line);
                }
            }
            break;
        }

        case "__#VP_Text": {
            const text = [node.getContent()];
            const children = normalizeVinkNodeArray(node.children);
            if (children.length > 0) {
                for (const child of children) {
                    const line = renderVinkNodeToString(child, opts);
                    text.push(line);
                }
            }
            result.push(text.join(""));
            break;
        }

        default: {
            throw new Error("Unknown node type: " + node.type);
        }
    }

    return result.join("\n");
}
