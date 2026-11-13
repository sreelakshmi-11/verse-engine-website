// Home page: create section.
import { createHeading, createRoutes } from "../data.ts";
import { SectionHead, tab } from "../parts.tsx";

export default function WaysToCreate() {
  const firstRoute = createRoutes[0];
  return (
    <section className="mx-create section-pad" id="create" aria-labelledby="create-heading">
      <SectionHead heading={createHeading} />
      <div className="mx-create-body" data-create="">
        <div className="mx-create-list" role="tablist" aria-label="Ways to create">
          {createRoutes.map((r, i) => (
            <button key={r.title} id={r.id} {...tab(i)} data-route={i}>
              <span className={`mx-badge ${r.badge.className}`}>{r.badge.label}</span>
              <strong>{r.title}</strong>
              <small>{r.text}</small>
              <i />
            </button>
          ))}
        </div>
        <figure className="mx-create-stage">
          {createRoutes.map(({ image }, i) => (
            <img
              key={image.src}
              className={i === 0 ? "on" : undefined}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading={i === 0 ? undefined : "lazy"}
            />
          ))}
          <figcaption>
            <span className="mx-route-in" data-route-in="">
              {firstRoute.input}
            </span>
            <span className="mx-route-arrow">→</span>
            <span className="mx-route-out" data-route-out="">
              {firstRoute.output}
            </span>
          </figcaption>
          <span className="mx-route-tag" data-route-tag="">
            {firstRoute.tag}
          </span>
        </figure>
      </div>
    </section>
  );
}
