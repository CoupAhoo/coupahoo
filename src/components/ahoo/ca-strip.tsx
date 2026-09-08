import { useState } from "react";
import {
  CHAIN,
  CHEST_NAME,
  CONTRACTS,
  TICKER,
  explorerAddress,
  explorerToken,
  letscashToken,
} from "@/lib/game";

type Slot = {
  label: string;
  ca: string;
  pending: string;
  trade?: boolean;
  token?: boolean;
};

function CaRow({ label, ca, pending, trade, token }: Slot) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (!ca) return;
    try {
      await navigator.clipboard.writeText(ca);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  }
  return (
    <div className="flex flex-col gap-1 border-t-2 border-ink/10 pt-3 first:border-0 first:pt-0">
      <p className="font-display text-sm tracking-wide text-ink/50">{label}</p>
      {ca ? (
        <div className="flex flex-wrap items-center gap-2">
          <code className="break-all font-mono text-sm">{ca}</code>
          <button
            type="button"
            onClick={() => void copy()}
            className="ahoo-btn ahoo-btn-roll !px-3 !py-1 !text-sm"
          >
            {copied ? "Copied" : "Copy"}
          </button>
          <a className="text-sm font-semibold underline" href={token ? explorerToken(ca) : explorerAddress(ca)} target="_blank" rel="noreferrer">
            Explorer
          </a>
          {trade ? (
            <a className="text-sm font-semibold underline" href={letscashToken(ca)} target="_blank" rel="noreferrer">
              Trade
            </a>
          ) : null}
        </div>
      ) : (
        <p className="rounded-md border-2 border-dashed border-ink/25 bg-paper-deep/50 px-3 py-2 font-mono text-sm text-ink/55">
          {pending}
        </p>
      )}
    </div>
  );
}

export function CaStrip() {
  return (
    <section className="ahoo-card flex flex-col gap-3 px-4 py-4" id="ca">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-xl tracking-wide">${TICKER}</p>
        <p className="text-sm font-semibold text-ink/60">
          {CHAIN.name} ({CHAIN.id})
        </p>
      </div>
      <CaRow label={`$${TICKER}`} ca={CONTRACTS.token} pending="pending — paste at LetsCash launch" trade token />
      <CaRow label={CHEST_NAME} ca={CONTRACTS.chest} pending="pending — paste after Remix deploy" />
    </section>
  );
}
