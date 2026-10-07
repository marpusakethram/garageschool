window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['product-market-fit'] = {
short: [
  'Product-market fit means a group of customers wants the product enough that growth starts to pull the company forward.',
  'Retention is the best single signal. If the share of customers who stay flattens out instead of sliding toward zero, something real is happening.',
  'Expansion inside accounts, referrals, and customers who would be "very disappointed" without the product are the other strong signs.',
  'Pilots, paid acquisition, friends of the founders, and letters of intent can all fake fit for a while.',
  'Now that software is cheap to build, a good demo proves little. Ask whether the product holds something competitors cannot copy.'
],
body: `
<h2>What it means</h2>
<p>Product-market fit, usually shortened to PMF, is the point where a company has built something a clear group of customers truly wants. Before fit, every sale is hard. The founders push, discount, and personally hand-hold each customer. After fit, the feeling changes. Customers come back on their own, use the product more over time, ask for more, and tell other people about it.</p>
<p>PMF is not a single moment, and it is not binary. A company can have strong fit with one type of customer and none with another. It can have fit in one country and not the next. What investors want to know is how strong the pull is, how large the group of customers feeling it could become, and whether the evidence is real.</p>

<h2>Retention is the core signal</h2>
<p>If you only have time to look at one thing, look at retention. It answers the question that matters most: once people try the product, do they keep using it?</p>
<p>The standard way to see this is a cohort chart. A cohort is a group of customers who started in the same month. You track what share of each cohort is still active (or still paying) in each month after they started.</p>
<div class="note"><p class="note-title">Worked example: two retention curves</p>
<table>
<thead><tr><th>Months after signing up</th><th>1</th><th>2</th><th>3</th><th>6</th><th>9</th><th>12</th></tr></thead>
<tbody>
<tr><td>Company A, share still active</td><td>70%</td><td>55%</td><td>46%</td><td>38%</td><td>36%</td><td>35%</td></tr>
<tr><td>Company B, share still active</td><td>72%</td><td>52%</td><td>40%</td><td>24%</td><td>14%</td><td>8%</td></tr>
</tbody>
</table>
<p>Both companies lose a lot of users early, which is normal. The difference is what happens after. Company A's curve flattens around 35%. About a third of everyone who tries it becomes a long-term user, so every new customer adds to a growing base. Company B's curve keeps sliding toward zero. It has to replace almost every customer it acquires, which means growth depends entirely on spending more to acquire new ones.</p></div>
<p>A flattening curve is one of the clearest signs of fit. A curve that keeps falling is one of the clearest signs of its absence, no matter how fast top-line growth looks.</p>
<p>What counts as good depends on the business. Business software that people use for their jobs should keep most customers for years. Consumer apps lose far more users and can still be great businesses if the curve flattens at a healthy level. Compare a company with others of the same type, not with an abstract target.</p>

<h2>Other strong signals</h2>
<ul>
<li><strong>Expansion inside accounts.</strong> In business software, customers adding seats, teams, or products on their own initiative is one of the strongest signs there is. It shows up as net revenue retention above 100%, covered in Lesson 5.</li>
<li><strong>Referrals and word of mouth.</strong> When a large share of new customers comes from existing customers, the product is selling itself.</li>
<li><strong>Usage frequency.</strong> How often people use the product compared with how often the problem comes up. A tool for a daily task that people open daily is in good shape. The ratio of daily to monthly active users is a common measure for consumer products.</li>
<li><strong>Customers who would be very disappointed without it.</strong> Ask users how they would feel if they could no longer use the product. A widely used rule of thumb, popularized by Sean Ellis, is that fit is likely when around 40% or more answer "very disappointed."</li>
<li><strong>Pull for features.</strong> Customers asking for more, and complaining when something breaks, is a good sign. Silence often means indifference.</li>
</ul>

<h2>Signals that look like fit and are not</h2>
<p>Early metrics are easy to inflate, often without anyone meaning to. Watch for these:</p>
<table>
<thead><tr><th>Looks like</th><th>Might really be</th><th>What to check</th></tr></thead>
<tbody>
<tr><td>Many pilots</td><td>Free trials nobody intends to convert</td><td>How many pilots became paid contracts, and how fast</td></tr>
<tr><td>Fast user growth</td><td>Paid advertising that stops when spending stops</td><td>Growth from organic channels and referrals</td></tr>
<tr><td>Happy early customers</td><td>Friends and contacts of the founders</td><td>Customers who found the company on their own</td></tr>
<tr><td>Letters of intent</td><td>Polite interest with no commitment</td><td>Signed contracts with money attached</td></tr>
<tr><td>High sign-ups</td><td>Curiosity, especially for AI products</td><td>Usage after the first month</td></tr>
<tr><td>One large customer</td><td>A consulting project for one buyer</td><td>Whether other customers want the same product</td></tr>
</tbody>
</table>

<h2>Pull versus push</h2>
<p>A useful way to think about fit is the difference between pull and push. Push is when the company drags each customer forward: long sales cycles, heavy discounting, custom work for each deal, and the founders personally keeping accounts alive. Pull is when customers drag the company forward: they find it, ask for it, buy it quickly, and use it more than expected.</p>
<p>Ask founders to describe their last five sales. If every story involves months of persuasion and special terms, you are looking at push. If several involve a customer who found them, signed fast, and expanded, you are looking at pull.</p>

<h2>Fit when building is cheap</h2>
<p>AI tools have made it far faster and cheaper to build software. That is good news for founders and a real problem for investors, because a polished product no longer proves much. When a competent team can build a convincing version of almost any app in weeks, many companies will look the same in a demo.</p>
<p>The questions shift as a result:</p>
<ul>
<li><strong>Does the product hold something hard to copy?</strong> Proprietary data, deep integration into how customers work, or a network of users are hard to rebuild. A thin layer of prompts on top of a model anyone can call is not.</li>
<li><strong>Is the company the system of record?</strong> Products that become the place where customer data and work live are much stickier than products that sit on top of someone else's system.</li>
<li><strong>Do customers stay when alternatives appear?</strong> Thin products often grow fast and then lose customers as cheaper copies arrive. Watch retention after the first wave of competitors.</li>
<li><strong>Does usage drive improvement?</strong> If the product gets better as more customers use it, through feedback, data, or tuning, early leads can compound.</li>
</ul>

<h2>Fit by stage</h2>
<table>
<thead><tr><th>Stage</th><th>What reasonable evidence looks like</th></tr></thead>
<tbody>
<tr><td>Pre-seed</td><td>A painful, frequent problem. A few early users who engage deeply and give detailed feedback.</td></tr>
<tr><td>Seed</td><td>First paying customers. Retention that is starting to flatten. Some customers arriving without founder outreach.</td></tr>
<tr><td>Series A</td><td>Clear fit with a defined customer type, and a repeatable way to find and win more of them.</td></tr>
<tr><td>Series B and later</td><td>Fit extending to new segments or products, with strong expansion revenue from existing customers.</td></tr>
</tbody>
</table>

<h2>Talking to customers</h2>
<p>Customer calls are the best way to test fit yourself. Ask the company for a few customers, and find at least one on your own. Then ask:</p>
<ul>
<li>"What were you using before, and why did you switch?"</li>
<li>"How often do you use it, and for what?"</li>
<li>"What would you do if it disappeared tomorrow?"</li>
<li>"Have you recommended it to anyone?"</li>
<li>"What is the one thing you wish it did better?"</li>
</ul>
<p>Listen for specific, unprompted detail. Customers with real need describe exactly how the product fits into their work. Customers being polite give general praise.</p>

<h2>Common mistakes</h2>
<ul>
<li>Treating revenue growth as proof of fit without checking retention.</li>
<li>Counting pilots and letters of intent as if they were revenue.</li>
<li>Judging consumer retention against business software benchmarks, or the reverse.</li>
<li>Being impressed by a demo instead of asking what makes the product hard to copy.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A company grew from 1,000 to 10,000 users in six months, but each monthly cohort keeps shrinking toward zero. Does it have product-market fit?</summary><p>Probably not. Fast growth with retention that never flattens means the company is replacing users, not building a base. Check where the growth came from; it is often paid acquisition.</p></details>
<details class="check"><summary>Why is net revenue retention above 100% such a strong signal for business software?</summary><p>It means existing customers spend more over time on their own. That is hard to fake and shows the product is becoming more valuable to them as they use it.</p></details>
<details class="check"><summary>Two AI writing tools have the same growth. One stores each customer's documents, style guides, and approval workflows. The other is a simple prompt interface. Which is more likely to keep its customers?</summary><p>The first. It holds customer data and workflow that would be painful to move, so switching costs rise with use. The second can be replaced by any similar tool.</p></details>
`};
