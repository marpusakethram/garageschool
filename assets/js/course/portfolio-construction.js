window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['portfolio-construction'] = {
short: [
  'Portfolio construction is the plan for how many companies to back, how much to invest in each, and how much to hold back for later rounds.',
  'More companies raise your odds of owning an outlier. Fewer companies mean more ownership in each. Every fund picks a point on that tradeoff.',
  'Reserves, usually 40 to 60% of investable capital, should go mostly to the companies that are working, not spread evenly.',
  'Judge every follow-on against the best new deal you could make with the same money.',
  'Fees, idle capital, and carry separate gross returns from what LPs receive. Small leaks add up over ten years.'
],
body: `
<h2>The plan before the first check</h2>
<p>Before a fund makes its first investment, the partners decide its shape: how many companies, how big each first check is, what ownership to target, and how much to keep in reserve for later rounds. This plan is called portfolio construction, and it shapes the fund's returns as much as any single deal.</p>
<p>A simple model shows how the pieces fit.</p>
<div class="note"><p class="note-title">Worked example: a $50M seed fund</p>
<table>
<thead><tr><th>Item</th><th>Amount</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Fund size</td><td>$50M</td><td>Committed by LPs</td></tr>
<tr><td>Fees and expenses over ten years</td><td>About $9M</td><td>2% a year during the investment period, lower afterward</td></tr>
<tr><td>Investable capital</td><td>About $41M</td><td>What actually goes into companies</td></tr>
<tr><td>Reserved for follow-ons (50%)</td><td>About $20.5M</td><td>Held back for later rounds</td></tr>
<tr><td>Initial checks</td><td>About $20.5M</td><td>20 companies at about $1M each</td></tr>
<tr><td>Target ownership at entry</td><td>About 10%</td><td>$1M at a $10M post-money valuation</td></tr>
<tr><td>Follow-ons</td><td>About 10 companies</td><td>About $2M each, mostly in the strongest half</td></tr>
</tbody>
</table></div>
<p>Change any one input and the others move. A larger check size means fewer companies. Higher valuations mean less ownership for the same check. More reserves mean fewer initial investments. Portfolio construction is the work of choosing a combination that matches the fund's strategy and the deals it expects to see.</p>

<h2>How many companies</h2>
<p>Because returns follow a power law (Lesson 1), the most important thing a fund can do is own a piece of at least one outlier. The more companies you back, the better your odds.</p>
<div class="note"><p class="note-title">Worked example: the odds of owning an outlier</p>
<p>Suppose, as an illustration, that 3% of seed investments become companies large enough to return the fund. If each investment is independent, the chance of holding at least one is 1 minus 0.97 raised to the number of companies.</p>
<table>
<thead><tr><th>Companies in the portfolio</th><th>Chance of at least one outlier</th></tr></thead>
<tbody>
<tr><td>10</td><td>About 26%</td></tr>
<tr><td>20</td><td>About 46%</td></tr>
<tr><td>30</td><td>About 60%</td></tr>
<tr><td>40</td><td>About 70%</td></tr>
</tbody>
</table>
<p>The real rate is uncertain and depends on how good the fund is at picking. But the shape holds: more shots meaningfully raise the odds of a hit.</p></div>
<p>The tradeoff is ownership. A $50M fund that backs 40 companies writes smaller checks and owns less of each, so its outlier returns less. A fund that backs 12 companies owns much more of each, so an outlier is enormous for the fund, but the chance of missing every outlier is much higher.</p>
<p>Neither is right in general. Funds with strong access to the best deals and confident selection often concentrate. Funds investing very early, where it is hardest to tell winners apart, often diversify. What matters is that the choice is deliberate and matches how good the fund really is at picking.</p>

<h2>Reserves</h2>
<p>Most early-stage funds reserve 40 to 60% of their investable capital for follow-on investments. Reserves do three jobs:</p>
<ul>
<li><strong>Keep ownership in winners.</strong> Without follow-ons, a 10% seed stake can shrink to 5% or less by the exit.</li>
<li><strong>Support companies through hard periods.</strong> A bridge round can keep a promising company alive until it hits its next milestone.</li>
<li><strong>Signal confidence.</strong> New investors notice whether existing investors are participating.</li>
</ul>
<p>The common mistake is to spread reserves evenly, writing a follow-on check for every company that raises. That puts as much money into the weakest companies as the strongest. The better approach is to concentrate reserves in the companies that are clearly working.</p>

<h2>The follow-on decision</h2>
<p>When a portfolio company raises its next round, the fund has to decide whether to invest more. The right question is not "do we like this company?" It is "is this the best use of the next dollar?"</p>
<p>Follow-on dollars buy shares at a higher price than your first check. But you also know much more: you have watched the team operate, seen real numbers, and talked to customers. That information is valuable.</p>
<div class="note"><p class="note-title">Worked example: follow-on versus a new deal</p>
<p>You have $2M to invest. Two options:</p>
<p><strong>Option A, follow-on.</strong> A portfolio company is raising its Series A at a $40M post-money valuation. $2M buys 5%, which you expect to dilute to 3.5% by exit. You estimate a 30% chance it sells for $600M, and a 70% chance it returns roughly nothing. Expected value: 0.3 times 3.5% of $600M = $6.3M, about 3.2 times your money.</p>
<p><strong>Option B, new seed deal.</strong> $2M at a $10M post-money valuation buys 20%, which you expect to dilute to 12%. You estimate an 8% chance of a $600M exit. Expected value: 0.08 times 12% of $600M = $5.8M, about 2.9 times your money.</p>
<p>Here the follow-on is slightly better on expected value and much less risky, because you know far more about the company. With different estimates, the answer would flip. The point is to compare, not to assume follow-ons are always right or always wrong.</p></div>
<p>Signals that support a follow-on: revenue growing faster than plan, strong net revenue retention, key hires made, and an outside investor leading the new round at a meaningfully higher price. Signals against: missed plans, the same investors bridging again and again, and a round with no outside lead.</p>

<h2>Signaling</h2>
<p>If a fund that has invested before chooses not to join the next round, new investors may read that as bad news, since the existing investor knows the company best. This is called signaling risk. It can make a weak decision self-fulfilling: the fund declines, the round struggles, and the company suffers.</p>
<p>Funds manage this by being clear with founders early about how they make follow-on decisions, and by setting rules ahead of time where they can. Some funds commit to pro rata in every company that hits certain milestones, so declining is not a surprise.</p>

<h2>Deployment pace</h2>
<p>A fund is expected to make its initial investments over three or four years. Pace matters in both directions.</p>
<ul>
<li><strong>Too fast</strong> concentrates the fund in one market moment. If valuations were high that year, the whole portfolio was bought expensive.</li>
<li><strong>Too slow</strong> leaves capital idle while LPs pay fees on it, and delays the next fund, since most firms cannot raise again until much of the current fund is committed.</li>
</ul>
<p>A common target is to have about a quarter to a third of initial investments made each year of the investment period, and to have most of the fund committed, including expected reserves, by year three or four.</p>

<h2>From gross to net</h2>
<p>The return of the portfolio and the return LPs receive are different numbers. Three things sit in between: fees, idle capital, and carry.</p>
<div class="note"><p class="note-title">Worked example: the same portfolio, two outcomes for LPs</p>
<p>A $100M fund invests $80M after fees. The portfolio returns $250M, or about 3.1x on invested capital (gross).</p>
<ul><li>LPs first receive their $100M back.</li><li>Profit above that: $150M. The GPs earn 20% carry: $30M.</li><li>LPs receive $220M in total: a net TVPI of 2.2x.</li></ul>
<p>Now suppose the GPs only deployed $70M and left $10M idle, returning it unused at the end. The smaller portfolio returns proportionally less, about $219M, so total distributions are about $229M. Profit is about $129M, carry about $26M, and LPs receive about $203M, or 2.03x. Leaving an eighth of the capital idle cost LPs almost a fifth of a turn.</p></div>
<p>This is why LPs watch fees, pace, and carry terms closely. Over ten years, small leaks become large.</p>

<h2>Reporting to LPs</h2>
<p>Funds usually report quarterly. LPs look for TVPI and DPI (covered in Lesson 1), how much of the fund is deployed, the largest positions, and any write-downs. Honest reporting on companies that are struggling builds trust that a GP will need when it raises its next fund. LPs remember who surprised them.</p>

<h2>Common mistakes</h2>
<ul>
<li>Spreading reserves evenly instead of concentrating them in the companies that are working.</li>
<li>Following on out of loyalty or to avoid signaling, without comparing against new deals.</li>
<li>Building too concentrated a portfolio for the stage, where picking winners is hardest.</li>
<li>Deploying too fast in a hot market, or too slowly while fees accrue.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A $40M fund has $32M to invest and reserves half. How many $800K initial checks can it write?</summary><p>$16M for initial checks divided by $800K = 20 companies.</p></details>
<details class="check"><summary>Why does adding companies to a portfolio raise the odds of a great fund but not guarantee one?</summary><p>More companies raise the chance of owning at least one outlier, but each stake is smaller, so the outlier returns less of the fund. The outcome still depends on picking.</p></details>
<details class="check"><summary>A portfolio company is raising a bridge from existing investors for the third time, with no new lead investor. What does this suggest about a follow-on?</summary><p>It is a warning sign. Repeated insider bridges without an outside lead suggest the market is not convinced. Compare the follow-on carefully against new opportunities.</p></details>
`};
