window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['writing-a-memo'] = {
short: [
  'A memo exists to help partners decide. Lead with your recommendation and the one or two reasons that drive it.',
  'Every memo answers the same questions: what is it, why could it be huge, why this team, what is the evidence, what could kill it, and what does it cost.',
  'Write the risks as honestly as the strengths. A memo with no real risks makes readers trust the author less.',
  'Put numbers on your beliefs. Scenarios with probabilities and exit values turn a gut feeling into something others can test.',
  'Keep it short. Two to four pages is enough for almost any early-stage deal.'
],
body: `
<h2>What a memo is for</h2>
<p>An investment memo is the written case for or against a deal. Partners read it before the investment committee meets, and it becomes the record of why the fund made the decision. Years later, the memo is how you find out whether your reasoning was good or whether you got lucky.</p>
<p>A memo is not a summary of the pitch deck. The deck is the founder's argument. The memo is yours. If a section only repeats what the founder said, it adds nothing.</p>

<h2>The structure</h2>
<p>Most firms use some version of the same outline. The order matters: decision first, then the argument, then the evidence.</p>
<table>
<thead><tr><th>Section</th><th>What it answers</th><th>Typical length</th></tr></thead>
<tbody>
<tr><td>Recommendation</td><td>Invest or pass, how much, at what price, and the main reason</td><td>3 to 5 sentences</td></tr>
<tr><td>Company and product</td><td>What it does, for whom, and how it makes money</td><td>1 paragraph</td></tr>
<tr><td>Why it could be very large</td><td>Market size, the path to returning the fund, why now</td><td>2 to 3 paragraphs</td></tr>
<tr><td>Team</td><td>Founder and market fit, what references said</td><td>1 to 2 paragraphs</td></tr>
<tr><td>Evidence</td><td>Traction, retention, unit economics, customer calls</td><td>A short table plus notes</td></tr>
<tr><td>Competition</td><td>The real alternatives customers have, and the path to a moat</td><td>1 paragraph</td></tr>
<tr><td>Risks</td><td>The three to five things most likely to kill it, and what you learned about each</td><td>A list</td></tr>
<tr><td>Returns</td><td>Ownership, scenarios, probability-weighted multiple</td><td>A small table</td></tr>
<tr><td>Terms and fit</td><td>Price, ownership, board, how it fits the portfolio plan</td><td>A few lines</td></tr>
</tbody>
</table>

<h2>Writing the recommendation</h2>
<p>The first paragraph should let a busy partner make a decision if they read nothing else. Compare these two openings.</p>
<div class="note"><p class="note-title">Weak opening</p>
<p>Ledgerline is an exciting company in the large and growing restaurant technology space with a passionate team and strong early traction.</p></div>
<div class="note"><p class="note-title">Strong opening</p>
<p>We recommend investing $1.5M of a $3M seed round at a $15M post-money valuation, for 10% ownership. Restaurants that adopt Ledgerline almost never leave (128% net revenue retention), and bookkeeping is a large budget that software can mostly replace. The main risk is gross margin, currently 58% because of model costs. We think it reaches 70% within 18 months as costs fall.</p></div>
<p>The strong version states the decision, the price, the reason, and the biggest risk. Every claim has a number or a test behind it.</p>

<h2>Putting numbers on your beliefs</h2>
<p>The returns section is where most memos are weakest. "If this works it could be a billion-dollar company" is a hope, not an analysis. A better approach, used by some seed funds that apply decision analysis, is to lay out a few scenarios with probabilities and exit values, then compute a probability-weighted multiple.</p>
<div class="note"><p class="note-title">Worked example: scenarios for a seed deal</p>
<p>You invest $1M for 10% at a $10M post-money valuation. You expect your stake to shrink to about 6% by exit.</p>
<table>
<thead><tr><th>Scenario</th><th>Probability</th><th>Exit value</th><th>Your 6%</th><th>Multiple</th><th>Weighted</th></tr></thead>
<tbody>
<tr><td>Fails</td><td>60%</td><td>$0</td><td>$0</td><td>0x</td><td>0x</td></tr>
<tr><td>Small exit</td><td>25%</td><td>$40M</td><td>$2.4M</td><td>2.4x</td><td>0.6x</td></tr>
<tr><td>Strong exit</td><td>12%</td><td>$300M</td><td>$18M</td><td>18x</td><td>2.2x</td></tr>
<tr><td>Market leader</td><td>3%</td><td>$2B</td><td>$120M</td><td>120x</td><td>3.6x</td></tr>
<tr><td><strong>Total</strong></td><td>100%</td><td></td><td></td><td></td><td><strong>6.4x</strong></td></tr>
</tbody>
</table>
<p>Two things stand out. Most of the expected value comes from the scenario with only a 3% chance. And without that scenario, the deal is worth about 2.8x, which is not enough for a seed fund. So the real question for diligence is whether the market-leader outcome is believable at all.</p></div>
<p>Nobody expects these numbers to be precise. Their value is that they make your assumptions visible, so a partner can say "I think 3% is too high" and the discussion moves to evidence instead of enthusiasm. Some funds set a bar, such as a probability-weighted multiple of 10x for seed deals, and only invest above it.</p>

<h2>Writing the risks</h2>
<p>List the three to five things most likely to kill the company, in order. For each one, say what you learned in diligence and what would tell you early that it is going wrong.</p>
<div class="note"><p class="note-title">Example risk entry</p>
<p><strong>Gross margin stays below 65%.</strong> Model costs are 31% of revenue today. The team showed us cost per task falling 40% over six months by routing simple tasks to smaller models. We would expect to see margins above 65% by the Series A. If they are still under 60% in a year, the business will struggle to raise.</p></div>
<p>Avoid generic risks such as "execution risk" or "competition." Every company has those. Name the specific way this company could fail.</p>

<h2>What must be true</h2>
<p>A short list of statements that must hold for the investment to work is a useful addition to any memo. Keep it to five or six. Each should be testable, and each should map to a section of the memo where you discuss the evidence.</p>

<h2>Style</h2>
<ul>
<li><strong>Short sentences, plain words.</strong> Partners read dozens of these. Make yours easy.</li>
<li><strong>Numbers over adjectives.</strong> "Strong retention" means nothing. "122% net revenue retention across 40 customers" means something.</li>
<li><strong>Separate facts from opinions.</strong> Say "the founders claim" when you have not verified something.</li>
<li><strong>Cite your sources.</strong> Customer call, reference call, data room, your own analysis.</li>
</ul>

<h2>After the decision</h2>
<p>Save every memo, including the ones for deals you passed on. Reread them a year later. The point is not to be right every time; nobody is. The point is to learn which of your beliefs held up and which did not, so your next memo is better. In VentureSchool, the memo workshop shows you what happened to the company after you submit, so you can check your reasoning right away.</p>

<h2>Check yourself</h2>
<details class="check"><summary>What belongs in the first paragraph of a memo?</summary><p>The decision, the amount and price, the main reason, and the biggest risk. A busy reader should be able to decide from that paragraph alone.</p></details>
<details class="check"><summary>A memo's scenarios give a 4x probability-weighted multiple, but 3x of that comes from a 2% scenario. What should diligence focus on?</summary><p>Whether the 2% scenario is believable. If it is not, the deal is worth about 1x and should not clear the bar.</p></details>
<details class="check"><summary>Why is "execution risk" a weak entry in a risk section?</summary><p>It applies to every company and says nothing specific. A good risk names the particular way this company could fail and what evidence you have about it.</p></details>
`};
