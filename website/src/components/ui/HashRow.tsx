// A plug-in package's SHA-256 checksum with a Copy button.
import { useState } from "react";
import { copyText } from "../../utils/clipboard.ts";

export default function HashRow({ hash, name, buttonId }: { hash: string; name: string; buttonId: string }) {
  const [status, setStatus] = useState("");
  async function copy() {
    setStatus((await copyText(hash)) ? "Checksum copied." : "Select and copy the checksum with your keyboard.");
  }
  return (
    <div className="hash-row">
      <div>
        <span>SHA-256</span>
        <code>{hash}</code>
      </div>
      <button type="button" data-copy-hash="" aria-label={"Copy SHA-256 for " + name} id={buttonId} onClick={copy}>
        Copy ⧉
      </button>
      <span className="hash-status" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
