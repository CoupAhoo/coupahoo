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

## Remix deploy

1. Open [Remix](https://remix.ethereum.org).
2. New file `Chest.sol`. Paste [contracts/Chest.sol](https://github.com/CoupAhoo/coupahoo/blob/main/contracts/Chest.sol).
3. Compiler: `0.8.24` · Enable optimization · runs `200` · EVM `cancun`.
4. Compile.
5. Deploy & Run: Environment **Injected Provider**. Network **Robinhood Chain (4663)**.
6. Constructor `cabin_` = studio EOA (the wallet you control). Never the LetsCash fee field.
7. Deploy. Confirm. Save the address.
8. Verify on [Blockscout](https://robinhoodchain.blockscout.com) — single file, MIT, same compiler settings.
9. Read: `cabin()` equals studio EOA. `pots()` is zeros. `socials()` shows The Chest + t.me/CoupAhoo.
10. Paste the address into `src/lib/game.ts` as `CHEST_CA`. Push.

## After The Chest is live

LetsCash launch `$AHOO` last. Fee recipient = **The Chest** address. Tax 3%. Custom quote empty. Developer buy your call.

Do not put an EOA in the LetsCash fee form.

## Constructor ABI

```
000000000000000000000000 + cabin (20 bytes, no 0x)
```
