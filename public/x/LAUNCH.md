# Launch — do in this order

Token is last. Do not skip.

## Done
- Site https://coupahoo.lol
- GitHub CoupAhoo/coupahoo
- Vercel
- Play
- Socials on site (X · Telegram · GitHub)
- TG channel @CoupAhoo — caption in TELEGRAM.md (under 1024)
- Chest.sol ready, not deployed
- CHEST_CA and TOKEN_CA empty on purpose

## Assets
- Avatar https://coupahoo.lol/x/logo.png
- Banner https://coupahoo.lol/x/banner.png
- Cover https://coupahoo.lol/x/cover.png
- Chest https://github.com/CoupAhoo/coupahoo/blob/main/contracts/Chest.sol

## NOW 1 — X profile
Avatar logo.png · header banner.png · name Coup Ahoo · bio BIO.md first line · site coupahoo.lol · no CA.

## NOW 2 — Cabin
Studio EOA. Constructor `cabin_` on Chest.sol.
Never this address in the LetsCash fee field.

## NOW 3 — Deploy The Chest
Remix · Injected Provider · Chest.sol · 0.8.24 · opt 200 · cancun.
`cabin_` = studio EOA. Deploy. Verify on Blockscout. Read cabin / pots / socials.
Send the address. It goes in `src/lib/game.ts` as `CHEST_CA`. Push. Site shows The Chest.

## THEN 4 — X first post
FIRST.md + cover.png. No token CA. “CA posts at launch.”

## THEN 5 — LetsCash LAST
Name Coup Ahoo · ticker AHOO · tax 3% · fee recipient = The Chest only · quote ETH · LP lock.
Not cabin. Not any EOA.

## THEN 6 — Token CA
Paste into `TOKEN_CA`. Push.

## THEN 7 — Launch reply
CA + LetsCash link + explorer. No fake TVL.

## Never
Token before The Chest. EOA as fee recipient. Fake pots.
