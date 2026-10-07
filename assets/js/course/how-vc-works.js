window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['how-vc-works'] = {
short: [
  'A venture fund invests other people\'s money for about ten years and has to give it back with a large profit.',
  'The people running the fund earn a yearly fee and a share of profits, so they care about the total return of the fund, not any single deal.',
  'Returns follow a power law. Most investments lose money and one or two carry the whole fund.',
  'Every investment needs a believable path to returning the entire fund. If you cannot picture that outcome, the deal does not fit.',
  'Your return on a deal is ownership at exit times the exit value. Ownership and outcome size are the two numbers that matter most.'
],
body: `
<h2>Where the money comes from</h2>
<p>A venture capital firm does not invest its own money. It raises a fund from outside investors called limited partners, or LPs. Typical LPs are university endowments, pension funds, foundations, insurance companies, family offices, and wealthy individuals. The people who run the fund and make the investment decisions are the general partners, or GPs.</p>
<p>LPs put money into venture because they want returns they cannot get from public stocks and bonds. In exchange, they accept two hard conditions. Their money is locked up for ten years or more, and most of the companies the fund backs will fail. To make that trade worth it, LPs usually hope for a fund to return at least two and a half to three times their money after all costs. Many funds never get there, which is why LPs spend so much time picking managers.</p>
<p>LPs do not hand over all the money on day one. They make a commitment, say $10M to a $100M fund, and the GP draws it down in pieces through capital calls when it needs cash for investments or fees. The full amount promised is called committed capital.</p>

<h2>The life of a fund</h2>
<p>Most funds follow the same arc. The exact years vary, but the shape does not.</p>
<table>
<thead><tr><th>Period</th><th>What happens</th></tr></thead>
<tbody>
<tr><td>Year 0</td><td>The GP raises the fund from LPs. This can take a few months for a famous firm or two years for a new one.</td></tr>
<tr><td>Years 1 to 3 or 4</td><td>The investment period. The fund makes its first checks into new companies.</td></tr>
<tr><td>Years 3 to 7</td><td>The fund writes follow-on checks into the companies that are working and helps the portfolio.</td></tr>
<tr><td>Years 6 to 10 and beyond</td><td>Exits. Companies are acquired or go public, and the fund returns cash to LPs. Many funds extend past ten years because their best companies are still private.</td></tr>
</tbody>
</table>
<p>A GP who is doing well usually raises the next fund around year three or four, once most of the current fund is committed. That means a firm is often running several funds at different stages at the same time.</p>

<h2>How GPs get paid</h2>
<p>The standard arrangement is called "2 and 20." It has two parts, and they create different incentives.</p>
<p><strong>The management fee</strong> is around 2% of committed capital per year. It pays salaries, rent, travel, legal costs, and everything else the firm needs to operate. Many funds charge the full fee during the investment period and a lower fee afterward. Over a ten-year life, fees and expenses often add up to 15 to 20% of a fund. That is why a $100M fund might only have about $80M to actually invest.</p>
<p><strong>Carried interest</strong>, or carry, is the GP's share of the profits, usually 20%. Carry is only paid after LPs get back the money they put in. Many funds also include a preferred return, often 8% a year, that LPs must receive before the GP earns any carry.</p>
<div class="note"><p class="note-title">Worked example: fees and carry</p>
<p>A $100M fund charges 2% a year for ten years, or $20M in fees, and invests the remaining $80M. Over its life the portfolio returns $300M.</p>
<p>LPs first get back their $100M. The remaining $200M is profit. The GP takes 20% of that profit, which is $40M, and LPs keep $160M of profit. In total, LPs receive $260M on $100M, a net return of 2.6x. The GP's carry, $40M, is twice what the firm earned in fees over ten years.</p></div>
<p>The lesson is in the ratio. Fees keep the lights on, but carry is where the real money is, and carry depends on the whole fund doing well. A GP who makes many safe investments that each return 1.5x will earn little or no carry. That pushes GPs toward deals that could produce very large outcomes.</p>

<h2>The power law</h2>
<p>If you remember one idea from this course, make it this one. Venture returns are not spread evenly across a portfolio. They follow a power law, where a tiny share of investments produces most of the gains.</p>
<div class="note"><p class="note-title">Worked example: one fund, 25 companies</p>
<p>A fund puts $1M into each of 25 companies, $25M in total. Ten years later, the results look like this:</p>
<table>
<thead><tr><th>Companies</th><th>Outcome</th><th>Returned</th></tr></thead>
<tbody>
<tr><td>12</td><td>Failed, returned nothing</td><td>$0</td></tr>
<tr><td>7</td><td>Returned about what was invested</td><td>$7M</td></tr>
<tr><td>4</td><td>Returned 3x</td><td>$12M</td></tr>
<tr><td>1</td><td>Returned 10x</td><td>$10M</td></tr>
<tr><td>1</td><td>Returned 50x</td><td>$50M</td></tr>
</tbody>
</table>
<p>Total returned: $79M on $25M, or about 3.2x gross. That is an excellent fund. Now remove the single 50x company. The other 24 companies returned $29M on $24M, about 1.2x, which is a poor result once fees are taken out.</p></div>
<p>One company out of 25 decided whether this fund was great or mediocre. This pattern shows up across decades of venture data. Most investments return less than the money put in, and the best fund in a vintage is usually the one that owned the biggest winner.</p>
<p>This has three consequences that shape everything else in this course:</p>
<ul>
<li><strong>Losing money on a deal is normal.</strong> A fund with a low failure rate is often a fund that took too little risk.</li>
<li><strong>Missing the winner is the real mistake.</strong> Investing in a company that fails costs you one check. Passing on the company that returns 50x costs you the fund.</li>
<li><strong>The size of the possible outcome matters more than the odds.</strong> A deal with a 10% chance of returning 50x is worth more to a venture fund than a deal with a 90% chance of returning 2x.</li>
</ul>

<h2>Return the fund</h2>
<p>Because one company has to carry the portfolio, investors ask a simple question about every deal: if this company works, could our stake return the entire fund on its own?</p>
<p>The math has three inputs: the size of the fund, how much of the company you own today, and how much that stake will shrink before the exit. Every new funding round issues new shares, so early investors get diluted. A common rough assumption is that an early stake shrinks by around 40 to 50% by the time the company exits.</p>
<div class="note"><p class="note-title">Worked example: what exit do you need?</p>
<p>You buy 10% of a company at seed. After later rounds, you expect to own about 6% at exit. To return the fund, the exit has to be worth fund size divided by 6%.</p>
<table>
<thead><tr><th>Fund size</th><th>Exit needed to return the fund at 6% ownership</th></tr></thead>
<tbody>
<tr><td>$20M</td><td>About $333M</td></tr>
<tr><td>$100M</td><td>About $1.7B</td></tr>
<tr><td>$500M</td><td>About $8.3B</td></tr>
</tbody>
</table></div>
<p>The same company can be a great deal for one fund and a bad deal for another. A software company that could plausibly sell for $400M is exciting for a $20M fund and nearly useless to a $500M fund. When you judge a deal, always judge it against the fund that would make it.</p>

<h2>Ownership times outcome</h2>
<p>Strip away the jargon and a venture return comes from two numbers multiplied together: how much of the company you own when it exits, and how much the company is worth when it does. That is why investors care so much about ownership targets, why they fight over allocation in hot rounds, and why price matters even for great companies.</p>
<p>Paying a higher valuation means owning less for the same check. If two funds each invest $2M, one at a $10M post-money valuation and one at a $20M post-money valuation, the first owns 20% and the second owns 10%. If the company sells for $500M, the first fund's stake (before dilution) is worth twice as much. Price does not decide whether a company succeeds, but it decides how much of that success you keep.</p>

<h2>The stages</h2>
<p>Companies raise money in rounds. Each stage has different risks, so investors look at different evidence. These ranges move with the market, so treat them as a rough map.</p>
<table>
<thead><tr><th>Stage</th><th>Typical company</th><th>What investors are mostly betting on</th></tr></thead>
<tbody>
<tr><td>Pre-seed</td><td>An idea or early product, few or no customers</td><td>The team and the size of the problem</td></tr>
<tr><td>Seed</td><td>A product with early users or revenue</td><td>Early signs that customers want it</td></tr>
<tr><td>Series A</td><td>Often $1M to $3M of annual revenue in software</td><td>A repeatable way to find and keep customers</td></tr>
<tr><td>Series B</td><td>A business that works and needs to scale</td><td>Efficient growth and a path to market leadership</td></tr>
<tr><td>Growth</td><td>A large business, sometimes near profitability</td><td>Durable growth, margins, and the eventual exit</td></tr>
</tbody>
</table>
<p>As companies move through stages, the chance of total failure falls and so does the size of the possible multiple. A pre-seed investment might return 100x or zero. A growth investment is more likely to return between 0.5x and 5x. Bigger funds usually invest later because they need to put large amounts of money to work, and later rounds are larger.</p>

<h2>How funds are scored</h2>
<p>You will hear four numbers whenever people talk about fund performance.</p>
<ul>
<li><strong>TVPI</strong> (total value to paid-in capital) adds the cash already returned to the estimated value of everything still held, then divides by what LPs paid in. A TVPI of 2.0x means the fund is worth twice what went in, on paper and in cash combined.</li>
<li><strong>DPI</strong> (distributions to paid-in capital) only counts cash that has actually come back to LPs. It cannot be marked up by a new funding round, so experienced LPs trust it more.</li>
<li><strong>IRR</strong> (internal rate of return) is an annualized return that accounts for timing. Returning 3x in five years is a much higher IRR than returning 3x in twelve.</li>
<li><strong>Gross versus net.</strong> Gross numbers are before fees and carry. Net numbers are what LPs actually receive. Always ask which one you are looking at.</li>
</ul>
<p>Young funds usually look bad on paper. Fees are paid from day one and failures show up early, while winners take years to grow. Value dips, then rises. This dip-and-recovery shape is called the J-curve, and it is the reason nobody can judge a venture fund well in its first few years.</p>

<h2>What this means when you look at a deal</h2>
<p>Everything above turns into a short set of habits:</p>
<ol>
<li>Ask what the company looks like if everything goes right, and whether that outcome is large enough for this fund.</li>
<li>Ask how much of the company you will own and what it costs. Ownership times outcome is the return.</li>
<li>Accept that most deals fail. Judge your decisions by the quality of your reasoning and by whether you found the outliers, not by your loss rate.</li>
<li>Remember that paper gains are not cash. A company marked up in a new round has not returned anything yet.</li>
</ol>

<h2>Common mistakes</h2>
<ul>
<li><strong>Optimizing for safety.</strong> Picking companies that will "probably return 2x" builds a portfolio that cannot produce venture returns.</li>
<li><strong>Ignoring fund size.</strong> A deal is only good or bad relative to the fund making it.</li>
<li><strong>Treating every investment as equal.</strong> In a power law, a few decisions matter far more than the rest, so the time spent on the biggest opportunities should be far greater.</li>
<li><strong>Celebrating markups.</strong> A higher valuation in a new round is a good sign, not a return.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A $50M fund owns 8% of a company at exit. How large does the exit need to be to return the fund?</summary><p>$50M divided by 8% is $625M. Anything smaller and this company cannot return the fund on its own.</p></details>
<details class="check"><summary>Why might a fund with only two failures out of twenty investments be a warning sign?</summary><p>A very low failure rate usually means the fund avoided risk, and in a power-law business that often means it also avoided the companies that could produce outsized returns.</p></details>
<details class="check"><summary>A fund reports a TVPI of 2.5x and a DPI of 0.3x in year six. What does that tell you?</summary><p>Most of the value is still on paper. Only 0.3x has come back as cash. The fund may be doing well, but its returns depend on companies that have not exited yet.</p></details>
`};
