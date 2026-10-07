window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['exits-and-liquidity'] = {
short: [
  'Until a company is sold, goes public, or its shares are sold to someone else, returns exist only on paper. Exits turn TVPI into DPI.',
  'Most successful venture-backed companies exit through acquisitions. IPOs produce the biggest outcomes but are rare and depend on market windows.',
  'Liquidation preferences decide who gets what in a sale. In modest exits, investors can be paid while founders and employees get little.',
  'Secondaries and continuation funds let investors get cash out without waiting for an exit. They have become a normal part of venture.',
  'Think about the likely buyer and timeline when you invest, not only when it is time to sell.'
],
body: `
<h2>Why exits matter</h2>
<p>A fund only returns cash to its LPs when its companies produce liquidity: they are acquired, go public, or the fund sells its shares to another investor. Until then, every gain is an estimate. A company valued at $1B in its latest round has not returned a dollar.</p>
<p>That is why LPs watch DPI (cash returned) so closely, and why a fund with a high TVPI and low DPI in year eight makes them nervous. Exits are where all the earlier work pays off, or does not.</p>

<h2>The main routes</h2>
<table>
<thead><tr><th>Route</th><th>How common</th><th>Typical outcome</th></tr></thead>
<tbody>
<tr><td>Acquisition by a strategic buyer</td><td>The most common exit for successful companies</td><td>From small to very large, depending on the buyer's need</td></tr>
<tr><td>Acquisition by a private equity firm</td><td>Common for mature, profitable software companies</td><td>Priced on cash flow and growth, often less on upside</td></tr>
<tr><td>Acqui-hire</td><td>Common for companies that did not find fit</td><td>The buyer mainly wants the team. Investors often get back little or nothing</td></tr>
<tr><td>IPO</td><td>Rare, and concentrated in strong markets</td><td>The largest outcomes in venture</td></tr>
<tr><td>Secondary sale</td><td>Increasingly common</td><td>Partial liquidity before a full exit, often at a discount</td></tr>
<tr><td>Shutdown</td><td>The most common outcome overall</td><td>Investors recover little or nothing</td></tr>
</tbody>
</table>

<h2>Acquisitions</h2>
<p>Most venture-backed companies that succeed are acquired. The buyer is usually a larger company that wants the product, the customers, the technology, or the team. Strategic buyers, meaning companies in the same or adjacent markets, will often pay the most, because the acquired company is worth more inside their business than on its own. A product that fills a gap in a large company's lineup can be worth far more to that company than its own revenue suggests.</p>
<p>Private equity firms buy mature companies, especially profitable software businesses. They price on cash flow and steady growth and rarely pay for distant upside.</p>
<p>The price in an acquisition depends heavily on competition. A company with two interested buyers will get a much better price than one with a single buyer. Good boards keep relationships with likely acquirers for years before any sale, so that when the time comes, there is more than one option.</p>

<h2>Who gets what in a sale</h2>
<p>The headline sale price is not what each shareholder receives. The liquidation preferences from Lesson 8 come first.</p>
<div class="note"><p class="note-title">Worked example: the waterfall</p>
<p>A company raised $60M across three rounds, all with standard 1x non-participating preferences. Investors together own 50%. Founders and employees own the other 50%. It sells for $80M.</p>
<p>If every investor took their share of the sale, they would get 50% of $80M = $40M. But that is less than the $60M they invested, so they take their preferences instead: $60M. That leaves $20M for founders and employees, who "own" half the company.</p>
<p>At a sale price of $120M or more, investors' 50% share ($60M or more) would match or beat their preferences, so they would convert, and the split would follow ownership.</p>
<p>In practice, each round's investors decide separately whether to convert, and later rounds often have priority, so real waterfalls are more complex. The lesson holds: in modest exits, preferences shape who gets paid.</p></div>
<p>This matters for investors too. A team that will receive little from a sale may not want to sell, and acquirers often have to set aside extra money to retain the team. When a company has raised a lot of money relative to its likely exit, check what the founders and employees would actually receive.</p>

<h2>IPOs</h2>
<p>Going public produces the largest outcomes in venture, but only a small share of companies get there. IPOs require scale, usually well over $100M in annual revenue for a software company, predictable growth, and a market willing to buy. The IPO window opens and closes with the economy. In strong years many companies go public. In weak years almost none do.</p>
<p>An IPO is not an immediate payday for early investors. Insiders, including venture funds, usually cannot sell for several months after the IPO because of a lock-up agreement. After that, a fund either sells the shares over time or distributes them directly to its LPs, which is called a distribution in kind. Either way, the share price at the time the fund actually exits can be very different from the IPO price.</p>

<h2>Secondaries</h2>
<p>In a secondary sale, an existing shareholder sells shares to a new buyer. No new money goes to the company. Secondaries have become a normal part of venture as companies stay private longer.</p>
<p>Funds use secondaries to return cash to LPs early, to lock in part of a large gain, to reduce concentration in one company, or to exit positions near the end of the fund's life. Early employees and founders sometimes sell a small portion of their shares this way too.</p>
<p>Secondary shares often sell at a discount to the latest round price, sometimes a large one, especially for companies that have not grown into their last valuation. Buyers are paying for liquidity and taking on uncertainty, and they price that in.</p>

<h2>Continuation funds</h2>
<p>A fund has a fixed life, often ten years plus a few extensions. Sometimes, near the end, it still holds a company with a lot of upside left. Selling it at a discount just because the fund is ending would be wasteful.</p>
<p>A continuation fund solves this. The GP creates a new vehicle that buys the stake from the old fund. Existing LPs can choose to take cash or roll their stake into the new vehicle. New investors can buy in. This has become a common tool, though it raises a real conflict: the GP is on both sides of the price. Good GPs use an independent valuation or a competitive process to set a fair price.</p>

<h2>Fund size and exit size</h2>
<p>Whether an exit is good depends on who owns it. A $200M acquisition where a fund owns 10% returns $20M. That is a great result for a $20M fund, returning the entire fund. For a $1B fund, it barely registers.</p>
<p>This works in reverse too. A large fund may push a company to keep growing rather than accept a good offer, because only a much larger outcome moves its returns. Founders and smaller investors may prefer to sell. Understanding each investor's fund size explains a lot of boardroom tension.</p>

<h2>Timing</h2>
<p>Exits usually come seven to ten years after a seed investment, and sometimes longer. Holding periods have stretched as companies stay private longer and raise more money privately.</p>
<p>Good investors think about the exit at the moment they invest. Who are the likely buyers? How large are they, and do they buy companies like this? Is there a realistic path to an IPO, or is acquisition the main route? A company with obvious buyers and a clear strategic value is often a better investment than one whose only path is an IPO that may never come.</p>

<h2>When to sell</h2>
<p>Selling part of a winner early lowers risk but gives up upside, and in a power-law business, upside is everything. There is no formula, but a few principles help:</p>
<ul>
<li>Selling a small portion of a very large position to return cash to LPs can be wise, especially late in a fund's life.</li>
<li>Selling a stake in a company that is still compounding fast, just to lock in a gain, often leaves the largest returns on the table.</li>
<li>Compare the expected return from holding against what the cash could do elsewhere, and against what LPs need from the fund.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A fund's TVPI is 3.0x and its DPI is 0.4x in year nine. What does an LP worry about?</summary><p>Most of the value is still unrealized. The LP depends on exits that have not happened yet, and paper values may fall before the fund can sell.</p></details>
<details class="check"><summary>A company raised $50M with 1x non-participating preferences. Investors own 40%. It sells for $75M. How much goes to investors, and how much is left for everyone else?</summary><p>Investors' 40% share would be $30M, less than the $50M they invested, so they take their preferences: $50M. That leaves $25M for founders and employees.</p></details>
<details class="check"><summary>Why might a large fund vote against a sale that a small fund in the same company supports?</summary><p>The sale may be a great return for the small fund but too small to matter for the large one, which needs a much bigger outcome to move its overall returns.</p></details>
`};
