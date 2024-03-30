declare module 'react-style-object-to-css' {
  export default function styleToCssString (rules: Record<string, any>): string
}

declare module 'react-style-object-to-css/lib/CSSProperty' {
  const CSSProperty: {
    isUnitlessNumber: Record<string, boolean>
    shorthandPropertyExpansions: Record<string, Record<string, boolean>>
  }
  export default CSSProperty
}

declare module 'react-style-object-to-css/lib/hyphenateStyleName' {
  export default function hyphenateStyleName(string: string): string
}
