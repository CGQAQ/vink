export * from "./vink-runtime";

import { VinkElement } from "./vink-dom";
export function createRootNode() {
    return new VinkElement("root", null);
}
