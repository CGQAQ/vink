import { VinkNode, VinkNodeTypes } from "./vink-dom";

export function normalizeVinkNodeArray(nodes?: VinkNode[]): VinkNode[] {
    const result: VinkNode[] = [];

    if (Array.isArray(nodes)) {
        for (const node of nodes) {
            if (VinkNodeTypes.includes(node.type)) {
                result.push(node);
            }
        }
    }

    return result;
}
