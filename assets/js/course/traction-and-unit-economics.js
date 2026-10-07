window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['traction-and-unit-economics'] = {
short: [
  'ARR is a snapshot. Growth rate, retention, and how efficiently that revenue was bought tell you whether it is good revenue.',
  'Net revenue retention above 100% means existing customers grow on their own. It is one of the strongest numbers in software.',
  'Burn multiple (cash burned divided by new ARR) is the quickest test of efficiency. Under 1.5x is good. Above 3x is a warning.',
  'Gross margin decides how much each dollar of revenue is worth. AI products often run lower margins, so ask how costs per task are falling.',
  'Always ask how a number was produced. The metric rarely lies, but the definition behind it often flatters.'
],
body: `
<h2>Revenue: what is being counted</h2>
<p>For subscription businesses, the headline number is <strong>annual recurring revenue</strong>, or ARR. It is the yearly value of the subscription contracts in place today. <strong>Monthly recurring revenue</strong>, or MRR, is the same thing per month. ARR equals MRR times twelve.</p>
<p>ARR is useful because it shows the revenue the company will keep earning if nothing changes. But it is easy to inflate, so check what is in it:</p>
<ul>
<li><strong>One-time fees.</strong> Setup charges, consulting, and implementation work are not recurring and should not be in ARR.</li>
<li><strong>Bookings versus live revenue.</strong> A signed contract that starts in six months is a booking. Some founders count it as ARR already.</li>
<li><strong>Usage revenue.</strong> For usage-based pricing, ask whether "ARR" is last month times twelve. A single busy month can overstate it badly.</li>
<li><strong>Marketplaces.</strong> Gross merchandise value, the total spent on the platform, is not revenue. The company's revenue is its take, often 10 to 25% of the total.</li>
</ul>

<h2>Growth</h2>
<p>Investors care less about the size of revenue than how fast it is growing and how predictable that growth is. There are no fixed rules, but these patterns are common for software companies that raise their next round easily:</p>
<table>
<thead><tr><th>Stage</th><th>Typical ARR</th><th>Growth that gets attention</th></tr></thead>
<tbody>
<tr><td>Seed</td><td>Zero to about $1M</td><td>10 to 20% month over month</td></tr>
<tr><td>Series A</td><td>Often $1M to $3M</td><td>Two to three times year over year</td></tr>
<tr><td>Series B</td><td>Often $5M to $15M</td><td>About two times year over year</td></tr>
<tr><td>Growth</td><td>$20M and up</td><td>50% or more a year, with improving efficiency</td></tr>
</tbody>
</table>
<p>A well-known benchmark for software companies is "triple, triple, double, double, double": tripling revenue two years in a row, then doubling three times. A company that does this goes from $2M to over $140M in five years. Few companies do it, but it gives a sense of the pace that produces large outcomes.</p>
<p>Look at the shape of growth, not just the rate. Steady growth from many customers is worth more than the same growth from two large contracts. And growth that is speeding up is worth more than growth that is slowing down.</p>

<h2>Retention in dollars</h2>
<p>Lesson 4 covered retention of users. For revenue, two numbers matter.</p>
<p><strong>Gross revenue retention</strong> (GRR) asks how much revenue from last year's customers you kept, counting only losses: churned customers and downgrades. It can never be above 100%.</p>
<p><strong>Net revenue retention</strong> (NRR) asks the same question but also counts expansion: upgrades, more seats, more usage.</p>
<div class="note"><p class="note-title">Worked example: calculating retention</p>
<p>A year ago, a group of customers paid $1,000,000 a year in total. Since then:</p>
<ul><li>Customers who left took $80,000 with them.</li><li>Customers who downgraded reduced spending by $40,000.</li><li>Customers who expanded added $320,000.</li></ul>
<p>Gross revenue retention: ($1,000,000 minus $80,000 minus $40,000) divided by $1,000,000 = 88%.</p>
<p>Net revenue retention: ($1,000,000 minus $80,000 minus $40,000 plus $320,000) divided by $1,000,000 = 120%.</p>
<p>This company's existing customers grew 20% without a single new sale.</p></div>
<p>As rough guides for business software: NRR above 110% is good, above 120% is strong, and below 100% means the company has to sell new customers just to stand still. Small-business products usually run lower than enterprise products because small businesses close and switch more often.</p>

<h2>Gross margin</h2>
<p>Gross margin is revenue minus the direct cost of delivering the product, divided by revenue. For software, direct costs include hosting, third-party services, and customer support. Traditional software runs gross margins of 75 to 85%, because serving one more customer costs very little.</p>
<p>Gross margin matters because it decides how much each dollar of revenue is worth. A dollar of revenue at 80% margin produces 80 cents to spend on growth and profit. A dollar at 40% produces 40 cents. That is why investors value high-margin revenue at a higher multiple.</p>

<h2>AI margins</h2>
<p>Products built on large AI models are different. Every request costs money in compute, and the heaviest users can cost more than they pay. Many AI products start with gross margins of 40 to 60%.</p>
<div class="note"><p class="note-title">Worked example: margin on an AI product</p>
<p>A product charges $50 a month per user. The average user runs 400 tasks a month, and each task costs 6 cents in model and compute costs. Hosting and support add $4 per user.</p>
<p>Cost per user: 400 times $0.06 = $24, plus $4 = $28. Gross margin: ($50 minus $28) divided by $50 = 44%.</p>
<p>If model costs fall by half, cost per user drops to $16 and margin rises to 68%. If heavy users triple their usage on a flat price, margin can turn negative for them.</p></div>
<p>Low margins are not automatically a problem, because model prices have been falling quickly. But they change the questions you should ask. How fast is cost per task falling? Can the company send simpler requests to cheaper models? Does pricing rise with usage, so heavy users pay for what they use?</p>

<h2>What growth costs</h2>
<p><strong>Customer acquisition cost</strong>, or CAC, is the total sales and marketing spend in a period divided by the number of new customers won. If a company spent $600,000 on sales and marketing last quarter and won 200 customers, its CAC was $3,000.</p>
<p><strong>CAC payback</strong> is how many months of gross profit it takes to earn back that cost. If each customer pays $250 a month at 80% gross margin, they produce $200 of gross profit a month, so payback is $3,000 divided by $200 = 15 months. Under 12 months is excellent, 12 to 18 is healthy for many business software companies, and over 24 months is a concern unless retention is exceptional.</p>
<p><strong>LTV to CAC</strong> compares the lifetime gross profit of a customer to what it cost to acquire them. A ratio of 3 or more is the usual target. Be careful with LTV: it depends on an estimate of how long customers stay, and young companies do not have enough history to know. A company with 18 months of data claiming customers stay ten years is guessing.</p>

<h2>Burn multiple</h2>
<p>The quickest test of efficiency is the <strong>burn multiple</strong>: net cash burned in a period divided by net new ARR added in the same period.</p>
<div class="note"><p class="note-title">Worked example: burn multiple</p>
<p>Last year, Company A burned $8M and added $6M of net new ARR. Burn multiple: 8 divided by 6 = 1.3x.</p>
<p>Company B burned $15M and added $4M. Burn multiple: 15 divided by 4 = 3.75x.</p>
<p>Both grew. Company A spent about $1.30 for each dollar of new recurring revenue. Company B spent almost $4. If capital becomes scarce, Company A can keep growing. Company B may not survive.</p></div>
<p>As a rough guide: under 1x is excellent, 1x to 1.5x is good, 1.5x to 2x is acceptable, and above 3x needs a strong explanation. Very early companies often run high burn multiples because there is little ARR to divide by, so this measure is most useful from Series A onward.</p>

<h2>Runway and the rule of 40</h2>
<p><strong>Runway</strong> is how many months a company can operate before it runs out of cash: cash in the bank divided by monthly net burn. A company raising money with less than six months of runway is negotiating from weakness, and investors know it. Most companies try to raise enough to last 18 to 24 months.</p>
<p>For later-stage software companies, investors often use the <strong>rule of 40</strong>: growth rate plus profit margin should be at least 40%. A company growing 60% a year while losing 20% of revenue scores 40. So does one growing 20% with a 20% profit margin. It is a simple way to compare growth against efficiency.</p>

<h2>Quality of revenue</h2>
<p>Two companies with the same ARR can be very different investments. Before you trust a revenue number, check:</p>
<ul>
<li><strong>Concentration.</strong> Does any single customer account for more than 15 to 20% of revenue? Losing them would hurt badly.</li>
<li><strong>Contract terms.</strong> Annual contracts paid upfront are stronger than month-to-month plans.</li>
<li><strong>Discounts.</strong> Is revenue propped up by heavy first-year discounts that will be hard to remove at renewal?</li>
<li><strong>Source of growth.</strong> Did growth come from many customers through a repeatable channel, or from a few deals the founders closed personally?</li>
<li><strong>Trend.</strong> Monthly numbers for the last 12 to 18 months tell you far more than a single year-end figure.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A company has $2M of ARR. Last year it had $1M of ARR from the same customers, plus $1M from new ones. Its customers from last year now pay $1.25M. What is its net revenue retention?</summary><p>125%. Last year's customers went from $1M to $1.25M.</p></details>
<details class="check"><summary>Company X burned $10M to add $5M of net new ARR. Company Y burned $4M to add $4M. Which is more efficient?</summary><p>Company Y, with a burn multiple of 1x against Company X's 2x.</p></details>
<details class="check"><summary>An AI product has a 45% gross margin. Name two questions you would ask before deciding whether that is a problem.</summary><p>How fast is the cost per task falling, and does pricing rise with usage so heavy users pay more? Others: can tasks be routed to cheaper models, and how do margins differ between light and heavy users?</p></details>
`};
