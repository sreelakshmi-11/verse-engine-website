// Unreal Engine plug-in page (/plugins/unreal).
import PluginGuide from "./PluginGuide.tsx";

export default function PluginUnreal() {
  return (
    <PluginGuide
      editor="unreal"
      steps={[
        <>
          {"Close the editor and unzip into your project, so you have "}
          <code>{"<Project>/Plugins/VersePublish/VersePublish.uplugin"}</code>.<span>The Plugins folder sits next to your .uproject.</span>
        </>,
        <>
          Open the project and accept the prompt to rebuild the module.
          <span>A Tools › Verse menu appears.</span>
        </>,
        <>
          {"Optional: paste an account token from "}
          <a href="/studio">Studio</a>
          {" in "}
          <b>Project Settings › Plugins › Verse Publish</b>.<span>Your scenes become permanent and are listed in your library.</span>
        </>,
        <>
          {"Open "}
          <b>Tools › Verse › Publish to Verse</b>
          {" and press "}
          <b>Publish to Verse</b>.<span>Upload %, then the build stages, then the link — copied for you.</span>
        </>,
      ]}
      published={[
        "The level (or the selected actors) as one scene",
        "Unreal materials and lighting, baked on publish",
        "Textures at source resolution — nothing downscaled",
      ]}
    />
  );
}
