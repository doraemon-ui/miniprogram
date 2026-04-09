import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { Skeleton } from './skeleton'
import type { SkeletonProps, SkeletonExpose } from './types'
import SkeletonAvatar from '../skeleton-avatar'
import SkeletonParagraph from '../skeleton-paragraph'

export type { SkeletonProps, SkeletonExpose }

type CompoundedComponent = ForwardRefExoticComponent<SkeletonProps & RefAttributes<SkeletonExpose>> & {
  Avatar: typeof SkeletonAvatar
  Paragraph: typeof SkeletonParagraph
}

const InnerSkeleton = Skeleton as CompoundedComponent

InnerSkeleton.Avatar = SkeletonAvatar
InnerSkeleton.Paragraph = SkeletonParagraph

export default InnerSkeleton
