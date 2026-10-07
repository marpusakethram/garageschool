window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['valuation-and-terms'] = {
short: [
  'Post-money valuation equals pre-money plus the new investment. Your ownership is your check divided by the post-money.',
  'Every round dilutes existing owners. An early stake commonly shrinks by a third to a half before exit.',
  'SAFEs convert into shares later. Add them all up as if converted, because several stacked SAFEs can dilute founders heavily.',
  'The liquidation preference decides who gets paid first in a sale. The standard is 1x non-participating, and anything harsher shifts value toward investors.',
  'Price does not change whether a company succeeds, but it decides how much of the success you keep.'
],
body: `
<h2>Pre-money and post-money</h2>
<p>The <strong>pre-money valuation</strong> is what investors agree the company is worth before new money comes in. The <strong>post-money valuation</strong> is the pre-money plus the new investment.</p>
<div class="note"><p class="note-title">Worked example: a seed round</p>
<p>A company raises $3M at a $12M pre-money valuation.</p>
<ul><li>Post-money: $12M + $3M = $15M.</li><li>New investors own $3M divided by $15M = 20%.</li><li>Existing owners now own 80% of a company worth $15M, which is $12M, the same value they had before the round.</li></ul></div>
<p>The last point is important. A fairly priced round does not make existing owners poorer on paper. They own a smaller share of a company that has more cash.</p>
<p>Founders and investors often say "we raised $3M at $15M" without saying whether $15M is pre or post. Always ask. On a $3M raise, the difference is 20% ownership versus about 16.7%.</p>

<h2>Dilution across rounds</h2>
<p>Every round issues new shares, so everyone who already owns shares ends up with a smaller percentage. This is dilution. It is normal, and it is the cost of raising money to grow.</p>
<div class="note"><p class="note-title">Worked example: three rounds</p>
<table>
<thead><tr><th>Owner</th><th>Start</th><th>After seed (sells 20%)</th><th>After Series A (sells 20%)</th><th>After Series B (sells 15%)</th></tr></thead>
<tbody>
<tr><td>Founders</td><td>100%</td><td>80%</td><td>64%</td><td>54.4%</td></tr>
<tr><td>Seed investor</td><td></td><td>20%</td><td>16%</td><td>13.6%</td></tr>
<tr><td>Series A investor</td><td></td><td></td><td>20%</td><td>17%</td></tr>
<tr><td>Series B investor</td><td></td><td></td><td></td><td>15%</td></tr>
</tbody>
</table>
<p>To find each new percentage, multiply the old one by the share not sold in the new round. After Series A, the seed investor owns 20% times 0.8 = 16%. After Series B, 16% times 0.85 = 13.6%.</p>
<p>The seed investor's stake shrank from 20% to 13.6%, a drop of about a third, in just two rounds. Real companies also add option pools for employees, which dilutes everyone further.</p></div>
<p>This is why funds keep reserves (Lesson 10) and why <strong>pro rata rights</strong> matter. A pro rata right lets an investor buy enough of each new round to keep its percentage. In the example above, a seed investor with 20% who wanted to stay at 20% through the Series A would need to buy 20% of the new shares, which means putting in 20% of the Series A money.</p>

<h2>SAFEs</h2>
<p>Many early rounds use a <strong>SAFE</strong>, a simple agreement for future equity, created by Y Combinator. The investor pays now and receives shares later, when the company raises a priced round. There is no valuation set today and no shares issued until then.</p>
<p>Most SAFEs include a <strong>valuation cap</strong>, the maximum valuation at which the SAFE converts. If the priced round happens at a higher valuation, the SAFE holder converts at the cap, which rewards them for investing early.</p>
<p>The <strong>post-money SAFE</strong>, now the most common version, makes ownership easy to calculate: the investment divided by the post-money cap is the percentage of the company the SAFE holder will own just before the priced round's new money comes in.</p>
<div class="note"><p class="note-title">Worked example: SAFE conversion</p>
<p>An investor puts $1M into a post-money SAFE with a $10M cap. That is 10% of the company before the next round.</p>
<p>A year later, the company raises a Series A: $5M at a $20M pre-money valuation, so $25M post. The new investors own 20%. The SAFE holder's 10% is diluted by that round: 10% times 0.8 = 8% after the Series A.</p></div>
<div class="note"><p class="note-title">Worked example: stacked SAFEs</p>
<p>A company raises three SAFEs before its first priced round:</p>
<ul><li>$1M at a $10M post-money cap = 10%</li><li>$1M at an $8M post-money cap = 12.5%</li><li>$2M at a $16M post-money cap = 12.5%</li></ul>
<p>Together, the SAFE holders will own 35% before the Series A investors put in a dollar. If the Series A then sells 20%, the founders and early employees are left with 65% times 0.8 = 52%, before any option pool. Founders who raise SAFE after SAFE without adding them up are often surprised by this.</p></div>
<p>When you look at a company, add up every SAFE and convertible note as if it had already converted. That fully diluted picture is the real cap table.</p>

<h2>The option pool shuffle</h2>
<p>Startups set aside shares, called an option pool, to grant to future employees. New investors usually want a pool of a certain size in place when they invest, often 10 to 15% of the company after the round. The question is who pays for it.</p>
<div class="note"><p class="note-title">Worked example: who pays for the pool</p>
<p>A Series A investor offers $5M at a $20M pre-money valuation, with a requirement that a 15% option pool (measured after the round) be created before the investment.</p>
<ul><li>Post-money: $25M. The investor owns 20%.</li><li>The new pool is 15% of the company after the round.</li><li>Existing shareholders keep 100% minus 20% minus 15% = 65%.</li><li>65% of $25M is $16.25M.</li></ul>
<p>So existing shareholders effectively sold at a $16.25M pre-money valuation, not $20M. The pool came entirely out of their share. Founders who understand this negotiate the pool size, often by showing a hiring plan that needs a smaller pool.</p></div>

<h2>Liquidation preference</h2>
<p>Investors usually buy <strong>preferred stock</strong>, which comes with a <strong>liquidation preference</strong>: in a sale, preferred holders are paid before common shareholders (founders and employees).</p>
<p>The standard is <strong>1x non-participating</strong>. The investor chooses whichever is larger: their money back, or their percentage of the sale price. They do not get both.</p>
<div class="note"><p class="note-title">Worked example: a preference in three sales</p>
<p>An investor put in $10M at a $50M post-money valuation, so they own 20%, with a 1x preference.</p>
<table>
<thead><tr><th>Sale price</th><th>1x non-participating: investor gets</th><th>1x participating: investor gets</th></tr></thead>
<tbody>
<tr><td>$30M</td><td>$10M (the preference, since 20% of $30M is only $6M)</td><td>$10M, plus 20% of the remaining $20M = $14M</td></tr>
<tr><td>$50M</td><td>$10M either way (20% of $50M is exactly $10M)</td><td>$10M, plus 20% of $40M = $18M</td></tr>
<tr><td>$200M</td><td>$40M (converts to 20% of the sale)</td><td>$10M, plus 20% of $190M = $48M</td></tr>
</tbody>
</table>
<p>With the standard term, the preference only matters in sales below the post-money valuation. It protects investors in a disappointing outcome. With a participating preference, the investor takes their money back and then also shares in everything left, which takes value from founders and employees in every outcome.</p></div>
<p>Preferences stack across rounds. A company that has raised $80M with 1x preferences and sells for $90M leaves only $10M for common shareholders, even if the founders "own" half the company. When you see a large amount raised relative to a likely exit, check what the team would actually receive. A team that expects nothing from a sale may not want to sell.</p>

<h2>Other terms that matter</h2>
<ul>
<li><strong>Board seats.</strong> Who controls major decisions, including firing the CEO. Early boards are often two founders and one investor. Watch for investors gaining control of the board early.</li>
<li><strong>Protective provisions.</strong> Decisions that need investor approval, such as selling the company or raising a new round. Standard ones are fine. Very broad ones can block the company.</li>
<li><strong>Anti-dilution.</strong> Protects investors if a later round is priced lower. The standard is "broad-based weighted average," which adjusts modestly. A "full ratchet" resets the investor's price to the new lower price, which can wipe out founders in a down round.</li>
<li><strong>Information rights.</strong> The right to regular financial reports. Standard and useful for investors.</li>
<li><strong>Drag-along.</strong> Lets a majority of shareholders force others to join a sale, so a small holder cannot block a deal.</li>
</ul>

<h2>How investors arrive at a price</h2>
<p>At pre-seed and seed there is little to calculate, so prices mostly follow the market rate for similar rounds, adjusted for the team, traction, and how many investors want in.</p>
<p>For companies with revenue, investors use <strong>comparables</strong>: what similar companies were valued at relative to their revenue. A company with $5M of ARR in a market where similar companies raise at 15 to 25 times ARR might be valued at $75M to $125M. Multiples vary widely with growth rate, margins, and market conditions, so comparables are a range, not an answer.</p>
<p>The <strong>VC method</strong> works backward from the exit to check whether a price makes sense for the fund.</p>
<div class="note"><p class="note-title">Worked example: the VC method</p>
<p>You believe a company could sell for $600M in about seven years if it succeeds. For an early-stage deal, your fund needs a potential 10x on each investment to make the portfolio work. You expect your stake to be diluted by about 40% before the exit.</p>
<ul><li>Value of your stake needed at exit: 10 times your check.</li><li>Maximum post-money today: $600M divided by 10, times 0.6 (the share of your stake that survives dilution) = $36M.</li></ul>
<p>If the company is asking for a $60M post-money valuation, the deal only works if the exit could be much larger than $600M. The VC method does not tell you the right price. It tells you whether a price is compatible with the return you need.</p></div>

<h2>Price and your return</h2>
<p>Two funds each invest $2M in the same company. Fund A invests at a $10M post-money valuation and owns 20%. Fund B invests a year later at a $20M post-money and owns 10%. If the company sells for $400M and both stakes are diluted by 40% on the way, Fund A's stake is worth $48M (24x) and Fund B's is worth $24M (12x).</p>
<p>Same company, same outcome, half the return. Paying up for a truly great company can still be the right call, because great companies produce the returns. But price always comes out of your multiple, and in a crowded round it is easy to overpay.</p>

<h2>Reading a cap table</h2>
<p>Look at the fully diluted cap table on every deal. Warning signs include:</p>
<ul>
<li>Founders who own very little after only one or two rounds, which can hurt their motivation.</li>
<li>A large stake held by a cofounder who has left.</li>
<li>Many stacked SAFEs or notes that have not been added up.</li>
<li>Preferences that are large relative to any realistic exit.</li>
<li>Unusual investor rights, such as vetoes over future rounds.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A company raises $4M at a $16M pre-money valuation. What do the new investors own?</summary><p>Post-money is $20M, so they own $4M divided by $20M = 20%.</p></details>
<details class="check"><summary>You own 15% after the seed round. The Series A sells 25% of the company and you do not invest. What do you own after?</summary><p>15% times 0.75 = 11.25%.</p></details>
<details class="check"><summary>An investor put $10M into a company at a $40M post-money valuation with a 1x non-participating preference. The company sells for $25M. How much does the investor get?</summary><p>$10M. Their 25% share of $25M would only be $6.25M, so they take the preference instead.</p></details>
`};
