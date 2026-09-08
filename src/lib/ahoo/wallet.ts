import { CHAIN, CHEST_CA } from "@/lib/game";

type Eip1193 = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (ev: string, fn: (...a: unknown[]) => void) => void;
  removeListener?: (ev: string, fn: (...a: unknown[]) => void) => void;
};

type Announced = { info: { uuid: string; name: string; rdns?: string }; provider: Eip1193 };

const announced: Announced[] = [];

function collectProviders() {
  if (typeof window === "undefined") return;
  window.addEventListener("eip6963:announceProvider", ((e: Event) => {
    const d = (e as CustomEvent<{ info: Announced["info"]; provider: Eip1193 }>).detail;
    if (!d?.provider) return;
    if (announced.some((a) => a.info.uuid === d.info.uuid)) return;
    announced.push({ info: d.info, provider: d.provider });
  }) as EventListener);
  window.dispatchEvent(new Event("eip6963:requestProvider"));
}

collectProviders();

function injected(): Eip1193 | null {
  if (announced[0]) return announced[0].provider;
  const eth = (window as unknown as { ethereum?: Eip1193 }).ethereum;
  return eth ?? null;
}

const CHAIN_HEX = "0x" + CHAIN.id.toString(16);

export async function connectWallet(): Promise<string> {
  const p = injected();
  if (!p) throw new Error("No wallet found. Install MetaMask or OKX.");
  const accs = (await p.request({ method: "eth_requestAccounts" })) as string[];
  const addr = accs[0];
  if (!addr) throw new Error("No account returned.");
  await ensureChain(p);
  return addr;
}

export async function readAccount(): Promise<string | null> {
  const p = injected();
  if (!p) return null;
  try {
    const accs = (await p.request({ method: "eth_accounts" })) as string[];
    return accs[0] ?? null;
  } catch {
    return null;
  }
}

async function ensureChain(p: Eip1193) {
  try {
    await p.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CHAIN_HEX }],
    });
  } catch (err) {
    const code = (err as { code?: number })?.code;
    if (code !== 4902) throw err;
    await p.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: CHAIN_HEX,
          chainName: CHAIN.name,
          nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
          rpcUrls: [CHAIN.rpc],
          blockExplorerUrls: [CHAIN.explorer],
        },
      ],
    });
  }
}

export function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

/** logRun(uint64,bytes32) on The Chest. */
const LOG_RUN = "0xc5956af3";

export async function logRunToChest(score: number, seed: number): Promise<string> {
  if (!CHEST_CA) throw new Error("The Chest is not live.");
  const p = injected();
  if (!p) throw new Error("No wallet found.");
  await ensureChain(p);
  const accs = (await p.request({ method: "eth_requestAccounts" })) as string[];
  const from = accs[0];
  if (!from) throw new Error("No account.");
  const n = Math.max(0, Math.min(0xffffffff, Math.floor(score)));
  const seedHex = ((seed >>> 0) >>> 0).toString(16).padStart(16, "0");
  const hash = n.toString(16).padStart(48, "0") + seedHex; // 32 bytes
  const data = `${LOG_RUN}${n.toString(16).padStart(64, "0")}${hash}`;
  const tx = (await p.request({
    method: "eth_sendTransaction",
    params: [{ from, to: CHEST_CA, data, value: "0x0" }],
  })) as string;
  return tx;
}
