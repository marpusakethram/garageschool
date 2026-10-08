// GarageSchool metrics guide: the page for every startup, sector deep dives, and one key question per subsector.
// Benchmarks are rough guides for early-stage companies and move with markets.

window.VS_COMMON = {
  intro: [
    "Every startup, in every sector, gets asked the same few things: is it growing, do customers stay, does each sale make money, and how long will the cash last. Sector metrics add detail on top of these. Learn these first.",
    "No single number decides a deal. Investors look at a handful together and at the trend over time. A company growing fast with poor retention is a different bet from one growing slowly with customers who never leave."
  ],
  groups: [
    { id: "growth", title: "Growth", text: "How fast the business is getting bigger. At the earliest stages, growth rate matters more than size.", metrics: ["arr_growth", "usage_growth", "arr"] },
    { id: "retention", title: "Retention", text: "Whether customers stay and spend more. Retention is the best single test of whether a product is truly needed. Growth with poor retention is a leaky bucket.", metrics: ["grr", "nrr", "logo_churn", "cohort_retention"] },
    { id: "unit", title: "Unit economics", text: "Whether each customer or each sale makes money once you count the cost to serve and the cost to acquire them.", metrics: ["gross_margin", "contribution_margin", "cac", "cac_payback", "ltv_cac"] },
    { id: "efficiency", title: "Efficiency and cash", text: "How much cash it takes to grow, and how long the company can keep going. These became far more important to investors after 2022.", metrics: ["burn_multiple", "runway", "rule_of_40", "magic_number"] },
    { id: "engagement", title: "Activation and engagement", text: "Whether new users get to the point where the product is useful, and keep coming back. These lead revenue by months.", metrics: ["activation", "dau_mau"] }
  ],
  stages: {
    head: ["", "Pre-seed", "Seed", "Series A"],
    rows: [
      ["What investors are buying", "A team and an insight about a real problem", "Early proof that customers want the product", "A repeatable way to win customers that can scale"],
      ["Typical evidence", "Customer interviews, a prototype, a few design partners", "First paying customers or strong usage, early retention data", "Steady growth for several quarters and healthy retention by cohort"],
      ["Revenue (software, rough)", "Usually none", "Often zero to a few hundred thousand dollars a year", "Often around $1M to $3M a year, growing two to three times a year"],
      ["Cash planning", "12 to 18 months to reach seed proof points", "18 to 24 months to reach Series A proof points", "About two years of runway, with a plan to the next round"]
    ],
    note: "Ranges vary by sector, region, and market conditions. Hard tech and biotech are judged on technical and regulatory milestones rather than revenue."
  },
  principles: [
    ["Trends beat snapshots", "One good month means little. Show the last 6 to 12 months so investors can see direction and consistency."],
    ["Cohorts beat averages", "Averages hide what is happening. Group customers by the month they joined and track each group over time."],
    ["Define every number", "Say exactly how each metric is calculated. ARR that includes one-time fees or unsigned contracts destroys trust when found in diligence."],
    ["Compare to your stage and sector", "A 50% gross margin is fine for a marketplace with logistics and worrying for pure software."],
    ["Pair growth with cost", "Growth bought with heavy spending is worth less. Always show what it cost: burn multiple, CAC payback, or both."]
  ],
  vanity: [
    ["Total sign-ups", "Active users, activation rate, and retention by cohort"],
    ["Gross merchandise value alone", "Net revenue, take rate, and repeat purchase rate"],
    ["Letters of intent and pilots", "Paid contracts and the share of pilots that convert"],
    ["Total downloads", "Daily or weekly active users and how many come back after 30 days"],
    ["Headline contract values", "Cash received, signed annual value, and renewals"],
    ["Bookings without timing", "Revenue recognized and when backlog will turn into revenue"]
  ],
  present: [
    "Lead with the two or three numbers that matter most for your business, not every number you track.",
    "Put a chart of monthly revenue or usage near the start of the deck. Investors look for it first.",
    "Keep a simple metrics sheet in your data room, updated monthly, with definitions on the same page.",
    "Show retention by cohort as a table or a curve. It answers most questions about product-market fit.",
    "When a number looks bad, explain it before investors find it. Honest context earns more trust than a polished slide."
  ]
};

window.VS_SECTOR_DETAIL = {
  ai: {
    overview: [
      "AI companies range from labs that train large models to small teams building one product on top of someone else's model. The layers have very different economics: model labs need billions for compute, while application companies can start with little capital but face constant competition as models improve.",
      "The central question for every AI company is durability. If the next model release makes your product easy to copy, or the model provider adds your feature, what is left? Strong answers involve proprietary data, deep workflow integration, distribution, or a cost advantage."
    ],
    models: [["Usage-based API pricing", "Charged per token, request, or compute hour. Grows with customer usage but can fall fast if a cheaper model appears."], ["Seat subscriptions", "A monthly price per user. Simple, but may undercharge when AI does the work of many people."], ["Outcome pricing", "Charged per task completed, such as per resolved support ticket. Aligns with value and is becoming more common."], ["Enterprise contracts", "Annual contracts with committed spend. Stickier but slower to win."]],
    lookFor: ["Gross margins that improve as the company scales, not shrink as usage grows", "Retention after competitors launch similar products", "Proprietary data or feedback loops that make the product better with use", "Deep integration into a workflow, so switching means real work", "A team that can ship fast as the models change underneath them"],
    stages: ["A strong technical team, a sharp view on which job AI can now do, and early users", "Paying customers who use it weekly, with gross margins that make sense", "Fast revenue growth with net revenue retention above 100% and a clear edge over copies"],
    questions: ["What happens to your product when the next model release from a major lab comes out?", "What share of revenue goes to model and compute costs, and how will that change?", "What data do you collect that competitors cannot get?", "How many of your customers are still in a pilot, and what share convert to paid contracts?", "Which part of the customer's work does the product fully complete, versus assist?"],
    redFlags: ["Revenue mostly from pilots or short trials that have not converted", "Gross margin falling as usage grows", "A product that is a thin layer over one model provider's API", "Fast growth in a category where many funded competitors launched in the same quarter"]
  },
  software: {
    overview: [
      "Enterprise software, often called SaaS, sells subscriptions to businesses. Once built, each extra customer costs little to serve, so gross margins are high, typically 70 to 85%. That is why investors have paid high multiples for software revenue.",
      "The business works when customers stay for years and spend more over time. The main costs are sales, marketing, and engineering. AI is changing the category: some products get easier to build and copy, while others can now do work that used to need people."
    ],
    models: [["Per-seat subscription", "A price per user per month or year. Revenue grows as customers add people."], ["Usage-based pricing", "Charged by data, transactions, or compute used. Grows with the customer but less predictable."], ["Tiered plans", "Free or cheap entry plans with paid upgrades. Common in product-led growth."], ["Platform plus payments", "Especially in vertical software, payments and financial add-ons can double revenue per customer."]],
    lookFor: ["Net revenue retention above 100%, and ideally above 120% for larger customers", "Gross revenue retention above 85 to 90%", "CAC payback under about 12 months for small business and under 24 for enterprise", "A burn multiple under 2", "A clear wedge into a crowded category"],
    stages: ["A painful problem, a founder who knows the buyer, and design partners using an early version", "Paying customers, early retention, and a sales motion the founders run themselves", "Around $1M to $3M ARR, growing two to three times a year, with repeatable sales beyond the founders"],
    questions: ["Who signs the contract, and which budget does the money come from?", "What does net revenue retention look like by cohort?", "How much of new revenue came from founder-led sales versus the sales team?", "How long is the sales cycle and has it changed?", "What would it take for a large platform to bundle your product for free?"],
    redFlags: ["ARR that includes services, one-time fees, or unsigned contracts", "Most revenue from a few customers", "Discounting to close deals at the end of every quarter", "High churn hidden by fast new sales"]
  },
  cyber: {
    overview: [
      "Security buyers spend because the cost of a breach is enormous and because rules require it. Budgets tend to hold up in downturns, and products that become part of daily security operations are rarely replaced.",
      "The market is crowded, with thousands of vendors. Buyers are trying to use fewer tools, so large platforms keep buying smaller companies. New attack surfaces, such as cloud, identity, and now AI agents, create room for new companies every few years."
    ],
    models: [["Annual subscriptions", "Priced by users, devices, cloud workloads, or data volume."], ["Platform bundles", "Several products sold together at a discount. How the large vendors win."], ["Managed services", "The vendor runs security for the customer. Higher revenue, lower margins."]],
    lookFor: ["A new attack surface or a clear gap in what platforms cover", "Fast deployment and low false positives, which keep teams using it", "Strong gross retention, since security tools are sticky once trusted", "Technical founders with credibility among security teams", "A path to becoming a platform or a likely acquisition target"],
    stages: ["Founders with deep security expertise and design partners with a real problem", "Paying customers who deploy in production and expand", "Repeatable enterprise sales, strong retention, and growing deal sizes"],
    questions: ["What attack or compliance need does this address that existing tools miss?", "How long does deployment take, and who has to be involved?", "How many alerts does it generate, and how many are real?", "Which large platform could add this, and why have they not?", "Who in the company owns the budget for this?"],
    redFlags: ["A feature that a major cloud or security platform is likely to add", "Long proofs of concept that rarely convert", "Noisy products that teams switch off", "Revenue concentrated in one industry hit by budget cuts"]
  },
  fintech: {
    overview: [
      "Fintech companies earn money by moving, lending, storing, or managing money, or by selling software to those who do. Revenue often comes from fees on transactions, interest, or interchange, the fee card networks pay the card issuer on each purchase.",
      "Regulation shapes everything. Many fintechs rely on partner banks and licenses, and rule changes can reshape a business overnight. Credit businesses also carry a risk software does not: losses can arrive late and all at once."
    ],
    models: [["Transaction fees", "A percentage or flat fee on each payment or transfer."], ["Interchange", "A share of the fee paid by merchants when customers use a card the company issues."], ["Net interest margin", "The gap between what borrowers pay and what the company pays for its capital."], ["Software subscriptions", "Fees for financial software, often combined with payment revenue."]],
    lookFor: ["Net revenue, not just volume, and how much of it is kept after costs", "Loss and fraud rates that hold steady as the company grows", "A cost of capital that falls with scale for lenders", "Solid regulatory footing: licenses, compliance, and strong bank partners", "Customers who make the product their primary account or tool"],
    stages: ["Founders who understand the regulation and a clear gap in an existing financial product", "Live product with real money flowing and early loss data", "Growing net revenue, stable losses through at least one full loan cycle, and scalable funding"],
    questions: ["What is your net take rate after payment processing and fraud costs?", "How have loan cohorts performed through a full repayment cycle?", "Which licenses do you hold, and which do you rely on partners for?", "What happens to your business if your partner bank exits?", "How much of revenue depends on interest rates staying where they are?"],
    redFlags: ["Growing volume with shrinking take rate", "Loss rates measured only on young loans", "Dependence on one bank partner with no backup", "Revenue that depends on a regulatory gray area"]
  },
  health: {
    overview: [
      "Healthcare is huge and slow to change. The person using a product, the person choosing it, and the person paying for it are often different: a patient, a doctor, and an insurer. Understanding who pays, and why, is the first question for any health company.",
      "Different parts move at very different speeds. Software for hospitals sells like enterprise software with long cycles. Drugs and devices are judged on clinical data and regulatory approval long before they earn revenue."
    ],
    models: [["Payer contracts", "Health plans or employers pay per member per month or per outcome."], ["Reimbursement", "Insurers pay per service using billing codes. Securing codes and coverage takes time."], ["Software subscriptions", "Hospitals, clinics, and pharma pay for software."], ["Licensing and partnerships", "Drug and platform companies earn upfront payments, milestones, and royalties."]],
    lookFor: ["A clear answer on who pays and the evidence they need to keep paying", "Clinical and economic outcomes data, not only engagement", "A credible regulatory plan with realistic timing", "Founders who combine clinical and business expertise", "Enough runway to reach the next clinical or regulatory milestone"],
    stages: ["A strong team, a clear clinical need, and early data or a prototype", "First customers or pilots with outcomes data, or preclinical results for drugs and devices", "Signed payer or provider contracts and growing revenue, or clinical proof in people"],
    questions: ["Who pays for this, and what evidence will they ask for at renewal?", "What approvals are needed and how long will they take?", "Is reimbursement in place, and if not, how will you get it?", "What outcomes data do you have, and how was it measured?", "How long does it take a hospital to buy and implement your product?"],
    redFlags: ["Engagement metrics with no outcome or cost data", "No clear payer", "Regulatory timelines that assume everything goes right", "Pilots at many health systems with no signed contracts"]
  },
  defense: {
    overview: [
      "Defense technology has grown into a major venture category. Conflicts showed how much cheap drones, software, and fast production matter, and governments have opened more paths for new companies to sell to them. Many of these companies also sell to commercial customers, which is called dual use.",
      "Selling to defense is slow and structured. Budgets are planned years ahead, and products usually move from small innovation contracts to production contracts and, eventually, long-term program funding. Many startups win pilots and never cross into production. That gap is the main risk investors weigh."
    ],
    models: [["Innovation contracts", "Small research and prototype awards, such as SBIR grants in the US, that prove a capability."], ["Production contracts", "Orders for many units or full deployment. Where real revenue starts."], ["Programs of record", "Long-term funded programs in the defense budget. Very durable once won."], ["Commercial sales", "Selling the same technology to companies, which smooths out government timing."]],
    lookFor: ["A capability operators clearly want, ideally shown in exercises or field use", "Progress from pilots to production contracts", "Low unit cost and the ability to manufacture at volume", "A team that knows how to navigate procurement, often with former service members", "Security clearances, export control handling, and secure facilities where needed"],
    stages: ["A credible team, a clear operational need, and early contact with real users", "Prototype contracts and field testing with positive feedback from operators", "Production orders, a growing backlog, and a path into long-term budget programs"],
    questions: ["Which unit or command is the end user, and who controls the budget?", "What contracts have you won, and at what stage are they?", "What is your unit cost, and how does it compare with what is used today?", "How fast can you produce at volume, and what limits production?", "How much revenue comes from commercial customers?"],
    redFlags: ["Many small pilots and no production contract after years", "Revenue entirely from one program or one champion inside the government", "A product that only works in demos, not in field conditions", "Unrealistic assumptions about how fast budgets can move"]
  },
  space: {
    overview: [
      "Launch costs have fallen sharply over the past decade, which opened space to startups. Companies build rockets, satellites, and the services and data on top of them. Aviation is changing too, with electric aircraft, air taxis, and cargo drones.",
      "These are capital heavy businesses with long development times. Governments are often the first and largest customers, and a single failed launch or test can set a company back by a year. Proven hardware, called flight heritage, is worth a great deal."
    ],
    models: [["Launch services", "Price per launch or per kilogram carried."], ["Hardware sales", "Selling satellites, components, or aircraft."], ["Data and services", "Subscriptions to imagery, connectivity, or analytics from orbit."], ["Government contracts", "Development and service contracts, often the first revenue."]],
    lookFor: ["Hardware that has flown and worked, or a clear path to the first flight", "A signed backlog with paying customers", "A credible plan to reach low unit costs", "Spectrum, licensing, and certification under control", "Enough capital to reach the next milestone with margin for delays"],
    stages: ["An experienced engineering team and a design that addresses a real market", "Hardware built and tested, early customer contracts or letters of intent", "Successful flight or mission, a growing backlog, and paying customers"],
    questions: ["Has your hardware flown, and what happened?", "What is the backlog, and how much of it is paid deposits?", "How much capital is needed before revenue, and what if a test fails?", "Which licenses, spectrum rights, or certifications do you need?", "Who are the customers beyond government?"],
    redFlags: ["A plan that needs everything to work the first time", "Backlog made of non-binding agreements", "Customers that depend on a market that does not exist yet", "Launch or certification dates that keep slipping without explanation"]
  },
  climate: {
    overview: [
      "Climate and energy companies make, store, move, or save energy, or reduce emissions in heavy industry, transport, buildings, and farming. Demand comes from falling costs, corporate commitments, and policy such as tax credits.",
      "Many climate businesses need large amounts of capital for factories and projects. Venture money usually funds the technology and first plants, while project finance and debt fund the build-out. Investors look closely at whether costs can beat existing options without subsidies over time."
    ],
    models: [["Hardware sales", "Selling equipment such as batteries, heat pumps, or electrolyzers."], ["Project revenue", "Owning plants and selling power or materials under long-term contracts."], ["Software subscriptions", "Grid, energy, and emissions software."], ["Offtake agreements", "Buyers commit in advance to purchase output, such as carbon removal or clean fuel."]],
    lookFor: ["A clear path to cost parity with the fossil option", "Signed offtake or customer contracts", "A financing plan beyond venture equity", "Technology risk retired step by step at each scale-up", "Resilience to changes in subsidies and policy"],
    stages: ["A credible technical team and lab results or a working prototype", "A pilot plant or first customer deployment with real performance data", "Commercial contracts, a first-of-a-kind plant financed, and a pipeline of projects"],
    questions: ["What does a unit cost today, and what will it cost at full scale?", "Who has committed to buy your output, and on what terms?", "How will you fund the first commercial plant?", "What happens to your economics if subsidies change?", "What permits do you need, and how long will they take?"],
    redFlags: ["Economics that only work with current subsidies", "Scale-up plans that skip a pilot stage", "Offtake agreements that are not binding", "Underestimated permitting and grid connection timelines"]
  },
  industrial: {
    overview: [
      "Deep tech companies build hard technology: robots, chips, quantum computers, new materials, and factories that make things differently. Development often takes years, and the first products may need large capital before revenue.",
      "The upside is real defensibility. If the technology works, it is hard to copy. Investors focus on technical milestones, the cost to get there, and whether customers will buy at a price that makes a business."
    ],
    models: [["Equipment sales", "Selling machines or systems, often with service contracts."], ["Robots as a service", "Monthly fees for robots, which lowers the upfront cost for customers."], ["Licensing", "Charging others to use the technology or designs."], ["Components and materials", "Selling chips, parts, or materials that go into other products."]],
    lookFor: ["Technical milestones hit on schedule", "Early customers who have paid, not only signed letters of intent", "A unit cost path that makes sense against existing options", "A team with both scientific depth and manufacturing experience", "A funding plan that covers the expensive middle phase"],
    stages: ["Strong technical founders and proof the core technology works", "A working prototype and early customer commitments", "Products deployed with paying customers and improving unit costs"],
    questions: ["What is the hardest technical risk left, and when will you know?", "What does it cost to make one unit today, and at volume?", "Which customers have paid, and what did they pay for?", "How long does customer qualification take?", "How much capital is needed to reach positive gross margin?"],
    redFlags: ["Milestones that keep moving with no clear reason", "Letters of intent presented as revenue", "Manufacturing plans with no experienced operators on the team", "A product looking for a market rather than solving a known problem"]
  },
  consumer: {
    overview: [
      "Consumer companies sell to people directly: apps, subscriptions, games, brands, and devices. A hit can grow very fast, but most consumer products struggle to keep users and to find customers at a reasonable cost.",
      "Paid advertising costs have risen, and platform changes can cut off a channel overnight. The strongest consumer companies grow mostly through word of mouth and keep users for years."
    ],
    models: [["Subscriptions", "Monthly or yearly plans for apps and services."], ["Advertising", "Free products paid for by ads. Needs very large audiences."], ["Product sales", "Selling physical goods, with margin after cost of goods and shipping."], ["In-app purchases", "Common in games and some apps."]],
    lookFor: ["Retention curves that flatten, meaning a core group of users stays", "A large share of users from organic or word-of-mouth channels", "Contribution margin that stays positive after marketing", "Engagement that shows a habit, such as daily or weekly use", "A brand or community people talk about"],
    stages: ["A product people try and talk about, with a founder who understands the audience", "Strong early retention and organic growth, even if small", "Repeatable acquisition at a sensible cost, and revenue growing month after month"],
    questions: ["What share of new users come without paid marketing?", "What does retention look like at 30, 90, and 180 days by cohort?", "What happens to growth if you stop paid ads for a month?", "How much does each customer earn you after all costs?", "Why will people still use this in two years?"],
    redFlags: ["Growth bought almost entirely with paid ads", "Retention curves that keep falling toward zero", "Dependence on one platform for distribution", "A spike from a viral moment with no lasting usage"]
  },
  marketplaces: {
    overview: [
      "Marketplaces connect buyers and sellers and take a cut of each transaction. Once they reach critical mass in a market, they can be very hard to displace, because buyers go where sellers are and sellers go where buyers are.",
      "Getting there is hard. Each market, city, or category often needs to be built separately. Investors look for liquidity, meaning buyers find what they want quickly and sellers make sales, rather than total volume."
    ],
    models: [["Commission", "A percentage of each transaction, often called the take rate."], ["Listing or lead fees", "Sellers pay to list or to receive leads."], ["Subscriptions", "Sellers pay a monthly fee for tools or visibility."], ["Value-added services", "Payments, financing, insurance, or logistics on top of the marketplace."]],
    lookFor: ["Liquidity in the markets launched so far", "Repeat buyers who return without being re-acquired", "A take rate that holds or rises as value grows", "One side that is hard to get, controlled by the marketplace", "Low risk that buyers and sellers go around the platform"],
    stages: ["A founder with insight into a fragmented market and early transactions", "Strong liquidity in one market or category", "Repeatable launches in new markets with improving economics"],
    questions: ["What share of searches or requests end in a transaction?", "How many buyers come back in the next 90 days?", "Why would a buyer and seller not go around you after meeting?", "How did the newest market perform compared with the first?", "How much do you spend to acquire each side?"],
    redFlags: ["High volume with low repeat rates", "Heavy subsidies to keep one side active", "A take rate that falls as competition arrives", "Many markets launched with none truly liquid"]
  },
  logistics: {
    overview: [
      "Logistics and mobility companies move goods and people. Some sell software to shippers and carriers. Others run physical operations: trucks, warehouses, delivery fleets, or vehicles, including increasingly autonomous ones.",
      "These markets are large and cyclical. Physical operations can show impressive revenue with thin margins. Investors separate software-like businesses from operations-heavy ones and look closely at margin per shipment or per mile."
    ],
    models: [["Brokerage margin", "The difference between what shippers pay and what carriers are paid."], ["Software subscriptions", "Tools for shippers, carriers, and fleets."], ["Per-delivery or per-ride fees", "Revenue per job completed."], ["Vehicle or fleet services", "Leasing, financing, or operating vehicles."]],
    lookFor: ["Positive margin per load, delivery, or ride", "Density: more volume in the same area improves costs", "Software that customers rely on daily", "Resilience to freight and fuel price cycles", "For autonomy, steady improvement in miles without intervention"],
    stages: ["An operator who knows the industry and a clear inefficiency to fix", "Live operations or software in use with real margin data", "Growing volume with improving margin per unit"],
    questions: ["What is the margin per shipment or per mile, and how has it moved?", "How does your business perform when freight prices drop?", "How much of revenue is software versus operations?", "What density do you need in a city to make money?", "What regulations limit where you can operate?"],
    redFlags: ["Revenue growth with flat or negative unit margins", "Results that depend on a hot freight market", "Unit economics that only work at a scale far away", "Heavy capital needs with no financing plan"]
  },
  proptech: {
    overview: [
      "Real estate is the largest asset class in the world and slow to adopt technology. Startups sell software to landlords, brokers, and builders, or run transactions directly.",
      "Interest rates and housing cycles dominate demand. Software for operating property tends to be steady, while transaction businesses rise and fall with the market."
    ],
    models: [["Software subscriptions", "Per unit, per property, or per user fees."], ["Transaction fees", "A share of each sale, rental, or loan."], ["Payments and services", "Rent collection, insurance, and other add-ons per unit."]],
    lookFor: ["Revenue that holds up when transactions slow", "Strong retention among property managers or builders", "Payments or services that grow revenue per unit", "Founders who know the industry from the inside", "Clear savings or revenue gains for customers"],
    stages: ["Industry insiders with a clear problem and design partners", "Paying customers and units under management growing", "Repeatable sales and add-on revenue per unit"],
    questions: ["How did your business perform when interest rates rose?", "How many units or properties use you, and how many churned?", "What add-on revenue do you earn per unit?", "Who is the buyer: owner, manager, or tenant?", "How long does it take to onboard a portfolio?"],
    redFlags: ["Business models that need a hot housing market", "Holding property on the balance sheet without the capital to support it", "Small customers with high churn", "Long sales cycles with no sign of shortening"]
  },
  education: {
    overview: [
      "Education companies sell to schools and districts, to employers, or directly to learners. Each buyer is different: schools buy on annual budget cycles, employers buy for results, and individuals often lose motivation.",
      "Outcomes are the strongest selling point: test scores, job placement, or skills gained. Products that prove results grow; products that only provide content struggle, especially now that AI makes content cheap."
    ],
    models: [["District or school contracts", "Annual licenses, often renewed each school year."], ["Employer-paid programs", "Companies pay to train or upskill workers."], ["Consumer subscriptions", "Learners pay monthly or yearly."], ["Income-linked or outcome-based fees", "Paid after a learner gets a job or result."]],
    lookFor: ["Measured outcomes, not just usage", "Renewal rates for schools and employers", "Completion rates for courses and programs", "A buyer with budget and a clear reason to pay", "Distribution that does not rely only on paid ads"],
    stages: ["Founders who understand teachers, learners, or employers and an early product", "Pilots with outcome data and first renewals", "Repeatable sales to districts or employers, or strong consumer retention"],
    questions: ["What outcome does your product improve, and how is it measured?", "What share of schools or employers renew?", "How many learners finish?", "Which budget pays for this, and is it at risk?", "How does AI change what you offer?"],
    redFlags: ["Usage without outcomes", "Funding that depends on a temporary government program", "Low completion and high consumer churn", "Content that AI tools can now produce for free"]
  },
  work: {
    overview: [
      "Work and HR companies help businesses hire, pay, manage, and support employees. Payroll and HR systems are some of the stickiest software there is, because switching is painful and errors are costly.",
      "Revenue often grows with customers' headcount, which helps in good times and hurts in layoffs. Recruiting products are especially exposed to hiring cycles."
    ],
    models: [["Per employee per month", "Fees for each employee in the system."], ["Seat subscriptions", "Fees per user of collaboration or productivity tools."], ["Placement fees", "A share of first-year salary for hires made."], ["Embedded financial products", "Benefits, cards, and payments on top of payroll."]],
    lookFor: ["Very low churn once customers are live", "Expansion as customers grow or add products", "A wedge that can grow into a broader platform", "Low-cost acquisition through accountants, brokers, or partners", "For collaboration tools, viral spread inside companies"],
    stages: ["A clear pain point and early users in a target segment", "Paying customers live on the product with low churn", "Repeatable growth through a scalable channel"],
    questions: ["How long does it take a customer to switch to you?", "How does revenue change when your customers cut staff?", "What share of revenue comes from add-on products?", "Which channel brings most new customers?", "Why will large platforms not bundle this?"],
    redFlags: ["Revenue that collapses when hiring slows", "Errors in payroll or compliance", "Features that large suites already include", "Free users who never convert"]
  },
  "food-ag": {
    overview: [
      "Food and agriculture companies help farms grow more with less, and create new foods and ways of producing them. Farming is a low-margin, weather-dependent business, so farmers adopt new tools only when the return is clear.",
      "Feedback is slow: many crops grow once a year. Food products face the challenge of matching the cost and taste of conventional options at scale."
    ],
    models: [["Per-acre or per-farm subscriptions", "Software and services priced by area or operation size."], ["Product sales", "Seeds, biologicals, equipment, or food products."], ["Revenue share", "A share of the yield gain or savings created."]],
    lookFor: ["A measured return for farmers, ideally several times the price", "Renewal after a full growing season", "Distribution through dealers, co-ops, or large buyers", "A clear path to cost parity for food products", "Regulatory approval plans for new inputs or foods"],
    stages: ["Agronomic or food science expertise and early field or lab results", "Paid trials on farms or first retail placements", "Multiple seasons of results and growing acres or sales"],
    questions: ["What is the measured return for a farmer, and over how many seasons?", "What share of farms renewed after their first season?", "How do you reach farmers: directly or through dealers?", "What does your food product cost compared with the conventional one?", "What approvals do you need?"],
    redFlags: ["Results from one season only", "Food products that cost far more than conventional ones with no plan to close the gap", "Heavy reliance on direct sales to many small farms", "Repeat purchase rates that fall after launch"]
  },
  gov: {
    overview: [
      "Governments spend large sums on software and services, but buy slowly and through formal procurement. Once a product is in place, contracts often renew for years, which makes govtech durable.",
      "Selling to local, state, and national government each works differently. Certifications for security and data handling are often required before a sale can happen."
    ],
    models: [["Annual subscriptions", "Software licenses priced by population served or users."], ["Contracts through procurement", "Formal bids and multi-year contracts."], ["Payments and transaction fees", "Fees on permits, fines, or utility payments processed."]],
    lookFor: ["Contracts that renew and expand to other agencies", "A product that is easy for agencies to buy through existing purchasing routes", "Required security certifications in place or underway", "Reference customers that other governments trust", "Sales teams that understand procurement"],
    stages: ["Founders who understand public sector buyers and a working product", "First agency customers and early renewals", "A repeatable path through procurement and growing contract value"],
    questions: ["How do agencies buy from you, and how long does it take?", "What certifications are required, and do you have them?", "What share of contracts renewed?", "How does an election or budget change affect you?", "Which agencies have expanded their use?"],
    redFlags: ["One large contract making up most revenue", "No security certifications for a product that needs them", "Pilots that never move to procurement", "Revenue dependent on a one-time grant program"]
  }
};

window.VS_SUB_Q = {
  "foundation-models": "What can your model do better or cheaper than the leading labs, and how long will that last?",
  "ai-infra": "Why will customers keep paying you once cloud and model providers offer the same feature?",
  "ai-compute": "How much of your capacity is under long contracts, and with whom?",
  "ai-apps": "What share of pilots became paid contracts, and how did retention hold after competitors launched?",
  "horizontal-saas": "What is your wedge into a crowded category, and how does it expand from there?",
  "vertical-saas": "How many companies in this industry could buy, and what can you sell each one beyond the core software?",
  "devtools": "How do free developers turn into paid company-wide contracts?",
  "data-analytics": "How does customer usage change over time, cohort by cohort?",
  "legal-pro": "How do you price when your product cuts the billable hours your customers sell?",
  "security": "Which tools does a customer turn off after adopting yours?",
  "identity": "How many identities, human and machine, does each customer manage with you?",
  "cloud-security": "What do you cover that the cloud provider's own security tools do not?",
  "secops": "How much analyst time do you save, and how do customers measure it?",
  "ai-security": "Who in the customer company owns the budget for AI security today?",
  "ot-security": "Can you deploy without stopping the customer's operations?",
  "payments": "What is your net take rate after processing and fraud costs?",
  "lending": "How did your loan cohorts perform through a full repayment cycle?",
  "banking": "What share of accounts are funded and used as the customer's main account?",
  "b2b-finance": "How much revenue comes from software versus payments?",
  "wealth": "How much of asset growth is new money versus market gains?",
  "insurtech": "What is your loss ratio by cohort, and is it improving?",
  "crypto": "How does revenue change when asset prices fall by half?",
  "digital-health": "What savings or outcomes can you prove to the payer?",
  "health-software": "How long from first meeting to a live deployment at a health system?",
  "biotech": "What is the next data readout, and does cash last well past it?",
  "techbio": "How many programs has your platform moved into the clinic?",
  "medtech": "What is your regulatory pathway, and is reimbursement secured?",
  "lifesci-tools": "How much do customers spend on consumables per instrument each year?",
  "care-delivery": "What is clinician utilization, and what do payers pay per visit?",
  "defense": "Which contracts are in production, not just prototype?",
  "autonomy": "How many units are fielded, and how many customers have reordered?",
  "mission-software": "Which funded program does your software run in?",
  "sensing": "How did your system perform in tests run by the customer, not by you?",
  "ew-comms": "How quickly can you update the product when threats change?",
  "defense-manufacturing": "How fast can you scale production, and who is committed to buy it?",
  "launch": "How many successful launches, and what is the paid backlog?",
  "satellites": "How much of your hardware has flown, and how did it perform?",
  "space-data": "What share of revenue is commercial, and is it growing?",
  "in-space": "Who is paying for the first missions?",
  "aviation": "Where are you in certification, and how much capital is needed to finish?",
  "space": "Which operators depend on your systems today?",
  "energy-software": "How long are utility sales cycles, and how many contracts have renewed?",
  "storage-generation": "What is your cost per unit of energy compared with the alternatives?",
  "nuclear": "What licensing steps remain, and what is the timeline to the first plant?",
  "carbon": "How many tons have been verified and delivered, and at what cost per ton?",
  "electrification": "Do the unit economics work without incentives?",
  "critical-minerals": "What does your process cost per ton compared with existing refiners?",
  "water": "Which customers face water risk urgent enough to buy now?",
  "robotics": "How many robots are deployed, and how much are they used each day?",
  "semiconductors": "When is the first production chip, and which design wins do you have?",
  "quantum": "Which technical milestones have you hit on schedule, and what revenue exists today?",
  "materials": "What does a ton cost today, and how long does customer qualification take?",
  "manufacturing": "What are yields at current volume, and how will they improve?",
  "consumer-subscription": "What share of subscribers are still paying after a year?",
  "social": "Why do users come back each day, and how many do?",
  "ecommerce": "What is contribution margin after marketing and returns?",
  "consumer-hardware": "How many owners still use the device after 90 days?",
  "gaming": "What does day 1, day 7, and day 30 retention look like?",
  "media-creator": "How much do creators earn on your platform compared with alternatives?",
  "travel": "What share of bookings come back without paid marketing?",
  "goods": "What share of listings sell, and how quickly?",
  "services": "Why do customers keep booking through you after the first job?",
  "b2b-marketplaces": "How do you handle credit and payment terms between businesses?",
  "labor": "How fast are jobs filled, and how often do workers return?",
  "freight": "What is your margin per load across the freight cycle?",
  "last-mile": "How many deliveries per route make the economics work?",
  "mobility": "What is utilization per vehicle, and does each ride make money?",
  "autonomous-vehicles": "How many driverless miles, in how many cities, and with what intervention rate?",
  "property-software": "What revenue do you earn per unit beyond the software?",
  "transactions": "How did volume hold up when interest rates rose?",
  "construction": "How many projects use you, and how many users per project?",
  "k12": "What share of districts renew, and what budget pays for you?",
  "workforce": "What share of learners complete and get the promised outcome?",
  "consumer-learning": "What share of learners are still active after a month?",
  "hr-payroll": "How does revenue change when customers cut staff?",
  "recruiting": "How did revenue hold up in the last hiring slowdown?",
  "collaboration": "How does the product spread inside a company after the first team?",
  "agtech": "What share of farms renewed after a full season?",
  "food-tech": "What does your product cost compared with the conventional one?",
  "govtech": "How long does procurement take, and how many agencies have renewed?"
};
