window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['reserves-and-follow-ons'] = {
short: [
  'Reserves are money a fund sets aside to invest again in companies it already backs. Early-stage funds often reserve around half of their investable capital, though it varies widely.',
  'Follow-on money should go where it earns the most, usually to the strongest companies, not to the ones that need rescuing.',
  'Pro rata rights let a fund keep its ownership in later rounds. Using them in the best companies is often one of a fund\'s best investments.',
  'Ask the same question for every follow-on: would we invest in this round, at this price, if we were seeing the company for the first time?',
  'Not following on sends a signal to other investors. Plan reserves early, so you are not forced into decisions by lack of money.'
],
body: `
<h2>What reserves are</h2>
<p>When a fund makes a first investment, it usually expects to invest again in later rounds. The money set aside for that is called reserves. If a $50M fund has $42M to invest after fees, it might put $21M into first checks and keep $21M in reserve. The partner tests in VentureSim give you a fixed number of follow-on checks to make these choices yourself.</p>
<p>Reserve levels vary. Pre-seed funds that write many small checks may reserve less and rely on later investors. Funds that lead seed and Series A rounds often reserve more, sometimes more than half. There is no right number, but there must be a plan.</p>

<h2>Why follow-ons matter</h2>
<p>In a successful company, each round dilutes earlier investors. A fund that owns 10% after the seed might own 6% after two more rounds if it does nothing. Investing its pro rata share in each round keeps it near 10%. In a company that becomes the fund's biggest winner, that difference can be worth more than many other investments put together.</p>
<div class="note"><p class="note-title">Pro rata, worked through</p><p>A fund owns 10% of a company. The company raises a Series A that sells 20% of the company to new investors. Without investing, the fund falls to 8% (10% times 0.8). To stay at 10%, it must buy 10% of the new round, which is 2% of the company after the round. If the round is $10M, that costs $1M.</p></div>

<h2>How to decide</h2>
<p>Funds use different methods, but most good ones come back to the same test: would we invest in this round, at this price, if we were seeing the company for the first time? A follow-on is a new investment decision. Money already invested is gone; it should not influence the choice.</p>
<p>Useful questions:</p>
<ul>
  <li><strong>Is the company working better than when we invested?</strong> Look at the same metrics you would check in a new deal.</li>
  <li><strong>Is the price fair for the progress?</strong> A big jump in valuation with little progress lowers the return on new money.</li>
  <li><strong>Who is leading the round?</strong> A strong new lead investor setting the price is a useful outside check.</li>
  <li><strong>How much could this company return?</strong> More money belongs where the upside is largest.</li>
  <li><strong>What does the fund have left?</strong> Money spent here cannot go to another company.</li>
</ul>

<h2>The traps</h2>
<ul>
  <li><strong>Rescue investing:</strong> putting more money into struggling companies because the fund already owns them. Sometimes a bridge to a clear milestone makes sense, but repeated rescues drain reserves from the winners.</li>
  <li><strong>Running out:</strong> spending reserves early, then being unable to support the best company when it raises a big round.</li>
  <li><strong>Even spreading:</strong> giving every company the same follow-on. Returns are not even, so reserves should not be either.</li>
  <li><strong>Ignoring signaling:</strong> when an existing lead investor does not invest in the next round, new investors notice and may ask why. That does not mean a fund must always follow on, but it should know the cost of not doing so and talk to the founder openly.</li>
</ul>

<h2>Bridges and inside rounds</h2>
<p>Sometimes a company needs money before it can raise a full round from new investors. Existing investors may provide a bridge, often a SAFE or convertible note, to give it a few more months. A bridge makes sense when it funds the company to a specific, believable milestone that will make a new round possible. It makes less sense when the plan is to wait and hope.</p>
<p>An inside round is a full round led by existing investors with no new lead. It can be a sign of strong conviction or a sign that outside investors were not interested. Investors look carefully at which one it is.</p>

<h2>Check your understanding</h2>
<details class="check"><summary>A fund owns 8% of a company. The new round sells 25% of the company. What does the fund own after the round if it does not invest?</summary><p>6%. Its stake is multiplied by 0.75, the share the old holders keep.</p></details>
<details class="check"><summary>What is the main test for a follow-on investment?</summary><p>Would we invest in this round, at this price, if we were seeing the company for the first time? Money already invested should not change the answer.</p></details>
<details class="check"><summary>When does a bridge round make sense?</summary><p>When it funds the company to a specific, believable milestone that makes a new round possible, not when it only buys time.</p></details>
`
};
