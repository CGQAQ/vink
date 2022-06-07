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

const options: RendererOptions = {
  patchProp: function (
    el: RendererElement,
    key: string,
    prevValue: any,
    nextValue: any,
    isSVG?: boolean,
    prevChildren?: VNode<
      RendererNode,
      RendererElement,
      { [key: string]: any }
    >[],
    parentComponent?: ComponentInternalInstance | null,
    parentSuspense?: SuspenseBoundary | null,
    unmountChildren?
  ): void {
    throw new Error("Function not implemented.");
  },
  insert: function (
    el: RendererNode,
    parent: RendererElement,
    anchor?: RendererNode | null
  ): void {
    throw new Error("Function not implemented.");
  },
  remove: function (el: RendererNode): void {
    throw new Error("Function not implemented.");
  },
  createElement: function (
    type: string,
    isSVG?: boolean,
    isCustomizedBuiltIn?: string,
    vnodeProps?: (VNodeProps & { [key: string]: any }) | null
  ): RendererElement {
    throw new Error("Function not implemented.");
  },
  createText: function (text: string): RendererNode {
    throw new Error("Function not implemented.");
  },
  createComment: function (text: string): RendererNode {
    throw new Error("Function not implemented.");
  },
  setText: function (node: RendererNode, text: string): void {
    throw new Error("Function not implemented.");
  },
  setElementText: function (node: RendererElement, text: string): void {
    throw new Error("Function not implemented.");
  },
  parentNode: function (node: RendererNode): RendererElement | null {
    throw new Error("Function not implemented.");
  },
  nextSibling: function (node: RendererNode): RendererNode | null {
    throw new Error("Function not implemented.");
  },
};

export const { createApp, render } = createRenderer(options);
