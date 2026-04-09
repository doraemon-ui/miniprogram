import { createHostComponent } from '@/hooks/hostComponent'
import type { SkeletonParagraphProps, SkeletonParagraphExpose } from './types'

export const SkeletonParagraph = createHostComponent<SkeletonParagraphProps, SkeletonParagraphExpose>('dora-skeleton-paragraph')

SkeletonParagraph.displayName = 'DoraSkeletonParagraph'
