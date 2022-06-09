import { defineComponent, h, Prop, toRefs } from "vue";

import chalk, { ForegroundColor } from "chalk";
import colorize from "../colorize";
import { Styles } from "../styles";
import { LiteralUnion } from "type-fest";

export interface Props {
  /**
   * Change text color. Ink uses chalk under the hood, so all its functionality is supported.
   */
  readonly color?: LiteralUnion<typeof ForegroundColor, string>;

  /**
   * Same as `color`, but for background.
   */
  readonly backgroundColor?: LiteralUnion<typeof ForegroundColor, string>;

  /**
   * Dim the color (emit a small amount of light).
   */
  readonly dimColor?: boolean;

  /**
   * Make the text bold.
   */
  readonly bold?: boolean;

  /**
   * Make the text italic.
   */
  readonly italic?: boolean;

  /**
   * Make the text underlined.
   */
  readonly underline?: boolean;

  /**
   * Make the text crossed with a line.
   */
  readonly strikethrough?: boolean;

  /**
   * Inverse background and foreground colors.
   */
  readonly inverse?: boolean;

  /**
   * This property tells Ink to wrap or truncate text if its width is larger than container.
   * If `wrap` is passed (by default), Ink will wrap text and split it into multiple lines.
   * If `truncate-*` is passed, Ink will truncate text instead, which will result in one line of text with the rest cut off.
   */
  readonly wrap?: Styles["textWrap"];
}

export default defineComponent({
  props: {
    color: {
      type: String,
      required: false,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    dimColor: {
      type: Boolean,
      required: false,
    },
    bold: { type: Boolean, required: false },
    italic: { type: Boolean, required: false },
    underline: { type: Boolean, required: false },
    strikethrough: { type: Boolean, required: false },
    inverse: { type: Boolean, required: false },
    wrap: { type: Boolean, required: false },
  },

  setup(props, context) {
    const {
      color,
      backgroundColor,
      dimColor,
      bold,
      italic,
      underline,
      strikethrough,
      inverse,
      wrap,
    } = toRefs(props);

    const children = context.slots.default;

    if (children === undefined || children === null) {
      return null;
    }

    const transform = (children: string): string => {
      if (dimColor.value) {
        children = chalk.dim(children);
      }

      if (color.value) {
        children = colorize(children, color.value, "foreground");
      }

      if (backgroundColor.value) {
        children = colorize(children, backgroundColor.value, "background");
      }

      if (bold.value) {
        children = chalk.bold(children);
      }

      if (italic.value) {
        children = chalk.italic(children);
      }

      if (underline.value) {
        children = chalk.underline(children);
      }

      if (strikethrough.value) {
        children = chalk.strikethrough(children);
      }

      if (inverse.value) {
        children = chalk.inverse(children);
      }

      return children;
    };

    return h(
      "ink-text",
      {
        style: {
          flexGrow: 0,
          flexShrink: 1,
          flexDirection: "row",
          textWrap: wrap,
        },
        internal_transform: transform,
      },
      children
    );
  },
});
