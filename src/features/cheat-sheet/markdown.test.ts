import { describe, expect, it } from 'vitest'
import { parseMarkdownBlocks } from './markdown'

describe('cheat-sheet markdown parsing', () => {
  it('keeps headings, paragraphs, lists, and fenced code blocks renderable', () => {
    const blocks = parseMarkdownBlocks(`# Title

Intro paragraph.

- first item
- second item

\`\`\`txt
pnpm dev
\`\`\`
`)

    expect(blocks).toEqual([
      { type: 'heading', level: 1, text: 'Title' },
      { type: 'paragraph', text: 'Intro paragraph.' },
      { type: 'list', items: ['first item', 'second item'] },
      { type: 'code', language: 'txt', text: 'pnpm dev' },
    ])
  })
})
