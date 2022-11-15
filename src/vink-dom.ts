import { VNodeProps } from "vue";
import autoBind from "auto-bind";

/**
 * VP for Vink primitive type
 */
const VinkNodeTypeVPPrefix = "__#VP_";
export const VinkNodeTypes = [
    "__#VP_Root",
    "__#VP_Text",
    "__#VP_Comment",
    "__#VP_Unknown",
] as const;
export type VinkNodeType = typeof VinkNodeTypes[number];

export type NotifyCallback = () => void;
export interface Observable {
    addListener: (cb: NotifyCallback) => void;
    removeListener: (cb: NotifyCallback) => void;
    clearListeners: () => void;
    notifyAll: () => void;
}

let listeners: NotifyCallback[] = [];
export abstract class VinkNode implements Observable {
    type: VinkNodeType = "__#VP_Unknown";
    tag: string | null = null;
    parentNode?: VinkElement;
    children: VinkNode[] = [];

    constructor() {
        autoBind(this);
    }

    // ------------------- Observable -------------------
    addListener(cb: NotifyCallback): void {
        listeners.push(cb);
    }
    removeListener(cb: NotifyCallback): void {
        const index = listeners.findIndex((it) => it === cb);
        if (index >= 0) {
            listeners.splice(index, 1);
        }
    }
    clearListeners() {
        listeners = [];
    }
    notifyAll() {
        listeners.forEach((it) => it());
    }
    // -------------------    END    -------------------

    insert(node: VinkNode, anchor: VinkNode | null) {
        if (node.parentNode) {
            node.parentNode.remove(node);
        }

        if (anchor) {
            const anchorIndex = this.children.findIndex((it) => it === anchor);
            if (anchorIndex >= 0) {
                this.children.splice(anchorIndex, 0, node);
            } else {
                this.children.push(node);
            }
        } else {
            this.children.push(node);
        }

        this.notifyAll();
    }

    remove(node: VinkNode): void {
        const toBeRemove = this.children.findIndex((it) => it === node);

        if (toBeRemove >= 0) {
            this.children.splice(toBeRemove, 1);
        }

        this.notifyAll();
    }

    nextSibling(): VinkNode | null {
        const currentIndex = this.parentNode?.children.findIndex(
            (it) => it === this,
        );

        if (
            (currentIndex && currentIndex === -1) ||
            currentIndex === undefined
        ) {
            return null;
        }

        return this.parentNode?.children?.[currentIndex + 1] ?? null;
    }

    abstract setContent(content: string): void;
    abstract getContent(): string;
}

export class VinkElement extends VinkNode {
    props: VNodeProps & { [key: string]: any };
    content: string = "";

    constructor(
        type: string,
        props: (VNodeProps & { [key: string]: any }) | null | undefined,
    ) {
        super();

        if (!VinkNodeTypes.includes(type as any)) {
            super.type = "__#VP_Unknown";
            super.tag = type;
        } else {
            super.type = type as VinkNodeType;
            super.tag = type;
        }

        this.props = props ?? {};
    }

    setContent(content: string): void {
        this.content = content;

        super.notifyAll();
    }

    getContent(): string {
        return this.content;
    }
}

export class RootElement extends VinkElement {
    constructor() {
        super("__#VP_Root", null);
    }
}

export interface TextNodeOptions {}
export class TextNode extends VinkNode {
    text: string;

    constructor(text = "", options: TextNodeOptions = {}) {
        super();
        super.type = "__#VP_Text";

        this.text = text;
    }

    setContent(text: string) {
        this.text = text;

        this.notifyAll();
    }

    getContent(): string {
        return this.text;
    }
}

export class CommentNode extends VinkNode {
    comment: string;

    constructor(comment = "") {
        super();
        super.type = "__#VP_Comment";

        this.comment = comment;
    }

    setContent(comment: string) {
        this.comment = comment;

        // CommentNode is not reactive
        // and will not trigger update
        // this.triggerUpdate();
    }

    getContent(): string {
        return this.comment;
    }
}
