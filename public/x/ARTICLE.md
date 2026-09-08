# Don't roll thirteen.

Coup Ahoo is a ship made of dice. You play it in the browser. The token comes after The Hold is on-chain. This is the loop and the pipes.

## The hull

You start by rolling three six-siders. That stack is the sloop.

- Each pip is a hit point.
- Each die is a gun. More crates, more shots.
- Empty the deck and you sink.
- If the pips sum to thirteen you are cursed. The first ball of every volley goes overboard. Thirteen is not a score. It is a hole.

Combat dice are 0 / 0 / 1 / 1 / 2 / 2. You roll a volley, keep or reroll, then click their cargo. Plated crates only take 1. Between fights: merchants, shipwrights, sailors in dinghies, storms, free crates in the drink. Hire crew if you have gold.

- Gunner — first shot each volley +1.
- Carpenter — after a win, patches the weakest cargo +1.
- Lookout — enemy wastes their first shot.
- Cook — +3 gold every ship you sink.

Take the fleet one sloop at a time. Nine encounters. Last one is the flagship. Log a run if The Hold is live. One log per wallet per epoch.

Play: https://coupahoo.lol/play

## The pipes

$AHOO launches on LetsCash, Robinhood Chain (id 4663). Quote is ETH. LP locks at launch. Trade tax is 3% of the ETH leg.

LetsCash keeps 0.3% as platform. 2.7% goes to The Hold. One recipient in the launch form.

The Hold splits every wei it receives:

| Slice | Share | What it does |
| --- | --- | --- |
| Prize | 70% | Best logged run of the 15-minute epoch. 80% of that pot pays out. 1% of the payout is a closer tip. Rest rolls. |
| Drip | 20% | Accrues on the contract. Cabin may `sendDrip` to a later distributor. Not a claim. |
| Cabin | 10% | Studio. `withdrawCabin` only. |

`settle` is permissionless. Anyone may close a finished epoch. Empty epochs emit and move on. The prize that did not pay stays in the pot.

Cabin is set in the constructor. It cannot be the LetsCash fee recipient. Drip is not a holder airdrop until cabin sends it. If we have not sent it, it is still sitting in The Hold.

## What is live, what is not

Live now: the game, the site, the GitHub, this account.

Not live until we paste them: Hold CA, token CA. We do not invent TVL.

Order: cabin EOA → Remix `Hold.sol` on 4663 → verify on Blockscout → Hold CA on the site → LetsCash last, fee recipient = Hold CA, tax 3% → token CA on the site → this post gets the CA.

## Attribution

Ship & dice loop inspired by Coup Ahoo © Antti Haavikko (js13k). Hold, token and chain original. Sprites and song not ported.

Site: https://coupahoo.lol
Play: https://coupahoo.lol/play
Hold: https://coupahoo.lol/hold
Token: https://coupahoo.lol/token
GitHub: https://github.com/CoupAhoo/coupahoo
