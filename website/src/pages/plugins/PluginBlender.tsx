// Blender plug-in page (/plugins/blender).
import PluginGuide from "./PluginGuide.tsx";

export default function PluginBlender() {
  return (
    <PluginGuide
      editor="blender"
      steps={[
        <>
          {"Download the zip — don't unzip it."}
          <span>One file; Blender installs it as it is.</span>
        </>,
        <>
          <b>Edit › Preferences › Get Extensions</b>
          {", open the "}
          <b>⌄</b>
          {" menu, choose "}
          <b>Install from Disk…</b>
          {" and pick the zip (or drag it onto Blender)."}
          <span>{'"Verse Publish" is listed and enabled — no restart.'}</span>
        </>,
        <>
          {"Optional: paste an account token from "}
          <a href="/studio" id="lnk-studio">
            Studio
          </a>
          {" in "}
          <b>Preferences › Add-ons › Verse Publish</b>.<span>Your scenes become permanent and are listed in your library.</span>
        </>,
        <>
          {"Press "}
          <b>N</b>
          {" in the 3D viewport, open the "}
          <b>Verse</b>
          {" tab and click "}
          <b>Publish scene</b>.<span>Export, optimise, upload, build — then the link is on your clipboard.</span>
        </>,
      ]}
      published={[
        "The scene (or the selected objects), modifiers applied",
        "Node materials — and at High your lighting — baked on publish",
        "Textures at source resolution, right-sized to what the scene can show",
      ]}
    />
  );
}
