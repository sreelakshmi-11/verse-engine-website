// Home page: old-way section.
import { raceHeading, raceLanes, raceMatrix } from "../data.ts";
import { SectionHead } from "../parts.tsx";

export default function OldWay() {
  return (
    <section className="mx-race section-pad" id="old-way" aria-labelledby="race-heading">
      <SectionHead heading={raceHeading} />
      <div className="mx-race-board" data-race="">
        {raceLanes.map((lane) => (
          <div key={lane.className} className={`mx-lane ${lane.className}`}>
            <div className="mx-lane-head">
              <strong>{lane.title}</strong>
              <span {...{ [lane.statusAttr]: "" }}>Waiting to start</span>
            </div>
            <ol>
              {lane.steps.map((s) => (
                <li key={s.label}>
                  <b>{s.label}</b>
                  <i>{s.cost}</i>
                </li>
              ))}
            </ol>
            <div className="mx-lane-bar">
              <i />
            </div>
          </div>
        ))}
        <button className="mx-race-replay" type="button" data-race-replay="" id="btn-race-replay">
          ↻ Run it again
        </button>
      </div>
      <div className="mx-matrix-box">
        <table className="mx-matrix">
          <thead>
            <tr>
              <th scope="col" />
              {raceMatrix.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
              <th scope="col" className="us">
                {raceMatrix.verse}
              </th>
            </tr>
          </thead>
          <tbody>
            {raceMatrix.rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.cells.map(([text, mark], i) => (
                  <td key={i} className={mark}>
                    {text}
                  </td>
                ))}
                <td className="us">{row.verse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
