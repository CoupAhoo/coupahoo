import { useEffect, useState } from "react";
import { connectWallet, readAccount, shortAddr } from "@/lib/ahoo/wallet";
import { useRun } from "@/store/run";

export function WalletBar() {
  const wallet = useRun((s) => s.wallet);
  const setWallet = useRun((s) => s.setWallet);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void readAccount().then((a) => {
      if (a) setWallet(a);
    });
  }, [setWallet]);

  async function onConnect() {
    setBusy(true);
    setErr("");
    try {
      const a = await connectWallet();
      setWallet(a);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Connect failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {wallet ? (
        <span className="rounded-md border-[3px] border-ink bg-paper px-3 py-1.5 font-mono text-xs">
          {shortAddr(wallet)}
        </span>
      ) : (
        <button
          type="button"
          onClick={() => void onConnect()}
          disabled={busy}
          className="ahoo-btn bg-gold text-ink !px-2.5 !py-1 !text-xs sm:!px-3 sm:!py-1.5 sm:!text-sm"
        >
          {busy ? "…" : "Connect wallet"}
        </button>
      )}
      {err ? <span className="max-w-[10rem] truncate text-[11px] text-curse">{err}</span> : null}
    </div>
  );
}
