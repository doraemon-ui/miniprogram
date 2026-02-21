/**
 * @doraemon-ui/taro-react.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-21, 17:40:52.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */

import React from 'react';

function styleToString(style) {
    if (!style)
        return "";
    return Object.entries(style)
        .map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase())}:${v}`)
        .join(";");
}
class HostComponent extends React.Component {
    nativeRef = React.createRef();
    componentDidMount() {
        this._attachRef();
    }
    componentDidUpdate() {
        this._attachRef();
    }
    _attachRef() {
        const { forwardedRef } = this.props;
        if (!forwardedRef)
            return;
        if (typeof forwardedRef === "function") {
            forwardedRef(this.nativeRef.current);
        }
        else {
            forwardedRef.current =
                this.nativeRef.current;
        }
    }
    _transformProps(props) {
        const result = {};
        Object.keys(props).forEach((key) => {
            const value = props[key];
            if (key.startsWith("on") && typeof value === "function") {
                const eventName = key[2].toLowerCase() + key.slice(3);
                result[`bind${eventName}`] = value;
            }
            else {
                result[key] = value;
            }
        });
        return result;
    }
    render() {
        const { compName, className, style, children, forwardedRef, ...rest } = this.props;
        const nativeProps = this._transformProps(rest);
        console.log("nativeProps====", nativeProps);
        const Comp = compName;
        return (React.createElement(Comp, { ref: this.nativeRef, "dora-class": className, "dora-style": styleToString(style), ...nativeProps }, React.Children.toArray(children)));
        // return React.createElement(
        //   compName,
        //   {
        //     ref: this.nativeRef,
        //     "dora-class": className,
        //     "dora-style": styleToString(style),
        //     ...nativeProps,
        //   },
        //   React.Children.toArray(children),
        // );
    }
}
function createHostComponent(compName) {
    return React.forwardRef((props, ref) => React.createElement(HostComponent, {
        ...props,
        compName,
        forwardedRef: ref,
    }));
}

const List = createHostComponent('dora-list');

const ListItem = createHostComponent('dora-list-item');

export { List, ListItem };
