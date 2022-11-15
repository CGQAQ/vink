import { FunctionalComponent, h, SetupContext } from "vue";
import { VinkNodeType } from "../vink-dom";

function Text(props: any, context: SetupContext) {
    return h(
        "__#VP_Text" as VinkNodeType,
        props,
        context.slots.default && context.slots.default(),
    );
}

export default Text as FunctionalComponent;
