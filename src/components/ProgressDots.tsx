interface ProgressDotsProps {
  total: number
  caught: number
}

export function ProgressDots({ total, caught }: ProgressDotsProps) {
  return (
    <div className="progress-dots" role="status" aria-label={`${caught} of ${total} caught`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`progress-dot ${i < caught ? 'progress-dot--filled' : ''}`} />
      ))}
    </div>
  )
}
