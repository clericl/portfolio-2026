import { BloomEffect, BlendFunction } from 'postprocessing'
import { wrapEffect } from './wrap-effect'

export const Bloom = wrapEffect(BloomEffect, {
  blendFunction: BlendFunction.ADD,
})
