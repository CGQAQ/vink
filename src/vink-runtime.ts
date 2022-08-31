import { createRenderer } from "vue";
import type {
  VNode,
  ComponentInternalInstance,
  SuspenseBoundary,
  VNodeProps,
} from "vue";

import { CommentNode, TextNode, VinkElement, VinkNode } from "./vink-dom";

const renderer = createRenderer<VinkNode, VinkElement>({
  patchProp: function (
    el: VinkElement,
    key: string,
    prevValue: any,
    nextValue: any,
    isSVG?: boolean | undefined,
    prevChildren?:
      | VNode<VinkNode, VinkElement, { [key: string]: any }>[]
      | undefined,
    parentComponent?: ComponentInternalInstance | null | undefined,
    parentSuspense?: SuspenseBoundary | null | undefined,
    unmountChildren?
  ): void {
    el.props[key] = nextValue;
  },
  insert: function (
    el: VinkNode,
    parent: VinkElement,
    anchor?: VinkNode | null | undefined
  ): void {
    parent.insert(el, anchor ?? null);
  },
  remove: function (el: VinkNode): void {
    el.parentNode?.remove(el);
  },
  createElement: function (
    type: string,
    isSVG?: boolean | undefined,
    isCustomizedBuiltIn?: string | undefined,
    vnodeProps?: (VNodeProps & { [key: string]: any }) | null | undefined
  ): VinkElement {
    if (isSVG) {
      throw new Error("SVG in vink is not supported");
    }

    if (isCustomizedBuiltIn) {
      throw new Error("CustomizedBuiltin in vink is not supported");
    }

    return new VinkElement(type, vnodeProps);
  },
  createText: function (text: string): VinkNode {
    return new TextNode(text);
  },
  createComment: function (text: string): VinkNode {
    return new CommentNode(text);
  },
  setText: function (node: VinkNode, text: string): void {
    node.setContent(text);
  },
  setElementText: function (node: VinkElement, text: string): void {
    node.setContent(text);
  },
  parentNode: function (node: VinkNode): VinkElement | null {
    return node.parentNode ?? null;
  },
  nextSibling: function (node: VinkNode): VinkNode | null {
    return node.nextSibling();
  },
});

export default renderer;
