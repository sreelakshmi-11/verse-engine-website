// Home page: possibilities section.
import { galleryCards } from "../data.ts";
import { Lines } from "../parts.tsx";
import { stepNumber } from "../../../utils/format.ts";

export default function Gallery() {
  return (
    <section className="possibility-gallery" id="possibilities" aria-labelledby="gallery-heading">
      <div className="gallery-stage">
        <header className="gallery-heading" id="hdr-gallery-heading">
          <div>
            <span className="section-number">USE CASES / OPEN POSSIBILITIES</span>
            <h2 id="gallery-heading">
              Made for the people who
              <br />
              {"build "}
              <span>what comes next.</span>
            </h2>
          </div>
          <p>
            The same scene serves a buyer, a client, a shopper,
            <br />a player or an AI agent.
          </p>
        </header>
        <div className="gallery-viewport">
          <div className="gallery-track" id="gallery-track">
            {galleryCards.map((card, i) => (
              <a
                key={card.id}
                className={card.long ? "possibility-card long-title" : "possibility-card"}
                href={card.href}
                data-gallery-index={i}
                aria-label={card.label}
                id={card.id}
                aria-current={i === 0 ? "true" : undefined}
              >
                <div className="gallery-picture">
                  <img alt={card.alt} width="720" height="450" loading="lazy" src={card.image} />
                  <span className="gallery-scrim" />
                </div>
                <span className="gallery-card-index">{stepNumber(i)}</span>
                <h3>
                  <Lines lines={card.title} />
                </h3>
                <div className="gallery-card-bottom">
                  <span>REAL VERSE SAMPLE</span>
                  <strong>{card.label}</strong>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="gallery-controls">
          <span className="gallery-instruction">SCROLL TO EXPLORE</span>
          <div className="gallery-pagination">
            <span id="gallery-current" aria-live="polite">
              01
            </span>
            <span>{`/ ${stepNumber(galleryCards.length - 1)}`}</span>
            <div className="gallery-progress">
              <i />
            </div>
          </div>
          <div className="gallery-arrows">
            <button data-gallery-prev="" aria-label="Previous possibility" id="btn-previous-possibility" disabled>
              ←
            </button>
            <button data-gallery-next="" aria-label="Next possibility" id="btn-next-possibility">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
