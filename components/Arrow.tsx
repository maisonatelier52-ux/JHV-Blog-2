export default function Arrow({ back = false, className = "" }: { back?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 20"
      fill="none"
      className={`h-5 shrink-0 ${back ? "rotate-180" : ""} ${className}`}
    >
      <path d="M1 10h76M68 2l10 8-10 8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
