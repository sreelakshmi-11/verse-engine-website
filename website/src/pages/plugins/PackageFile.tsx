import HashRow from "../../components/ui/HashRow.tsx";
import { slug } from "../../utils/ids.ts";

/** A plug-in package's version, size and file name, and its SHA-256 checksum. */
export default function PackageFile({ name, version, size, file, hash }: { name: string; version: string; size: string; file: string; hash: string }) {
  return (
    <>
      <p className="plugin-file">{`v${version} · ${size} · ${file}`}</p>
      <HashRow hash={hash} name={name} buttonId={"btn-copy-sha-256-for-" + slug(name)} />
    </>
  );
}
