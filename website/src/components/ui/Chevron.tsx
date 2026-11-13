/** The down chevron of the navigation groups (header dropdown and mobile menu). */
export default function Chevron({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
      <path d="m5 9 7 7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
