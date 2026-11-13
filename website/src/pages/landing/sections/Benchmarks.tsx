// Home page: benchmarks section.
import { benchHeading, benchEngines, benchMeasures, benchTable } from "../data.ts";
import { SectionHead, tab } from "../parts.tsx";

export default function Benchmarks() {
  const firstMeasure = benchMeasures[0];
  return (
    <section className="mx-bench section-pad" id="benchmarks" aria-labelledby="bench-heading">
      <SectionHead heading={benchHeading} />
      <div className="mx-bench-board" data-bench="">
        <div className="mx-bench-tabs" role="tablist" aria-label="Benchmark measures">
          {benchMeasures.map((m, i) => (
            <button key={m.tab} id={m.id} {...tab(i)} data-m={i}>
              {m.tab}
            </button>
          ))}
        </div>
        <div className="mx-bench-chart">
          <p className="mx-bench-q" data-bench-q="">
            {firstMeasure.question}
          </p>
          <div className="mx-bars" data-bars="">
            {benchEngines.map((name, i) => (
              <div key={name} className={i === 0 ? "mx-bar us" : "mx-bar"}>
                <span className="mx-bar-name">{name}</span>
                <div className="mx-bar-track">
                  <i />
                </div>
                <b>{firstMeasure.rows[i]?.[2]}</b>
              </div>
            ))}
          </div>
          <p className="mx-bench-verdict" data-bench-verdict="">
            <strong>{firstMeasure.verdict.strong}</strong>
            {firstMeasure.verdict.text}
          </p>
        </div>
      </div>
      <details className="mx-bench-table">
        <summary>See the full table</summary>
        <div className="mx-table-box">
          <table>
            <thead>
              <tr>
                <th scope="col">Measure</th>
                {benchEngines.map((name, i) => (
                  <th key={name} scope="col" className={i === 0 ? "us" : undefined}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benchTable.map((row) => (
                <tr key={row.measure}>
                  <th scope="row">{row.measure}</th>
                  {row.cells.map((cell, i) => (
                    <td key={i} className={i === 0 ? "us" : i === row.win ? "win" : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <p className="mx-credit">
        Apple M5 Pro, Chrome, served from a CDN, 4–5 November 2026. CesiumJS 1.146 ran the city's own published 3D Tiles, its strongest setup. Google's tiles
        are Google's own capture of Lyon. On Windows with an RTX 5060, Verse ran Lyon at about 45–60 fps.
      </p>
    </section>
  );
}
