interface FrameDividersProps {
  slidesCount: number;
}

export const FrameDividers = ({ slidesCount }: FrameDividersProps) => {
  const dividers = []
  for (let i = 1; i < slidesCount; i++) {
    const percentage = (i / slidesCount) * 100
    dividers.push(
      <div
        key={i}
        className="absolute top-0 bottom-0 border-l-1 border-blue-500/70"
        style={{ left: `${percentage}%` }}
      />
    )
  }
  return <>{dividers}</>
} 