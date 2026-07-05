import { useFlight } from '../context/flightContext'

interface FragmentSpanProps {
  id: string
  text: string
  revealed: boolean
}

// The words are always in the DOM; a soft light-mask sits over them and
// dissolves away once the butterfly carrying this phrase has been caught.
export function FragmentSpan({ id, text, revealed }: FragmentSpanProps) {
  const { registerFragmentEl } = useFlight()

  return (
    <span className={`fragment ${revealed ? 'fragment--revealed' : ''}`}>
      <span className="fragment-text" ref={(el) => registerFragmentEl(id, el)}>
        {text}
      </span>
      <span className="fragment-mask" aria-hidden="true" />
    </span>
  )
}
