/**
 * @doraemon-ui/miniprogram.upload.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 04:50:52.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { chooseMedia, uploadFile } from '@doraemon-ui/miniprogram.shared';
const { classNames } = Doraemon.util;
let Upload = class Upload extends Doraemon {
    prefixCls;
    max;
    count;
    defaultFileType;
    compressed;
    maxDuration;
    camera;
    sizeType;
    sourceType;
    url;
    name;
    header;
    formData;
    uploaded;
    disabled;
    progress;
    listType;
    defaultFileList;
    fileList;
    controlled;
    showUploadList;
    showRemoveIcon;
    uploadMax = -1;
    uploadCount = 9;
    uploadFileList = [];
    isVideo = false;
    index = 0;
    createdAt = Date.now();
    uploadTask = {};
    tempFilePaths = [];
    get classes() {
        const p = this.prefixCls;
        const wrap = classNames(p, {
            [`${p}--${this.listType}`]: !!this.listType,
            [`${p}--disabled`]: this.disabled,
        });
        return {
            wrap,
            files: `${p}__files`,
            file: `${p}__file`,
            thumb: `${p}__thumb`,
            remove: `${p}__remove`,
            select: `${p}__select`,
            button: `${p}__button`,
        };
    }
    onMaxChange() {
        this.updated();
    }
    onCountChange() {
        this.updated();
    }
    onFileListChange(newVal) {
        if (this.controlled)
            this.uploadFileList = newVal || [];
    }
    getUid() {
        this.index += 1;
        return `dora-upload--${this.createdAt}-${this.index}`;
    }
    calcValue(count, max) {
        const realCount = parseInt(String(count), 10) || 0;
        const uploadMax = (parseInt(String(max), 10) > -1) ? parseInt(String(max), 10) : -1;
        let uploadCount = realCount;
        if (uploadMax !== -1 && uploadMax <= 9 && realCount > uploadMax)
            uploadCount = uploadMax;
        return { uploadMax, uploadCount };
    }
    updated() {
        const { uploadMax, uploadCount } = this.calcValue(this.count, this.max);
        if (this.uploadMax !== uploadMax)
            this.uploadMax = uploadMax;
        if (this.uploadCount !== uploadCount)
            this.uploadCount = uploadCount;
    }
    onSelect() {
        const leftMax = this.uploadMax > -1 ? this.uploadMax - this.uploadFileList.length : this.uploadCount;
        const { uploadCount: count } = this.calcValue(this.uploadCount, leftMax);
        if (this.disabled)
            return;
        const success = (res) => {
            this.tempFilePaths = (res.tempFiles || []).map((item) => ({ url: item.tempFilePath, uid: this.getUid() }));
            this.$emit('before', { ...res, fileList: this.uploadFileList });
            if (this.uploaded)
                this.uploadFile();
        };
        if (this.isVideo) {
            chooseMedia({
                mediaType: ['video'],
                sourceType: this.sourceType,
                compressed: this.compressed,
                maxDuration: this.maxDuration,
                camera: this.camera,
                success,
            });
            return;
        }
        chooseMedia({
            mediaType: ['image'],
            count,
            sizeType: this.sizeType,
            sourceType: this.sourceType,
            success,
        });
    }
    onChange(info) {
        if (!this.controlled)
            this.uploadFileList = info.fileList || [];
        this.$emit('change', info);
    }
    onStart(file) {
        const targetItem = { ...file, status: 'uploading' };
        this.onChange({
            file: targetItem,
            fileList: [...this.uploadFileList, targetItem],
        });
    }
    onSuccess(file, res) {
        const fileList = [...this.uploadFileList];
        const index = fileList.map((item) => item.uid).indexOf(file.uid);
        if (index !== -1) {
            const targetItem = { ...file, status: 'done', res };
            fileList.splice(index, 1, targetItem);
            const info = { file: targetItem, fileList };
            this.$emit('success', info);
            this.onChange(info);
        }
    }
    onFail(file, res) {
        const fileList = [...this.uploadFileList];
        const index = fileList.map((item) => item.uid).indexOf(file.uid);
        if (index !== -1) {
            const targetItem = { ...file, status: 'error', res };
            fileList.splice(index, 1, targetItem);
            const info = { file: targetItem, fileList };
            this.$emit('fail', info);
            this.onChange(info);
        }
    }
    onProgress(file, res) {
        const fileList = [...this.uploadFileList];
        const index = fileList.map((item) => item.uid).indexOf(file.uid);
        if (index !== -1) {
            const targetItem = { ...file, progress: res.progress, res };
            fileList.splice(index, 1, targetItem);
            const info = { file: targetItem, fileList };
            this.$emit('progress', info);
            this.onChange(info);
        }
    }
    uploadFile() {
        if (!this.tempFilePaths.length)
            return;
        const file = this.tempFilePaths.shift();
        if (!file)
            return;
        const uid = String(file.uid);
        const filePath = file.url;
        if (!this.url || !filePath || this.disabled)
            return;
        this.onStart(file);
        this.uploadTask[uid] = uploadFile({
            url: this.url,
            filePath,
            name: this.name,
            header: this.header,
            formData: this.formData,
            success: (res) => this.onSuccess(file, res),
            fail: (res) => this.onFail(file, res),
            complete: (res) => {
                delete this.uploadTask[uid];
                this.$emit('complete', res);
                this.uploadFile();
            },
        });
        if (this.progress && this.uploadTask[uid]?.onProgressUpdate) {
            this.uploadTask[uid].onProgressUpdate((res) => this.onProgress(file, res));
        }
    }
    onPreview(e) {
        const dataset = e.currentTarget?.dataset || {};
        this.$emit('preview', { ...dataset, fileList: this.uploadFileList });
    }
    onRemove(e) {
        const dataset = e.currentTarget?.dataset || {};
        const file = dataset.file;
        const fileList = [...this.uploadFileList];
        const index = fileList.map((item) => item.uid).indexOf(file.uid);
        if (index !== -1) {
            const targetItem = { ...file, status: 'remove' };
            fileList.splice(index, 1);
            const info = { file: targetItem, fileList };
            this.$emit('remove', { ...dataset, ...info });
            this.onChange(info);
        }
    }
    abort(uid) {
        if (uid) {
            if (this.uploadTask[uid]) {
                this.uploadTask[uid].abort();
                delete this.uploadTask[uid];
            }
            return;
        }
        Object.keys(this.uploadTask).forEach((taskUid) => {
            this.uploadTask[taskUid]?.abort();
            delete this.uploadTask[taskUid];
        });
    }
    mounted() {
        this.uploadFileList = this.controlled ? this.fileList : this.defaultFileList;
        this.isVideo = this.defaultFileType === 'video';
        this.updated();
    }
    detached() {
        this.abort();
    }
};
__decorate([
    Prop({ type: Number, default: -1 })
], Upload.prototype, "max", void 0);
__decorate([
    Prop({ type: Number, default: 9 })
], Upload.prototype, "count", void 0);
__decorate([
    Prop({ type: String, default: 'image' })
], Upload.prototype, "defaultFileType", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Upload.prototype, "compressed", void 0);
__decorate([
    Prop({ type: Number, default: 60 })
], Upload.prototype, "maxDuration", void 0);
__decorate([
    Prop({ type: String, default: 'back' })
], Upload.prototype, "camera", void 0);
__decorate([
    Prop({ type: Array, default: ['original', 'compressed'] })
], Upload.prototype, "sizeType", void 0);
__decorate([
    Prop({ type: Array, default: ['album', 'camera'] })
], Upload.prototype, "sourceType", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Upload.prototype, "url", void 0);
__decorate([
    Prop({ type: String, default: 'file' })
], Upload.prototype, "name", void 0);
__decorate([
    Prop({ type: Object, default: {} })
], Upload.prototype, "header", void 0);
__decorate([
    Prop({ type: Object, default: {} })
], Upload.prototype, "formData", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Upload.prototype, "uploaded", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Upload.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Upload.prototype, "progress", void 0);
__decorate([
    Prop({ type: String, default: 'text' })
], Upload.prototype, "listType", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], Upload.prototype, "defaultFileList", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], Upload.prototype, "fileList", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Upload.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Upload.prototype, "showUploadList", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Upload.prototype, "showRemoveIcon", void 0);
__decorate([
    Watch('max')
], Upload.prototype, "onMaxChange", null);
__decorate([
    Watch('count')
], Upload.prototype, "onCountChange", null);
__decorate([
    Watch('fileList')
], Upload.prototype, "onFileListChange", null);
Upload = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-upload',
            },
        },
    })
], Upload);
export default defineComponentHOC()(Upload);
