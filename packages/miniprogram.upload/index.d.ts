import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Upload extends Doraemon {
    prefixCls: string;
    max: number;
    count: number;
    defaultFileType: string;
    compressed: boolean;
    maxDuration: number;
    camera: string;
    sizeType: string[];
    sourceType: string[];
    url: string;
    name: string;
    header: Record<string, unknown>;
    formData: Record<string, unknown>;
    uploaded: boolean;
    disabled: boolean;
    progress: boolean;
    listType: string;
    defaultFileList: UploadFile[];
    fileList: UploadFile[];
    controlled: boolean;
    showUploadList: boolean;
    showRemoveIcon: boolean;
    uploadMax: number;
    uploadCount: number;
    uploadFileList: UploadFile[];
    isVideo: boolean;
    private index;
    private createdAt;
    private uploadTask;
    private tempFilePaths;
    get classes(): {
        wrap: string;
        files: string;
        file: string;
        thumb: string;
        remove: string;
        select: string;
        button: string;
    };
    onMaxChange(): void;
    onCountChange(): void;
    onFileListChange(newVal: UploadFile[]): void;
    getUid(): string;
    calcValue(count: number, max: number): {
        uploadMax: number;
        uploadCount: number;
    };
    updated(): void;
    onSelect(): void;
    onChange(info: {
        file?: UploadFile;
        fileList: UploadFile[];
    }): void;
    onStart(file: UploadFile): void;
    onSuccess(file: UploadFile, res: unknown): void;
    onFail(file: UploadFile, res: unknown): void;
    onProgress(file: UploadFile, res: {
        progress: number;
    }): void;
    uploadFile(): void;
    onPreview(e: CustomEvent): void;
    onRemove(e: CustomEvent): void;
    abort(uid?: string): void;
    mounted(): void;
    detached(): void;
}

export { Upload };

/**
 * UploadFile接口定义
 */
export interface UploadFile {
    /**
     * uid
     * @type {string}
     */
    uid?: string;
    /**
     * url
     * @type {string}
     */
    url: string;
    /**
     * status
     * @type {'uploading' | 'done' | 'error' | 'remove'}
     */
    status?: 'uploading' | 'done' | 'error' | 'remove';
    /**
     * progress
     * @type {number}
     */
    progress?: number;
    /**
     * res
     * @type {unknown}
     */
    res?: unknown;
}

/**
 * UploadTaskLike接口定义
 */
export interface UploadTaskLike {
    /**
     * 取消上传
     *
     * @return {void}
     */
    abort(): void;
    onProgressUpdate?(cb: (res: {
        progress: number;
    }) => void): void;
}

/**
 * UploadProps接口定义
 */
export interface UploadProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * max
     * @type {number}
     */
    max?: number;
    /**
     * count
     * @type {number}
     */
    count?: number;
    /**
     * defaultFileType
     * @type {string}
     */
    defaultFileType?: string;
    /**
     * compressed
     * @type {boolean}
     */
    compressed?: boolean;
    /**
     * maxDuration
     * @type {number}
     */
    maxDuration?: number;
    /**
     * camera
     * @type {string}
     */
    camera?: string;
    /**
     * sizeType
     * @type {string[]}
     */
    sizeType?: string[];
    /**
     * sourceType
     * @type {string[]}
     */
    sourceType?: string[];
    /**
     * url
     * @type {string}
     */
    url?: string;
    /**
     * name
     * @type {string}
     */
    name?: string;
    /**
     * header
     * @type {Record<string, unknown>}
     */
    header?: Record<string, unknown>;
    /**
     * formData
     * @type {Record<string, unknown>}
     */
    formData?: Record<string, unknown>;
    /**
     * uploaded
     * @type {boolean}
     */
    uploaded?: boolean;
    /**
     * disabled
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * progress
     * @type {boolean}
     */
    progress?: boolean;
    /**
     * listType
     * @type {string}
     */
    listType?: string;
    /**
     * defaultFileList
     * @type {UploadFile[]}
     */
    defaultFileList?: UploadFile[];
    /**
     * fileList
     * @type {UploadFile[]}
     */
    fileList?: UploadFile[];
    /**
     * controlled
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * showUploadList
     * @type {boolean}
     */
    showUploadList?: boolean;
    /**
     * showRemoveIcon
     * @type {boolean}
     */
    showRemoveIcon?: boolean;
}

/**
 * UploadExpose接口定义
 */
export interface UploadExpose {
}

/**
 * UploadInstance类型定义
 */
export type UploadInstance = ComponentPublicInstance<Upload, UploadProps, UploadExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
