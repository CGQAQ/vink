import {
  createRenderer,
  RendererOptions,
  RendererElement,
  RendererNode,
  VNode,
  VNodeProps,
  ComponentInternalInstance,
  SuspenseBoundary,
} from "@vue/runtime-core";

import Yoga from "yoga-layout-prebuilt";

import {
  DOMNode,
  DOMElement,
  createNode,
  ElementNames,
  createTextNode,
  TextNode,
  setTextNodeValue,
  removeChildNode,
  appendChildNode,
  setAttribute,
} from "./dom";

const cleanupYogaNode = (node?: Yoga.YogaNode): void => {
  node?.unsetMeasureFunc();
  node?.freeRecursive();
};

export const { createApp, render } = createRenderer<DOMNode, DOMElement>({
  patchProp: function (
    el: DOMElement,
    key: string,
    prevValue: any,
    nextValue: any,
    isSVG?: boolean,
    prevChildren?: VNode<DOMNode, DOMElement, { [key: string]: any }>[],
    parentComponent?: ComponentInternalInstance | null,
    parentSuspense?: SuspenseBoundary | null,
    unmountChildren?
  ): void {
    setAttribute(el, key, nextValue);
  },
  insert: function (
    el: DOMElement,
    parent: DOMElement,
    anchor?: DOMNode | null
  ): void {
    appendChildNode(parent, el);
  },
  remove: function (el: DOMNode): void {
    if (el.parentNode) {
      removeChildNode(el.parentNode, el);
      cleanupYogaNode(el.yogaNode);
    }
  },
  createElement: function (
    type: string,
    isSVG?: boolean,
    isCustomizedBuiltIn?: string,
    vnodeProps?: (VNodeProps & { [key: string]: any }) | null
  ): DOMElement {
    return createNode(type as ElementNames);
  },
  createText: function (text: string): DOMNode {
    return createTextNode(text);
  },
  createComment: function (text: string): DOMNode {
    throw new Error("Function not implemented.");
  },
  setText: function (node: TextNode, text: string): void {
    setTextNodeValue(node, text);
  },
  setElementText: function (node: DOMElement, text: string): void {
    throw new Error("Function not implemented.");
  },
  parentNode: function (node: DOMNode): DOMElement | null {
    return node.parentNode;
  },
  nextSibling: function (node: DOMNode): DOMNode | null {
    if (!node.parentNode) return null;

    const siblings = node.parentNode.childNodes;
    const index = siblings.indexOf(node);
    if (index < 0) return null;

    return siblings[index + 1] ?? null;
  },
});
