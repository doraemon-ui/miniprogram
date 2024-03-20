import fs from 'fs'
import path from 'path'
import less from 'less'
import { JSDOM } from 'jsdom'


describe('Style', () => {
  let window: Window = null
  let document: Document = null
  beforeAll((done) => {
    const stylStr = fs.readFileSync(path.resolve(__dirname, '../miniprogram_dist/var.wxss')).toString()
    less.render(stylStr.replace(/page/gi, '.page'), (error, cssStr) => {
      if (error) {
        throw error
      }
      window = new JSDOM(`<!DOCTYPE html>
        <head>
          <style>${cssStr.css}</style>
        </head>
        <body>
          <div class="page">Style</div>
        </body>
      `).window
      document = window.document
      done()
    })
  })

  test('mount correctly', () => {
    compare('page', {
      'font-family': 'var(--dora-font-family)',
    })
  })

  function compare (className = '', targetCss = {}, tagName = 'div') {
    const element = document.createElement(tagName)
    element.className = className
    const style = window.getComputedStyle(element)
    Object.keys(targetCss).forEach(prop => {
      expect(style[prop]).toEqual(targetCss[prop])
    })
  }
})
