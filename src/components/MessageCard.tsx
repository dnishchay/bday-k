import { FragmentSpan } from './FragmentSpan'
import type { Fragment } from '../types'

interface MessageCardProps {
  fragments: Fragment[]
  caughtIds: Set<string>
}

export function MessageCard({ fragments, caughtIds }: MessageCardProps) {
  const paragraphCount = Math.max(...fragments.map((f) => f.paragraph)) + 1
  const paragraphs = Array.from({ length: paragraphCount }, (_, p) =>
    fragments.filter((f) => f.paragraph === p),
  )

  return (
    <div className="message-card">
      {paragraphs.map((paragraphFragments, p) => (
        <p className="message-paragraph" key={p}>
          {paragraphFragments.map((fragment, i) => (
            <span key={fragment.id}>
              <FragmentSpan id={fragment.id} text={fragment.text} revealed={caughtIds.has(fragment.id)} />
              {i < paragraphFragments.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>
      ))}
    </div>
  )
}
