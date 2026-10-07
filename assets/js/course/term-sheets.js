window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['term-sheets'] = {
short: [
  'A term sheet sets out the economics and control of an investment in two or three pages. Most of it is standard; a few lines decide who gets what.',
  'The numbers that matter most are the amount, the pre-money valuation, and the size of the option pool, because together they set ownership and the real price.',
  'Standard terms today: 1x non-participating liquidation preference, non-cumulative dividends, broad-based weighted average anti-dilution, and a small board.',
  'Anything harsher than standard, such as participating preferences or a full ratchet, moves value from founders to investors and should be explained or traded for something.',
  'Price per share equals the pre-money valuation divided by the pre-money fully diluted shares, including any pool increase required by the investor.'
],
body: `
<h2>What a term sheet is</h2>
<p>A term sheet is a short document, usually two or three pages, that lists the main terms of an investment. Apart from a few clauses such as confidentiality and a no-shop period, it is not legally binding. Lawyers turn it into the full financing documents afterwards. But in practice, almost everything agreed in the term sheet ends up in the final deal, so it is where the real negotiation happens.</p>
<p>Terms fall into two groups. <strong>Economic terms</strong> decide who gets how much money. <strong>Control terms</strong> decide who makes which decisions. Founders and investors usually care most about valuation, but the other terms can matter just as much in a disappointing outcome.</p>

<h2>The economic terms</h2>
<table>
<thead><tr><th>Term</th><th>What it means</th><th>Market standard</th></tr></thead>
<tbody>
<tr><td>Amount</td><td>How much the round raises, and how much the lead invests</td><td>Set by the plan: usually 18 to 24 months of runway</td></tr>
<tr><td>Pre-money valuation</td><td>What the company is worth before the new money</td><td>Negotiated</td></tr>
<tr><td>Option pool</td><td>Shares reserved for future hires, often required to be a set percentage after the round</td><td>10 to 15% after the round, sized to a real hiring plan</td></tr>
<tr><td>Liquidation preference</td><td>Who gets paid first in a sale, and how much</td><td>1x, non-participating</td></tr>
<tr><td>Dividends</td><td>Whether investors earn a yearly return on their shares</td><td>Non-cumulative, only if declared by the board (in practice, rarely paid)</td></tr>
<tr><td>Anti-dilution</td><td>Protection if a later round is priced lower</td><td>Broad-based weighted average</td></tr>
<tr><td>Pro rata rights</td><td>The right to invest in future rounds to keep ownership</td><td>Yes, for major investors</td></tr>
</tbody>
</table>

<h2>The control terms</h2>
<table>
<thead><tr><th>Term</th><th>What it means</th><th>Market standard</th></tr></thead>
<tbody>
<tr><td>Board of directors</td><td>Who sits on the board</td><td>Seed: often 2 founders and 1 investor, or founders only. Series A: often 2 common, 1 investor, sometimes adding an independent</td></tr>
<tr><td>Protective provisions</td><td>Decisions that need approval from the preferred shareholders</td><td>Selling the company, creating senior shares, changing the charter. Not day-to-day decisions</td></tr>
<tr><td>Founder vesting</td><td>Founder shares are earned over time, so a founder who leaves early does not keep everything</td><td>4 years with a 1-year cliff, often with credit for time already worked</td></tr>
<tr><td>Information rights</td><td>Regular financial reports to major investors</td><td>Yes</td></tr>
<tr><td>Drag-along</td><td>A majority can require everyone to join an approved sale</td><td>Yes</td></tr>
<tr><td>No-shop</td><td>The company agrees not to negotiate with other investors for a period</td><td>30 to 45 days</td></tr>
</tbody>
</table>

<h2>The price per share</h2>
<p>Valuations are quoted in dollars, but shares are sold at a price per share. The price is the pre-money valuation divided by the number of fully diluted shares before the new money comes in. "Fully diluted" means every share, option, and convertible instrument counted as if it had become a share.</p>
<div class="note"><p class="note-title">Worked example: price per share with a pool increase</p>
<p>A company has 9,000,000 fully diluted shares, including an option pool of 500,000 unused options. A Series A investor offers $6M at a $24M pre-money valuation, and requires the unused pool to be 12% of the company after the round.</p>
<ul>
<li>Post-money: $24M + $6M = $30M. The investor will own $6M divided by $30M = 20%.</li>
<li>After the round, the pool must be 12% and the investor 20%, so everyone else (founders, existing investors, and the old pool) shrinks. Let N be the total shares after the round. The pool needs 0.12N shares; the investor gets 0.20N.</li>
<li>The other 9,000,000 minus 500,000 = 8,500,000 shares make up the remaining 68%. So N = 8,500,000 divided by 0.68 = 12,500,000.</li>
<li>Investor shares: 20% of 12,500,000 = 2,500,000. Pool: 12% = 1,500,000, an increase of 1,000,000 new options.</li>
<li>Pre-money fully diluted shares including the pool increase: 12,500,000 minus 2,500,000 = 10,000,000. Price per share: $24M divided by 10,000,000 = $2.40.</li>
</ul>
<p>Without the pool increase, the price would have been $24M divided by 9,000,000 = about $2.67. The pool requirement lowered the effective price for existing shareholders by about 10%.</p></div>

<h2>Liquidation preference, again</h2>
<p>Lesson 8 covered how preferences work in a sale. In a term sheet, watch for three variations:</p>
<ul>
<li><strong>Multiple above 1x.</strong> A 2x preference means the investor gets twice their money back before anyone else. Rare in healthy markets.</li>
<li><strong>Participating.</strong> The investor gets their money back and then also shares in what is left. It takes value from common shareholders in every outcome.</li>
<li><strong>Seniority.</strong> Whether new investors are paid before earlier ones (senior) or alongside them (pari passu). Pari passu is common at early stages.</li>
</ul>

<h2>Anti-dilution</h2>
<p>If the company later raises money at a lower price, anti-dilution clauses give earlier investors extra shares. <strong>Broad-based weighted average</strong>, the standard, adjusts the price partway, based on how much money was raised at the lower price. A <strong>full ratchet</strong> resets the earlier investor's price all the way down to the new price, no matter how small the new round is. In a down round, a full ratchet can take a large share of the company from founders and employees.</p>

<h2>Reading a term sheet for problems</h2>
<p>When you review a term sheet, as either an investor or a founder, check each line against market standard. If a term is harsher than standard, ask what the company gets in return. Common trades include a higher valuation in exchange for a larger pool, or a board seat in exchange for a larger check. Accepting a non-standard term is sometimes reasonable. Accepting one without noticing it is not.</p>

<h2>Check yourself</h2>
<details class="check"><summary>An investor puts $4M into a company at a $16M pre-money valuation. What is the post-money and the investor's ownership?</summary><p>Post-money is $20M. Ownership is $4M divided by $20M = 20%.</p></details>
<details class="check"><summary>Why does an option pool increase lower the effective price for existing shareholders?</summary><p>The new options are created before the investment, so they count in the pre-money share count. The same pre-money valuation is spread over more shares, which lowers the price per share for everyone who already owns shares.</p></details>
<details class="check"><summary>A term sheet includes a 1x participating preference. Is that standard, and who does it hurt?</summary><p>It is not standard. It hurts common shareholders, mainly founders and employees, because the investor gets their money back and also shares in the rest of the proceeds.</p></details>
`};
