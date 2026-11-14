// The 4.0 beta plug-ins for architecture, design and CAD tools (/plugins), rendered by BetaCard.
import type { ReactNode } from "react";

export interface BetaPlugin {
  name: string;
  requirement: ReactNode;
  version: string;
  size: string;
  file: string;
  hash: string;
  /** The full guide: /docs/guides/<guide>, "Publish from <guideName>". */
  guide: string;
  guideName: string;
  /** The install steps. */
  steps: ReactNode[];
  /** The download button's id (from the button ID sheet). */
  downloadId: string;
}

export const BETA_PLUGINS: BetaPlugin[] = [
  {
    name: "SketchUp",
    downloadId: "plugins_cad_tools_download_for_sketchup",
    requirement: (
      <>
        {"SketchUp 2021 or newer (GLB export on 2025+; OBJ / FBX on older needs Pro). Extension "}
        <code>.rbz</code>.
      </>
    ),
    version: "4.0.0-beta.1",
    size: "16 KB",
    file: "verse_publish-sketchup-4.0.0-beta.1.rbz",
    hash: "e2d88cbec07bc2374630058b56ee1821e01d37cae6c22f2992a50c1847ee665e",
    guide: "publish-from-sketchup",
    guideName: "SketchUp",
    steps: [
      <>
        <b>Window › Extension Manager › Install Extension</b>
        {" and pick the "}
        <code>.rbz</code>
        {" (do not unzip it)."}
      </>,
      <>
        <b>Extensions › Verse › Publish to Verse</b>
        {". Server, API key and account token are under "}
        <b>Extensions › Verse › Settings…</b>
      </>,
    ],
  },
  {
    name: "Revit",
    downloadId: "plugins_cad_tools_download_for_revit",
    requirement: "Revit 2021–2024 and 2025+ (Windows). Add-in zip with both builds.",
    version: "4.0.0-beta.1",
    size: "31 KB",
    file: "VersePublish-Revit-4.0.0-beta.1.zip",
    hash: "4c0a629f1102c89abd1d3854f17728ea18f9ac0160181a51519b69bde3ca4fae",
    guide: "publish-from-revit",
    guideName: "Revit",
    steps: [
      <>
        {"Close Revit. Unzip; copy "}
        <code>VersePublishRevit.dll</code>
        {" and "}
        <code>VersePublish.addin</code>
        {" from "}
        <code>build/net48</code>
        {" (2021–2024) or "}
        <code>build/net8.0-windows</code>
        {" (2025+) to "}
        <code>{"%APPDATA%\\Autodesk\\Revit\\Addins\\<year>\\"}</code>.
      </>,
      <>
        {"Start Revit, choose "}
        <b>Always Load</b>
        {", open a 3D view and press "}
        <b>Verse › Publish to Verse</b>
        {" on the ribbon."}
      </>,
    ],
  },
  {
    name: "Rhino",
    downloadId: "plugins_cad_tools_download_for_rhino",
    requirement: "Rhino 8 (script, Windows + Mac) or Rhino 7 / 8 (plug-in, Windows). Zip.",
    version: "4.0.0-beta.1",
    size: "34 KB",
    file: "VersePublish-Rhino-4.0.0-beta.1.zip",
    hash: "d40509f96e0750468933813a86b18488e66bc00faf4d4a5ee7038174013326bd",
    guide: "publish-from-rhino",
    guideName: "Rhino",
    steps: [
      <>
        {"Unzip. Rhino 8: "}
        <b>Tools › Script › Run</b>
        {" and pick "}
        <code>script/VersePublishRhino.py</code>
        {". Or drag "}
        <code>build/net48/VersePublishRhino.rhp</code>
        {" onto Rhino."}
      </>,
      <>
        {"Run "}
        <b>VersePublish</b>; the first run asks for the server and an optional key / token.
      </>,
    ],
  },
  {
    name: "3ds Max",
    downloadId: "plugins_cad_tools_download_for_3ds_max",
    requirement: "3ds Max 2023 or newer (Windows). Python script + MAXScript macros.",
    version: "4.0.0-beta.1",
    size: "18 KB",
    file: "VersePublish-3dsMax-4.0.0-beta.1.zip",
    hash: "4f9a47098f161c9b4dea1ec408a54efba08e9b6d532ebd638d641fbf22bf6e76",
    guide: "publish-from-3dsmax",
    guideName: "3ds Max",
    steps: [
      <>
        {"Unzip to a folder you keep. "}
        <b>Scripting › Run Script</b>
        {" and pick "}
        <code>VersePublish.ms</code>.
      </>,
      <>
        <b>Customize › Toolbars</b>
        {", category "}
        <b>Verse</b>
        {": drag "}
        <b>Publish to Verse</b>
        {" onto a toolbar and press it."}
      </>,
    ],
  },
  {
    name: "Archicad",
    downloadId: "plugins_cad_tools_download_for_archicad",
    requirement: "Archicad 23 or newer (IFC). Python 3.8+ script.",
    version: "4.0.0-beta.1",
    size: "17 KB",
    file: "VersePublish-Archicad-4.0.0-beta.1.zip",
    hash: "cfb29af4ae34b53a89e48a625abb60f3cc7b7b154ae2fa35eba43e060b790f86",
    guide: "publish-from-archicad",
    guideName: "Archicad",
    steps: [
      <>
        {"Unzip. Once: "}
        <code>python3 verse_publish_archicad.py --save-settings --server https://verse.ctruh.com</code>.
      </>,
      <>
        <b>File › Save As › IFC</b>
        {", then "}
        <code>python3 verse_publish_archicad.py model.ifc</code>; it prints the link.
      </>,
    ],
  },
  {
    name: "Maya",
    downloadId: "plugins_cad_tools_download_for_maya",
    requirement: "Maya 2022 or newer (Windows, Mac, Linux). Zip with a drag-to-install script.",
    version: "4.0.0-beta.1",
    size: "26 KB",
    file: "VersePublish-Maya-4.0.0-beta.1.zip",
    hash: "982d7eed443410882afb36e8647bf27d441c1c3c50fd4d8ae9804167e6f19338",
    guide: "publish-from-maya",
    guideName: "Maya",
    steps: [
      <>
        {"Unzip and drag "}
        <code>drag_to_install.py</code>
        {" onto a Maya viewport. A "}
        <b>Verse</b>
        {" menu and shelf appear (and come back after a restart)."}
      </>,
      <>
        <b>Verse › Publish to Verse</b>.
      </>,
    ],
  },
  {
    name: "Cinema 4D",
    downloadId: "plugins_cad_tools_download_for_cinema_4d",
    requirement: "Cinema 4D 2023 or newer. Python plug-in folder.",
    version: "4.0.0-beta.1",
    size: "26 KB",
    file: "VersePublish-Cinema4D-4.0.0-beta.1.zip",
    hash: "a6a34a74bb019f2ac1f9106df3d857ee32eb344f53dc23d26600d65d70a9f7ee",
    guide: "publish-from-cinema4d",
    guideName: "Cinema 4D",
    steps: [
      <>
        {"Unzip and copy the "}
        <code>VersePublish</code>
        {" folder into Cinema 4D's "}
        <code>plugins</code>
        {" folder ("}
        <b>Preferences › Open Preferences Folder…</b>
        ), then restart.
      </>,
      <>
        <b>Extensions › Verse Publish › Publish to Verse</b>.
      </>,
    ],
  },
  {
    name: "Houdini",
    downloadId: "plugins_cad_tools_download_for_houdini",
    requirement: "Houdini 19.5 or newer. Houdini package + shelf.",
    version: "4.0.0-beta.1",
    size: "25 KB",
    file: "VersePublish-Houdini-4.0.0-beta.1.zip",
    hash: "880ac99d461fa1b0e7a86b40faabdd19825ff77238b3f43747fb8d9610b5ec4d",
    guide: "publish-from-houdini",
    guideName: "Houdini",
    steps: [
      <>
        {"Unzip. In "}
        <b>Windows › Python Shell</b>
        {": "}
        <code>{'exec(open(r"<folder>/install_houdini.py").read())'}</code>, then restart Houdini.
      </>,
      <>
        {"Add the "}
        <b>Verse</b>
        {" shelf (shelf "}
        <b>+</b>
        {" menu) and press "}
        <b>Publish to Verse</b>.
      </>,
    ],
  },
  {
    name: "SolidWorks",
    downloadId: "plugins_cad_tools_download_for_solidworks",
    requirement: "SolidWorks 2019 or newer (Windows). Add-in source: build it against your SolidWorks install.",
    version: "4.0.0-beta.1",
    size: "26 KB",
    file: "VersePublish-SolidWorks-4.0.0-beta.1.zip",
    hash: "d2371b43ebffe23f9a0c514ea408f837e8b01c3725a2fca42e62a7977744574b",
    guide: "publish-from-solidworks",
    guideName: "SolidWorks",
    steps: [
      <>
        {"Unzip; build with "}
        <code>{"dotnet build -c Release -p:SolidWorksApi=<SolidWorks>\\api\\redist"}</code>
        {", then "}
        <code>RegAsm /codebase VersePublishSolidWorks.dll</code>
        {" as administrator."}
      </>,
      <>
        <b>Tools › Add-Ins</b>
        {", tick "}
        <b>Verse Publish</b>
        {", then "}
        <b>Verse › Publish to Verse</b>.
      </>,
    ],
  },
  {
    name: "Figma (+ Spline)",
    downloadId: "plugins_cad_tools_download_for_figma_plus_spline",
    requirement: "Figma desktop app. Development plug-in; publishes a GLB such as a Spline export.",
    version: "4.0.0-beta.1",
    size: "11 KB",
    file: "VersePublish-Figma-4.0.0-beta.1.zip",
    hash: "a9acd18f385a46ccbe4a24d1931b2067d212be293d43703c8d54ff2c198d59d2",
    guide: "publish-from-spline",
    guideName: "Spline and Figma",
    steps: [
      <>
        {"Unzip. In Figma desktop: "}
        <b>Plugins › Development › Import plugin from manifest…</b>
        {" and pick "}
        <code>manifest.json</code>.
      </>,
      <>
        <b>Plugins › Development › Verse Publish › Insert a Verse link</b>
        {". "}
        <i>Publish a GLB</i>
        {" needs a server that accepts uploads from plug-ins (cross-origin) — not yet the case on verse.ctruh.com."}
      </>,
    ],
  },
];
