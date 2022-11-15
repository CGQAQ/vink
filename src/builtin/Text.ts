import { FunctionalComponent, h, SetupContext } from "vue";

function Text(props: any, context: SetupContext) {
    return h("text", props, context.slots.default && context.slots.default());
}

export default Text as FunctionalComponent;
