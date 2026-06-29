import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class Filterbar extends Doraemon {
    prefixCls: string;
    items: FilterbarItem[];
    cancelText: string;
    confirmText: string;
    options: FilterbarItem[];
    values: FilterbarValue[];
    showOptions: FilterbarRenderItem[];
    activeIndex: number;
    backdropVisible: boolean;
    get classes(): {
        wrap: string;
        bd: string;
        text: string;
        pop: string;
        select: string;
        scrollView: string;
        panel: string;
        panelHd: string;
        panelTitle: string;
        panelSelected: string;
        panelBd: string;
        groups: string;
        group: string;
        radio: string;
        check: string;
        btn: string;
        btnChecked: string;
        btns: string;
        btnDanger: string;
    };
    onItemsChange(newVal: FilterbarItem[]): void;
    syncItems(items?: FilterbarItem[]): void;
    refreshShowOptions(): void;
    updatedValues(values: FilterbarValue[], callback?: () => void): void;
    onBackdropClick(): void;
    onClose(e: CustomEvent<{}, {}, {
        index: number;
    }>): void;
    onSelectClose(index: number, callback?: () => void): void;
    onSelectReset(e: CustomEvent<{}, {}, {
        index: number;
    }>): void;
    onSelectConfirm(e: CustomEvent<{}, {}, {
        index: number;
    }>): void;
    onPopupSelectChange(e: CustomEvent<{
        value: string[] | string;
    }, {}, {
        index: number;
        parentIndex: number;
    }>): void;
    onSelectChange(e: CustomEvent<{
        value?: string[] | string;
        selectedValue?: string[] | string;
    }, {}, {
        index: number;
        type: FilterbarItem['type'];
    }>): void;
    onClick(e: CustomEvent<{}, {}, {
        index: number;
    }>): void;
    onOpenSelect(index: number): void;
    onChange(): void;
    onScroll(e: CustomEvent): void;
    onOpen(e: CustomEvent): void;
    onClosed(e: CustomEvent): void;
    noop(): void;
    mounted(): void;
}

export { Filterbar };

export type FilterbarOptionValue = string | number;

export type FilterbarSortValue = 1 | -1;

export type FilterbarValue = '' | FilterbarOptionValue | FilterbarSortValue | FilterbarOptionValue[] | FilterbarValue[];

export interface FilterbarChoiceItem {
    label: string;
    value: FilterbarOptionValue;
    checked?: boolean;
}

export interface FilterbarBaseItem {
    label: string;
    type: 'text' | 'sort' | 'radio' | 'checkbox' | 'filter';
    checked?: boolean;
    visible?: boolean;
    groups?: string[];
}

export interface FilterbarTextItem extends FilterbarBaseItem {
    type: 'text';
    value?: FilterbarOptionValue;
}

export interface FilterbarSortItem extends FilterbarBaseItem {
    type: 'sort';
    sort?: FilterbarSortValue;
}

export interface FilterbarRadioItem extends FilterbarBaseItem {
    type: 'radio';
    children: FilterbarChoiceItem[];
}

export interface FilterbarCheckboxItem extends FilterbarBaseItem {
    type: 'checkbox';
    children: FilterbarChoiceItem[];
}

export interface FilterbarFilterChildItem {
    label: string;
    type: 'radio' | 'checkbox';
    children: FilterbarChoiceItem[];
}

export interface FilterbarFilterItem extends FilterbarBaseItem {
    type: 'filter';
    children: FilterbarFilterChildItem[];
}

export type FilterbarItem = FilterbarTextItem | FilterbarSortItem | FilterbarRadioItem | FilterbarCheckboxItem | FilterbarFilterItem;

export interface FilterbarRenderFilterChildItem extends FilterbarFilterChildItem {
    selected: string;
    children: FilterbarChoiceItem[];
}

export type FilterbarDisplayValue = string | string[];

export type FilterbarRenderItem = FilterbarItem & {
    displayLabel: FilterbarDisplayValue;
    itemClass: string;
    iconClass: string;
    groupOptions?: Array<{
        title: string;
        value: string;
        color: PresetColor;
    }>;
    children?: FilterbarChoiceItem[] | FilterbarRenderFilterChildItem[];
};

export interface FilterbarProps {
    prefixCls?: string;
    items?: FilterbarItem[];
    cancelText?: string;
    confirmText?: string;
}

export interface FilterbarExpose {
}

export type FilterbarInstance = ComponentPublicInstance<Filterbar, FilterbarProps, FilterbarExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
