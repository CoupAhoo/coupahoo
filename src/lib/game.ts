/** Single source of truth: CA, contracts, links, fee, copy. */

export const NAME = "Coup Ahoo";
export const TICKER = "AHOO";
export const SLOGAN = "Don't roll thirteen.";
export const LINE = "Dice are your hull. Thirteen sinks you. Take the fleet.";
export const TAGLINE = "Roll cargo. Take the fleet. Fear thirteen.";

export const SITE = "https://coupahoo.lol";
export const X_HANDLE = "CoupAhoo";
export const X_URL = "https://x.com/CoupAhoo";
export const GITHUB = "https://github.com/CoupAhoo/coupahoo";
export const LETSCASH_PAD = "https://www.letscash.fun";

export const CHAIN = {
  id: 4663,
  name: "Robinhood Chain",
  rpc: "https://rpc.mainnet.chain.robinhood.com",
  explorer: "https://robinhoodchain.blockscout.com",
  native: "ETH",
} as const;

export const WETH = "0x0Bd7D308f8E1639FAb988df18A8011f41EAcAD73";
export const HOOK = "0x75A54357D9C78a2Db19004a5FDc76c50F9242AEC";
export const POOL_MANAGER = "0x8366a39CC670B4001A1121B8F6A443A643e40951";

/** Empty until the LetsCash launch is pasted in. */
export const TOKEN_CA = "";
/** Empty until Remix deploy of Hold.sol is pasted in. */
export const HOLD_CA = "";

export const CONTRACTS = {
  token: TOKEN_CA,
  hold: HOLD_CA,
} as const;

export const FEE = {
  taxBps: 500,
  platformBps: 30,
  creatorBps: 470,
  holdShare: {
    prizeBps: 7000,
    dripBps: 2000,
    cabinBps: 1000,
  },
} as const;

export const EPOCH_SECONDS = 15 * 60;
export const CURSE = 13;
export const MIX_FEE_ETH = 0; // no mix — combat game

export const ATTRIBUTION =
  "Ship & dice loop inspired by Coup Ahoo © Antti Haavikko (js13k). Hold, token and chain original. Sprites and song not ported.";

export const BIO =
  "$AHOO · Dice are your hull. Thirteen sinks you. Take the fleet.";

export function explorerAddress(addr: string) {
  return `${CHAIN.explorer}/address/${addr}`;
}

export function explorerToken(addr: string) {
  return `${CHAIN.explorer}/token/${addr}`;
}

export function shortCa(addr: string) {
  if (!addr || addr.length < 12) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function letscashToken(addr: string) {
  return addr ? `https://www.letscash.fun/token/${addr}` : LETSCASH_PAD;
}
