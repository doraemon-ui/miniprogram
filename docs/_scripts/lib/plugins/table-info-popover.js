(function () {
var activeTrigger = null

function ensureStyles() {
  if (document.getElementById('docsify-table-info-popover-style')) {
    return
  }

  var style = document.createElement('style')
  style.id = 'docsify-table-info-popover-style'
  style.textContent = [
    '.docsify-info-popover {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  cursor: help;',
    '}',
    '.docsify-info-popover__label {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  padding: 3px 10px;',
    '  border-radius: 999px;',
    '  border: 1px solid rgba(var(--theme-color-rgb), 0.18);',
    '  background: rgba(var(--theme-color-rgb), 0.08);',
    '  color: var(--theme-color);',
    '  font-size: 12px;',
    '  font-weight: 600;',
    '  line-height: 1.4;',
    '  white-space: nowrap;',
    '}',
    '.docsify-info-popover__label::before {',
    '  content: "i";',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 16px;',
    '  height: 16px;',
    '  margin-right: 6px;',
    '  border-radius: 50%;',
    '  background: var(--theme-color);',
    '  color: #fff;',
    '  font-size: 11px;',
    '  font-weight: 700;',
    '}',
    '.docsify-info-popover-layer {',
    '  position: fixed;',
    '  left: 0;',
    '  top: 0;',
    '  box-sizing: border-box;',
    '  display: flex;',
    '  flex-direction: column;',
    '  z-index: 2147483647;',
    '  min-width: 300px;',
    '  min-height: 320px;',
    '  max-width: min(560px, calc(100vw - 32px));',
    '  max-height: calc(100vh - 32px);',
    '  padding: 12px;',
    '  border: 1px solid var(--borderColor);',
    '  border-radius: 12px;',
    '  background: var(--background, #fff);',
    '  color: var(--textColor, #34495e);',
    '  box-shadow: var(--boxShadow, 0 12px 30px rgba(15, 23, 42, 0.16));',
    '  overflow: visible;',
    '  opacity: 0;',
    '  visibility: hidden;',
    '  pointer-events: none;',
    '  transform: translate3d(0, 8px, 0);',
    '  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;',
    '}',
    '.docsify-info-popover-layer.is-visible {',
    '  opacity: 1;',
    '  visibility: visible;',
    '  transform: translate3d(0, 0, 0);',
    '}',
    '.docsify-info-popover-layer__content {',
    '  box-sizing: border-box;',
    '  display: block;',
    '  width: 100%;',
    '  flex: 1 1 auto;',
    '  min-width: calc(300px - 24px);',
    '  min-height: calc(320px - 24px);',
    '  max-height: none;',
    '  overflow: visible;',
    '}',
    '.docsify-info-popover-layer__content.markdown-section {',
    '  max-width: none;',
    '  margin: 0;',
    '  padding: 0;',
    '}',
    '.docsify-info-popover-layer__content.markdown-section > :first-child {',
    '  margin-top: 0 !important;',
    '}',
    '.docsify-info-popover-layer__content.markdown-section > :last-child {',
    '  margin-bottom: 0 !important;',
    '}',
    '.docsify-info-popover-layer::after {',
    '  content: "";',
    '  position: absolute;',
    '  width: 12px;',
    '  height: 12px;',
    '  border-right: 1px solid var(--borderColor);',
    '  border-bottom: 1px solid var(--borderColor);',
    '  background: var(--background, #fff);',
    '  transform: rotate(45deg);',
    '}',
    '.docsify-info-popover-layer[data-placement="top"]::after {',
    '  left: var(--popover-arrow-left, 24px);',
    '  top: 100%;',
    '  margin-top: -6px;',
    '}',
    '.docsify-info-popover-layer[data-placement="bottom"]::after {',
    '  left: var(--popover-arrow-left, 24px);',
    '  bottom: 100%;',
    '  margin-bottom: -6px;',
    '  transform: rotate(225deg);',
    '}',
    '.docsify-info-popover-layer .markdown-section pre {',
    '  box-sizing: border-box;',
    '  margin: 0;',
    '  border-radius: 10px;',
    '  min-height: 0;',
    '  overflow: visible;',
    '}',
    '.docsify-info-popover-layer .markdown-section pre > code {',
    '  min-height: 0;',
    '}',
  ].join('\n')

  document.head.appendChild(style)
}

function ensureLayer() {
  ensureStyles()

  var layer = document.getElementById('docsify-info-popover-layer')
  if (layer) {
    return layer
  }

  layer = document.createElement('div')
  layer.id = 'docsify-info-popover-layer'
  layer.className = 'docsify-info-popover-layer'
  layer.setAttribute('role', 'tooltip')
  layer.setAttribute('aria-hidden', 'true')
  document.body.appendChild(layer)

  return layer
}

function stripInfoPrefix(root) {
  var markerPattern = /^info(?:\[([a-z0-9_-]+)\])?>/i
  var found = false
  var language = 'ts'

  function walk(node) {
    if (found || !node) {
      return
    }

    if (node.nodeType === Node.TEXT_NODE) {
      var value = node.nodeValue || ''
      var trimmed = value.replace(/^\s+/, '')
      var match = trimmed.match(markerPattern)

      if (match) {
        var leading = value.slice(0, value.length - trimmed.length)
        language = (match[1] || 'ts').toLowerCase()
        node.nodeValue = leading + trimmed.slice(match[0].length)
        found = true
      }

      return
    }

    var children = node.childNodes || []
    for (var i = 0; i < children.length; i += 1) {
      walk(children[i])
    }
  }

  walk(root)
  return found ? language : null
}

function getInfoContent(cell) {
  var text = (cell.textContent || '').trim()
  var markerPattern = /^info(?:\[([a-z0-9_-]+)\])?>/i

  if (!markerPattern.test(text)) {
    return null
  }

  var clone = cell.cloneNode(true)
  var language = stripInfoPrefix(clone)
  if (!language) {
    return null
  }

  var content = (clone.textContent || '').trim()
  return content
    ? {
        content: content,
        language: language,
      }
    : null
}

function formatObjectLiteral(value, indent) {
  var text = value.trim()

  if (!text) {
    return text
  }

  var result = ''
  var level = 0
  var inSingleQuote = false
  var inDoubleQuote = false

  function pad(currentLevel) {
    return new Array(currentLevel + 1).join(indent)
  }

  function trimTrailingSpaces(input) {
    return input.replace(/[ \t]+$/g, '')
  }

  for (var i = 0; i < text.length; i += 1) {
    var char = text.charAt(i)
    var prev = text.charAt(i - 1)

    if (char === "'" && !inDoubleQuote && prev !== '\\') {
      inSingleQuote = !inSingleQuote
      result += char
      continue
    }

    if (char === '"' && !inSingleQuote && prev !== '\\') {
      inDoubleQuote = !inDoubleQuote
      result += char
      continue
    }

    if (inSingleQuote || inDoubleQuote) {
      result += char
      continue
    }

    if (/\s/.test(char)) {
      continue
    }

    if (char === '{') {
      result += '{'
      if (text.charAt(i + 1) !== '}') {
        level += 1
        result += '\n' + pad(level)
      }
      continue
    }

    if (char === '}') {
      result = trimTrailingSpaces(result)
      if (result.charAt(result.length - 1) !== '{') {
        level = Math.max(level - 1, 0)
        if (result.charAt(result.length - 1) !== '\n') {
          result += '\n'
        }
        result += pad(level)
      }

      if (result.charAt(result.length - 1) === '{') {
        level = Math.max(level - 1, 0)
      }

      result += '}'
      continue
    }

    if (char === ',') {
      result = trimTrailingSpaces(result)
      result += ',\n' + pad(level)
      continue
    }

    if (char === ':') {
      result = trimTrailingSpaces(result)
      result += ': '
      continue
    }

    result += char
  }

  return result.trim()
}

function formatTagAttributes(content) {
  var match = content.match(/^<([a-z0-9-]+)\s+([\s\S]*?)\/>$/i)
  if (!match) {
    return content
  }

  var tagName = match[1]
  var attrsText = match[2]
  var attrs = []
  var i = 0

  while (i < attrsText.length) {
    while (i < attrsText.length && /\s/.test(attrsText.charAt(i))) {
      i += 1
    }

    if (i >= attrsText.length) {
      break
    }

    var nameStart = i
    while (i < attrsText.length && /[^\s=]/.test(attrsText.charAt(i))) {
      i += 1
    }
    var name = attrsText.slice(nameStart, i)

    while (i < attrsText.length && /\s/.test(attrsText.charAt(i))) {
      i += 1
    }

    if (attrsText.charAt(i) !== '=') {
      attrs.push({ name: name, value: '' })
      continue
    }

    i += 1

    while (i < attrsText.length && /\s/.test(attrsText.charAt(i))) {
      i += 1
    }

    var quote = attrsText.charAt(i)
    if (quote !== '"' && quote !== "'") {
      attrs.push({ name: name, value: '' })
      continue
    }

    i += 1
    var valueStart = i
    while (i < attrsText.length && attrsText.charAt(i) !== quote) {
      i += 1
    }
    var value = attrsText.slice(valueStart, i)
    i += 1

    attrs.push({ name: name, value: value })
  }

  if (!attrs.length) {
    return content
  }

  var lines = ['<' + tagName]

  attrs.forEach(function (attr) {
    var value = attr.value.trim()

    if (value.indexOf('{{') === 0 && value.lastIndexOf('}}') === value.length - 2) {
      var inner = value.slice(2, -2)
      var formatted = formatObjectLiteral(inner, '  ')
      lines.push('  ' + attr.name + '="{{')
      lines.push(
        formatted.split('\n').map(function (line) {
          return '    ' + line
        }).join('\n'),
      )
      lines.push('  }}"')
      return
    }

    lines.push('  ' + attr.name + '="' + value + '"')
  })

  lines.push('/>')
  return lines.join('\n')
}

function compileCodeBlock(content, language) {
  var compiler = window.__current_docsify_compiler__
  var markdown = ['```' + language, formatTagAttributes(content), '```'].join('\n')

  if (compiler && typeof compiler.compile === 'function') {
    return compiler.compile(markdown)
  }

  return null
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function getLayerContent(content, language) {
  var wrapper = document.createElement('div')
  var compiled = compileCodeBlock(content, language)

  wrapper.className = 'docsify-info-popover-layer__content markdown-section'

  if (compiled) {
    wrapper.innerHTML = compiled
    return wrapper
  }

  wrapper.innerHTML =
    '<pre data-lang="' +
    language +
    '"><code class="language-' +
    language +
    '">' +
    escapeHtml(formatTagAttributes(content)) +
    '</code></pre>'

  return wrapper
}

function positionLayer(trigger) {
  var layer = ensureLayer()
  var rect = trigger.getBoundingClientRect()
  var margin = 16
  var gap = 12
  var viewportWidth = window.innerWidth
  var viewportHeight = window.innerHeight
  var layerRect = layer.getBoundingClientRect()

  var left = rect.left + rect.width / 2 - layerRect.width / 2
  left = Math.max(margin, Math.min(left, viewportWidth - layerRect.width - margin))

  var top = rect.top - layerRect.height - gap
  var placement = 'top'

  if (top < margin) {
    placement = 'bottom'
    top = rect.bottom + gap
  }

  top = Math.max(margin, Math.min(top, viewportHeight - layerRect.height - margin))

  var arrowLeft = rect.left + rect.width / 2 - left - 6
  arrowLeft = Math.max(18, Math.min(arrowLeft, layerRect.width - 18))

  layer.style.left = left + 'px'
  layer.style.top = top + 'px'
  layer.style.setProperty('--popover-arrow-left', arrowLeft + 'px')
  layer.setAttribute('data-placement', placement)
}

function showLayer(trigger) {
  var info = trigger.__infoContent
  if (!info) {
    return
  }

  var layer = ensureLayer()
  layer.innerHTML = ''
  layer.appendChild(getLayerContent(info.content, info.language))
  if (!window.__current_docsify_compiler__ && window.Prism && typeof window.Prism.highlightElement === 'function') {
    var code = layer.querySelector('code')
    if (code) {
      window.Prism.highlightElement(code)
    }
  }
  layer.classList.add('is-visible')
  layer.setAttribute('aria-hidden', 'false')
  activeTrigger = trigger
  positionLayer(trigger)
}

function hideLayer(trigger) {
  if (trigger && activeTrigger !== trigger) {
    return
  }

  var layer = ensureLayer()
  layer.classList.remove('is-visible')
  layer.setAttribute('aria-hidden', 'true')
  activeTrigger = null
}

function bindTrigger(trigger) {
  if (trigger.__infoBound) {
    return
  }

  trigger.__infoBound = true
  trigger.addEventListener('mouseenter', function () {
    showLayer(trigger)
  })
  trigger.addEventListener('mouseleave', function () {
    hideLayer(trigger)
  })
  trigger.addEventListener('focus', function () {
    showLayer(trigger)
  })
  trigger.addEventListener('blur', function () {
    hideLayer(trigger)
  })
}

function createPopover(cell, info) {
  var trigger = document.createElement('span')
  trigger.className = 'docsify-info-popover'
  trigger.tabIndex = 0
  trigger.setAttribute('aria-label', 'Show info content')
  trigger.__infoContent = info

  var label = document.createElement('span')
  label.className = 'docsify-info-popover__label'
  label.textContent = 'use info'

  trigger.appendChild(label)
  bindTrigger(trigger)

  cell.innerHTML = ''
  cell.appendChild(trigger)
  cell.setAttribute('data-info-popover', 'true')
}

function renderTableInfoPopover() {
  ensureLayer()

  var cells = document.querySelectorAll('.markdown-section table td')

  Array.prototype.forEach.call(cells, function (cell) {
    if (cell.getAttribute('data-info-popover') === 'true') {
      return
    }

    var info = getInfoContent(cell)
    if (!info) {
      return
    }

    createPopover(cell, info)
  })
}

function syncLayerPosition() {
  if (activeTrigger) {
    positionLayer(activeTrigger)
  }
}

var install = function (hook) {
  hook.doneEach(function () {
    hideLayer()
    renderTableInfoPopover()
    syncLayerPosition()
  })
}

window.addEventListener('scroll', syncLayerPosition, true)
window.addEventListener('resize', syncLayerPosition)

window.$docsify.plugins = [].concat(install, window.$docsify.plugins)
})()
