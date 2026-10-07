window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['risk-and-diligence'] = {
short: [
  'Diligence does not remove risk. It tells you which risks you are taking and catches the surprises a few calls would have found.',
  'Start by writing what must be true for this to be a great investment. Then spend most of your time testing the two or three most uncertain items.',
  'Customer calls, off-list references, and raw data behind the headline metrics produce more signal than anything else.',
  'Write a short memo that states a view and names the real risks. A memo with no weaknesses makes partners trust you less.',
  'Before deciding, imagine the investment failed and ask why. This "pre-mortem" surfaces risks that optimism hides.'
],
body: `
<h2>What diligence is for</h2>
<p>Every startup investment is risky. Most fail. The point of diligence is not to find a company with no risk, because that company does not exist. The point is to understand which risks you are taking, decide whether the possible reward is worth them, and avoid losses that a few hours of checking would have prevented.</p>
<p>Diligence also has a cost. Time spent on one company is time not spent finding the next. And in competitive rounds, a fund that takes six weeks will lose deals to funds that take one. Good diligence is focused, fast, and honest.</p>

<h2>The kinds of risk</h2>
<table>
<thead><tr><th>Risk</th><th>The question</th><th>Where it shows up</th></tr></thead>
<tbody>
<tr><td>Team</td><td>Can these people build this company?</td><td>Gaps in skills, cofounder conflict, a founder who is not fully committed</td></tr>
<tr><td>Market</td><td>Is the market large enough, and will customers pay?</td><td>Small or slow-growing markets, buyers without budget</td></tr>
<tr><td>Product and technical</td><td>Will the product work, and work at scale?</td><td>Unproven technology, hard engineering problems</td></tr>
<tr><td>Go-to-market</td><td>Can they find and win customers at a reasonable cost?</td><td>Long sales cycles, high acquisition costs</td></tr>
<tr><td>Financing</td><td>Will they get to the next milestone before money runs out?</td><td>Short runway, a plan that needs more capital than the round provides</td></tr>
<tr><td>Concentration</td><td>Does too much depend on one thing?</td><td>One large customer, one platform, one supplier</td></tr>
<tr><td>Regulatory and legal</td><td>Could rules or lawsuits change the business?</td><td>Pending approvals, unclear legal status, disputes over IP</td></tr>
</tbody>
</table>
<p>Different stages carry different risks. A pre-seed company is mostly team and market risk. A growth company is mostly go-to-market and financing risk. Match your diligence to the stage.</p>

<h2>Start with "what must be true"</h2>
<p>Before you do any calls, write down what would have to be true for this to be a great investment. Keep it to five or six statements. For example:</p>
<div class="note"><p class="note-title">Worked example: what must be true</p>
<p>For a seed investment in AI bookkeeping software for restaurants:</p>
<ol>
<li>Restaurants will trust software with their books if accuracy is high.</li>
<li>Customers stay for years once onboarded. (Current data: 128% net revenue retention, low churn.)</li>
<li>Gross margins can rise from 58% toward 75% as model costs fall.</li>
<li>The company can win customers through restaurant software partners rather than expensive direct sales.</li>
<li>The team can hire accountants and engineers fast enough to support growth.</li>
</ol>
<p>Then rate how confident you are in each. Item 2 already has evidence. Items 3 and 4 are the biggest unknowns. That is where diligence time should go.</p></div>
<p>This exercise keeps diligence from becoming a checklist you work through mechanically. It points your limited time at the questions that would actually change your decision.</p>

<h2>The diligence that pays off most</h2>
<p><strong>Customer calls.</strong> Talk to at least three customers, including at least one the company did not introduce. Ask what they used before, why they switched, how often they use the product, and what they would do if it disappeared. Customers who depend on a product describe specific ways it fits into their work. Customers being polite say general nice things.</p>
<p><strong>Reference calls on the founders.</strong> Lesson 3 covers how. Off-list references matter most.</p>
<p><strong>The raw data behind the headline numbers.</strong> Ask for revenue by customer by month for the last 12 to 24 months. From that one spreadsheet you can rebuild ARR, growth, churn, net revenue retention, and concentration yourself. If the founders' numbers do not match what you rebuild, find out why.</p>
<p><strong>The cap table and legal basics.</strong> Who owns what, including SAFEs and options. Whether the company owns its code and IP. Any lawsuits, disputes, or unusual agreements.</p>

<h2>A focused request list</h2>
<p>Asking for everything slows the company down and buries you in documents. A focused list for an early-stage deal:</p>
<ul>
<li>Monthly revenue by customer, or monthly active users by cohort for consumer products.</li>
<li>Current cap table, fully diluted, including all SAFEs and notes.</li>
<li>Bank balance and monthly burn for the last six months.</li>
<li>Names of three customers to call, and permission to find others.</li>
<li>The financial plan for the next 18 to 24 months, with the main hiring assumptions.</li>
<li>Any material contracts, especially with large customers or key partners.</li>
</ul>

<h2>Testing the financial plan</h2>
<p>Founders' plans are almost always optimistic. That is fine. What you want to know is whether the plan is internally consistent and what happens if it goes worse than expected.</p>
<ul>
<li>Does revenue growth match the hiring plan? A plan to triple revenue with no new salespeople is not consistent.</li>
<li>How many months of runway does the round buy at the planned burn?</li>
<li>What milestone will the company reach before it needs to raise again, and is that milestone enough to raise the next round?</li>
<li>If growth comes in at half the plan, does the money still last long enough?</li>
</ul>

<h2>The pre-mortem</h2>
<p>Once you have done your diligence and feel good about a deal, try this. Imagine it is three years from now and the investment has failed. Write down the most likely reasons it failed.</p>
<p>This works because it gives you permission to look for problems after you have already started to like the company. People are much better at explaining a failure they imagine has happened than at predicting one. The reasons you write down are the risks your memo should address, and sometimes one of them is serious enough to change your mind.</p>

<h2>Writing the memo</h2>
<p>Most funds ask for an investment memo before the committee votes. A good memo is short, often two to four pages, and leads with a view. A structure that works:</p>
<ol>
<li><strong>Recommendation:</strong> invest or pass, how much, at what terms, in one or two sentences.</li>
<li><strong>The company:</strong> what it does and for whom, in plain words.</li>
<li><strong>Why it could be very large:</strong> the market, the path to returning the fund.</li>
<li><strong>Why this team:</strong> founder and market fit, evidence from references.</li>
<li><strong>Evidence:</strong> traction, retention, unit economics, customer call findings.</li>
<li><strong>Risks:</strong> the real ones, with what you learned about each.</li>
<li><strong>Terms and ownership:</strong> price, ownership, how it fits the portfolio plan.</li>
</ol>
<p>Write the risks honestly. Partners have read hundreds of memos. One that lists only strengths reads as salesmanship and makes them trust the author less.</p>

<h2>Decision journals</h2>
<p>After every decision, invest or pass, save a short record: what you decided, your main reasons, your confidence, and what you expected to happen. Reread it a year later.</p>
<p>Without this, you will remember outcomes and forget reasoning. You will credit yourself for lucky wins and blame bad luck for poor calls. With it, you can separate the two. A decision can be good and still turn out badly, and it can be bad and turn out well. Learning from your decisions requires knowing which was which.</p>

<h2>Common diligence failures</h2>
<ul>
<li><strong>Confirmation bias.</strong> Looking for evidence that supports a decision you already made. Ask yourself what evidence would change your mind, then look for it.</li>
<li><strong>Going through the motions.</strong> Completing a checklist without focusing on the questions that matter.</li>
<li><strong>Fear of missing out.</strong> Skipping basic checks because the round is closing fast. Some checks, such as references and the cap table, take hours, not weeks.</li>
<li><strong>Trusting summarized data.</strong> Accepting the founders' metrics without rebuilding them from the raw numbers.</li>
<li><strong>Only calling friendly sources.</strong> Every company can find five happy customers and five glowing references.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>You have one week for diligence on a seed company. How do you decide where to spend it?</summary><p>Write what must be true for it to be a great investment, rate your confidence in each item, and spend most of the time on the two or three most uncertain and most important ones.</p></details>
<details class="check"><summary>Why ask for revenue by customer by month instead of the founders' summary metrics?</summary><p>From the raw data you can rebuild growth, churn, retention, and concentration yourself and check whether the summary numbers hold up.</p></details>
<details class="check"><summary>What is a pre-mortem and why does it work?</summary><p>Imagining the investment has already failed and writing down why. It works because people find it easier to explain an imagined failure than to predict one, and it gives you permission to look for problems after you have started to like the deal.</p></details>
`};
