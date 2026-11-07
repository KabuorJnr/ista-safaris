// Small custom icons that match the design where the icon set differs.
type P = { size?: number; className?: string }
export const RouteIcon = ({ size = 24, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="5.5" cy="18" r="2.2" /><circle cx="18.5" cy="6" r="2.2" />
    <path d="M7.7 18H10a2 2 0 0 0 2-2V8a2 2 0 0 1 2-2h2.3" />
  </svg>
)
export const SparkIcon = ({ size = 24, className }: P) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round" aria-hidden="true">
    <path d="M10 2.8c.5 3.9 2.3 5.7 6.2 6.2-3.9.5-5.7 2.3-6.2 6.2-.5-3.9-2.3-5.7-6.2-6.2 3.9-.5 5.7-2.3 6.2-6.2Z" />
    <path d="M18 14.2c.25 2 1.2 2.95 3.2 3.2-2 .25-2.95 1.2-3.2 3.2-.25-2-1.2-2.95-3.2-3.2 2-.25 2.95-1.2 3.2-3.2Z" />
  </svg>
)
export const ThinArrow = ({ className }: { className?: string }) => (
  <svg className={"thin-arrow" + (className ? " " + className : "")} width="14" height="10" viewBox="0 0 17 10" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 5h15M12 1l4 4-4 4" />
  </svg>
)
