// Home page: footer section.
import { useHomeButtonIds } from "../button-ids.ts";

export default function Finale() {
  const ids = useHomeButtonIds();
  return (
    <section className="finale" id="footer">
      <section className="footer-cta footer-world" aria-labelledby="footer-heading">
        <header>
          <span className="footer-eyebrow">EVERY GREAT WORLD STARTS SOMEWHERE.</span>
          <h2 id="footer-heading">
            What will
            <br />
            you open?
          </h2>
          <div className="footer-cta-actions">
            <a className="button action" href="/studio" id={ids.closingTryItFree}>
              <span>Try it free</span>
            </a>
            <a className="under-link" href="/pricing" id={ids.closingSeePricing}>
              See pricing
            </a>
          </div>
        </header>
        <figure className="footer-landscape footer-film" data-film="">
          <video
            muted
            loop
            playsInline
            preload="none"
            poster="/media/verse-film-poster.webp"
            width="1920"
            height="1080"
            aria-label="Verse Engine launch film (no sound): the 10-billion-triangle city of Lyon, opened in a browser"
          >
            <source src="/media/verse-film-720.mp4" type="video/mp4" media="(max-width: 800px)" />
            <source src="/media/verse-film-1080.mp4" type="video/mp4" />
          </video>
          <button type="button" className="film-toggle" data-film-play="" aria-label="Play the film">
            <span className="film-icon" aria-hidden="true">
              <svg className="film-icon-play" viewBox="0 0 24 24">
                <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
              </svg>
              <svg className="film-icon-pause" viewBox="0 0 24 24">
                <path d="M7 5h3.5v14H7ZM13.5 5H17v14h-3.5Z" fill="currentColor" />
              </svg>
            </span>
          </button>
        </figure>
        <p className="footer-scene-caption">Lyon · 10.3 billion triangles · one link</p>
      </section>
    </section>
  );
}
