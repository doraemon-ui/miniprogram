import type React from 'react'
import type {
  ListItemProps as NativeListItemProps,
  ListItemExpose as NativeListItemExpose,
  ListProps as NativeListProps,
  ListExpose as NativeListExpose,
} from '@doraemon-ui/miniprogram.list'

export interface ListProps extends NativeListProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

export type ListExpose = NativeListExpose

export interface ListItemProps extends NativeListItemProps {
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
  onClick?: (e: any) => void
  onGetUserInfo?: (e: any) => void
  onContact?: (e: any) => void
  onGetPhoneNumber?: (e: any) => void
  onLaunchApp?: (e: any) => void
  onChooseAvatar?: (e: any) => void
  onOpenSetting?: (e: any) => void
  onError?: (e: any) => void
}

export type ListItemExpose = NativeListItemExpose
