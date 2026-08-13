export function ProgressBar({ current, total }: { current: number; total: number }) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="text-ink-400 mb-2 flex items-center justify-between text-xs font-semibold tracking-wide">
        <span>
          Step {current} of {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}`}
        className="bg-cream-300/70 h-1.5 w-full overflow-hidden rounded-full"
      >
        <div
          className="h-full rounded-full bg-teal-700 transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
