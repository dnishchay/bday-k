import { useCarrier } from '../context/carrierContext'

interface FragmentSpanProps {
  id: string
  text: string
}

// The words are always in the DOM; a soft light-mask sits over them and
// dissolves away once the butterfly carrying this phrase has settled in.
export function FragmentSpan({ id, text }: FragmentSpanProps) {
  const { registerFragmentEl, revealedIds } = useCarrier()
  const revealed = revealedIds.has(id)

  return (
    <span className={`fragment ${revealed ? 'fragment--revealed' : ''}`}>
      <span className="fragment-text" ref={(el) => registerFragmentEl(id, el)}>
        {text}
      </span>
      <span className="fragment-mask" aria-hidden="true" />
    </span>
  )
}
