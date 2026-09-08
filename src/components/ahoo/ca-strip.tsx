import { useState } from "react";
import { CONTRACTS, explorerAddress, letscashToken, shortCa, TICKER } from "@/lib/game";

export function CaStrip() {
  const ca = CONTRACTS.token;
  const [copied, setCopied] = useState(false);
  if (!ca) {
    return (
      <div className="rounded-[14px] border-[3px] border-ink bg-paper px-4 py-3">
        <p className="font-display text-lg tracking-wide">${TICKER}</p>
        <p className="text-sm text-ink/70">Contract posts at launch. The Hold is empty until then.</p>
      </div>
    );
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(ca);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-[14px] border-[3px] border-ink bg-paper px-4 py-3">
      <span className="font-display tracking-wide">${TICKER}</span>
      <code className="font-mono text-sm">{shortCa(ca)}</code>
      <button type="button" onClick={() => void copy()} className="ahoo-btn bg-gold text-ink !px-3 !py-1 !text-sm">
        {copied ? "Copied" : "Copy"}
      </button>
      <a className="text-sm font-semibold underline" href={explorerAddress(ca)} target="_blank" rel="noreferrer">
        Explorer
      </a>
      <a className="text-sm font-semibold underline" href={letscashToken(ca)} target="_blank" rel="noreferrer">
        Trade
      </a>
    </div>
  );
}
