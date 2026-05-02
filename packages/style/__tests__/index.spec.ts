import fs from 'fs'
import path from 'path'
import less from 'less'
import { JSDOM } from 'jsdom'
import type { DOMWindow } from 'jsdom'

const pkgRoot = path.resolve(__dirname, '..')

function readWxssFiles(relativePaths: string[]): string {
  return relativePaths.map((rel) => fs.readFileSync(path.join(pkgRoot, rel), 'utf8')).join('\n')
}

/** 将小程序 page 选择器替换为可被浏览器/JSDOM 匹配的类选择器 */
function wxssToBrowserCss(raw: string): string {
  return raw.replace(/page/gi, '.page')
}

async function mountStyles(relativePaths: string[], bodyHtml: string): Promise<{ window: DOMWindow; document: Document }> {
  const raw = readWxssFiles(relativePaths)
  const { css } = await less.render(wxssToBrowserCss(raw), { filename: 'bundle.wxss' })
  const dom = new JSDOM(
    `<!DOCTYPE html>
    <html>
      <head><style>${css}</style></head>
      <body>${bodyHtml}</body>
    </html>`,
    { url: 'https://jest.test/' },
  )
  return { window: dom.window, document: dom.window.document }
}

describe('Style', () => {
  describe('var.wxss', () => {
    let window: DOMWindow
    let document: Document

    beforeAll(async () => {
      const mounted = await mountStyles(['miniprogram_dist/var.wxss'], '<div class="page"><span id="t">Style</span></div>')
      window = mounted.window
      document = mounted.document
    })

    test('page root chains font tokens (--dora-font-family → --dora-default-font)', () => {
      const root = document.querySelector('.page') as HTMLElement
      const cs = window.getComputedStyle(root)
      expect(cs.getPropertyValue('--dora-font-family').trim()).toBe('var(--dora-default-font)')
      expect(cs.getPropertyValue('--dora-default-font').trim()).toMatch(/-apple-system-font|Helvetica Neue|PingFang SC/)
    })

    test('light theme text color variable on page', () => {
      const root = document.querySelector('.page') as HTMLElement
      expect(window.getComputedStyle(root).getPropertyValue('--dora-text-color').trim()).toBe('#000')
    })

    test('light theme background variable on page', () => {
      const root = document.querySelector('.page') as HTMLElement
      expect(window.getComputedStyle(root).getPropertyValue('--dora-background-color').trim()).toBe('#fafafa')
    })

    test('page uses var() for font and background (JSDOM may not resolve nested variables to RGB)', () => {
      const root = document.querySelector('.page') as HTMLElement
      const style = window.getComputedStyle(root)
      expect(style.fontFamily).toContain('var(')
      expect(style.background).toMatch(/var\(--dora-background-color\)/)
    })

    test('semantic palette variables are defined', () => {
      const root = document.querySelector('.page') as HTMLElement
      const cs = window.getComputedStyle(root)
      expect(cs.getPropertyValue('--dora-color-positive').trim()).toBe('#3880ff')
      expect(cs.getPropertyValue('--dora-color-stable').trim()).toBe('#92949c')
    })
  })

  describe('color.wxss', () => {
    let window: DOMWindow
    let document: Document

    beforeAll(async () => {
      const mounted = await mountStyles(
        ['miniprogram_dist/var.wxss', 'miniprogram_dist/color.wxss'],
        `<div class="page">
          <div id="positive" class="dora-color--positive"></div>
          <div id="stable" class="dora-color--stable"></div>
          <div id="dark" class="dora-color--dark"></div>
        </div>`,
      )
      window = mounted.window
      document = mounted.document
    })

    test('utility classes map theme tokens to --dora-color-* on element', () => {
      const positive = document.getElementById('positive') as HTMLElement
      const stable = document.getElementById('stable') as HTMLElement
      const dark = document.getElementById('dark') as HTMLElement

      const p = window.getComputedStyle(positive)
      expect(p.getPropertyValue('--dora-color-base').trim()).toContain('#3880ff')
      expect(p.getPropertyValue('--dora-color-contrast').trim()).toContain('#fff')

      const s = window.getComputedStyle(stable)
      expect(s.getPropertyValue('--dora-color-base').trim()).toContain('#92949c')

      const d = window.getComputedStyle(dark)
      expect(d.getPropertyValue('--dora-color-base').trim()).toContain('#222428')
    })
  })

  describe('build artifacts', () => {
    test('var.wxss and color.wxss parse as valid LESS/CSS', async () => {
      const varCss = wxssToBrowserCss(readWxssFiles(['miniprogram_dist/var.wxss']))
      const colorCss = readWxssFiles(['miniprogram_dist/color.wxss'])

      await expect(less.render(varCss, { filename: 'var.wxss' })).resolves.toMatchObject({
        css: expect.stringContaining('--dora-font-family'),
      })
      await expect(less.render(colorCss, { filename: 'color.wxss' })).resolves.toMatchObject({
        css: expect.stringContaining('.dora-color--light'),
      })
    })
  })
})
