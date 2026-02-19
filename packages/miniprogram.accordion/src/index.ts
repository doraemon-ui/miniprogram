import {
  defineComponentHOC,
  Doraemon,
  Component,
  Emit,
  Watch,
  Prop,
} from "@doraemon-ui/miniprogram.core-js";
import type { PanelInstance } from "./panel";

@Component({
  components: {
    Panel: () => ({
      module: "./panel",
      type: "child",
      observer: "updated",
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: "dora-accordion",
    },
  },
})
class Accordion extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Accordion
   */
  prefixCls!: string;

  /**
   * 默认激活 tab 面板的 key，当 `controlled` 为 `false` 时才生效
   *
   * @type {string[]}
   * @memberof Accordion
   */
  @Prop({
    type: Array,
    default: [],
  })
  defaultCurrent: string[];

  /**
   * 用于手动激活 tab 面板的 key，当 `controlled` 为 `true` 时才生效
   *
   * @type {string[]}
   * @memberof Accordion
   */
  @Prop({
    type: Array,
    default: [],
  })
  current: string[];

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Accordion
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean;

  /**
   * 是否手风琴模式
   *
   * @type {boolean}
   * @memberof Accordion
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  accordion: boolean;

  /**
   * 标题
   *
   * @type {string}
   * @memberof Accordion
   */
  @Prop({
    type: String,
    default: "",
  })
  title: string;

  /**
   * 描述
   *
   * @type {string}
   * @memberof Accordion
   */
  @Prop({
    type: String,
    default: "",
  })
  label: string;

  get classes() {
    const { prefixCls } = this;
    const wrap = prefixCls;
    const hd = `${prefixCls}__hd`;
    const bd = `${prefixCls}__bd`;
    const ft = `${prefixCls}__ft`;

    return {
      wrap,
      hd,
      bd,
      ft,
    };
  }

  activeKey: string[] = [];
  keys: Record<string, any>[] = [];

  @Watch("current")
  watchCurrent(newVal: string[]) {
    if (this.controlled) {
      this.updated(newVal);
    }
  }

  updated(activeKey = this.activeKey) {
    if (this.activeKey !== activeKey) {
      this.activeKey = activeKey;
    }

    this.updateCurrentAndIndex(activeKey);
  }

  updateCurrentAndIndex(activeKey: string[]) {
    const elements = this.$children as PanelInstance[];

    if (elements.length > 0) {
      elements.forEach((element, index) => {
        const key = element.key || String(index);
        const current = this.accordion
          ? activeKey[0] === key
          : activeKey.indexOf(key) !== -1;

        element.updateCurrentAndIndex(current, key);
      });
    }

    if (this.keys.length !== elements.length) {
      this.keys = elements.map((element) => element.$data);
    }
  }

  @Emit("change")
  setActiveKey(activeKey: string[]) {
    if (!this.controlled) {
      this.updated(activeKey);
    }
    return {
      key: this.accordion ? activeKey[0] : activeKey,
      keys: this.keys,
    };
  }

  onClickItem(key: string) {
    let activeKey = [...this.activeKey];

    if (this.accordion) {
      activeKey = activeKey[0] === key ? [] : [key];
    } else {
      activeKey =
        activeKey.indexOf(key) !== -1
          ? activeKey.filter((n) => n !== key)
          : [...activeKey, key];
    }

    this.setActiveKey(activeKey);
  }

  mounted() {
    const { defaultCurrent, current, controlled } = this;
    const activeKey = controlled ? current : defaultCurrent;

    this.updated(activeKey);
  }
}

export type AccordionInstance = Accordion;
export default defineComponentHOC({ multipleSlots: false })(Accordion);
