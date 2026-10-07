window.GARAGE_LESSONS = window.GARAGE_LESSONS || {};
(function () {
  function q(question, testing, strong) {
    return '<details class="check"><summary>' + question + '</summary><p><strong>What they are testing:</strong> ' + testing +
      '</p><p><strong>A strong answer:</strong> ' + strong + '</p></details>';
  }
  window.GARAGE_LESSONS['founder-interview-questions'] = {
  short: [
    'Interviews test clarity, evidence, and self-awareness more than polish.',
    'Answer the question in your first sentence, with a number if you can. Then stop and let them ask for more.',
    'Know your metrics without notes: revenue, users, growth, retention, burn, runway.',
    'Name your biggest risks before they do, with what you are doing about each.',
    'Practice out loud with someone who interrupts you. Fast, short interviews reward founders who have rehearsed under pressure.'
  ],
  body: '<h2>How to use this list</h2>' +
    '<p>These are questions founders hear again and again in accelerator interviews and investor meetings. Open each one, answer it out loud before reading the notes, then compare. Time yourself: most answers should take under 30 seconds. Practice with a cofounder or friend playing the interviewer, and ask them to interrupt.</p>' +

    '<h2>The basics</h2>' +
    q('What does your company do?', 'Whether you can explain it simply. If they cannot repeat it, nothing else lands.', 'One sentence that names the customer and the product in plain words: "We automate prior authorization paperwork for orthopedic clinics."') +
    q('Who is your customer, exactly?', 'Whether you have a sharp first customer or are selling to "everyone."', 'A specific role at a specific kind of organization, and how many of them exist: "Office managers at independent orthopedic practices with two to ten surgeons. We count several thousand of them in the US."') +
    q('Why did you pick this idea?', 'Founder and market fit, and whether the idea came from real insight.', 'A concrete experience with the problem, and what you learned that outsiders miss.') +
    q('How do you know people want this?', 'Evidence of demand versus enthusiasm.', 'Behavior, not opinions: paying customers, usage, retention, people who found you on their own.') +
    q('What is new about your approach?', 'Whether you have an insight or are building the same thing as others.', 'The specific thing you do differently and why it works better, ideally with a customer example.') +

    '<h2>Traction and metrics</h2>' +
    q('How many users or customers do you have?', 'Precision and honesty.', 'An exact number with context: "38 paying clinics, up from 12 three months ago. 31 are active every week."') +
    q('What is your growth rate?', 'Whether you track it and whether it is real.', 'Month-over-month or week-over-week growth for a stated metric over a stated period, given instantly.') +
    q('What is your retention?', 'Whether customers stay, which is the core signal of product-market fit.', 'Logo churn or cohort retention with numbers, plus why customers leave when they do.') +
    q('How much revenue do you have, and how much of it is recurring?', 'Quality of revenue, not just size.', 'Recurring revenue separated from one-time fees and pilots, with your largest customer\'s share.') +
    q('How much are you spending each month, and how long is your runway?', 'Financial discipline.', 'Monthly burn and months of runway, without looking anything up.') +
    q('What does it cost to acquire a customer?', 'Whether growth can scale profitably.', 'A rough CAC by channel and how long it takes to earn back, or an honest "we have not spent on acquisition yet; customers came from X."') +

    '<h2>Market and competition</h2>' +
    q('How big can this get?', 'Whether a very large outcome is possible.', 'A bottom-up estimate (customers times price) with your reasoning, plus the path to adjacent markets.') +
    q('Who are your competitors?', 'Whether you know the market. "None" is always the wrong answer.', 'The real alternatives, including spreadsheets or doing nothing, and why customers choose you.') +
    q('What stops a large company from copying you?', 'Defensibility.', 'What gets harder to copy as you grow (data, integrations, network effects) and why the incumbent is unlikely to prioritize it.') +
    q('Why now?', 'Whether there is a real change that makes this possible today.', 'A specific shift: a technology, regulation, cost drop, or behavior change, with when it happened.') +

    '<h2>Team</h2>' +
    q('Why are you the right team for this?', 'Founder and market fit and ability to execute.', 'Specific experience, skills, or access that make you more likely to win than other capable teams.') +
    q('How did you meet, and how do you split responsibilities?', 'Cofounder strength and risk of conflict.', 'How long you have worked together, who owns what, and how you make decisions when you disagree.') +
    q('Are you all full time?', 'Commitment.', 'A clear yes, or a clear date and condition for going full time.') +
    q('What is the hardest thing you have done together?', 'How you handle pressure as a team.', 'A real story with a real outcome, including what you would do differently.') +
    q('Who is your next key hire, and how will you hire them?', 'Ability to recruit.', 'The role, why it matters now, and how you will find and convince the right person.') +

    '<h2>Product</h2>' +
    q('Show me the product.', 'Whether it works and whether you know it deeply.', 'A short live demo of the core workflow, with a recorded backup ready.') +
    q('What have you shipped in the last month?', 'Speed.', 'Specific features or fixes, and what you learned from releasing them.') +
    q('What do users complain about?', 'Whether you listen to customers.', 'Honest, specific complaints and what you are doing about the most important one.') +
    q('What will you build next, and why?', 'Prioritization.', 'The next one or two things, tied to what customers need to buy more or stay longer.') +

    '<h2>Business model</h2>' +
    q('How do you make money?', 'Clarity on pricing and who pays.', 'Who pays, how much, how often, and why that price.') +
    q('What are your margins?', 'Whether the business can be profitable at scale.', 'Gross margin today and the path to your target, especially your cost to serve if you use AI models.') +
    q('How will you reach your next 1,000 customers?', 'Whether you have a repeatable channel.', 'The channel that works today, its numbers, and why it scales.') +

    '<h2>Fundraising</h2>' +
    q('How much are you raising, and what will you do with it?', 'Planning and ambition.', 'The amount, the runway it buys, and the milestone it reaches, such as a revenue number that sets up the next round.') +
    q('Who else is in the round?', 'Momentum and quality of your investors.', 'An honest status: committed investors, active conversations, and whether you have a lead.') +
    q('What valuation are you expecting?', 'Whether you are realistic.', 'Either the terms you have set for a SAFE, or a range you justify with comparable rounds and your traction.') +
    q('What happens if you cannot raise this round?', 'Resilience and contingency planning.', 'A concrete plan: how you would cut burn, which milestone you could still reach, and how long you could last.') +

    '<h2>Hard questions</h2>' +
    q('What is the biggest risk to this company?', 'Self-awareness and honesty.', 'The real risk, named plainly, and the evidence you are gathering to reduce it.') +
    q('What would make you shut this down?', 'Whether you think clearly about failure.', 'Specific conditions, for example "if retention does not improve after these two changes by June."') +
    q('Why has no one done this before?', 'Whether you understand the history of the space.', 'Who tried, why they failed or stalled, and what is different now.') +
    q('Tell me about a time you were wrong about this business.', 'Learning rate.', 'A real belief you held, the evidence that changed it, and what you did next.') +
    q('If we gave you no money, what would you do?', 'Determination and resourcefulness.', 'That you would keep building, and exactly how you would do it with less.') +

    '<h2>Accelerator interviews specifically</h2>' +
    '<p>Interviews at selective accelerators are often short and fast. Partners may jump between topics and interrupt. Expect several of the questions above in quick succession, plus these:</p>' +
    q('What have you done since you applied?', 'Speed of progress.', 'Concrete changes in numbers or product since the application, with dates.') +
    q('What would you need to accomplish during the program to consider it a success?', 'Ambition and focus.', 'One clear, ambitious target, such as a revenue or user number by demo day.') +
    q('Why do you want to do this program?', 'Whether you know what you need.', 'The specific help you need, such as investor access in your sector or advice on a particular problem.') +

    '<h2>After practicing</h2>' +
    '<p>For any question where your answer felt weak, write a better version in two sentences, and practice it again tomorrow. The goal is not a memorized script. It is knowing your business so well that the clear answer comes naturally.</p>'
  };
})();
