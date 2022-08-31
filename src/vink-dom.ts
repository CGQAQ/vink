import { VNodeProps } from "vue";
import autoBind from "auto-bind";

export type VinkNodeType = "Text" | "Comment" | "Unknown";

export abstract class VinkNode {
  type: VinkNodeType | string = "Unknown";
  parentNode?: VinkElement;
  children: VinkNode[] = [];

  constructor() {
    autoBind(this);
  }

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
  }

  remove(node: VinkNode): void {
    const toBeRemove = this.children.findIndex((it) => it === node);

    if (toBeRemove >= 0) {
      this.children.splice(toBeRemove, 1);
    }
  }

  nextSibling(): VinkNode | null {
    const currentIndex = this.parentNode?.children.findIndex(
      (it) => it === this
    );

    if ((currentIndex && currentIndex === -1) || currentIndex === undefined) {
      return null;
    }

    return this.parentNode?.children?.[currentIndex + 1] ?? null;
  }

  abstract setContent(content: string): void;
}

export class VinkElement extends VinkNode {
  props: VNodeProps & { [key: string]: any };
  content: string = "";

  constructor(
    type: string,
    props: (VNodeProps & { [key: string]: any }) | null | undefined
  ) {
    super();
    super.type = type;

    this.props = props ?? {};
  }

  setContent(content: string): void {
    this.content = content;
  }
}

export interface TextNodeOptions {}
export class TextNode extends VinkNode {
  text: string;

  constructor(text = "", options: TextNodeOptions = {}) {
    super();
    super.type = "Text";

    this.text = text;
  }

  setContent(text: string) {
    this.text = text;
  }
}

export class CommentNode extends VinkNode {
  comment: string;

  constructor(comment = "") {
    super();
    super.type = "Comment";

    this.comment = comment;
  }

  setContent(comment: string) {
    this.comment = comment;
  }
}
