# The Hold

Remix · Solidity `0.8.24` · optimizer `200` · EVM `cancun` · chain `4663`.

Fee recipient for `$AHOO` is this contract. One LetsCash recipient. Split is inside:

| Slice | bps | Role |
| --- | --- | --- |
| Prize | 7000 | Best logged run of the 15m epoch. 80% paid, 1% closer, rest rolls. |
| Drip | 2000 | Accrues here. Cabin may `sendDrip` to a later distributor. |
| Cabin | 1000 | Studio. `withdrawCabin` only. |

`settle` is permissionless. No keeper.

## Order

1. Deploy `Hold.sol` with constructor arg = cabin (studio) EOA.
2. Verify on Blockscout from Remix (single file, MIT).
3. Paste Hold CA into `src/lib/game.ts` as `HOLD_CA`.
4. LetsCash launch `$AHOO` last. Fee recipient = **Hold CA**. Tax 3%. One recipient. Custom quote empty. Developer buy your call.
5. Paste token CA into `TOKEN_CA`.

Do not put an EOA in the LetsCash fee form.

## Constructor ABI

```
000000000000000000000000 + cabin (20 bytes, no 0x)
```

Check: `cabin() == cabin EOA`, `pots()`, `socials()`.
