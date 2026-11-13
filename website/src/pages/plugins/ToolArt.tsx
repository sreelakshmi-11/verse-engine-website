import { pluginMeshes } from "../../data/plugins.ts";
import type { Editor } from "../../data/plugins.ts";

/** An editor's line drawing; `id` names its <g> (each copy on a page needs its own). */
export default function ToolArt({ editor, id }: { editor: Editor; id: string }) {
  const mesh = pluginMeshes[editor.id];
  return (
    <svg className="tool-art" viewBox="22 -34 235 186" role="img" aria-label={editor.artLabel}>
      <defs>
        <g id={id} fill="none" stroke="currentColor" strokeWidth={mesh.strokeWidth} strokeLinejoin="round">
          {mesh.paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </defs>
      <use href={"#" + id} />
    </svg>
  );
}
