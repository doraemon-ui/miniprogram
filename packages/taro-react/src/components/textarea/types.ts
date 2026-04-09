import type { TextareaProps as NativeTextareaProps, TextareaExpose as NativeTextareaExpose } from '@doraemon-ui/miniprogram.textarea'
import type { BasicComponent } from '@/types'

export interface TextareaProps extends NativeTextareaProps, BasicComponent {}

export interface TextareaExpose extends NativeTextareaExpose {}
