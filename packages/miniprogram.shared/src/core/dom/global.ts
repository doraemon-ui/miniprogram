const check =  (it: WechatMiniprogram.Wx) => {
  return it && typeof it.env && it
}

export const miniprogramThis = check(typeof wx === 'object' && wx)