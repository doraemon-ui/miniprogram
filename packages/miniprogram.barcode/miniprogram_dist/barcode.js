/**
 * @doraemon-ui/miniprogram.barcode.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-25, 23:44:14.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
/*
 * Copyright (c) 2014 Johannes Mittendorfer (http://johannes-mittendorfer.com)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 2.1.1
 * Build 2014-10-07
 */
export default class EAN13 {
    canvas;
    ratio;
    number;
    settings;
    constructor(canvas, ratio, number, options) {
        this.canvas = canvas;
        this.ratio = ratio || 1;
        this.number = number;
        this.settings = {
            width: 200,
            height: 100,
            number: true,
            prefix: true,
            color: 'black',
            debug: false,
            onValid: () => { },
            onInvalid: () => { },
            onSuccess: () => { },
            onError: () => { },
            ...(options || {}),
        };
        this.init();
    }
    init() {
        if (this.number.length === 12) {
            const checkDigit = this.generateCheckDigit(this.number);
            this.number += String(checkDigit);
        }
        if (this.number.length === 13) {
            if (this.validate()) {
                this.settings.onValid();
            }
            else {
                this.settings.onInvalid();
            }
            const code = this.getCode();
            return this.draw(code);
        }
        return this.settings.onError();
    }
    getCode() {
        const x = ['0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'];
        const y = ['0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'];
        const z = ['1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'];
        const countries = ['xxxxxx', 'xxyxyy', 'xxyyxy', 'xxyyyx', 'xyxxyy', 'xyyxxy', 'xyyyxx', 'xyxyxy', 'xyxyyx', 'xyyxyx'];
        let code = '';
        const cEncoding = countries[parseInt(this.number.substr(0, 1), 10)].split('');
        const rawNumber = this.number.substr(1);
        const parts = rawNumber.split('');
        let i = 0;
        while (i < 6) {
            if (cEncoding[i] === 'x') {
                code += x[Number(parts[i])];
            }
            else {
                code += y[Number(parts[i])];
            }
            i++;
        }
        i = 6;
        while (i < 12) {
            code += z[Number(parts[i])];
            i++;
        }
        return code;
    }
    clear(context) {
        context.clearRect(0, 0, this.settings.width, this.settings.height);
    }
    draw(code) {
        const layout = {
            prefix_offset: 0.06,
            font_stretch: 0.073,
            border_line_height_number: 0.9,
            border_line_height: 1,
            line_height: 0.9,
            font_size: 0.15,
            font_y: 1.03,
            text_offset: 4.5,
        };
        const width = this.settings.prefix ? this.settings.width - (this.settings.width * layout.prefix_offset) : this.settings.width;
        let borderHeight = 0;
        let height = 0;
        if (this.settings.number) {
            borderHeight = layout.border_line_height_number * this.settings.height;
            height = layout.line_height * borderHeight;
        }
        else {
            borderHeight = layout.border_line_height * this.settings.height;
            height = borderHeight;
        }
        const itemWidth = width / 95;
        const context = this.canvas.getContext('2d');
        const ratio = this.ratio || 1;
        const canvasWidth = this.settings.width * ratio;
        const canvasHeight = this.settings.height * ratio;
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        context.scale(ratio, ratio);
        context.fillRect(0, 0, this.settings.width, this.settings.height);
        this.clear(context);
        context.fillStyle = this.settings.color;
        let left = this.settings.number && this.settings.prefix ? this.settings.width * layout.prefix_offset : 0;
        const lines = code.split('');
        context.fillRect(left, 0, itemWidth, borderHeight);
        left = left + itemWidth * 2;
        context.fillRect(left, 0, itemWidth, borderHeight);
        left = left + itemWidth;
        let i = 0;
        while (i < 42) {
            if (lines[i] === '1') {
                context.fillRect(left, 0, Math.floor(itemWidth) + 1, height);
            }
            left = left + itemWidth;
            i++;
        }
        left = left + itemWidth;
        context.fillRect(left, 0, itemWidth, borderHeight);
        left = left + itemWidth * 2;
        context.fillRect(left, 0, itemWidth, borderHeight);
        left = left + itemWidth * 2;
        i = 42;
        while (i < 84) {
            if (lines[i] === '1') {
                context.fillRect(left, 0, Math.floor(itemWidth) + 1, height);
            }
            left = left + itemWidth;
            i++;
        }
        context.fillRect(left, 0, itemWidth, borderHeight);
        left = left + itemWidth * 2;
        context.fillRect(left, 0, itemWidth, borderHeight);
        if (this.settings.number) {
            context.font = String(layout.font_size * height) + 'px monospace';
            const prefix = this.number.substr(0, 1);
            if (this.settings.prefix) {
                context.fillText(prefix, 0, borderHeight * layout.font_y);
            }
            let offset = itemWidth * layout.text_offset + (this.settings.prefix ? layout.prefix_offset * this.settings.width : 0);
            const charsLeft = this.number.substr(1, 6).split('');
            charsLeft.forEach((value) => {
                context.fillText(value, offset, borderHeight * layout.font_y);
                offset += layout.font_stretch * width;
            });
            offset = 49 * itemWidth + (this.settings.prefix ? layout.prefix_offset * this.settings.width : 0) + layout.text_offset;
            const charsRight = this.number.substr(7).split('');
            charsRight.forEach((value) => {
                context.fillText(value, offset, borderHeight * layout.font_y);
                offset += layout.font_stretch * width;
            });
        }
        if (this.settings.debug) {
            const step = itemWidth * 2;
            for (let x = 0; x <= width; x += step) {
                context.beginPath();
                context.rect(x, height * 0.4, itemWidth, height * 0.1);
                context.fillStyle = 'red';
                context.fill();
            }
        }
        this.settings.onSuccess();
    }
    generateCheckDigit(number) {
        let counter = 0;
        const chars = number.split('');
        chars.forEach((value, key) => {
            if (key % 2 === 0) {
                counter += parseInt(value, 10);
            }
            else {
                counter += 3 * parseInt(value, 10);
            }
        });
        return (10 - (counter % 10)) % 10;
    }
    validate() {
        return parseInt(this.number.slice(-1), 10) === this.generateCheckDigit(this.number.slice(0, -1));
    }
}
