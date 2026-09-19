/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  featuredImage: string;
  content: string;
  /**
   * Ready-to-paste Facebook version of the post.
   *
   * Written to be pasted straight into the Frontier page with no editing:
   * a hook short enough to survive Facebook's mobile truncation (~125
   * characters), a few short paragraphs, and the article link last so the
   * preview card renders. Plain text only, no HTML and no markdown.
   *
   * Copy them from /admin/social.
   */
  facebookPost?: string;
  /**
   * Drafts stay in the content system but are never listed, linked, built,
   * or included in the sitemap or llms files. Remove the flag, set the real
   * publish date and author, and have the copy reviewed before it goes out.
   */
  draft?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Posts                                                              */
/* ------------------------------------------------------------------ */

export const blogPosts: BlogPost[] = [
  {
    slug: "what-boutique-cabin-manager-does-differently",
    title:
      "What a Boutique Cabin Manager Actually Does Differently",
    date: "2026-04-27",
    author: "Hunter Collins, Frontier Property Management",
    category: "Owner Tips",
    excerpt:
      "Boutique vs. scale isn't about who's nicer or harder-working. It's a structural difference in how decisions get made on your cabin. Here's what actually changes.",
    facebookPost: `"Boutique" gets thrown around a lot in cabin management. Here is what it actually changes on your property.

It is not that small managers are nicer or work harder. National companies want their owners to win too, because bad numbers lose them clients. The real difference is structural: who is making decisions on your specific cabin, how often, and with how much context.

On a small team, the person setting your weekend rates has stood in your cabin. They know whether the bunk room is a selling point or a qualifier. When a guest calls on a Friday night about a cloudy hot tub, that is a fifteen-minute round trip instead of a ticket in a queue.

We also wrote the honest part: where scale genuinely wins. Multi-state portfolios, polished owner portals, and standardized service guarantees are all things a boutique operator cannot match. If those matter most to you, a national company is the right call.

Full breakdown here, including the three questions that tell you which structure fits your cabin:

https://www.rentwithfrontier.com/blogs/what-boutique-cabin-manager-does-differently`,
    featuredImage: "/images/properties/sublime/sublime-2.jpg",
    content: `
<p><em>Quick CTA before we get into it: if you want to know what your cabin should be earning right now, the <a href="/audit#full-audit">free listing audit</a> runs your specific Airbnb or VRBO listing against current AirROI data. That's the honest first step before any conversation about management.</em></p>

<h2>The Boutique-vs-Scale Question Is Mis-Framed</h2>
<p>Most owners ask "are boutique managers better than national PMS companies?" That's the wrong question. The right question is "which structure makes better decisions on a cabin like mine?" Some owners genuinely do better with scale. Some genuinely do better boutique. The honest answer depends on the cabin, the owner, and the market.</p>
<p>What changes between the two isn't quality of intent. National PMS teams genuinely want their owners to win — bad results lose them clients. The structural difference is who's actually making decisions on your specific cabin, how often, and with how much context.</p>

<h2>What Boutique Actually Means in Practice</h2>
<p>Frontier is intentionally small. We operate our own high-performing cabin in Hochatown and take on a limited number of owner partners. Here's what that texture looks like day to day.</p>

<h3>1. The Person Pricing Your Cabin Has Walked Through It</h3>
<p>On a small team, the operator pricing your weekend rates has been inside the cabin. They know whether the bunk room is an actual selling point or a "kids only" qualifier. They know the hot tub view is what closes Friday-night family bookings. National pricing algorithms don't.</p>
<p>This sounds soft, but it shows up in real numbers — pricing decisions on niche amenities, premium-rate weekends around local events, and gap-fill nights. The algorithm gives you a baseline. The operator who's been in your cabin gives you the override.</p>

<h3>2. Decisions Happen at the Speed of a Phone Call, Not a Ticket</h3>
<p>When a guest calls Friday night because the hot tub is cloudy, scale operators route through a ticket system: dispatch, vendor scheduling, owner notification. On a boutique team, that's a 15-minute round trip — operator to vendor to cabin. By the time scale would have opened the ticket, boutique has it solved.</p>
<p>The cost difference: a 5-star review vs a 3-star one. That difference compounds over a season more than fee structure does.</p>

<h3>3. The Operator Owns the Result</h3>
<p>This is the most underrated structural difference. On a national PMS, your cabin is one of thousands. Whoever is "responsible" for it has 50–200 other cabins on their list and a national algorithm doing most of the optimization work. On a boutique team, the operator's reputation literally lives on the handful of cabins they manage. That changes the math on every decision they make.</p>

<h3>4. The Playbook Is Tested on a Real Cabin</h3>
<p>The cleaning standards, guest messaging cadence, maintenance escalation, and pricing logic Frontier uses on owner cabins are the same systems we test on the cabin we operate ourselves. When something breaks, we feel it before our owners do. When we tighten a pricing rule, we run it on our cabin first.</p>
<p>National PMS playbooks are built across thousands of properties — they're polished, but they're polished for the average. Boutique playbooks are built for the cabin in front of you.</p>

<h2>Where Scale Is Genuinely Better</h2>
<p>It would be dishonest to write this without naming where scale wins.</p>
<ul>
  <li><strong>Multi-state portfolios.</strong> If you own cabins in Hochatown, Gatlinburg, and Pigeon Forge, a national operator gives you one dashboard, one billing structure, and one point of accountability across markets. Boutique can't do that.</li>
  <li><strong>Enterprise reporting.</strong> Scale operators have polished owner portals with API access, automated tax document generation, and standardized financial exports. Boutique operations are usually less polished here.</li>
  <li><strong>Standardized service guarantees.</strong> National operators have SLAs and escalation paths. Boutique operators have a phone number. Both work — they just feel different.</li>
</ul>
<p>If those things matter more to you than hands-on attention from the decision-maker, scale is genuinely the right pick.</p>

<h2>How to Tell Which Structure Fits Your Cabin</h2>
<p>Three honest questions:</p>
<ol>
  <li><strong>Do you want to talk to the operator, or to a portal?</strong> If you'd rather text the person responsible than navigate a dashboard, boutique fits.</li>
  <li><strong>Is your cabin distinct enough that "average" pricing leaves money on the table?</strong> If it has a feature that doesn't fit a standardized comp set — unusual layout, niche amenity, oddly-priced location — boutique extracts more value.</li>
  <li><strong>Is "best response time" or "lowest fee" the metric you care about?</strong> Boutique generally wins on response time. Scale sometimes wins on bundled headline fee (though the comparison breaks down once you account for setup, monthly minimum, and pass-through markups — see <a href="/broken-bow-cabin-management-fees">our fee breakdown</a>).</li>
</ol>

<h2>The Real Decision</h2>
<p>The structural difference between boutique and scale isn't about quality of work. It's about who is actually making decisions on your cabin and how close they are to the property when something needs to change.</p>
<p>If you want to see whether boutique attention can move the numbers on your specific cabin, run the <a href="/audit#full-audit">free listing audit</a> first — it'll show you the revenue gap before we ever talk about management. And if you want the honest framework for evaluating any manager, the page on <a href="/best-hochatown-property-management-company">picking the best Hochatown property management company</a> walks through the five tests we'd ask if we were on your side of the table.</p>
`,
  },
  {
    slug: "questions-to-ask-hochatown-airbnb-manager",
    title:
      "Airbnb Management in Hochatown: 12 Questions to Ask Before You Sign",
    date: "2026-04-26",
    author: "Hunter Collins, Frontier Property Management",
    category: "Owner Tips",
    excerpt:
      "A boutique cabin owner's checklist for evaluating any Hochatown Airbnb manager. The 12 questions that surface real differences in fees, lock-in, response time, and listing ownership before you sign anything.",
    facebookPost: `Before you sign with any Hochatown cabin manager, ask them these 12 questions.

Most management pitches sound identical. The differences that actually cost you money are buried in the contract: who owns the listing if you leave, what the exit terms really are, whether maintenance gets marked up, and how fast someone actually responds at 9pm on a Saturday.

We wrote the checklist we would use if we were the ones shopping. Some of the answers will not favor us, and that is fine. An owner who asks all twelve ends up in the right place either way.

Print it, bring it to every interview, and take notes on who gets uncomfortable.

https://www.rentwithfrontier.com/blogs/questions-to-ask-hochatown-airbnb-manager`,
    featuredImage: "/images/discover/hochatown-pm-featured.png",
    content: `
<p><em>Quick CTA before we get into it: if you want to know what your cabin should be earning before you start interviewing managers, run the <a href="/audit#full-audit">free listing audit</a>. The revenue gap on your specific listing is the only number that actually matters in these conversations.</em></p>

<h2>Why Most Manager Interviews Go Wrong</h2>
<p>Most owners interview Hochatown Airbnb managers the way they'd interview a contractor: vibes plus a price quote. That's how owners end up locked into 12-month contracts with managers whose pricing is set by a national algorithm and whose response times are measured in business days.</p>
<p>Below is a checklist Frontier uses on the owner side of the table — the 12 questions that surface real structural differences before you sign anything. Print it. Take it to every manager call. The differences in answers will be obvious.</p>

<h2>Operations</h2>

<h3>1. Who exactly will be making pricing decisions on my cabin?</h3>
<p><strong>Why it matters:</strong> "We use dynamic pricing software" is a non-answer. Software doesn't make decisions; people do. Ask for the name and role of the person who reviews pricing on your specific cabin and how often. If that person can't be named, scale is doing the work, not a human.</p>

<h3>2. What's the worst-case response time when a guest calls at 11pm?</h3>
<p><strong>Why it matters:</strong> "24/7 support" is meaningless. Ask for actual hours and actual response time. Boutique managers say "minutes — local team." Scale operators say "we'll have someone reach you within X hours." Both are valid; just know which you're getting.</p>

<h3>3. Are your cleaners and maintenance vendors local to Hochatown / Broken Bow?</h3>
<p><strong>Why it matters:</strong> Local vendors take your call because they value the relationship. Out-of-area vendors take your call when they have time. The difference shows up on Friday afternoons.</p>

<h2>Fees and Money</h2>

<h3>4. What's the all-in cost — including setup, monthly minimums, photo fees, and any markups?</h3>
<p><strong>Why it matters:</strong> Headline percentage rates are misleading. Setup fees, monthly minimums, mandatory photo packages, and markups on cleaning or maintenance can add 5–10 percentage points to the real cost. Get every line in writing. Our full breakdown of <a href="/broken-bow-cabin-management-fees">what management fees should actually include</a> lists every layer to watch for.</p>

<h3>5. Are pass-through costs at vendor cost or is there a coordination fee?</h3>
<p><strong>Why it matters:</strong> Cleaning and maintenance are real costs. They should be billed at vendor cost, on your owner statement, with the receipt. Anything else is a hidden margin.</p>

<h3>6. Is there a monthly minimum?</h3>
<p><strong>Why it matters:</strong> If your cabin earns $0 in a slow shoulder-season month, you should owe $0. Anything else is the manager getting paid out of your pocket regardless of performance.</p>

<h2>Contract and Lock-In</h2>

<h3>7. What's the cancellation clause? Notice period and any termination fees?</h3>
<p><strong>Why it matters:</strong> Month-to-month with a 30-day exit and no termination fee is owner-friendly. Anything longer protects the manager more than it earns your business each month.</p>

<h3>8. Who owns the listings on Airbnb, VRBO, and Booking.com?</h3>
<p><strong>Why it matters:</strong> This is the single biggest contract clause to get right. If the manager owns the listings, your reviews can effectively stay with them when you leave. Listings should be owned by you. Always. (More on this in <a href="/switch-property-managers-broken-bow">how to switch property managers without losing reviews</a>.)</p>

<h3>9. Will reviews transfer to me or my next manager if I leave?</h3>
<p><strong>Why it matters:</strong> Reviews live on the listing on Airbnb, VRBO, and Booking.com. If listing ownership transfers cleanly, reviews come with it. Verify in writing.</p>

<h2>Performance and Proof</h2>

<h3>10. Will you run my specific listing through current market data before quoting any forecast?</h3>
<p><strong>Why it matters:</strong> Anyone quoting "we typically see 15–30% revenue lift" without seeing your cabin is selling, not forecasting. The honest version is to run your listing against current AirROI Hochatown data and show the gap.</p>

<h3>11. Are you operating any cabins in this market yourselves, and what's their performance?</h3>
<p><strong>Why it matters:</strong> Managers who operate in the same market understand the demand cycle viscerally. Frontier operates Sublime Retreat in Hochatown — the systems we use on owner cabins are the same ones we test on our own. Ask whether your prospective manager has skin in the same market.</p>

<h3>12. What does your reporting look like — can I see a sample owner statement?</h3>
<p><strong>Why it matters:</strong> Reporting reveals philosophy. Detailed line-itemed statements with vendor receipts vs. vague summary numbers tell you a lot about how transparent the operator wants to be after you sign.</p>

<h2>What "Good" Answers Look Like</h2>
<ul>
  <li>The person responsible for your cabin is named, not abstracted into a system.</li>
  <li>Worst-case response time is in minutes (boutique) or has a written SLA (scale).</li>
  <li>The headline fee covers everything except clearly listed pass-through costs at vendor cost.</li>
  <li>Contract is month-to-month with a clean exit.</li>
  <li>Listings are owned by you. Reviews transfer.</li>
  <li>Forecasts are based on your specific listing, not portfolio averages.</li>
</ul>

<h2>The First Step</h2>
<p>Before you start interviewing anyone, run the <a href="/audit#full-audit">free listing audit</a>. It runs your specific Airbnb or VRBO listing against current AirROI Hochatown market data and shows the actual revenue gap. That number is the single piece of information every manager interview should be anchored to. If a prospective manager can't credibly close that gap given their fee structure and lock-in, the math doesn't work — no matter how good the interview felt.</p>
<p>For the structural framework on which manager type fits which owner, see our take on <a href="/airbnb-management-hochatown-ok">Airbnb management in Hochatown</a>.</p>
`,
  },
  {
    slug: "lessons-from-running-our-own-hochatown-cabin",
    title:
      "What We Learned Operating Our Own Hochatown Cabin",
    date: "2026-04-25",
    author: "Hunter Collins, Frontier Property Management",
    category: "Owner Tips",
    excerpt:
      "Frontier operates Sublime Retreat in Hochatown. Here's what running our own high-performing cabin taught us about pricing, guests, vendors, and what's actually worth fighting for in this market.",
    facebookPost: `We do not just manage cabins in Hochatown. We run one.

Sublime Retreat is ours. Every pricing rule, cleaning standard, and guest message we use on owner properties gets tested there first, which means when something breaks we feel it before anybody else does.

A few things running it taught us that we did not expect:

Pricing software gets you a baseline, not an answer. The overrides are where the money is, and they require knowing the property.

Your cleaner is the single most important vendor relationship you have. Not your photographer, not your pricing tool. Your cleaner.

Most bad reviews are not about the cabin. They are about a gap between what the listing promised and what the guest walked into.

The whole write-up, including what we would do differently if we bought again:

https://www.rentwithfrontier.com/blogs/lessons-from-running-our-own-hochatown-cabin`,
    featuredImage: "/images/properties/sublime/sublime-1.jpg",
    content: `
<p><em>Quick CTA before we get into it: if you want to know what your cabin should be earning right now, run the <a href="/audit#full-audit">free listing audit</a>. The math we use on Sublime Retreat is the same math we run on owner cabins.</em></p>

<h2>Why Frontier Operates a Cabin Itself</h2>
<p>Frontier didn't start as a property management company. We started by buying and operating <a href="/sublime">Sublime Retreat</a> in Hochatown — a 3-bedroom luxury cabin that we still run as our flagship. Every system Frontier uses on owner cabins was built and tested on that one cabin first. The pricing rules, cleaning checklists, guest messaging, vendor relationships, and maintenance escalation were all stress-tested on a property we own and care about, not on a portfolio average.</p>
<p>Below are the lessons that mattered most. They're the reason Frontier exists in the shape it does.</p>

<h2>1. Pricing Is the Single Biggest Lever — and Most Owners Get It Wrong</h2>
<p>Before we built the pricing playbook we now use, we made every classic mistake. Setting a flat rate and forgetting it. Pricing too low for fall foliage weekends. Holding firm on premium minimums when occupancy was telling us to flex. Each one cost real money on Sublime Retreat before we tightened the rules.</p>
<p>The lesson: <strong>pricing in Hochatown isn't seasonal — it's event-driven, weather-driven, and competitor-driven, all at once.</strong> A flat seasonal rate misses Beavers Bend Marathon weekends, fall foliage peaks, spring break swings, Texas school calendar shifts, and last-minute cold-snap demand for hot-tub cabins. Daily review with overrides is table stakes; anything less leaves money on the table every week.</p>

<h2>2. Guest Communication Speed Is a Pricing Mechanism</h2>
<p>Counterintuitive but proven on our own cabin: response time isn't a customer-service nicety. It's a pricing lever. Inquiries that get answered in under 10 minutes convert at materially higher rates than ones that wait an hour. Faster bookings mean more nights filled at our preferred prices instead of last-minute discounted nights.</p>
<p>That's why our owner-cabin response cadence is the same as the one we use on Sublime Retreat — fast, written, and consistent. Slow guest messaging looks like customer service degradation; in reality it shows up as a few percent of revenue lost every month.</p>

<h2>3. Cleaning Is the Difference Between 4.7 and 4.95 Stars</h2>
<p>This one took us a while to learn. The difference between a "great" cabin and a top-rated cabin isn't usually amenities — it's cleanliness reliability. We invested in a photo-verified post-clean QC process on Sublime Retreat after a single below-standard turnover dropped our review average. That QC process now runs on every owner cabin Frontier manages.</p>
<p>The unintuitive part: scale operators struggle with this exact lever. Their cleaners are stretched across hundreds of properties; QC happens by complaint, not by photo. Boutique operations can afford to look at every clean. That's the structural lesson.</p>

<h2>4. Direct Booking Lowers Platform Dependence — Slowly</h2>
<p>We built a direct booking site for Sublime Retreat to lower our dependence on Airbnb's algorithm and fee structure. It does work. It also takes time. Direct bookings are a small share of total revenue in year one, a meaningful share in year two, and a real moat against platform algorithm changes by year three.</p>
<p>We now build direct booking infrastructure into every owner cabin. Not because it's a quick win, but because compounding over multiple years is real, and we've watched it on our own property.</p>

<h2>5. Local Vendor Relationships Are an Asset, Not a Service</h2>
<p>The cleaners, plumbers, electricians, hot-tub techs, and HVAC contractors we know in the Broken Bow / Hochatown corridor will pick up our calls because we send them steady work year-round. That relationship was built on Sublime Retreat first. It now serves every owner cabin we manage.</p>
<p>Owner-managers and out-of-market property managers can't replicate this — they don't have the volume or proximity. The lesson is structural: local relationships are an asset that takes years to build and outperforms scale on response time, vendor quality, and emergency reliability.</p>

<h2>6. The Hochatown Market Is Specific</h2>
<p>Generic short-term rental playbooks miss the specifics that drive Hochatown demand: Beavers Bend events, fall foliage timing, Texas school calendar variation, the Dallas drive-time threshold, and the fact that this is a small, seasonal market that has grown faster than the demand. Pricing rules built for a national market apply <em>generally</em>. Pricing rules built from operating in this market apply <em>specifically</em>.</p>
<p>That specificity matters more during shoulder-season pricing decisions than during peak season. Anyone can fill a Hochatown cabin in July. The difference between a great manager and an average one shows up in late February and mid-October.</p>

<h2>What This Means for Your Cabin</h2>
<p>You don't need to operate your own cabin to get good management. But your manager should — that's the structural argument for boutique. The systems on your cabin should be ones the operator runs on their own property and trusts because they've watched them work.</p>
<p>If you want to see what those systems can do on your specific listing, the <a href="/audit#full-audit">free listing audit</a> is the honest first step. We'll run your cabin against current AirROI market data and show the revenue gap before any conversation about management. The pricing, listing, cleaning, and guest-messaging logic we'd apply is the same we apply on Sublime Retreat.</p>
<p>For the structural take on what changes between boutique and scale operations, see <a href="/best-hochatown-property-management-company">how to pick the best Hochatown property management company</a> for your cabin.</p>
`,
  },
  {
    slug: "managing-broken-bow-cabin-from-dallas",
    title: "Managing Your Broken Bow Cabin from Dallas: What Every DFW Owner Should Know",
    date: "2026-04-07",
    author: "Frontier Property Management",
    category: "Owner Tips",
    excerpt:
      "Bought a Broken Bow cabin as an investment from Dallas? Here is what remote ownership actually looks like, and how to make it profitable without driving 3 hours every weekend.",
    facebookPost: `Bought a Broken Bow cabin from Dallas and starting to realize how far three hours actually is?

You are not alone. A large share of cabins in this market are owned by DFW families who come down a handful of times a year and try to run the property from a group text the rest of the time.

Remote ownership works. It just fails in specific, predictable ways: the cleaner who quietly stops showing up, the maintenance issue nobody catches until a guest reports it, the weekend you block off because you have to drive down and handle something yourself.

This piece covers what remote ownership actually looks like, what to systematize first, and how to stop losing weekends to a property that was supposed to make you money.

https://www.rentwithfrontier.com/blogs/managing-broken-bow-cabin-from-dallas`,
    featuredImage: "/images/hero/forest-aerial.jpg",
    content: `
<h2>The Dallas-to-Broken-Bow Pipeline Is Real</h2>
<p>Over the past few years, Broken Bow and Hochatown have become one of the most popular vacation rental investment markets for Dallas-Fort Worth buyers. The math makes sense, affordable land, strong nightly rates, and a steady stream of guests from Texas, Arkansas, and Oklahoma. But once the closing papers are signed, a lot of new Dallas owners hit the same wall: how do you actually manage a cabin that is three hours away?</p>

<h3>The Reality of Remote Management</h3>
<p>Self-managing a short-term rental from DFW sounds doable in theory. In practice, it means fielding guest messages at all hours, coordinating cleaners remotely, handling maintenance emergencies you cannot see, and trying to optimize pricing for a market you are not physically in. Most Dallas owners we talk to tried self-managing for 6-12 months before realizing it was eating into their time, their margins, or both.</p>

<h3>What Breaks First</h3>
<p>The most common failure points we see from remote owners:</p>
<ul>
  <li><strong>Slow guest response times.</strong> When you are in a meeting in Dallas and a guest at your cabin needs help, response time suffers. Slow responses lead to bad reviews, which lead to fewer bookings.</li>
  <li><strong>Cleaning coordination.</strong> One bad turnover and you get a 1-star review. From Dallas, you cannot inspect the clean yourself, and most remote owners do not have a reliable backup plan when their cleaner cancels last minute.</li>
  <li><strong>Pricing stagnation.</strong> Setting a flat nightly rate and forgetting about it is the single biggest revenue mistake we see. The Broken Bow market has significant seasonal swings, event-driven demand, and competitive pricing shifts that require daily adjustments.</li>
  <li><strong>Maintenance surprises.</strong> A leaking hot tub, a broken HVAC unit, or a clogged septic system does not wait for the weekend when you can drive down. These need same-day resolution or your next guest has a ruined stay.</li>
</ul>

<h3>What Professional Management Changes</h3>
<p>A local management company gives you three things you cannot replicate from Dallas: proximity, relationships, and market intelligence.</p>
<ul>
  <li><strong>Proximity</strong> means a 15-minute response time to your cabin, not a 3-hour drive. When something goes wrong, we are already there.</li>
  <li><strong>Relationships</strong> with trusted cleaners, plumbers, electricians, and HVAC techs who prioritize our calls because we send them steady work year-round.</li>
  <li><strong>Market intelligence</strong> means we know when Mountain Fork Music Festival is driving demand, when a cold snap will spike hot-tub cabin bookings, and when to lower minimum stays to fill mid-week gaps.</li>
</ul>

<h3>What to Look for in a Manager</h3>
<p>If you are a Dallas owner shopping for management, here is what matters:</p>
<ul>
  <li><strong>Local presence.</strong> Your manager should be based in Broken Bow, not managing remotely from another city.</li>
  <li><strong>Transparent reporting.</strong> Monthly owner statements that clearly show revenue, expenses, platform fees, and net payouts.</li>
  <li><strong>Multi-platform distribution.</strong> Your cabin should be listed on Airbnb, Vrbo, Booking.com, and a direct booking website, not just one platform.</li>
  <li><strong>No long-term contracts.</strong> If a company requires a 12-month lock-in, ask yourself why they need a contract to keep you.</li>
  <li><strong>Dynamic pricing.</strong> Flat-rate pricing leaves money on the table. Demand-based pricing is table stakes in this market.</li>
</ul>

<h3>The Bottom Line</h3>
<p>Owning a Broken Bow cabin from Dallas can be a great investment, but only if it is managed well. The owners who do best are the ones who treat their cabin like a business and hire a local team to run it. If you are a DFW owner looking for management, <a href="/contact">reach out to us</a> for a free revenue estimate. We will give you an honest assessment of what your property could earn.</p>
`,
  },
  {
    slug: "best-time-to-visit-broken-bow",
    title: "The Best Time to Visit Broken Bow & Hochatown: A Season-by-Season Guide",
    date: "2026-04-02",
    author: "Frontier Property Management",
    category: "Travel Guide",
    excerpt:
      "Planning a Broken Bow cabin trip? Here is what to expect each season, weather, crowds, pricing, and the best activities from spring wildflowers to winter hot tub soaks.",
    facebookPost: `When is the best time to visit Broken Bow? Honest answer: it depends on what you want out of the trip.

Spring brings wildflowers, full waterfalls, and the best hiking weather of the year, along with everybody else who figured that out.

Summer is lake season. Hot, busy, and the best time to be on the water at Broken Bow Lake.

Fall is our favorite. The hardwoods turn, the crowds thin after the first weeks of October, and the evenings are perfect for a fire.

Winter is the underrated one. Lowest rates, quietest trails, and a hot tub hits differently when it is 35 degrees out.

Season-by-season breakdown with weather, crowds, pricing, and what to do in each:

https://www.rentwithfrontier.com/blogs/best-time-to-visit-broken-bow`,
    featuredImage: "/images/discover/broken-bow-area.webp",
    content: `
<h2>When Should You Visit Broken Bow?</h2>
<p>The honest answer: there is no bad time. Broken Bow and Hochatown offer something different every season, and each one has its own appeal depending on what you are looking for. Here is what to expect month by month so you can plan the perfect trip.</p>

<h3>Spring (March - May)</h3>
<p>Spring is one of the best-kept secrets in Broken Bow. The crowds are thinner than summer and fall, cabin rates are more affordable, and the landscape comes alive with dogwood blooms, redbuds, and wildflowers along the forest trails.</p>
<ul>
  <li><strong>Weather:</strong> Highs in the 60s-80s. Mornings can be cool, perfect for coffee on the deck. Afternoon rain showers are common but usually brief.</li>
  <li><strong>Activities:</strong> Kayaking on the Lower Mountain Fork River, hiking Beavers Bend trails, fly fishing (spring trout stocking is excellent), and exploring the Hochatown shops without the summer crowds.</li>
  <li><strong>Pricing:</strong> Mid-range. You will find better rates than peak season, especially mid-week. Book 2-3 weeks ahead for weekends.</li>
  <li><strong>Best for:</strong> Couples, anglers, hikers, and anyone who wants a quiet, uncrowded cabin experience.</li>
</ul>

<h3>Summer (June - August)</h3>
<p>Peak season. Families flood in once school lets out, and the lake and river activities are in full swing. If you want a lively, active vacation, this is your window.</p>
<ul>
  <li><strong>Weather:</strong> Hot and humid. Highs in the 90s. The river and lake are the main relief, along with air-conditioned cabins and shaded decks.</li>
  <li><strong>Activities:</strong> Broken Bow Lake swimming and boating, tubing on the Mountain Fork River, Beavers Bend State Park, zip lines, ATV rentals, and the Hochatown restaurant and brewery scene.</li>
  <li><strong>Pricing:</strong> Highest rates of the year, especially July and holiday weekends. Book 4-6 weeks ahead or more for premium cabins.</li>
  <li><strong>Best for:</strong> Families with kids, groups, and anyone who wants the full range of outdoor activities.</li>
</ul>

<h3>Fall (September - November)</h3>
<p>The most popular season, and for good reason. The Ouachita National Forest turns gold, orange, and red, and the weather is ideal for outdoor everything. Fall weekends in Broken Bow book up fast.</p>
<ul>
  <li><strong>Weather:</strong> Highs in the 60s-80s early fall, cooling to the 50s-60s by November. Crisp mornings, warm afternoons, and cool evenings by the firepit.</li>
  <li><strong>Activities:</strong> Fall foliage drives, Beavers Bend State Park color tours, trout fishing (fall stocking begins in November), Hochatown festivals, and bonfires.</li>
  <li><strong>Pricing:</strong> Peak rates on weekends, especially October. Mid-week still offers good value. Book 4-8 weeks ahead for October weekends.</li>
  <li><strong>Best for:</strong> Couples, leaf-peepers, photographers, and anyone who loves cool-weather cabin vibes.</li>
</ul>

<h3>Winter (December - February)</h3>
<p>Winter is the hidden gem season. Rates drop, crowds disappear, and you get the full cozy cabin experience, hot tubs in the snow, fireplaces, and quiet mountain mornings. The occasional ice storm only adds to the atmosphere (see our <a href="/blogs/what-you-need-to-know-before-this-weekends-winter-storm-hits-hochatown">winter storm guide</a>).</p>
<ul>
  <li><strong>Weather:</strong> Highs in the 40s-50s, lows in the 20s-30s. Snow and ice storms are possible but not constant. Pack layers.</li>
  <li><strong>Activities:</strong> Hot tub soaking, fireplace evenings, winter trout fishing (some of the best of the year), Hochatown shopping, and simply unplugging.</li>
  <li><strong>Pricing:</strong> Lowest rates of the year outside of holiday weeks. Christmas and New Year book up early, but January and February are wide open.</li>
  <li><strong>Best for:</strong> Couples on a budget, remote workers looking for a change of scenery, and anyone craving a quiet winter retreat.</li>
</ul>

<h3>Our Recommendation</h3>
<p>If this is your first visit, we recommend early fall (late September through mid-October) for the best combination of weather, foliage, activities, and atmosphere. But honestly, every season has something special. The key is booking a well-managed, well-equipped cabin, that makes any season great. <a href="/search">Browse our cabins</a> and book direct to save on platform fees.</p>
`,
  },
  {
    slug: "broken-bow-cabin-hot-tub-private-pool",
    title: "Broken Bow Cabins with Hot Tubs & Private Pools: What to Know Before You Book",
    date: "2026-03-25",
    author: "Frontier Property Management",
    category: "Travel Tips",
    excerpt:
      "Looking for a Broken Bow cabin with a hot tub or private pool? Here is how to pick the right one, what to expect, and why booking direct saves you money.",
    facebookPost: `Booking a Broken Bow cabin with a hot tub or private pool? Read the listing carefully first.

A few things that catch guests out around here:

"Pool access" and "private pool" are very different things. One of them might be a shared community pool a mile away.

Heated pools are usually only heated seasonally, and "seasonal" varies by property. Ask.

Hot tub cleaning schedules matter more than hot tub size. Ask when it was last drained.

Photos of a hot tub in the snow are usually taken in the one week a year it snows.

None of this is a reason to skip the amenity. It is a reason to ask two questions before you book. Here is the full guide, plus why booking direct with a local company usually costs you less than the same cabin on a platform:

https://www.rentwithfrontier.com/blogs/broken-bow-cabin-hot-tub-private-pool`,
    featuredImage: "/images/properties/sublime/sublime-5.jpg",
    content: `
<h2>Hot Tubs and Pools Are the Top-Requested Amenity in Broken Bow</h2>
<p>When guests search for a Broken Bow or Hochatown cabin, the first filter they reach for is almost always "hot tub" or "pool." And it makes sense, there is nothing quite like soaking in a hot tub surrounded by pine trees after a day on the lake, or cooling off in a private pool during a July afternoon.</p>
<p>But not all hot tub and pool cabins are created equal. Here is what to look for, and what to watch out for, when booking.</p>

<h3>Hot Tub Cabins: What to Expect</h3>
<p>Most cabins in the Broken Bow area come with a hot tub on the deck. It is practically standard at this point. But the quality varies wildly:</p>
<ul>
  <li><strong>Maintenance matters.</strong> A hot tub that is properly maintained, clean water, balanced chemicals, functioning jets, is a five-star experience. A neglected one with cloudy water and broken jets will ruin your trip. Always check recent reviews for hot tub complaints.</li>
  <li><strong>Size and style.</strong> Some cabins have small 2-person tubs, while others have full-size 6-8 person spas. If you are traveling with a group, verify the tub size before booking.</li>
  <li><strong>Location on the property.</strong> The best hot tub setups are on covered decks with forest views and privacy. Some are tucked under the cabin or in less scenic spots, photos tell the story.</li>
  <li><strong>Winter use.</strong> Hot tubs in winter are magical, but only if the cabin owner maintains them through the cold months. Some owners drain and close their tubs from November to March. If you are planning a winter trip, confirm the hot tub is operational.</li>
</ul>

<h3>Private Pool Cabins: A Step Up</h3>
<p>Private pools are less common in Broken Bow than hot tubs, which makes them a premium amenity. Here is what to know:</p>
<ul>
  <li><strong>Seasonal availability.</strong> Most private pools in Broken Bow are outdoor and unheated, meaning they are only available from roughly May through September. A few cabins have heated pools that extend the season.</li>
  <li><strong>Pool vs. plunge pool.</strong> Some listings advertise a "pool" that is really a small plunge pool or stock tank pool. Check the photos and dimensions if a full-size swimming pool matters to you.</li>
  <li><strong>Safety.</strong> If you are traveling with young children, check whether the pool is fenced and whether the cabin provides any safety features.</li>
</ul>

<h3>Why Professionally Managed Cabins Win on Amenities</h3>
<p>The biggest difference between a professionally managed cabin and a self-managed one shows up in amenity maintenance. At Frontier, our cabins have:</p>
<ul>
  <li>Weekly hot tub chemical testing and cleaning</li>
  <li>Filter replacement on schedule</li>
  <li>Pool water quality checks before every guest arrival</li>
  <li>Immediate repair response if anything is not working</li>
</ul>
<p>We have seen too many guest reviews at other properties that say "hot tub was dirty" or "pool was green." That does not happen with a professionally maintained property.</p>

<h3>Book Direct and Save</h3>
<p>When you book through Airbnb or Vrbo, you pay a service fee on top of the nightly rate, typically 10-15% of the total. When you <a href="/search">book direct through our website</a>, you skip that fee entirely and get the same (or lower) rate. For a weekend trip, that can save you $50-$150.</p>

<h3>Our Top Picks</h3>
<p>Looking for a hot tub or pool cabin managed by Frontier? Check out:</p>
<ul>
  <li><a href="/sublime"><strong>Sublime Retreat</strong></a>, Luxury Hochatown cabin with a hot tub, 2 zip lines, arcade, and forest views. Sleeps 8.</li>
</ul>
<p>Every cabin we manage gets weekly hot tub service and pre-arrival quality checks. <a href="/search">Browse all our properties</a> to find the right fit for your trip.</p>
`,
  },
  {
    slug: "why-dallas-investors-buying-broken-bow-cabins",
    title: "Why Dallas Investors Are Buying Broken Bow Cabins in 2026",
    date: "2026-03-18",
    author: "Frontier Property Management",
    category: "Owner Tips",
    excerpt:
      "Broken Bow has become one of the top cabin investment markets for Dallas buyers. Here is why DFW investors are choosing southeast Oklahoma, and what the numbers actually look like.",
    facebookPost: `Broken Bow has quietly become one of the most active cabin investment markets for Dallas buyers. Here is why, and what the numbers actually look like.

The pitch is easy to understand. It is roughly three hours from DFW, which puts it inside weekend-trip range for about eight million people. Oklahoma property taxes and insurance run well under Texas equivalents. And the market has real year-round demand rather than a single season.

The part that gets glossed over in most investor pitches: this is an operating business, not a passive asset. Occupancy is won or lost on pricing, reviews, and whether somebody reliable shows up when the HVAC quits in July.

We laid out the actual math, including what a realistic first year looks like and the costs that surprise new owners:

https://www.rentwithfrontier.com/blogs/why-dallas-investors-buying-broken-bow-cabins`,
    featuredImage: "/images/discover/hochatown-area-2.webp",
    content: `
<h2>The Broken Bow Cabin Boom Is Not Slowing Down</h2>
<p>If you live in the Dallas-Fort Worth area and have looked into vacation rental investments, Broken Bow and Hochatown have probably come up in every conversation. The southeast Oklahoma cabin market has been one of the strongest-performing STR markets in the region for years, and DFW buyers are a huge part of that story.</p>

<h3>Why Broken Bow?</h3>
<p>The numbers tell the story, but the fundamentals are what really matter:</p>
<ul>
  <li><strong>Proximity to DFW.</strong> Broken Bow is roughly 3 hours from Dallas, close enough for owners to visit their property, and close enough to be a drive-to destination for millions of potential guests across Texas, Arkansas, and Oklahoma.</li>
  <li><strong>Lower entry cost.</strong> Compared to cabin markets like Gatlinburg, Big Bear, or the Smokies, Broken Bow offers significantly lower land and construction costs. You can acquire a quality 3-bedroom cabin for a fraction of what similar properties cost in other resort markets.</li>
  <li><strong>Strong nightly rates.</strong> Well-managed Broken Bow cabins consistently command $200-$500+ per night depending on size, amenities, and season. Premium properties with pools, hot tubs, and game rooms can exceed that.</li>
  <li><strong>Year-round demand.</strong> Unlike beach or ski destinations that rely on one season, Broken Bow draws guests year-round, fall foliage, summer lake trips, winter hot tub getaways, and spring fishing. This diversification smooths out revenue across the calendar.</li>
  <li><strong>Tourism infrastructure.</strong> Hochatown has rapidly developed with restaurants, breweries, shops, and attractions that give guests reasons to visit beyond the cabin itself. This growing infrastructure supports higher occupancy rates.</li>
</ul>

<h3>What the Numbers Look Like</h3>
<p>Every property is different, but here are realistic ranges for well-managed Broken Bow cabins:</p>
<ul>
  <li><strong>2-bedroom cabin:</strong> $40,000-$65,000 gross annual revenue</li>
  <li><strong>3-bedroom cabin:</strong> $55,000-$90,000 gross annual revenue</li>
  <li><strong>4+ bedroom luxury cabin:</strong> $80,000-$130,000+ gross annual revenue</li>
</ul>
<p>These numbers assume professional management, dynamic pricing, multi-platform distribution, and proper amenities. Self-managed properties or those with flat pricing typically earn 15-30% less.</p>

<h3>What Dallas Buyers Get Wrong</h3>
<p>The most common mistakes we see from DFW investors:</p>
<ul>
  <li><strong>Buying on emotion, not data.</strong> A beautiful cabin is not automatically a profitable one. Location within the Broken Bow area, bedroom count, amenity mix, and road access all affect booking performance.</li>
  <li><strong>Underestimating operating costs.</strong> Cleaning, maintenance, hot tub chemicals, linens, supplies, utilities, insurance, and property taxes add up. Build a realistic pro forma before you buy.</li>
  <li><strong>Planning to self-manage from Dallas.</strong> It works for a few months, but most Dallas owners burn out. Budgeting for professional management from day one leads to better outcomes (see our <a href="/blogs/managing-broken-bow-cabin-from-dallas">guide to remote management</a>).</li>
  <li><strong>Ignoring compliance.</strong> McCurtain County has STR permit requirements, occupancy tax obligations, and evolving regulations. Non-compliance can result in fines and listing suspensions.</li>
</ul>

<h3>Should You Buy in 2026?</h3>
<p>The market has matured since the post-COVID boom, which is actually good news for smart buyers. Land prices have stabilized, builder capacity has increased, and there is less speculative buying. The investors who do well in this market are the ones who buy properties with the right amenity mix, price them correctly, and hire local management from day one.</p>

<h3>How Frontier Helps Dallas Investors</h3>
<p>We are not real estate agents, but we work with Dallas investors at every stage:</p>
<ul>
  <li><strong>Pre-purchase:</strong> Free revenue projections for properties you are considering. We will tell you honestly whether a cabin will perform.</li>
  <li><strong>Setup:</strong> Professional photography, listing optimization, pricing strategy, and vendor onboarding.</li>
  <li><strong>Ongoing management:</strong> Full-service operations at 20% of net rental income, no setup fee, no monthly minimum, no long-term contracts. Optional professional photography available as an add-on.</li>
</ul>
<p>If you are a Dallas investor considering a Broken Bow cabin purchase, <a href="/contact">reach out for a free consultation</a>. We will give you the local perspective that real estate listings do not.</p>
`,
  },
  {
    slug: "what-you-need-to-know-before-this-weekends-winter-storm-hits-hochatown",
    title:
      "What You Need to Know Before This Weekend's Winter Storm Hits Hochatown",
    date: "2026-01-21",
    author: "Frontier Property Management",
    category: "Travel Tips",
    excerpt:
      "Some of our best guest memories come from storm weekends, crackling fires, hot tubs in the snow, and cozy cabin vibes. Here is what to know before you head out.",
    facebookPost: `Winter storm headed for Hochatown this weekend. If you have a trip booked, read this before you drive out.

Some of our best guest memories happen on storm weekends. Snow on the pines, a fire going, a hot tub in the cold. It is genuinely one of the best times to be here.

It does take a little preparation. The roads out here are rural and they do not get salted quickly. Cell service gets patchy. Power flickers.

What we tell our own guests: pack for one extra day, bring more groceries than you think you need, fill your tank before you leave the highway, and know where the water shutoff is.

Full checklist here, for guests and for cabin owners:

https://www.rentwithfrontier.com/blogs/what-you-need-to-know-before-this-weekends-winter-storm-hits-hochatown`,
    featuredImage: "/images/blog/winter-storm.webp",
    content: `
<h2>A Winter Storm Is Coming, Here Is What Guests Should Know</h2>
<p>Winter storms in Hochatown and Broken Bow are part of the magic, picture snow-dusted pines, a steaming hot tub, and the crackle of a fireplace while the world goes quiet outside. Some of our best guest reviews come from storm weekends. But a little preparation goes a long way toward making sure your trip is safe and stress-free.</p>

<h3>Driving Tips</h3>
<ul>
  <li><strong>Check road conditions before you leave.</strong> Follow the Oklahoma Department of Transportation (ODOT) and McCurtain County Emergency Management on social media for real-time updates.</li>
  <li><strong>Take it slow on Highway 259 and back roads.</strong> These mountain roads can ice over quickly, especially bridges and shaded curves. 4WD or AWD vehicles are strongly recommended.</li>
  <li><strong>Fill up your gas tank before you arrive.</strong> Stations in Hochatown are limited, and lines can get long before a storm.</li>
  <li><strong>Pack tire chains or traction mats</strong> if you are driving a 2WD vehicle. Even a light ice event can make steep cabin driveways tricky.</li>
</ul>

<h3>What to Pack</h3>
<ul>
  <li>Extra blankets and warm layers (even if the cabin has heat, power outages happen)</li>
  <li>Flashlights, headlamps, or battery-powered lanterns</li>
  <li>Non-perishable snacks and bottled water</li>
  <li>Phone chargers and a portable battery pack</li>
  <li>Firewood, many cabins have fireplaces, but wood supply may be limited. Pick up a bundle at a local gas station on your way in.</li>
</ul>

<h3>Power Outages</h3>
<p>Ice storms are the most common cause of power outages in the Broken Bow area. Trees weigh down on power lines, and restoration can take time in rural areas. Here is how to prepare:</p>
<ul>
  <li>Know where the breaker panel is in your cabin.</li>
  <li>If your cabin has a generator, familiarize yourself with its operation on arrival.</li>
  <li>Keep the refrigerator and freezer closed as much as possible to retain cold.</li>
  <li>If the power goes out and you are uncomfortable, contact your property manager (that is us!), we will help you with next steps.</li>
</ul>

<h3>Emergency Numbers</h3>
<ul>
  <li><strong>Frontier Property Management:</strong> 580-207-7154 (call or text, 24/7 during storms)</li>
  <li><strong>McCurtain County Sheriff:</strong> 580-286-3331</li>
  <li><strong>Broken Bow Fire/EMS:</strong> 911</li>
  <li><strong>ODOT Road Conditions:</strong> 844-465-4997</li>
</ul>

<h3>Embrace the Storm</h3>
<p>Seriously, a cabin in a snowstorm is one of the best vacation experiences you can have. Stock up on groceries, bring some board games, and let the storm do its thing while you relax. If you need anything at all, our team is just a text away. Stay safe and enjoy the magic of a Hochatown winter.</p>
`,
  },
  {
    slug: "how-frontier-property-management-smooths-the-transition-amid-airbnbs-fee-overhaul",
    title:
      "How Frontier Property Management Smooths the Transition Amid Airbnb's Fee Overhaul",
    date: "2025-10-13",
    author: "Frontier Property Management",
    category: "Industry News",
    excerpt:
      "Airbnb is shifting its fee structure, moving costs from guests to hosts. Here is what it means for cabin owners and how Frontier is helping owners navigate the change.",
    facebookPost: `Airbnb changed how its fees work, and the cost moved toward hosts. Here is what it means if you own a cabin.

The short version: under the host-only fee model, the service fee that used to be split with the guest lands on you instead. Your displayed nightly rate looks more competitive to guests, and your payout shrinks unless you adjust for it.

Owners who do nothing take the hit quietly. Owners who reprice absorb most of it. It is not a crisis, but it is not nothing either, and it compounds over a full season.

We wrote up what changed, what we are doing about it on the cabins we manage, and how to check whether your own pricing has been adjusted:

https://www.rentwithfrontier.com/blogs/how-frontier-property-management-smooths-the-transition-amid-airbnbs-fee-overhaul`,
    featuredImage: "/images/blog/airbnb-fee-overhaul.webp",
    content: `
<h2>Airbnb Is Changing Its Fee Structure, Here Is What Owners Need to Know</h2>
<p>In late 2025, Airbnb announced a significant shift in how it charges fees on bookings. The platform is moving toward a host-only fee model in more markets, which means the service fee that was previously split between hosts and guests is increasingly being absorbed entirely by the host side. For many cabin owners in Broken Bow and Hochatown, this change has raised questions about its impact on their bottom line.</p>

<h3>What Is Actually Changing?</h3>
<p>Under the traditional split-fee model, Airbnb charged guests roughly 14% and hosts about 3% of the booking total. Under the new host-only model, hosts pay a flat commission of approximately 15%, while guests see a cleaner, lower total price. The idea is that more transparent guest pricing leads to more bookings, but the math only works if the volume increase offsets the higher host fee.</p>

<h3>How This Affects Broken Bow Cabin Owners</h3>
<p>For owners managing their own properties, the transition can feel like a sudden hit to margins. An extra 12% fee on every booking adds up quickly, especially during slower shoulder seasons when every dollar counts. Owners who are not adjusting their pricing to account for the new fee structure risk leaving money on the table, or worse, operating at a loss during low-occupancy months.</p>

<h3>How Frontier Is Helping Owners Navigate This</h3>
<p>At Frontier Property Management, we have been proactively adjusting our owners' pricing strategies to account for the fee shift. Here is what we are doing:</p>
<ul>
  <li><strong>Rate recalibration:</strong> We have adjusted base rates and minimum nightly prices across all platforms to ensure owner net revenue stays consistent despite the higher Airbnb commission.</li>
  <li><strong>Multi-platform diversification:</strong> We do not rely solely on Airbnb. By listing on Vrbo, Booking.com, and our direct booking website, we reduce dependence on any single platform and their fee changes.</li>
  <li><strong>Direct booking growth:</strong> Our direct booking site (rentwithfrontier.com) charges no platform commission at all. We are investing in SEO, Google Ads, and repeat-guest marketing to drive more bookings through this channel.</li>
  <li><strong>Transparent reporting:</strong> Every monthly owner statement clearly shows platform fees, so you always know exactly what you are paying and where your revenue is coming from.</li>
</ul>

<h3>The Bottom Line</h3>
<p>Platform fee changes are a reality of the short-term rental industry. The owners who weather them best are the ones with diversified booking channels, data-driven pricing, and a management partner who stays ahead of the curve. That is exactly what Frontier delivers. If you are concerned about how Airbnb's fee changes are affecting your cabin's performance, reach out to us. We are happy to run a free revenue analysis for your property.</p>
`,
  },
  {
    slug: "nights-number-taxes-hochatown",
    title:
      "Nights, Numbers, and New Tax Realities: Hochatown's STR Shift",
    date: "2025-10-09",
    author: "Frontier Property Management",
    category: "Miscellaneous",
    excerpt:
      "Hochatown is transitioning its short-term rental tax and licensing system from Avenu to Granicus. Here is what cabin owners need to know about the switch and how to stay compliant.",
    facebookPost: `Hochatown short-term rental owners: the tax and licensing system changed. If you are still filing the old way, read this.

Hochatown moved its STR tax and licensing administration from Avenu to Granicus. New portal, new process, same obligation.

Compliance is the least interesting part of owning a cabin and the most expensive part to get wrong. Penalties and back taxes are not a fun way to find out you missed a filing.

Here is what changed, what you need to do, and the deadlines to have on your calendar:

https://www.rentwithfrontier.com/blogs/nights-number-taxes-hochatown`,
    featuredImage: "/images/discover/hochatown-area.webp",
    content: `
<h2>Hochatown's STR Licensing and Tax System Is Changing</h2>
<p>If you own a short-term rental in the Hochatown or Broken Bow area, you have likely heard that the local government is transitioning its STR tax collection and licensing platform from Avenu to Granicus. This is a significant administrative change that affects every cabin owner in the area, and understanding it early is key to staying compliant and avoiding penalties.</p>

<h3>What Is Granicus?</h3>
<p>Granicus is a government technology company that provides short-term rental compliance solutions to municipalities across the country. Their platform handles STR registration, permit issuance, tax collection, and compliance monitoring. Many popular vacation rental markets, from Gatlinburg to Sedona, already use Granicus for STR oversight.</p>

<h3>Why the Switch?</h3>
<p>McCurtain County and the surrounding jurisdictions have seen explosive growth in short-term rental inventory over the past several years. The previous system (Avenu) struggled to keep pace with the volume of registrations, tax filings, and compliance enforcement needed for a market of this size. Granicus offers a more robust, scalable platform with better reporting tools for both the county and property owners.</p>

<h3>What Owners Need to Do</h3>
<ul>
  <li><strong>Re-register your property.</strong> Even if you had a valid STR permit under Avenu, you will need to complete a new registration through the Granicus portal. This includes providing updated ownership information, property details, and proof of insurance.</li>
  <li><strong>Update your tax remittance process.</strong> Occupancy tax payments will now be submitted through the Granicus platform. Make sure your calendar and bookkeeping systems are updated to reflect the new filing process and deadlines.</li>
  <li><strong>Monitor for new requirements.</strong> The transition may come with updated regulations, such as new safety inspection requirements, maximum occupancy rules, or advertising restrictions. Stay plugged in to county communications.</li>
</ul>

<h3>How Frontier Handles This for Owners</h3>
<p>If your cabin is managed by Frontier Property Management, you do not need to worry about any of this. We handle all STR licensing, permit renewals, tax filings, and compliance requirements on your behalf. We have already been in contact with McCurtain County officials about the Granicus transition and are ensuring all of our managed properties are registered and compliant well ahead of any deadlines.</p>

<h3>The Bigger Picture</h3>
<p>The shift to Granicus is part of a broader trend toward professionalization and regulation in the short-term rental industry. For responsible owners and management companies, this is actually a good thing, it levels the playing field, cracks down on non-compliant operators, and ensures that the tax revenue from tourism is properly collected and reinvested in the community. Broken Bow and Hochatown are growing, and smart regulation helps protect the market for everyone.</p>

<p>Have questions about the Granicus transition or your STR compliance status? <a href="/contact">Contact us</a>, we are happy to help.</p>
`,
  },
  /* ---------------------------------------------------------------- */
  /*  DRAFTS: Home Care Concierge launch content. Not published.       */
  /*  Owner review required: facts, tone, author line, publish date.   */
  /* ---------------------------------------------------------------- */
  {
    slug: "what-second-home-care-includes-broken-bow",
    title: "What Does Second-Home Care Include in Broken Bow?",
    date: "2026-09-19",
    author: "Hunter Collins, Frontier Property Management",
    category: "Owner Tips",
    draft: true,
    excerpt:
      "A monthly care plan for a Broken Bow second home is a defined list, not a vague promise. Here is what a realistic scope covers, what costs extra, and when a house needs more than monthly attention.",
    featuredImage: "/images/local-services/hero.webp",
    content: `
<p>Most people who own a second home in Broken Bow or Hochatown do not rent it. They bought it to use it. And the question they eventually ask, usually after a drive down to deal with something small, is whether anyone local can just look after the place between visits.</p>
<p>The answer is yes, but it is worth being precise about what "look after the place" means, because the phrase covers everything from a monthly walk-through to a full-time caretaker. This article describes the monthly scope we actually sell as <a href="/home-care-concierge">Home Care Concierge</a>, so you can judge whether it fits your house.</p>

<h2>A monthly care cycle, not continuous monitoring</h2>
<p>The base plan is built around one coordinated visit cycle per calendar month. Cleaning and technical work may happen on different days with different people, but the plan is monthly. It is not a weekly check, and it is not someone watching the property continuously. If your house needs more than that, it needs a different plan, and we will say so.</p>

<h2>What one month of care covers</h2>
<h3>An interior maintenance clean</h3>
<p>One standard clean of the rooms and square footage agreed at onboarding: kitchen, bathrooms, floors, surfaces, and the beds you ask us to make. This is the clean that means you walk into a ready house rather than a dusty one. It is not a deep clean, it is not laundry service, and it is not a guest turnover.</p>

<h3>Hot-tub attention</h3>
<p>One scheduled check: test and record the water, routine balancing, accessible cleaning, filter attention, and a look at the cover and the equipment. A covered, unused tub between your visits is well served by this. A tub that gets used every weekend is not, and we scope that separately rather than pretend a monthly visit covers it.</p>

<h3>Light exterior care</h3>
<p>Blowing off the decks, porches, and paths you care about; tidying beds and low shrubs at ground level; picking up small debris. There is a time allowance for this in the written scope. Mowing, tree work, pressure washing, gutters, and storm cleanup are separate jobs with separate quotes.</p>

<h3>A visual property check</h3>
<p>A walk through accessible areas looking for the obvious: a leak under a sink, a wasp nest under the eave, an HVAC unit that is not running, a door that no longer latches. This is observation by someone who knows houses, not a licensed inspection or a security service, and it does not guarantee that nothing will ever go wrong.</p>

<h3>Mail, packages, and small tasks</h3>
<p>If you authorize it, we collect mail and packages during the visit and put them in a designated spot inside. We swap accessible filters, bulbs, and batteries you have supplied. We do not collect daily, we do not store things off site, and we do not do electrical or ladder work.</p>

<h3>A report</h3>
<p>After each cycle: a dated checklist of what was done, what we noticed, photos where you have authorized them, anything unresolved, and anything that needs your approval before money is spent. You should never wonder what happened at your house.</p>

<h2>Arrival coordination</h2>
<p>When scheduling permits, the monthly visit is timed to land before an arrival date you give us, so the house is clean when you get there. This is coordination, not an on-demand service. It does not create a free extra clean for every visit; if you come down three times in a month and want the house cleaned three times, that is additional scoped work.</p>

<h2>What costs extra</h2>
<p>The list is deliberately explicit, because the fastest way to sour a relationship is to discover on the invoice that something you assumed was included was not:</p>
<ul>
<li>Additional visits or a higher-frequency schedule</li>
<li>Guest turnovers, restocking, and linen service</li>
<li>Repairs, parts, and materials</li>
<li>Mowing, major pruning, tree work, and storm cleanup</li>
<li>Pressure washing, gutter work, hauling, and pest treatment</li>
<li>Pool service, and hot-tub drains and refills</li>
<li>Deep cleaning and specialty cleaning</li>
<li>Emergency or after-hours attendance</li>
<li>Waiting for deliveries, meeting vendors, grocery runs, and off-site storage</li>
</ul>
<p>Our own scheduled labor inside the plan is a flat monthly figure. When a plumber, electrician, or hot-tub technician is needed, their invoice passes through at cost.</p>

<h2>When a house needs more than monthly attention</h2>
<p>Some honest signals that the base plan is not enough on its own:</p>
<ul>
<li>A hot tub that stays filled and is used most weekends.</li>
<li>Guests, whether paying or family, arriving more than once a month and expecting a clean house each time.</li>
<li>A house that has had freeze damage before, in a winter with a hard-freeze forecast.</li>
<li>Landscaping that grows faster than a monthly blow-off can keep up with.</li>
</ul>
<p>None of those are problems. They just mean the written scope adds visits or services on top of the base. What we will not do is quote the base plan and let the gaps show up later.</p>

<h2>How it starts</h2>
<p>Tell us about the property, we walk it with you or with your permission, you get a written scope with the price on it, and nothing begins until you approve it. If you own a second home in Broken Bow or Hochatown and want to know what a realistic plan looks like for it, <a href="/contact?type=concierge#inquiry">request a walkthrough</a>. No listing, rental income, or occupancy numbers required.</p>
`,
  },
  {
    slug: "self-managing-hochatown-cabin-what-local-team-handles",
    title: "Self-Managing a Hochatown Cabin: What Can a Local Team Handle?",
    date: "2026-09-19",
    author: "Hunter Collins, Frontier Property Management",
    category: "Owner Tips",
    draft: true,
    excerpt:
      "You run the listing, the pricing, and the guests. What can you hand to a local team without handing over the business? A practical split of responsibilities for self-managed Hochatown cabins.",
    featuredImage: "/images/local-services/hero.webp",
    content: `
<p>A lot of Hochatown cabin owners are good at the online half of running a rental. They price well, they answer guests quickly, and they would rather keep that control than pay a percentage to have someone else do it. What they cannot do from Dallas or Oklahoma City is be at the cabin. This article is about drawing that line clearly: which jobs stay with you, and which a local team can take.</p>

<h2>What stays with you</h2>
<p>If you self-manage, these remain your responsibilities, and no local support arrangement changes that:</p>
<ul>
<li><strong>The listing.</strong> Photos, copy, platform accounts, and the reviews attached to them.</li>
<li><strong>Pricing and the calendar.</strong> Nightly rates, minimum stays, blocks for your own use.</li>
<li><strong>Guest communication.</strong> Inquiries, check-in instructions, the midnight message about the Wi-Fi.</li>
<li><strong>Money and taxes.</strong> Payouts, occupancy tax, permits in your name.</li>
</ul>
<p>The moment you want those handled too, you are describing <a href="/management-services">full-service management</a>, which is a different arrangement with a different fee.</p>

<h2>What a local team can take</h2>
<h3>Turnovers on your booking calendar</h3>
<p>Departure and arrival cleans timed to your bookings, linens, restocking of paper and soap and coffee, a photo set after each clean so you can see the cabin without driving to it, and same-day reporting of damage or wear. This is the core of what we call <a href="/local-services">STR Cleaning &amp; Local Support</a>, and it is scoped per property because a two-bedroom that turns twice a month and a five-bedroom that turns every weekend are different jobs.</p>

<h3>Local checks</h3>
<p>Vacancy checks between bookings and through the slow months, hard-freeze prep and post-freeze walk-throughs, storm assessment with photos, and a look at the deck, gutters, and drive. These are the visits that decide whether a cold snap costs you nothing or costs you a season.</p>

<h3>Maintenance triage and vendor meets</h3>
<p>Someone fifteen minutes away who can get inside and look at the problem a guest just reported, change the HVAC filter, balance the hot tub, and meet the licensed plumber or electrician when one is needed. Vendor invoices pass through at cost; you pay for the coordination, not a markup.</p>

<h3>Supply coordination and logistics</h3>
<p>Meeting the furniture delivery, receiving the package you shipped ahead, servicing the keypad, and the supply runs that mean you are not mailing paper towels from Dallas.</p>

<h2>Two ways to buy this</h2>
<p>Which arrangement fits depends on how often the cabin turns over.</p>
<p><strong>If it rents most weekends,</strong> you need turnovers on a booking calendar, and that is STR Cleaning &amp; Local Support: a custom scope with recurring work at a flat monthly figure and on-call work at a rate you approve first.</p>
<p><strong>If it is mostly yours and rents only now and then,</strong> <a href="/home-care-concierge">Home Care Concierge</a> is the simpler fit: a fixed monthly plan from $500 for one scheduled care cycle a month covering a maintenance clean, hot-tub attention, light exterior upkeep, a visual check, and a report. Guest turnovers are then added as a separately quoted line when you have a booking, and the included monthly clean can be timed after a stay so you are never billed twice for the same work.</p>
<p>The thing both have in common: you keep the listing and the bookings. Neither arrangement takes a percentage of what the cabin earns.</p>

<h2>Working alongside another manager</h2>
<p>Some owners have a manager who handles the online side but has no one reliable on the ground here. We can fill that gap with your written authorization and a clear division of responsibilities, and we will identify what is genuinely incremental before quoting, so you are not paying two companies for the same task.</p>

<h2>Where to start</h2>
<p>Tell us about the cabin, how often it rents, and what has been falling through the cracks. We walk the property, write down exactly what we would handle and what it costs, and you decide. <a href="/contact?type=local-support#inquiry">Build your local support plan</a>, or if the cabin is mostly for you, <a href="/contact?type=concierge#inquiry">ask about monthly home care</a>.</p>
`,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && !p.draft);
}

export function getBlogPosts(): BlogPost[] {
  return blogPosts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
