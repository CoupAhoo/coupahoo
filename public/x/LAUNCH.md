# Launch order

Do not skip. Token is last.

## Already done
- Site: https://coupahoo.lol
- GitHub: https://github.com/CoupAhoo/coupahoo
- Vercel production
- Game playable
- X kit in this folder (logo, banner, cover, bio, article, first post)

## 1. X profile (now, no CA)
1. Avatar = `logo.png`
2. Header = `banner.png` (5:2). X crops to 3:1 — keep the ship in the middle.
3. Display name: Coup Ahoo
4. Bio = `BIO.md` (first paragraph only)
5. Website: https://coupahoo.lol
6. Location: Robinhood Chain
7. Pin nothing yet, or pin `PIN.md` without CA.
8. Telegram channel: paste `TELEGRAM.md`. Image: `cover.png`. No CA.

## 2. Cabin
Studio EOA. This is constructor `cabin` on Chest.sol.
Never put this address in the LetsCash fee form.

## 3. The Chest (Remix, chain 4663)
- File: `contracts/Chest.sol`
- Solidity 0.8.24, optimizer 200, EVM cancun
- Constructor: cabin EOA
- Verify on Blockscout, single file, MIT
- Check: `cabin() == cabin`, `pots()`, `socials()`

## 4. Paste The Chest
`src/lib/game.ts` → `CHEST_CA`. Commit. Push. Vercel picks it up.
Site Chest page should show the address.

## 5. First post (mechanics + infra)
Paste `FIRST.md`. Cover image = `cover.png`.
No token CA in this post. Say "CA posts at launch."
Optional: X Article = `ARTICLE.md` with `cover.png`.

## 6. LetsCash LAST
- Name Coup Ahoo, ticker AHOO
- Tax 3%
- Fee recipient = The Chest only
- Custom quote empty (ETH)
- LP lock on
- Developer buy your call
- Do not put cabin / any EOA as fee recipient

## 7. Paste token CA
`src/lib/game.ts` → `TOKEN_CA`. Commit. Push.

## 8. Launch post
Reply to the first post with CA, LetsCash link, explorer.
Edit bio if you want the CA in it.
Do not invent TVL, holders, or volume.

## Never
- Token before The Chest
- EOA as LetsCash fee recipient
- Fake pots
- Porting Haavikko sprites/song (attribution only)
