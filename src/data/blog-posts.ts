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
}

/* ------------------------------------------------------------------ */
/*  Posts                                                              */
/* ------------------------------------------------------------------ */

export const blogPosts: BlogPost[] = [
  {
    slug: "what-you-need-to-know-before-this-weekends-winter-storm-hits-hochatown",
    title:
      "What You Need to Know Before This Weekend's Winter Storm Hits Hochatown",
    date: "2026-01-21",
    author: "Frontier Property Management",
    category: "Travel Tips",
    excerpt:
      "Some of our best guest memories come from storm weekends — crackling fires, hot tubs in the snow, and cozy cabin vibes. Here is what to know before you head out.",
    featuredImage: "/images/blog/winter-storm.webp",
    content: `
<h2>A Winter Storm Is Coming — Here Is What Guests Should Know</h2>
<p>Winter storms in Hochatown and Broken Bow are part of the magic — picture snow-dusted pines, a steaming hot tub, and the crackle of a fireplace while the world goes quiet outside. Some of our best guest reviews come from storm weekends. But a little preparation goes a long way toward making sure your trip is safe and stress-free.</p>

<h3>Driving Tips</h3>
<ul>
  <li><strong>Check road conditions before you leave.</strong> Follow the Oklahoma Department of Transportation (ODOT) and McCurtain County Emergency Management on social media for real-time updates.</li>
  <li><strong>Take it slow on Highway 259 and back roads.</strong> These mountain roads can ice over quickly, especially bridges and shaded curves. 4WD or AWD vehicles are strongly recommended.</li>
  <li><strong>Fill up your gas tank before you arrive.</strong> Stations in Hochatown are limited, and lines can get long before a storm.</li>
  <li><strong>Pack tire chains or traction mats</strong> if you are driving a 2WD vehicle. Even a light ice event can make steep cabin driveways tricky.</li>
</ul>

<h3>What to Pack</h3>
<ul>
  <li>Extra blankets and warm layers (even if the cabin has heat — power outages happen)</li>
  <li>Flashlights, headlamps, or battery-powered lanterns</li>
  <li>Non-perishable snacks and bottled water</li>
  <li>Phone chargers and a portable battery pack</li>
  <li>Firewood — many cabins have fireplaces, but wood supply may be limited. Pick up a bundle at a local gas station on your way in.</li>
</ul>

<h3>Power Outages</h3>
<p>Ice storms are the most common cause of power outages in the Broken Bow area. Trees weigh down on power lines, and restoration can take time in rural areas. Here is how to prepare:</p>
<ul>
  <li>Know where the breaker panel is in your cabin.</li>
  <li>If your cabin has a generator, familiarize yourself with its operation on arrival.</li>
  <li>Keep the refrigerator and freezer closed as much as possible to retain cold.</li>
  <li>If the power goes out and you are uncomfortable, contact your property manager (that is us!) — we will help you with next steps.</li>
</ul>

<h3>Emergency Numbers</h3>
<ul>
  <li><strong>Frontier Property Management:</strong> 580-207-7154 (call or text, 24/7 during storms)</li>
  <li><strong>McCurtain County Sheriff:</strong> 580-286-3331</li>
  <li><strong>Broken Bow Fire/EMS:</strong> 911</li>
  <li><strong>ODOT Road Conditions:</strong> 844-465-4997</li>
</ul>

<h3>Embrace the Storm</h3>
<p>Seriously — a cabin in a snowstorm is one of the best vacation experiences you can have. Stock up on groceries, bring some board games, and let the storm do its thing while you relax. If you need anything at all, our team is just a text away. Stay safe and enjoy the magic of a Hochatown winter.</p>
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
      "Airbnb is shifting its fee structure — moving costs from guests to hosts. Here is what it means for cabin owners and how Frontier is helping owners navigate the change.",
    featuredImage: "/images/blog/airbnb-fee-overhaul.webp",
    content: `
<h2>Airbnb Is Changing Its Fee Structure — Here Is What Owners Need to Know</h2>
<p>In late 2025, Airbnb announced a significant shift in how it charges fees on bookings. The platform is moving toward a host-only fee model in more markets, which means the service fee that was previously split between hosts and guests is increasingly being absorbed entirely by the host side. For many cabin owners in Broken Bow and Hochatown, this change has raised questions about its impact on their bottom line.</p>

<h3>What Is Actually Changing?</h3>
<p>Under the traditional split-fee model, Airbnb charged guests roughly 14% and hosts about 3% of the booking total. Under the new host-only model, hosts pay a flat commission of approximately 15%, while guests see a cleaner, lower total price. The idea is that more transparent guest pricing leads to more bookings — but the math only works if the volume increase offsets the higher host fee.</p>

<h3>How This Affects Broken Bow Cabin Owners</h3>
<p>For owners managing their own properties, the transition can feel like a sudden hit to margins. An extra 12% fee on every booking adds up quickly, especially during slower shoulder seasons when every dollar counts. Owners who are not adjusting their pricing to account for the new fee structure risk leaving money on the table — or worse, operating at a loss during low-occupancy months.</p>

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
    featuredImage: "/images/blog/str-tax-shift.webp",
    content: `
<h2>Hochatown's STR Licensing and Tax System Is Changing</h2>
<p>If you own a short-term rental in the Hochatown or Broken Bow area, you have likely heard that the local government is transitioning its STR tax collection and licensing platform from Avenu to Granicus. This is a significant administrative change that affects every cabin owner in the area, and understanding it early is key to staying compliant and avoiding penalties.</p>

<h3>What Is Granicus?</h3>
<p>Granicus is a government technology company that provides short-term rental compliance solutions to municipalities across the country. Their platform handles STR registration, permit issuance, tax collection, and compliance monitoring. Many popular vacation rental markets — from Gatlinburg to Sedona — already use Granicus for STR oversight.</p>

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
<p>The shift to Granicus is part of a broader trend toward professionalization and regulation in the short-term rental industry. For responsible owners and management companies, this is actually a good thing — it levels the playing field, cracks down on non-compliant operators, and ensures that the tax revenue from tourism is properly collected and reinvested in the community. Broken Bow and Hochatown are growing, and smart regulation helps protect the market for everyone.</p>

<p>Have questions about the Granicus transition or your STR compliance status? <a href="/contact">Contact us</a> — we are happy to help.</p>
`,
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
