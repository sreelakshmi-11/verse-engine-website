// Unity plug-in page (/plugins/unity).
import PluginGuide from "./PluginGuide.tsx";

export default function PluginUnity() {
  return (
    <PluginGuide
      editor="unity"
      steps={[
        <>
          {"Download the "}
          <code>.tgz</code>
          {" and keep it somewhere stable — your project's "}
          <code>Packages/</code>
          {" folder is ideal."}
          <span>Unity references the file by path.</span>
        </>,
        <>
          <b>Window › Package Manager › + › Add package from tarball…</b>
          {" and pick it."}
          <span>The install finishes with no console errors.</span>
        </>,
        <>
          {"Open "}
          <b>Tools › Verse › Publish Scene</b>
          {"; optionally paste an account token from "}
          <a href="/studio" id="lnk-studio">
            Studio
          </a>
          .<span>The window remembers it.</span>
        </>,
        <>
          {"Press "}
          <b>Publish scene</b>.<span>Upload %, then the build stages, then the link — copied for you.</span>
        </>,
      ]}
      published={[
        "The open scene (or the selection) as one scene",
        "Lighting baked on publish; the skybox as the background",
        "Terrain as tile meshes, LOD0 of every LOD group",
        "Textures at source resolution — nothing downscaled",
      ]}
    />
  );
}
