export function transformTemplateAttributes(content: string, prefix: string) {
  return content.replace(/(^|[\s<])wx:(for(?:-item|-index)?|for|key|if|elif|else)(?=[\s=>])/g, `$1${prefix}:$2`)
}
