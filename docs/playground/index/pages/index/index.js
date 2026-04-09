const NAMES = [
  'Aaron',
  'Alden',
  'Austin',
  'Baldwin',
  'Braden',
  'Carl',
  'Chandler',
  'Clyde',
  'David',
  'Edgar',
  'Elton',
  'Floyd',
  'Freeman',
  'Gavin',
  'Hector',
  'Henry',
  'Ian',
  'Jason',
  'Joshua',
  'Kane',
  'Lambert',
  'Matthew',
  'Morgan',
  'Neville',
  'Oliver',
  'Oscar',
  'Perry',
  'Quinn',
  'Ramsey',
  'Scott',
  'Seth',
  'Spencer',
  'Timothy',
  'Todd',
  'Trevor',
  'Udolf',
  'Victor',
  'Vincent',
  'Walton',
  'Willis',
  'Xavier',
  'Yvonne',
  'Zack',
  'Zane',
]

Page({
  data: {
    alphabet: [],
    indicatorPosition: 'center',
  },
  onLoad() {
    const alphabet = []
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach((initial) => {
      const cells = NAMES.filter((name) => name.charAt(0) === initial)
      alphabet.push({
        initial,
        cells,
      })
    })
    this.setData({ alphabet })
  },
  onChange(e) {
    console.log('onChange', e.detail)
  },
  setIndicator() {
    this.setData({
      indicatorPosition: this.data.indicatorPosition === 'center' ? 'right' : 'center',
    })
  },
  scrollToH() {
    const index = this.data.alphabet.findIndex((v) => v.initial === 'H')
    const comp = this.selectComponent('#dora-index')
    if (comp && typeof comp.scrollTo === 'function') {
      comp.scrollTo(index)
    }
  },
  scrollToZ() {
    const comp = this.selectComponent('#dora-index')
    if (comp && typeof comp.scrollTo === 'function') {
      comp.scrollTo('Z')
    }
  },
})
