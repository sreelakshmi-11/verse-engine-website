// Page not found (/404, and any unknown address).
import SiteButton from "../components/ui/SiteButton.tsx";

export default function NotFound() {
  return (
    <>
      <p className="eyebrow">404 / OUTSIDE THE FRAME</p>
      <h1>
        This scene
        <br />
        has moved on.
      </h1>
      <p>There’s a whole world waiting at the beginning.</p>
      <SiteButton arrow href="/">
        Return to Verse Engine
      </SiteButton>
    </>
  );
}
