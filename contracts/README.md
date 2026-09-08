# The Chest

Remix · Solidity `0.8.24` · optimizer `200` · EVM `cancun` · chain `4663`.

File: `contracts/Chest.sol`. Contract name: `Chest`. On-chain `name()` is **The Chest**.

Fee recipient for `$AHOO`. One LetsCash recipient. Split is inside:

| Slice | bps | Role |
| --- | --- | --- |
| Prize | 7000 | Best logged run of the 15m epoch. 80% paid, 1% closer, rest rolls. |
| Drip | 2000 | Accrues here. Cabin may `sendDrip` to a later distributor. |
| Cabin | 1000 | Studio. `withdrawCabin` only. |

`settle` is permissionless. No keeper.

`socials()` returns name, ticker, description, website, twitter, telegram, github.

Live: [`0x732aEC9b9A52528f9fFa71c4AF7d2eEb5aE779FA`](https://robinhoodchain.blockscout.com/address/0x732aEC9b9A52528f9fFa71c4AF7d2eEb5aE779FA)

Cabin: `0xCFFaF07B22f5E2B60712Ae0576f130034Cc60918`

`name()` is The Chest. `telegram()` is https://t.me/CoupAhoo.

Verified on Sourcify (runtime + creation match):
https://sourcify.dev/server/v2/contract/4663/0x732aEC9b9A52528f9fFa71c4AF7d2eEb5aE779FA

Blockscout’s own compiler currently 504s behind Cloudflare. On the explorer pick **Sourcify** as the method — the source is already there.
