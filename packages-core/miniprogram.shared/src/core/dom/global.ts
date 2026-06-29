function check(it: any) {
  return it && typeof it.env && it
}

export const miniprogramThis = check(typeof wx === 'object' && wx) || check(typeof tt === 'object' && tt)
