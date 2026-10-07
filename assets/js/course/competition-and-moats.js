window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
window.GARAGE_LESSONS['competition-and-moats'] = {
short: [
  'Any market worth entering will attract competitors. A moat is whatever keeps a company ahead once it has a lead.',
  'The moats that matter most for startups are network effects, switching costs, proprietary data, and scale economics.',
  'Early companies rarely have a moat yet. Look for a believable path to one, and for speed and insight in the meantime.',
  'Find the real competition by asking customers what they used before and what else they considered. Ignore the competition slide.',
  'Incumbents are often slow to respond when copying the startup would hurt their existing business. That gap is where many startups win.'
],
body: `
<h2>Every good market attracts competition</h2>
<p>If a startup proves that a market is valuable, other people notice. Large companies can copy features. Well-funded startups can enter in months. Today, with AI tools that make software cheap to build, copying is faster than it has ever been.</p>
<p>So the question is not whether a company has competitors. It does, or it soon will. The question is what keeps the company ahead after it gets a lead. That advantage is called a moat, after the water around a castle that keeps attackers out.</p>

<h2>The main types of moat</h2>
<p>A useful framework comes from Hamilton Helmer's book <em>7 Powers</em>, which describes the lasting advantages that let a business earn strong returns over time. Here they are in plain terms, ordered roughly by how often they matter for venture-backed startups.</p>
<table>
<thead><tr><th>Moat</th><th>What it means</th><th>Example pattern</th></tr></thead>
<tbody>
<tr><td>Network effects</td><td>The product gets more valuable as more people use it.</td><td>A marketplace where more buyers attract more sellers, which attracts more buyers.</td></tr>
<tr><td>Switching costs</td><td>Leaving is painful because customers have built their data, workflows, and habits around the product.</td><td>Accounting or payroll software that holds years of records and connects to everything else.</td></tr>
<tr><td>Scale economics</td><td>Costs per unit fall as volume grows, so the biggest player can charge the least.</td><td>A logistics network where each added customer makes routes denser and cheaper.</td></tr>
<tr><td>Counter-positioning</td><td>The startup's model would hurt the incumbent's existing business if the incumbent copied it.</td><td>A low-cost online product competing with a company that earns most of its money from expensive in-person service.</td></tr>
<tr><td>Cornered resource</td><td>Exclusive access to something valuable: data, talent, a license, or a key partnership.</td><td>A company with exclusive rights to a dataset that nobody else can collect.</td></tr>
<tr><td>Brand</td><td>Customers pay more or choose by default because they trust the name.</td><td>Mostly relevant in consumer markets and in categories where trust matters, such as finance and health.</td></tr>
<tr><td>Process power</td><td>Operational know-how built over years that competitors cannot easily copy.</td><td>Manufacturing processes refined through thousands of iterations.</td></tr>
</tbody>
</table>
<p>Most strong companies end up with two or three of these working together. A marketplace may have network effects and brand. A vertical software company may have switching costs and proprietary data.</p>

<h2>Network effects, in more detail</h2>
<p>Network effects are the most powerful moat in technology, and the most often claimed falsely. A real network effect means each new user makes the product better for existing users. Ask: if the company had half as many users, would the product be meaningfully worse for each one?</p>
<p>For a marketplace, the answer is usually yes in its local market: fewer sellers means less choice and slower service. For a messaging app, yes: fewer contacts means less reason to use it. For a project management tool that teams use separately, usually no. Having more customers does not make the product better for any single team, so it is not a network effect even if the company says it is.</p>
<p>Many network effects are local. A food delivery service in one city gets nothing from its users in another city. That makes each city a separate battle and lowers the strength of the moat.</p>

<h2>Switching costs and data</h2>
<p>For business software, switching costs are often the most important moat. Once a company runs its payroll, inventory, or patient records through a product, moving to another means migrating data, retraining staff, and risking errors. Customers stay even if a competitor is slightly better or cheaper.</p>
<p>Proprietary data is closely related. A product that collects data as customers use it, and gets better because of that data, builds an advantage that grows with time. The question to ask is whether the data is truly exclusive and truly improves the product. Data that any competitor could buy or collect is not a moat.</p>

<h2>Early companies rarely have moats</h2>
<p>A seed-stage company with a few dozen customers almost never has a real moat. What it has is a head start: a team that understands the problem better and is moving faster than anyone else. That is legitimate, but it is temporary.</p>
<p>So at early stages, look for a believable path to a moat. A workflow tool that will hold more of each customer's data every month can build switching costs. A marketplace in a fragmented market can build network effects one city at a time. A thin product on top of someone else's platform, with no data of its own and no reason customers could not switch in an afternoon, has no obvious path.</p>
<p>In the meantime, the defense is speed and insight. A team that learns faster than competitors and understands customers more deeply can stay ahead long enough to build the moat.</p>

<h2>Why incumbents are slow</h2>
<p>Large companies have more money, more engineers, and more customers. Why do startups ever beat them?</p>
<p>Often because copying the startup would hurt the incumbent's existing business. This is the idea behind Clayton Christensen's <em>The Innovator's Dilemma</em>. A company earning most of its profit from expensive products has little reason to launch a cheap version that eats into those profits. A company whose sales team is paid on large contracts has trouble selling a self-serve product. By the time the incumbent responds, the startup may already own the new market.</p>
<p>When you evaluate a startup, ask what it would cost the largest competitor to copy it. If the answer is "a few engineers for a quarter," that is a real risk. If the answer is "they would have to cut prices on their main product line," the startup has room.</p>

<h2>Finding the real competition</h2>
<p>Founders often show a chart with their company alone in the top right corner and competitors scattered below. Ignore it. Instead, find out what customers actually do.</p>
<ul>
<li>Ask customers what they used before this product, including spreadsheets, paper, or a person doing the work by hand.</li>
<li>Ask what else they looked at before buying.</li>
<li>Ask what would make them switch away.</li>
<li>Look at who is hiring for similar roles, and which startups raised money in the same space recently.</li>
</ul>
<p>The most common competitor for an early product is not another startup. It is the customer's current way of doing things. Overcoming habit is often harder than beating a rival.</p>

<h2>Moats in AI products</h2>
<p>AI has changed competition in two ways. Building a capable product is cheaper, so features alone protect less than they used to. And the underlying models are improving fast, so a capability that is hard today may be a basic feature of every model next year.</p>
<p>The AI companies most likely to hold their position tend to have one or more of these:</p>
<ul>
<li><strong>Deep workflow integration:</strong> the product is where the work happens, not a tool people visit occasionally.</li>
<li><strong>Proprietary data:</strong> customer data, feedback, or outcomes that make the product better and that competitors cannot access.</li>
<li><strong>Distribution:</strong> a channel to customers that others cannot easily replicate, such as a partnership or an existing user base.</li>
<li><strong>Trust in high-stakes settings:</strong> in medicine, law, and finance, accuracy records and compliance approvals take years to build.</li>
</ul>

<h2>Red flags</h2>
<ul>
<li>"We have no competitors." Either the market does not exist or the founders have not looked.</li>
<li>A claimed network effect where more users do not make the product better for each user.</li>
<li>A product a large platform could add as a feature, with no data or distribution of its own.</li>
<li>Differentiation that is mostly design or a slightly better user experience.</li>
</ul>

<h2>Check yourself</h2>
<details class="check"><summary>A scheduling tool for dental offices has 2,000 customers. Does it have network effects?</summary><p>Probably not. One dental office's experience does not improve because other offices use the same tool. Its likely moat is switching costs from holding each office's schedules, patient records, and integrations.</p></details>
<details class="check"><summary>Why might a large company with a better product still lose to a startup?</summary><p>Copying the startup may hurt the incumbent's existing profits, sales incentives, or pricing, so it responds slowly. This is counter-positioning.</p></details>
<details class="check"><summary>A founder says their moat is their AI model. What would you ask?</summary><p>Whether the model depends on data nobody else can get, whether it improves with customer use, and whether a general model from a large provider is likely to match it within a year.</p></details>
`};
