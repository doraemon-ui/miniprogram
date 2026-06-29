export interface PlatformAdapter {
  id: string

  markupExt: string

  styleExt: string

  runtimeStyleImport: string

  jsonUsingComponentsPrefix: string

  templateAttributePrefix: string

  resolvePackageName(pkgName: string): string

  transformTemplate(content: string): string

  transformStyle(content: string): string

  transformJson(json: Record<string, any>): Record<string, any>

  transformPackageJson(pkg: Record<string, any>, ctx: PlatformBuildContext): Record<string, any>
}

export interface PlatformBuildContext {
  componentName: string
  exports?: Record<string, string>
}
