export type MarkdownBlock =
  | {
      type: 'heading'
      level: 1 | 2 | 3
      text: string
    }
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'list'
      items: string[]
    }
  | {
      type: 'code'
      language: string
      text: string
    }

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = []
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  let index = 0

  while (index < lines.length) {
    const line = lines[index]?.trimEnd() ?? ''

    if (line.trim() === '') {
      index += 1
      continue
    }

    if (line.startsWith('```')) {
      const language = line.slice(3).trim()
      const codeLines: string[] = []
      index += 1

      while (index < lines.length && !lines[index]?.startsWith('```')) {
        codeLines.push(lines[index] ?? '')
        index += 1
      }

      blocks.push({
        type: 'code',
        language,
        text: codeLines.join('\n').trimEnd(),
      })
      index += 1
      continue
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(line)
    if (heading?.[1] && heading[2]) {
      blocks.push({
        type: 'heading',
        level: heading[1].length as 1 | 2 | 3,
        text: heading[2],
      })
      index += 1
      continue
    }

    if (/^(- |\d+\. )/.test(line.trim())) {
      const items: string[] = []

      while (
        index < lines.length &&
        /^(- |\d+\. )/.test((lines[index] ?? '').trim())
      ) {
        items.push((lines[index] ?? '').trim().replace(/^(- |\d+\. )/, ''))
        index += 1
      }

      blocks.push({ type: 'list', items })
      continue
    }

    const paragraphLines: string[] = []
    while (index < lines.length) {
      const currentLine = lines[index]?.trimEnd() ?? ''
      const startsNewBlock =
        currentLine.trim() === '' ||
        currentLine.startsWith('```') ||
        /^(#{1,3})\s+/.test(currentLine) ||
        /^(- |\d+\. )/.test(currentLine.trim())

      if (startsNewBlock) {
        break
      }

      paragraphLines.push(currentLine.trim())
      index += 1
    }

    blocks.push({
      type: 'paragraph',
      text: paragraphLines.join(' '),
    })
  }

  return blocks
}
