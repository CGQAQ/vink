import { createRenderer } from "vue";
import type {
  VNode,
  ComponentInternalInstance,
  SuspenseBoundary,
  VNodeProps,
} from "vue";

import { CommentNode, TextNode, VinkElement, VinkNode } from "./vink-dom";

export const { render, createApp } = createRenderer<VinkNode, VinkElement>({
  patchProp: function (
    el: VinkElement,
    key: string,
    prevValue: any,
    nextValue: any,
    _isSVG?: boolean | undefined,
    _prevChildren?:
      | VNode<VinkNode, VinkElement, { [key: string]: any }>[]
      | undefined,
    _parentComponent?: ComponentInternalInstance | null | undefined,
    _parentSuspense?: SuspenseBoundary | null | undefined,
    _unmountChildren?
  ): void {
    if (RUNTIME_VERBOSE) {
      console.log("#patchProp#", el, key, prevValue, nextValue);
    }
    el.props[key] = nextValue;
  },
  insert: function (
    el: VinkNode,
    parent: VinkElement,
    anchor?: VinkNode | null | undefined
  ): void {
    if (RUNTIME_VERBOSE) {
      console.log("#insert#", el, parent, anchor);
    }
    parent.insert(el, anchor ?? null);
  },
  remove: function (el: VinkNode): void {
    if (RUNTIME_VERBOSE) {
      console.log("#remove#", el);
    }
    el.parentNode?.remove(el);
  },
  createElement: function (
    type: string,
    isSVG?: boolean | undefined,
    isCustomizedBuiltIn?: string | undefined,
    vnodeProps?: (VNodeProps & { [key: string]: any }) | null | undefined
  ): VinkElement {
    if (RUNTIME_VERBOSE) {
      console.log("#createElement#", type, isSVG, isCustomizedBuiltIn);
    }
    if (isSVG) {
      throw new Error("SVG in vink is not supported");
    }

    if (isCustomizedBuiltIn) {
      throw new Error("CustomizedBuiltin in vink is not supported");
    }

    return new VinkElement(type, vnodeProps);
  },
  createText: function (text: string): VinkNode {
    if (RUNTIME_VERBOSE) {
      console.log("#createText#", text);
    }
    return new TextNode(text);
  },
  createComment: function (text: string): VinkNode {
    if (RUNTIME_VERBOSE) {
      console.log("#createComment#", text);
    }
    return new CommentNode(text);
  },
  setText: function (node: VinkNode, text: string): void {
    if (RUNTIME_VERBOSE) {
      console.log("#setText#", node, text);
    }
    node.setContent(text);
  },
  setElementText: function (node: VinkElement, text: string): void {
    if (RUNTIME_VERBOSE) {
      console.log("#setElementText#", node, text);
    }
    node.setContent(text);
  },
  parentNode: function (node: VinkNode): VinkElement | null {
    if (RUNTIME_VERBOSE) {
      console.log("#parentNode#", node);
    }
    return node.parentNode ?? null;
  },
  nextSibling: function (node: VinkNode): VinkNode | null {
    if (RUNTIME_VERBOSE) {
      console.log("#nextSibling#", node);
    }
    return node.nextSibling();
  },
});
