window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['terms-for-founders'] = {
short: [
  'Model your dilution before every raise. Add up every SAFE as if converted, so you know what you will own after the next priced round.',
  'Valuation is not the only number. Option pool size, liquidation preferences, and board seats can matter as much.',
  'Standard terms are 1x non-participating preferences, broad-based weighted average anti-dilution, and a board founders still control at seed.',
  'A higher valuation with harsh terms can leave you worse off than a lower valuation with clean terms.',
  'Use a lawyer who works on startup financings regularly. It is one of the best uses of early money.'
],
body: `
<h2>Why founders need to understand terms</h2>
<p>Founders often focus on one number: valuation. But the terms around it decide how much you actually own, who controls the company, and what you receive if the company sells for less than hoped. A little knowledge here protects years of your work. The VC course covers the mechanics in Lessons 8, 13, and 14; this lesson is about what to do with them as a founder.</p>

<h2>SAFEs</h2>
<p>A SAFE lets an investor give you money now in exchange for shares at your next priced round. Most SAFEs today are post-money SAFEs with a valuation cap. The key fact: each post-money SAFE gives its holder a fixed percentage of the company, equal to the investment divided by the cap, just before your next priced round.</p>
<p>That makes SAFEs easy to understand one at a time and easy to underestimate in total. Three SAFEs at 10% each mean investors own 30% before your Series A investors put in a dollar.</p>
<div class="note"><p class="note-title">Model it before you sign</p>
<p>You own 85% today (the rest is your option pool). You have raised $500K at a $5M cap (10%) and plan another $1M at an $8M cap (12.5%). Together they take 22.5%, so you would own 85% times (1 minus 0.225), about 65.9%, before the seed round. If the seed then sells 20%, you are at about 52.7%, before any pool increase.</p></div>
<p>Other SAFE features to know: a <strong>discount</strong> gives the investor a lower price than the next round's investors; an <strong>MFN</strong> (most favored nation) clause lets an uncapped SAFE adopt better terms you give later investors; and <strong>pro rata side letters</strong> give the right to invest in the next round.</p>

<h2>The option pool</h2>
<p>New investors usually ask for an unused option pool of a certain size, created before their investment. As Lesson 13 of the VC course shows, that lowers your effective valuation. You cannot avoid a pool, but you can size it to a real hiring plan. Show the investor which roles you will hire in the next 18 to 24 months and what equity each needs. A pool sized to that plan is easier to defend than a round number like 15%.</p>

<h2>Valuation versus terms</h2>
<div class="note"><p class="note-title">Worked example: two offers</p>
<p><strong>Offer A:</strong> $3M at a $12M pre-money valuation, 1x non-participating preference.</p>
<p><strong>Offer B:</strong> $3M at a $15M pre-money valuation, 1x participating preference.</p>
<p>Offer B looks better. Now suppose the company sells for $40M after this round, with no other investors.</p>
<ul>
<li>Offer A: the investor owns 20%. 20% of $40M is $8M, more than their $3M preference, so they convert and take $8M. Everyone else shares $32M.</li>
<li>Offer B: the investor owns about 16.7%. They first take $3M back, then 16.7% of the remaining $37M, about $6.2M, for a total of about $9.2M. Everyone else shares about $30.8M.</li>
</ul>
<p>The "higher" valuation leaves founders and employees with less in this outcome, and the gap grows in smaller sales.</p></div>

<h2>Control</h2>
<ul>
<li><strong>Board.</strong> At seed, founders usually keep control of the board, often with one investor seat or none. Giving up board control early is rarely necessary and hard to undo.</li>
<li><strong>Protective provisions.</strong> Investors normally get a vote on major events such as selling the company or issuing senior shares. Push back on vetoes over everyday decisions like budgets or hiring.</li>
<li><strong>Founder vesting.</strong> Investors expect it. Ask for credit for time already worked, and consider acceleration if you are fired after a sale.</li>
</ul>

<h2>Pro rata and signaling</h2>
<p>Pro rata rights let investors keep their ownership in later rounds. They are standard for major investors. Be aware of signaling: if a large, well-known investor in your seed round does not invest in your Series A, new investors may wonder why. Ask your investors early how they decide on follow-on investments.</p>

<h2>Red flags</h2>
<ul>
<li>Liquidation preferences above 1x, or participating preferences, at an early stage</li>
<li>Full ratchet anti-dilution</li>
<li>Investor control of the board at seed</li>
<li>Broad vetoes over operating decisions</li>
<li>An "exploding" offer that expires in a day or two, with pressure not to talk to other investors</li>
<li>Unusual redemption rights that let investors demand their money back</li>
</ul>
<p>Not every red flag is a deal breaker, but each one should come with a reason and something in return.</p>

<h2>Get a good lawyer</h2>
<p>Use a lawyer who does startup financings regularly, not a generalist. They know what is standard right now, can spot unusual terms in minutes, and will often save you far more than they cost. Ask other founders for referrals.</p>

<h2>Check yourself</h2>
<details class="check"><summary>You raise $750K on a post-money SAFE with a $6M cap. What percentage will the SAFE holder own just before your next priced round?</summary><p>$750K divided by $6M = 12.5%.</p></details>
<details class="check"><summary>Why might a lower valuation with a 1x non-participating preference be better than a higher one with a participating preference?</summary><p>A participating preference lets the investor take their money back and also share in the rest, which reduces what common shareholders receive in many outcomes, especially modest sales.</p></details>
<details class="check"><summary>How can you argue for a smaller option pool?</summary><p>Show a specific hiring plan for the next 18 to 24 months with the equity each role needs. A pool sized to that plan is easier to defend than a round number.</p></details>
`};
