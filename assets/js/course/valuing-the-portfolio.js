window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['valuing-the-portfolio'] = {
short: [
  'Funds report the value of unsold companies at fair value each quarter, often called marks. Most follow accounting rules and industry valuation guidelines.',
  'The latest priced round is a common starting point, but marks should change when a company clearly does better or worse.',
  'TVPI counts unsold value; DPI counts only cash returned. LPs care increasingly about DPI because paper gains can disappear.',
  'A quarterly LP report covers performance, cash flows, each company\'s progress, and changes in marks, with honest commentary.',
  'Late in a fund\'s life, managers may sell stakes on the secondary market or move companies into continuation funds to return cash.'
],
body: `
<h2>Why valuation matters</h2>
<p>A venture fund holds companies that are not traded on a stock market, so nobody can look up their price. Still, LPs need to know what their investment is worth, and funds need numbers to report performance and raise their next fund. So each quarter, managers estimate the value of each company. These estimates are called marks.</p>

<h2>How companies are marked</h2>
<p>In the US, funds report fair value under accounting standards, and many follow the International Private Equity and Venture Capital (IPEV) valuation guidelines. In practice, early-stage funds usually start from a few methods:</p>
<ul>
  <li><strong>Recent round price:</strong> the price in the latest financing, especially if new outside investors set it. Common for young companies.</li>
  <li><strong>Adjustments for progress:</strong> moving the mark up or down when the company clearly beats or misses its plan since that round.</li>
  <li><strong>Market comparables:</strong> applying revenue multiples of similar public or recently sold companies, used more for later-stage companies.</li>
  <li><strong>Write-downs:</strong> marking a company down, sometimes to zero, when it is failing or out of cash.</li>
</ul>
<p>Preferred shares also have rights, such as liquidation preferences, that make them worth more than common shares in many outcomes. More careful valuations account for this.</p>
<div class="note"><p class="note-title">Honest marks</p><p>Marks that stay at the last round price for years, even as a company struggles, mislead LPs. Experienced LPs look at how quickly a manager marks companies down, and they trust managers who do it promptly.</p></div>

<h2>Fund performance numbers</h2>
<p>Lesson 10 of the VC course explains fund math. The key reporting metrics:</p>
<table>
  <thead><tr><th>Metric</th><th>What it measures</th></tr></thead>
  <tbody>
    <tr><td>TVPI</td><td>Total value to paid-in: cash returned plus the value of remaining holdings, divided by what LPs paid in.</td></tr>
    <tr><td>DPI</td><td>Distributions to paid-in: only cash actually returned, divided by what LPs paid in.</td></tr>
    <tr><td>RVPI</td><td>Residual value to paid-in: the value still held. TVPI equals DPI plus RVPI.</td></tr>
    <tr><td>Net IRR</td><td>The annual return to LPs after fees and carry, taking timing into account.</td></tr>
  </tbody>
</table>
<p>A fund with a TVPI of 2.5x and a DPI of 0.3x has mostly paper gains. After a period of high valuations followed by a slowdown, many LPs learned that paper gains can shrink, so DPI gets close attention. The LP report at the end of each VentureSchool test shows all of these for your fund.</p>

<h2>The quarterly LP report</h2>
<p>Most funds send LPs a report every quarter. A good one includes:</p>
<ul>
  <li>A letter from the managers: what happened, what they learned, and what comes next.</li>
  <li>Fund performance: TVPI, DPI, RVPI, and net IRR.</li>
  <li>Capital account: how much each LP has committed, paid in, and received.</li>
  <li>A schedule of investments: each company, cost, current value, and ownership.</li>
  <li>Short notes on major companies: progress, risks, and changes in marks.</li>
</ul>
<p>Portfolio associates often prepare much of this. The skill that matters most is honesty: good news and bad news in the same plain language.</p>

<h2>Getting cash back: exits, secondaries, and continuation funds</h2>
<p>Funds return cash when companies are sold or go public. But companies now often stay private for many years, longer than a fund's planned life. Managers have other ways to return cash:</p>
<ul>
  <li><strong>Secondary sales:</strong> selling part of a stake to another investor, often at a discount to the latest mark.</li>
  <li><strong>Continuation funds:</strong> moving one or more companies into a new vehicle, so existing LPs can cash out or roll over while the manager keeps holding.</li>
</ul>
<p>Selling a stake in a winner early locks in cash but gives up some upside. Managers weigh this against LPs' need for returns.</p>

<h2>Check your understanding</h2>
<details class="check"><summary>A fund has returned $20M in cash and holds companies marked at $80M. LPs paid in $50M. What are its DPI and TVPI?</summary><p>DPI is 0.4x (20 divided by 50). TVPI is 2.0x (100 divided by 50).</p></details>
<details class="check"><summary>Why do LPs pay close attention to DPI?</summary><p>Because it counts only cash actually returned. Paper value in TVPI can fall when markets change or companies struggle.</p></details>
<details class="check"><summary>What is the most common starting point for marking a young company?</summary><p>The price of its most recent financing round, adjusted when the company clearly does better or worse since then.</p></details>
`
};
