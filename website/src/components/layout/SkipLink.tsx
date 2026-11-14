// "Skip to content" link (hidden on app routes).
export default function SkipLink({ hidden }: { hidden: boolean }) {
  return (
    <a className="skip" href="#app-main" hidden={hidden}>
      {"Skip to content"}
    </a>
  );
}
