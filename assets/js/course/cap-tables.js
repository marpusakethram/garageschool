window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['cap-tables'] = {
short: [
  'A cap table is a list of every owner and how many shares they hold. Percentages come from shares, never the other way around.',
  'Build it one event at a time: founding, option pool, each SAFE conversion, each priced round. After every event, total the shares and recompute every percentage.',
  'A post-money SAFE gives its holder a fixed percentage just before the next priced round: amount divided by the post-money cap.',
  'In a priced round, price per share is the pre-money valuation divided by pre-money fully diluted shares. New shares equal the investment divided by that price.',
  'Pool increases required by new investors are added before the new money, so they dilute existing owners but not the new investor.'
],
body: `
<h2>Shares first, percentages second</h2>
<p>The single most important habit with cap tables is to track shares, not percentages. Percentages change every time new shares are issued. Shares only change when someone actually receives or gives up shares. If you keep a clean count of shares after every event, the percentages are always just each holder's shares divided by the total.</p>
<p>We will build one company's cap table from founding through a Series A. The GarageSchool cap table workshop gives you new numbers each time, but the steps are always these five.</p>

<h2>Step 1: founding</h2>
<p>Two founders start a company and issue themselves 10,000,000 shares: 6,000,000 to Founder A and 4,000,000 to Founder B.</p>
<table>
<thead><tr><th>Holder</th><th>Shares</th><th>Ownership</th></tr></thead>
<tbody>
<tr><td>Founder A</td><td>6,000,000</td><td>60.0%</td></tr>
<tr><td>Founder B</td><td>4,000,000</td><td>40.0%</td></tr>
<tr><td><strong>Total</strong></td><td><strong>10,000,000</strong></td><td>100%</td></tr>
</tbody>
</table>

<h2>Step 2: the option pool</h2>
<p>The company reserves 1,000,000 shares for future employees. These are new shares, so the total grows to 11,000,000 and both founders are diluted.</p>
<table>
<thead><tr><th>Holder</th><th>Shares</th><th>Ownership</th></tr></thead>
<tbody>
<tr><td>Founder A</td><td>6,000,000</td><td>54.5%</td></tr>
<tr><td>Founder B</td><td>4,000,000</td><td>36.4%</td></tr>
<tr><td>Option pool</td><td>1,000,000</td><td>9.1%</td></tr>
<tr><td><strong>Total</strong></td><td><strong>11,000,000</strong></td><td>100%</td></tr>
</tbody>
</table>

<h2>Step 3: a post-money SAFE converts</h2>
<p>Before the seed round, an angel invested $500,000 on a post-money SAFE with a $5M cap. A post-money SAFE gives its holder the investment divided by the cap, here $500,000 divided by $5,000,000 = 10%, of the company just before the next priced round's new money.</p>
<p>To find the number of shares, remember that the SAFE holder must end up with 10% of the new total. The existing 11,000,000 shares will be the other 90%.</p>
<div class="note"><p class="note-title">The formula</p>
<p>SAFE shares = existing shares times SAFE percentage, divided by (1 minus SAFE percentage).</p>
<p>11,000,000 times 0.10 divided by 0.90 = 1,222,222 shares.</p></div>
<table>
<thead><tr><th>Holder</th><th>Shares</th><th>Ownership</th></tr></thead>
<tbody>
<tr><td>Founder A</td><td>6,000,000</td><td>49.1%</td></tr>
<tr><td>Founder B</td><td>4,000,000</td><td>32.7%</td></tr>
<tr><td>Option pool</td><td>1,000,000</td><td>8.2%</td></tr>
<tr><td>SAFE holder</td><td>1,222,222</td><td>10.0%</td></tr>
<tr><td><strong>Total</strong></td><td><strong>12,222,222</strong></td><td>100%</td></tr>
</tbody>
</table>
<p>If there are several SAFEs, each one's percentage is its own amount divided by its own cap, and together they take their combined percentage. Real SAFE math has more detail, for example around how pool increases are counted, but this is the core of it.</p>

<h2>Step 4: the seed round</h2>
<p>A seed investor puts in $2,000,000 at an $8,000,000 pre-money valuation. There is no pool change in this round.</p>
<div class="note"><p class="note-title">The three numbers to compute</p>
<ul>
<li>Price per share = pre-money valuation divided by pre-money fully diluted shares = $8,000,000 divided by 12,222,222 = $0.6545.</li>
<li>New shares = investment divided by price = $2,000,000 divided by $0.6545 = 3,055,556 shares.</li>
<li>Check: post-money is $10M, so the investor should own 20%. 3,055,556 divided by 15,277,778 = 20.0%.</li>
</ul></div>
<table>
<thead><tr><th>Holder</th><th>Shares</th><th>Ownership</th></tr></thead>
<tbody>
<tr><td>Founder A</td><td>6,000,000</td><td>39.3%</td></tr>
<tr><td>Founder B</td><td>4,000,000</td><td>26.2%</td></tr>
<tr><td>Option pool</td><td>1,000,000</td><td>6.5%</td></tr>
<tr><td>SAFE holder</td><td>1,222,222</td><td>8.0%</td></tr>
<tr><td>Seed investor</td><td>3,055,556</td><td>20.0%</td></tr>
<tr><td><strong>Total</strong></td><td><strong>15,277,778</strong></td><td>100%</td></tr>
</tbody>
</table>

<h2>Step 5: a Series A with a pool increase</h2>
<p>A Series A investor offers $6,000,000 at a $24,000,000 pre-money valuation, on the condition that the unused option pool is 12% of the company after the round. Assume none of the existing pool has been granted yet.</p>
<p>This is the trickiest step, because the pool increase and the investor's shares both depend on the final total. Work it in terms of the final total, N.</p>
<div class="note"><p class="note-title">Working it through</p>
<ul>
<li>The investor owns $6M divided by $30M post-money = 20% of N.</li>
<li>The pool must be 12% of N.</li>
<li>Everyone else (founders, SAFE holder, seed investor) keeps their 14,277,778 shares, which must be the remaining 68% of N.</li>
<li>N = 14,277,778 divided by 0.68 = 20,996,732.</li>
<li>Series A shares: 20% of N = 4,199,346. Pool: 12% of N = 2,519,608, which is 1,519,608 more than the current 1,000,000.</li>
<li>Price per share: $24M divided by (N minus Series A shares) = $24M divided by 16,797,386 = $1.4288.</li>
</ul></div>
<table>
<thead><tr><th>Holder</th><th>Shares</th><th>Ownership</th></tr></thead>
<tbody>
<tr><td>Founder A</td><td>6,000,000</td><td>28.6%</td></tr>
<tr><td>Founder B</td><td>4,000,000</td><td>19.1%</td></tr>
<tr><td>Option pool</td><td>2,519,608</td><td>12.0%</td></tr>
<tr><td>SAFE holder</td><td>1,222,222</td><td>5.8%</td></tr>
<tr><td>Seed investor</td><td>3,055,556</td><td>14.6%</td></tr>
<tr><td>Series A investor</td><td>4,199,346</td><td>20.0%</td></tr>
<tr><td><strong>Total</strong></td><td><strong>20,996,732</strong></td><td>100%</td></tr>
</tbody>
</table>
<p>Look at what happened across the five steps. Founder A went from 60% to 28.6%. The seed investor went from 20% to 14.6% in one round. That is normal, and it is why investors keep reserves and why founders should model dilution before every raise.</p>

<h2>Common mistakes</h2>
<ul>
<li><strong>Working in percentages.</strong> You will lose track. Always update shares, then recompute.</li>
<li><strong>Forgetting the pool.</strong> Unused options count in fully diluted shares.</li>
<li><strong>Ignoring SAFEs.</strong> Until they convert, SAFEs are invisible on a share count, but they are real ownership.</li>
<li><strong>Putting the pool increase after the new money.</strong> Investors almost always require it before, so it dilutes existing owners only.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A company has 8,000,000 shares. A post-money SAFE converts at 12.5%. How many shares does the SAFE holder get?</summary><p>8,000,000 times 0.125 divided by 0.875 = 1,142,857 shares.</p></details>
<details class="check"><summary>Pre-money valuation is $12M and pre-money fully diluted shares are 10,000,000. An investor puts in $3M. What is the price per share, and how many shares are issued?</summary><p>Price is $1.20. New shares: $3M divided by $1.20 = 2,500,000. The investor owns 20% of 12,500,000.</p></details>
<details class="check"><summary>Why does a pool increase required before the round not dilute the new investor?</summary><p>The investor's percentage is fixed by the post-money valuation. The pool is created in the pre-money share count, so its cost falls entirely on the existing shareholders.</p></details>
`};
