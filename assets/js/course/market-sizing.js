window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['market-sizing'] = {
short: [
  'Market size matters because it caps how big a company can get, and venture funds need very large outcomes.',
  'Bottom-up sizing (customers times price) is the number to trust. Top-down sizing (a slice of a big industry figure) is easy to inflate.',
  'The useful question is not "how big is the market?" but "how much revenue could this company plausibly reach, and is that enough for this fund?"',
  'The best markets often look small at first because the product creates new demand or makes something much cheaper.',
  'For AI products, size against the labor or service budget the product replaces, but only count the work it can really do.'
],
body: `
<h2>Why investors care</h2>
<p>A company cannot grow larger than the market it serves. Since venture funds depend on a few very large outcomes (Lesson 1), they need companies in markets big enough for a winner to reach hundreds of millions of dollars in revenue. A great team in a small market builds a nice business. A great team in a large market can return the fund.</p>
<p>Market sizing is also one of the most abused slides in any pitch deck. Learning to rebuild the number yourself, quickly, is one of the most useful skills you can have.</p>

<h2>TAM, SAM, and SOM</h2>
<ul>
<li><strong>TAM</strong>, the total addressable market: all the revenue available if every possible customer bought the product at today's prices.</li>
<li><strong>SAM</strong>, the serviceable addressable market: the part of the TAM the company can actually reach with its current product, pricing, channels, and geography.</li>
<li><strong>SOM</strong>, the serviceable obtainable market: the share of the SAM the company could realistically win in the next several years.</li>
</ul>
<p>Founders usually lead with TAM because it is the biggest number. Investors usually care most about SAM, because it describes the market the company can sell into today, and about the path from SAM to a larger TAM over time.</p>

<h2>Bottom-up sizing</h2>
<p>Bottom-up sizing starts with customers and builds up. It has three steps:</p>
<ol>
<li>Count the customers who fit the profile.</li>
<li>Estimate what each would realistically pay per year.</li>
<li>Multiply, then adjust for how many the company could actually reach.</li>
</ol>
<div class="note"><p class="note-title">Worked example: software for veterinary clinics</p>
<p>A company sells practice management software to independent veterinary clinics in the US and Canada.</p>
<ul>
<li>Independent clinics in the region: about 25,000 (an illustrative figure; in practice you would take it from industry association counts).</li>
<li>Price: $500 a month per clinic, or $6,000 a year.</li>
<li>Market: 25,000 times $6,000 = $150M a year.</li>
</ul>
<p>Now add a second product. If the company also processes payments for clinics, taking about 0.5% of an average clinic's $2M in yearly revenue, that adds $10,000 per clinic, or another $250M. The combined market is about $400M a year.</p>
<p>Every number here can be checked: the clinic count, the price against what clinics pay today, the payment volume. That is the point of bottom-up sizing.</p></div>
<p>Bottom-up numbers are usually smaller than top-down numbers. That is fine. A smaller number you can defend is worth more than a larger one you cannot.</p>

<h2>Top-down sizing</h2>
<p>Top-down sizing starts with a large industry figure and cuts it down: "Restaurants spend $50B a year on technology, and we will capture 1%." It is quick, and it is useful as a rough check. But it has two weaknesses. The starting figure often includes spending the product will never touch, and "we will capture 1%" says nothing about why anyone would buy.</p>
<p>When a top-down figure and your bottom-up figure differ by ten times or more, trust the bottom-up figure and figure out where the top-down estimate went wrong. Usually it counts customers or spending categories that do not fit.</p>

<h2>From market to company size</h2>
<p>A market number is only useful if it tells you whether this company can become big enough. Connect it to the fund math from Lesson 1.</p>
<div class="note"><p class="note-title">Worked example: is the market big enough for this fund?</p>
<p>A $100M fund is considering a seed investment. It expects to own 6% at exit, so it needs an exit of about $1.7B for this company to return the fund.</p>
<p>If similar software companies sell for around 6 to 8 times annual revenue, the company needs roughly $210M to $280M in revenue to be worth $1.7B.</p>
<p>If the bottom-up market is $400M, reaching $250M means winning more than 60% of it. That is very hard. The company would probably need to expand into new products or customer types. Now the question becomes: is that expansion believable?</p>
<p>If the market were $5B, reaching $250M would mean 5% share, which is far more plausible.</p></div>
<p>This exercise is more useful than any single market figure. It forces you to ask how big the company must become, and whether the market leaves room for that.</p>

<h2>Markets that grow</h2>
<p>Some of the best venture investments were in markets that looked small at the time. When a product makes something much cheaper, faster, or easier, demand can grow far past the old market.</p>
<p>Ride-hailing is the classic example. Early critics sized it against the existing taxi market. But cheap, reliable rides on demand created many trips that never happened with taxis, and the market grew far beyond its old size. Cloud computing did something similar: making servers cheap and instant created a wave of companies that would never have bought their own hardware.</p>
<p>So when a market looks small, ask two questions. Does this product make something dramatically cheaper or easier? And if it does, who starts buying who never bought before? Be careful, though. "The market will grow" is also the most common excuse for a market that is simply small. You want a specific reason, not hope.</p>

<h2>Sizing AI products</h2>
<p>Many AI products do work that people used to do. For these, the useful market is often the labor or service budget the product replaces, not the software budget.</p>
<p>A tool that drafts legal documents competes for a share of what law firms spend on paralegal and associate time, which is far larger than what they spend on legal software. A tool that answers customer support tickets competes with the cost of support staff.</p>
<p>This framing is powerful and easy to abuse. Only count the work the product can really do today, at the quality customers require, and remember that customers will not pay the full cost of a person to replace part of what that person did. A reasonable approach is to estimate the hours of work replaced, the cost of those hours, and the share of that cost a customer would pay, often well under half.</p>

<h2>Why now</h2>
<p>Strong market cases usually include a reason the opportunity exists today and did not five years ago. Good answers point to a real change:</p>
<ul>
<li>A technology that became good enough or cheap enough, such as language models, cheaper batteries, or better sensors.</li>
<li>A regulation that changed, such as new reporting rules or a new payment standard.</li>
<li>A shift in behavior, such as remote work or a generation of buyers comfortable purchasing software online.</li>
<li>A cost that dropped sharply, making a previously unprofitable business work.</li>
</ul>

<h2>Red flags in a market slide</h2>
<ul>
<li>One huge number with no source or method.</li>
<li>"If we get just 1% of this market..." with no reason anyone would choose the product.</li>
<li>Counting customers the product cannot serve for years, such as large enterprises when the product is built for small businesses.</li>
<li>Counting total transaction volume as if it were revenue.</li>
<li>No mention of who pays, how much they pay today, and from which budget.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A startup sells a $2,400-a-year tool to independent bookstores. There are about 2,500 independent bookstores in its market. What is the bottom-up market, and is it venture scale?</summary><p>2,500 times $2,400 is $6M a year. That is far too small for a venture outcome unless the company has a credible plan to expand well beyond this product and customer.</p></details>
<details class="check"><summary>A deck says the market is $80B, and your bottom-up estimate is $600M. What should you do?</summary><p>Trust the bottom-up figure and work out what the $80B includes that does not apply, often adjacent spending, customers the product cannot serve, or total transaction volume counted as revenue.</p></details>
<details class="check"><summary>Why is "the market is small today but will grow" a weak argument on its own?</summary><p>Because it is said about almost every small market. It becomes convincing only with a specific reason, such as the product making something dramatically cheaper and creating new buyers.</p></details>
`};
