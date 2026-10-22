export type Block =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "figure"; caption: string };

export type Post = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  gated: boolean;
  body?: Block[];
  tags?: string[];
};

export const posts: Post[] = [
  {
    slug: "navigating-the-future-of-enterprise-technology",
    category: "Technology",
    title: "Navigating the future of enterprise technology",
    excerpt:
      "How Indonesian enterprises are using SAP S/4HANA and cloud technologies to drive innovation, streamline operations and prepare for the next wave of digital transformation.",
    date: "Oct 15, 2026",
    readTime: "6 min read",
    gated: false,
    tags: ["#SAP", "#S4HANA", "#CloudERP", "#Innovation", "#Enterprise"],
    body: [
      { type: "lead", text: "Enterprise technology is moving faster than most organizations can absorb. New platforms, new delivery models and new expectations from customers are arriving at the same time, and the companies that keep pace are the ones that treat technology as a core part of their strategy rather than a support function." },
      { type: "p", text: "For many Indonesian enterprises, the starting point is the core system. Finance, procurement, production and distribution all run on the ERP, and every other digital initiative depends on how well that foundation is built. This article looks at where enterprise technology is heading, how SAP S/4HANA and cloud platforms fit into that picture, and what leaders can do now to prepare." },
      { type: "h2", text: "From systems of record to systems of insight" },
      { type: "p", text: "For decades, the ERP was mainly a system of record. It captured transactions accurately and produced reports after the fact. Today the expectation is different. Leaders want to see what is happening in the business now, anticipate problems before they reach the customer and test options before committing resources." },
      { type: "p", text: "SAP S/4HANA was designed for this shift. Its in-memory database allows transactional and analytical workloads to run against the same data, which removes many of the delays that came from copying information between separate reporting systems. When a stock level or a production order changes, the change is visible across the business almost immediately." },
      { type: "h2", text: "What the cloud changes" },
      { type: "p", text: "Cloud platforms change the economics of enterprise technology as well as its capabilities. Instead of buying hardware sized for peak demand and maintaining it through upgrades, organizations can subscribe to services that scale with the business and receive updates on a regular schedule." },
      {
        type: "ul",
        items: [
          "Faster access to new functionality without long upgrade projects",
          "Predictable operating costs instead of large periodic capital spending",
          "Standard security and compliance controls maintained by the provider",
          "Easier integration with partners, suppliers and customers",
        ],
      },
      { type: "quote", text: "“The question is no longer whether to move to the cloud, but how to move in a way that keeps the business running and creates new value on the way.”" },
      { type: "h2", text: "Preparing the organization, not only the platform" },
      { type: "p", text: "Technology decisions succeed or fail on the people who use them. A new platform that is not understood by finance, operations and sales will deliver a fraction of its potential. Successful programs invest early in process design, data quality and training, and they assign clear owners for every business area affected by the change." },
      { type: "p", text: "It also helps to start with a small number of high-impact processes rather than attempting a full transformation in one step. A focused first release builds confidence, produces measurable results and gives the team practical experience that makes the next release easier." },
      { type: "h2", text: "A practical next step" },
      { type: "p", text: "If your organization is still running on an older ERP release or on several disconnected systems, begin with an honest assessment of the current landscape. Identify the processes that create the most friction, the data that is trusted least and the integrations that break most often. That assessment becomes the basis for a roadmap that connects technology investment to business outcomes." },
    ],
  },
  {
    slug: "digital-transformation-trends-this-year",
    category: "Technology",
    title: "Digital transformation trends this year",
    excerpt:
      "The key technology trends shaping enterprise digital transformation this year and beyond.",
    date: "Oct 12, 2026",
    readTime: "8 min read",
    gated: true,
    tags: ["#DigitalTransformation", "#SAP", "#ERP", "#Cloud", "#Enterprise"],
    body: [
      { type: "lead", text: "The pace of digital transformation has never been faster. Enterprises across Indonesia and beyond are embracing new technologies to remain competitive, agile and customer-centric." },
      { type: "p", text: "In this article, we explore the most significant trends shaping the digital transformation landscape this year, and how organizations can use them for sustainable growth." },
      { type: "h2", text: "The rise of intelligent automation" },
      { type: "p", text: "Automation is no longer just about replacing manual tasks. Intelligent automation combines robotic process automation (RPA) with artificial intelligence to create systems that learn, adapt and make decisions across finance, HR, supply chain and customer service." },
      { type: "p", text: "Key benefits include:" },
      {
        type: "ul",
        items: [
          "Lower operational costs",
          "Faster processing times and improved accuracy",
          "A better employee experience by eliminating repetitive work",
          "Scalable operations without proportional headcount increases",
        ],
      },
      { type: "quote", text: "“The organizations that will thrive in the next decade are those that view technology not as a cost center, but as a strategic enabler of business value.”" },
      { type: "h2", text: "Cloud-first ERP strategies" },
      { type: "p", text: "Cloud ERP adoption continues to accelerate as businesses recognize the limits of on-premise infrastructure. Modern cloud ERP offers real-time data access, seamless scalability and a lower total cost of ownership." },
      { type: "p", text: "SAP S/4HANA Cloud in particular has emerged as a leading choice for enterprises modernizing their core systems while keeping the flexibility to extend functionality." },
      { type: "figure", caption: "Modern cloud infrastructure powering enterprise transformation" },
      { type: "h2", text: "Data-driven decision making" },
      { type: "p", text: "Data has become one of the most valuable assets for modern enterprises. Organizations are investing in analytics platforms and business intelligence tools to turn raw data into actionable insights." },
      {
        type: "ol",
        items: [
          "Establish a unified data strategy aligned with business objectives",
          "Invest in modern data architecture and governance",
          "Build analytics capabilities across all departments",
          "Create a culture that values data-informed decisions",
          "Continuously measure and optimize data initiatives",
        ],
      },
      { type: "h2", text: "Preparing for the future" },
      { type: "p", text: "Digital transformation is not a destination but a journey. Organizations that build adaptable, future-ready foundations today will be best positioned to capture tomorrow's opportunities." },
      { type: "p", text: "Partnering with an experienced SAP partner like PT Prima Sistem Terpadu helps make sure your transformation delivers measurable business outcomes." },
    ],
  },
  {
    slug: "why-sap-s4hana-matters-for-modern-enterprises",
    category: "SAP",
    title: "Why SAP S/4HANA matters for modern enterprises",
    excerpt:
      "The critical advantages of moving to SAP S/4HANA for business agility and growth.",
    date: "Oct 10, 2026",
    readTime: "5 min read",
    gated: false,
    tags: ["#SAP", "#S4HANA", "#ERP", "#Modernization"],
    body: [
      { type: "lead", text: "SAP S/4HANA is more than a new version of a familiar ERP. It rebuilds the core of the system around a single in-memory data model, and that change affects how quickly a business can see its numbers, adapt its processes and respond to customers." },
      { type: "p", text: "Many companies that run earlier SAP releases are still working around limitations that were accepted years ago: separate reporting systems, overnight batch jobs and custom code that only one or two people understand. S/4HANA is an opportunity to simplify that landscape, not just to upgrade it." },
      { type: "h2", text: "One data model for transactions and analytics" },
      { type: "p", text: "In earlier systems, detailed transactions were stored in one structure and summarized for reporting in another. The two were kept in step through scheduled jobs, which meant managers often worked with yesterday's picture. In S/4HANA, the detailed records and the reporting views draw from the same tables, so a sales order or a goods movement is reflected in analysis as soon as it is posted." },
      { type: "p", text: "This matters for everyday decisions. A procurement manager can see the effect of a supplier delay on production the same day. A finance controller can close the period with fewer reconciliations because the figures were never copied in the first place." },
      { type: "h2", text: "Where the value shows up" },
      { type: "p", text: "Organizations that move to S/4HANA typically report benefits in a few specific areas. The gains are most visible when the migration is planned around business outcomes rather than around the technical upgrade alone." },
      {
        type: "ul",
        items: [
          "Faster month-end and reporting cycles",
          "Simpler data structures that reduce the cost of integration",
          "Standard business processes that reduce the amount of custom code to maintain",
          "A user interface that makes common tasks quicker for everyday users",
        ],
      },
      { type: "quote", text: "“Moving to S/4HANA is not only a technology decision. It is a chance to ask which processes should exist at all.”" },
      { type: "h2", text: "Planning the move" },
      { type: "p", text: "There are several ways to reach S/4HANA, including a new implementation, a system conversion and a selective transition for specific business units. The right route depends on how much custom development the business depends on, how clean the current data is and how much change the organization can absorb in a single period." },
      { type: "p", text: "A realistic plan starts with a review of the current custom code and master data. Obsolete objects should be retired before the migration rather than carried forward. Data cleansing is usually the most time-consuming step, and it is far easier to do early than under deadline pressure." },
      { type: "h2", text: "Choosing when to act" },
      { type: "p", text: "Waiting carries its own cost. Support timelines for older releases are finite, and every year spent extending a legacy system adds complexity that makes the eventual move harder. Starting with a clear assessment now gives the business time to plan the change properly and to schedule it around the cycles that matter most to operations." },
    ],
  },
  {
    slug: "5-ways-to-optimize-your-business-processes",
    category: "Business",
    title: "5 ways to optimize your business processes",
    excerpt:
      "Practical strategies to find bottlenecks and streamline operations.",
    date: "Oct 8, 2026",
    readTime: "4 min read",
    gated: false,
    tags: ["#BusinessProcess", "#Operations", "#Efficiency", "#SAP"],
    body: [
      { type: "lead", text: "Most business processes were not designed as a whole. They grew one approval, one spreadsheet and one exception at a time, until the way work actually flows through the company no longer matches the way it is written down. Optimizing a process starts by seeing it clearly." },
      { type: "p", text: "The five approaches below are practical starting points. None of them requires a new system on its own, although a well-configured ERP makes each of them easier to sustain." },
      { type: "h2", text: "1. Map the process as it really runs" },
      { type: "p", text: "Ask the people who do the work to walk through the last few cases they handled, including the ones that went wrong. The gap between the official procedure and the real sequence is usually where the delays are hiding. Document every hand-off, waiting time and rework loop, and capture how long each step takes." },
      { type: "h2", text: "2. Remove steps that add no value" },
      { type: "p", text: "Once the map is visible, look for steps that exist only because they always existed. A signature that nobody reads, a report that nobody uses or a data entry that is repeated in two systems can usually be removed. Each removed step shortens the cycle and reduces the chance of error." },
      { type: "ol", items: [
        "Confirm the purpose of each approval and drop those that do not change the outcome",
        "Eliminate double entry between systems by linking them",
        "Replace recurring manual reports with standard analytics",
      ] },
      { type: "h2", text: "3. Automate the repetitive, not the judgment" },
      { type: "p", text: "Automation works best on predictable, high-volume tasks such as invoice matching, reorder triggers and status notifications. Decisions that depend on context, such as credit exceptions or supplier disputes, should stay with people, supported by the right information at the right moment." },
      { type: "quote", text: "“Automate the routine so that people have time for the decisions that really need them.”" },
      { type: "h2", text: "4. Make ownership explicit" },
      { type: "p", text: "Processes stall when nobody is clearly responsible for the outcome. Assign one owner to each end-to-end process and give that person authority over the steps across departments. Review key indicators such as cycle time, first-time-right rate and backlog at a regular interval, and act on what they show." },
      { type: "h2", text: "5. Improve in small, measured steps" },
      { type: "p", text: "Large process redesigns often fail because they change too many things at once. Pick one bottleneck, change it, measure the effect for a few weeks and then decide what to do next. This approach builds momentum and creates evidence that the team can trust." },
      { type: "p", text: "Process optimization is not a one-time project. It is a habit of looking at how work flows, questioning the steps that slow it down and testing better ways of doing it. Businesses that build that habit keep their operations efficient as they grow." },
    ],
  },
  {
    slug: "the-future-of-cloud-erp-solutions",
    category: "Technology",
    title: "The future of cloud ERP solutions",
    excerpt:
      "How cloud-based ERP is changing the way businesses manage resources and data.",
    date: "Oct 5, 2026",
    readTime: "5 min read",
    gated: false,
    tags: ["#CloudERP", "#SAP", "#SaaS", "#Resources"],
    body: [
      { type: "lead", text: "Cloud ERP has moved from an alternative for small companies to a serious option for large, complex enterprises. The conversation has shifted from whether to move at all to how quickly a business can use the cloud to manage its resources more effectively." },
      { type: "p", text: "The biggest change is not where the software runs. It is how the software is maintained, extended and paid for. Each of those changes affects how a finance team, a supply chain team and an IT team plan their work." },
      { type: "h2", text: "Managing resources in real time" },
      { type: "p", text: "A cloud ERP gives every team access to the same current data from any location. Warehouse staff, planners and finance controllers see the same stock positions, commitments and costs as they change. That shared view shortens the time between a decision being needed and a decision being made." },
      { type: "p", text: "For companies with multiple sites or sales offices, the benefit is especially clear. Consolidation no longer waits for a period-end batch, and managers can compare performance across locations without building separate spreadsheets." },
      { type: "h2", text: "Continuous updates instead of large upgrades" },
      { type: "p", text: "Traditional ERP upgrades were major projects that could take many months and disrupt the business. Cloud providers deliver updates on a regular schedule, and the most important part is that the business can plan around them. New functions can be evaluated in a test environment, adopted when ready and ignored when they do not apply." },
      { type: "ul", items: [
        "Regular feature releases that can be reviewed before they reach production",
        "Security patches applied by the provider",
        "Lower disruption to daily operations",
      ] },
      { type: "quote", text: "“In the cloud, the question shifts from when to upgrade to which new capabilities to adopt next.”" },
      { type: "h2", text: "What to look for in a cloud ERP" },
      { type: "p", text: "Not every cloud offering is equally suited to every business. Before committing, assess how the platform handles your industry processes, how it integrates with the systems you cannot replace and how data residency and access rules apply to your organization." },
      { type: "p", text: "Ask also how much of the configuration can be done without custom code. Solutions that rely heavily on custom extensions can become difficult to maintain, especially when the provider releases new versions." },
      { type: "h2", text: "The role of partners" },
      { type: "p", text: "Moving to cloud ERP changes the skills an organization needs. Some work shifts from building to configuring, and some shifts from operating infrastructure to managing vendors and data quality. A capable implementation partner helps bridge that gap by transferring knowledge to the internal team, not only by delivering the project." },
    ],
  },
  {
    slug: "how-to-choose-the-right-sap-partner",
    category: "SAP",
    title: "How to choose the right SAP partner",
    excerpt:
      "Key criteria for selecting an SAP implementation partner for your organization.",
    date: "Oct 2, 2026",
    readTime: "6 min read",
    gated: false,
    tags: ["#SAP", "#Partner", "#Implementation", "#Support"],
    body: [
      { type: "lead", text: "An SAP project is one of the largest technology commitments most companies make. The partner you choose will shape the design of the system, the speed of the rollout and the quality of support for years afterward. Choosing carefully is worth the effort." },
      { type: "p", text: "The criteria below help separate partners that can deliver outcomes from those that can only deliver a system. They are most useful when applied during a structured selection process, with the same questions asked of every shortlisted firm." },
      { type: "h2", text: "Check the partnership, not only the logo" },
      { type: "p", text: "Ask which SAP partner program the firm belongs to and at what level. Confirm the status with SAP directly rather than relying on marketing material. Find out whether the partner delivers support under its own authority or subcontracts that work, and what certifications its consultants hold." },
      { type: "h2", text: "Look for industry depth" },
      { type: "p", text: "A consultant who understands the difference between a make-to-order and a make-to-stock manufacturing process, or between a mining contractor and a distributor, will ask better questions in the first week. Request references from projects in your industry and speak to those clients about what went well and what did not." },
      { type: "ol", items: [
        "Ask for reference clients with a similar size and industry",
        "Review the consultants proposed for your project, not only the senior sales team",
        "Confirm how knowledge will be transferred to your internal staff",
      ] },
      { type: "quote", text: "“The best partners leave the customer more capable at the end of the project than they were at the start.”" },
      { type: "h2", text: "Test the approach to change" },
      { type: "p", text: "Every SAP project changes how people work. A strong partner will describe how it manages stakeholders, runs training and supports adoption after go-live. Weak proposals focus almost entirely on configuration and treat the people side as an afterthought." },
      { type: "h2", text: "Plan for support from the start" },
      { type: "p", text: "Go-live is the beginning of the system's life, not the end of the project. Clarify the support model before signing: response times, escalation paths, the hours covered and who responds to a critical incident at night. Many organizations discover too late that their implementation partner and their support provider are different firms with different priorities." },
      { type: "p", text: "Choosing a partner is a decision about a long relationship. Spend the time to understand how the firm works, and make the commercial terms clear enough that both sides can see what success looks like." },
    ],
  },
  {
    slug: "maximizing-roi-from-your-erp-investment",
    category: "Business",
    title: "Maximizing ROI from your ERP investment",
    excerpt:
      "Approaches to make sure your ERP implementation delivers measurable value.",
    date: "Sep 28, 2026",
    readTime: "5 min read",
    gated: false,
    tags: ["#ROI", "#ERP", "#Investment", "#Business"],
    body: [
      { type: "lead", text: "An ERP investment is judged by what it changes in the business. Licenses, infrastructure and consulting fees are inputs. The return comes from faster cycles, fewer errors, better decisions and lower cost to serve customers." },
      { type: "p", text: "Many organizations define the business case in broad terms during approval and then struggle to show results afterward. The way to avoid that gap is to agree on measurable outcomes at the start and track them throughout the program." },
      { type: "h2", text: "Define the benefits before the build" },
      { type: "p", text: "For each process in scope, write down the current measure and the target. Examples include the number of days needed to close the month, the percentage of orders delivered in full, the inventory value tied up in slow-moving stock and the hours spent on manual reconciliations. Assign an owner to each benefit so that someone is accountable for delivering it." },
      { type: "ul", items: [
        "Quantify the current performance with real data",
        "Set a target that the business agrees is achievable",
        "Review progress against the target at every steering meeting",
      ] },
      { type: "h2", text: "Protect the value during implementation" },
      { type: "p", text: "Value leaks most often when projects are compressed or when scope grows without a corresponding change in the benefit plan. Keep a clear list of what the program will and will not change, and evaluate every new request against the benefit case before accepting it." },
      { type: "quote", text: "“A benefit that is not owned by someone in the business is not a benefit. It is a hope.”" },
      { type: "h2", text: "Adoption is where the return is earned" },
      { type: "p", text: "A system that is live but not used the way it was designed will not produce its expected return. Track adoption directly: who is posting transactions in the new way, where people are still using workarounds and which teams need more support. Adjust training and process guidance based on what those measures reveal." },
      { type: "h2", text: "Keep measuring after go-live" },
      { type: "p", text: "The business case should not end at go-live. Continue measuring the agreed indicators for at least a year, because some benefits, such as inventory reduction or working capital improvement, only appear once the new processes have had time to settle. Use the results to decide where to invest next, whether that means extending the system to another site, improving analytics or retiring legacy tools." },
    ],
  },
  {
    slug: "cybersecurity-best-practices-for-enterprise-systems",
    category: "Security",
    title: "Cybersecurity best practices for enterprise systems",
    excerpt:
      "Essential measures to protect enterprise systems and sensitive business data.",
    date: "Sep 25, 2026",
    readTime: "7 min read",
    gated: false,
    tags: ["#Cybersecurity", "#SAP", "#DataProtection", "#Enterprise"],
    body: [
      { type: "lead", text: "Enterprise systems hold the company's most valuable information: financial records, customer data, supplier terms and the plans that drive production. Protecting them is no longer the job of the IT department alone. It belongs to every team that uses, approves or relies on those systems." },
      { type: "p", text: "The practices below are not exotic. Most incidents in business systems exploit gaps that are well understood: excessive access rights, unpatched components, weak administrative controls and missing monitoring. Closing those gaps consistently is what makes the difference." },
      { type: "h2", text: "Control who can do what" },
      { type: "p", text: "Role-based access is the foundation of enterprise security. Every user should have only the permissions needed for their job, and sensitive combinations, such as creating a vendor and approving its payments, should be separated. Review access regularly, especially when people change roles or leave the company." },
      { type: "ol", items: [
        "Design roles around business functions and document the rules behind them",
        "Separate duties that could be used to commit fraud",
        "Remove access promptly when employment or responsibilities end",
      ] },
      { type: "h2", text: "Keep systems patched and configured" },
      { type: "p", text: "Security updates for the operating system, the database and the application stack should be planned and applied on a defined cycle. Default settings, sample accounts and unused services should be removed during setup, and configuration changes should go through a documented approval process." },
      { type: "quote", text: "“Attackers rarely need a sophisticated exploit when a known weakness has been left open for months.”" },
      { type: "h2", text: "Protect data in transit and at rest" },
      { type: "p", text: "Encrypt connections between users, applications and integration partners, and encrypt sensitive data in storage. Pay particular attention to backups, exports and test copies, which are often less protected than the production system they came from." },
      { type: "h2", text: "Monitor and respond" },
      { type: "p", text: "Prevention cannot be perfect, so detection matters. Log administrative actions, unusual login patterns and changes to critical master data, and review those logs. Agree in advance who decides what to do when something looks wrong, and rehearse the response so that the first hours of an incident are not spent working out the process." },
      { type: "ul", items: [
        "Central logging for administrative and high-risk transactions",
        "Alerts on repeated failed logins and access outside normal hours",
        "A written incident response plan with named owners",
      ] },
      { type: "h2", text: "People are part of the control" },
      { type: "p", text: "Training helps staff recognize phishing, handle credentials safely and report anything unusual without fear of blame. Security works best when it is treated as part of doing the job well rather than as a separate compliance exercise." },
    ],
  },
  {
    slug: "the-role-of-ai-in-enterprise-resource-planning",
    category: "Technology",
    title: "The role of AI in enterprise resource planning",
    excerpt:
      "How AI is transforming ERP systems and enabling smarter decisions.",
    date: "Sep 20, 2026",
    readTime: "6 min read",
    gated: false,
    tags: ["#AI", "#ERP", "#Analytics", "#SmartDecisions"],
    body: [
      { type: "lead", text: "Artificial intelligence is entering ERP systems in practical ways. It is not replacing the ERP as the system of record. Instead it is helping people find patterns, anticipate events and act on information faster than manual analysis allows." },
      { type: "p", text: "The most useful applications today are narrow and measurable. They work on well-defined problems, use data the ERP already holds and leave the final decision to a person who understands the business context." },
      { type: "h2", text: "Forecasting with better signals" },
      { type: "p", text: "Demand and supply planning has always relied on forecasts. Machine learning models can combine historical sales, seasonality, promotions and external indicators to produce forecasts that adjust as new data arrives. Planners still review the results, but they start from a more accurate baseline and spend their time on exceptions." },
      { type: "h2", text: "Finding anomalies early" },
      { type: "p", text: "Finance and operations teams can review thousands of transactions a day, which makes it hard to notice an unusual payment or a sudden change in cost. AI-based anomaly detection flags transactions that depart from normal patterns, so reviewers can focus on the cases most likely to matter." },
      { type: "ul", items: [
        "Duplicate or out-of-pattern invoices flagged before payment",
        "Unexpected changes in supplier prices or lead times highlighted",
        "Inventory movements that do not match expected behavior reported",
      ] },
      { type: "quote", text: "“AI earns its place in the ERP when it makes the next decision better, not when it simply adds another dashboard.”" },
      { type: "h2", text: "Assisting users in the moment" },
      { type: "p", text: "Natural-language assistants can help users find the right transaction, explain a report or draft a standard request. The value depends on how well the assistant is connected to the business rules and permissions of the system. An assistant that answers from outdated or incorrect information does more harm than good." },
      { type: "h2", text: "Governing the data behind the models" },
      { type: "p", text: "AI is only as reliable as the data it learns from. Before introducing models, organizations should check master data quality, define who owns each data domain and document how models are trained, tested and monitored over time. Models that drift without review can quietly lose accuracy." },
      { type: "p", text: "The organizations that gain most from AI in ERP are those that combine it with clear process ownership and sound data governance. The technology accelerates good practice; it does not compensate for its absence." },
    ],
  },
  {
    slug: "building-a-culture-of-innovation-in-it-teams",
    category: "Leadership",
    title: "Building a culture of innovation in IT teams",
    excerpt:
      "Fostering creativity and continuous improvement in your technology organization.",
    date: "Sep 15, 2026",
    readTime: "5 min read",
    gated: false,
    tags: ["#Leadership", "#Innovation", "#ITTeams", "#Culture"],
    body: [
      { type: "lead", text: "Innovation in IT rarely comes from a single brilliant idea. It grows from an environment where people feel safe to propose improvements, test them quickly and share what they learn, including what did not work." },
      { type: "p", text: "Leaders can encourage that environment, but they cannot order it into existence. What they can do is remove the obstacles that stop good ideas from getting a fair hearing and make the expectations for experimentation explicit." },
      { type: "h2", text: "Make room for experiments" },
      { type: "p", text: "Set aside a small, protected share of capacity for improvement work that is not part of the committed roadmap. It does not need to be large. Even a few hours a week for a small team can produce prototypes, automation scripts and process fixes that would otherwise never be started." },
      { type: "h2", text: "Reward learning, not only delivery" },
      { type: "p", text: "Performance reviews often focus on what was delivered and how it was received. Add a clear way to recognize learning: a well-run experiment that ended quickly, a post-incident review that changed a practice or a documented decision that saved someone else time." },
      { type: "ul", items: [
        "Short demos where teams show what they tried, not only what they finished",
        "Blameless reviews after incidents and failed experiments",
        "A shared place to record decisions and the reasons behind them",
      ] },
      { type: "quote", text: "“Psychological safety is not about being nice. It is about making it easy to say the uncomfortable thing that the project needs.”" },
      { type: "h2", text: "Connect IT with the business" },
      { type: "p", text: "Innovation is most useful when it solves a real problem for someone in the business. Spend time with the people who use the systems, watch how they work and ask where the friction is. Many of the best improvements are small changes that remove a manual step from a daily routine." },
      { type: "h2", text: "Sustain the momentum" },
      { type: "p", text: "A culture of innovation needs regular attention. Review the experiments that were run, share the lessons across teams and decide which ideas deserve a larger investment. When people see that their suggestions lead to real change, they keep offering them." },
      { type: "p", text: "The goal is an IT organization that improves steadily because its people are curious, supported and clear about what matters to the business. That kind of team is the most reliable source of innovation an enterprise can have." },
    ],
  },
];

export const categories = [
  "All",
  "SAP",
  "Technology",
  "Business",
  "Security",
  "Leadership",
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`;

export const postImages: Record<string, string> = {
  "navigating-the-future-of-enterprise-technology": photo("photo-1787647562412-e9eaad870778"),
  "digital-transformation-trends-this-year": photo("photo-1665725045018-d734fe11e46d"),
  "why-sap-s4hana-matters-for-modern-enterprises": photo("photo-1782330300311-fbe6f4389012"),
  "5-ways-to-optimize-your-business-processes": photo("photo-1690192123455-6337e6db4179"),
  "the-future-of-cloud-erp-solutions": photo("photo-1690264459607-a90b23d887f8"),
  "how-to-choose-the-right-sap-partner": photo("photo-1759310610325-2c7cb621e5e3"),
  "maximizing-roi-from-your-erp-investment": photo("photo-1686061593213-98dad7c599b9"),
  "cybersecurity-best-practices-for-enterprise-systems": photo("photo-1642693963853-2c231c0a014a"),
  "the-role-of-ai-in-enterprise-resource-planning": photo("photo-1709809994088-a1f134fe3da9"),
  "building-a-culture-of-innovation-in-it-teams": photo("photo-1758876019523-efcda041410c"),
};

export const relatedImages: Record<string, string> = {
  "why-sap-s4hana-matters-for-modern-enterprises": photo("photo-1667372283496-893f0b1e7c16"),
  "the-future-of-cloud-erp-solutions": photo("photo-1520085601670-ee14aa5fa3e8"),
  "5-ways-to-optimize-your-business-processes": photo("photo-1690192204117-7af18e88f877"),
};

export const coverImage = photo("photo-1702295669371-fc110f29f62e");
export const figureImage = photo("photo-1572837965327-5abe899408b8");

export const unlockCookie = "pst_unlocked";

export const previewBlocks = 4;

type Lang = "en" | "id";

type IdPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags?: string[];
};

export const idPosts: Record<string, IdPost> = {
  "navigating-the-future-of-enterprise-technology": {
    title: "Menavigasi masa depan teknologi enterprise",
    excerpt: "Bagaimana perusahaan Indonesia memanfaatkan SAP S/4HANA dan teknologi cloud untuk mendorong inovasi, menyederhanakan operasional, dan bersiap menghadapi gelombang transformasi digital berikutnya.",
    date: "15 Okt 2026",
    readTime: "6 menit baca",
  },
  "digital-transformation-trends-this-year": {
    title: "Tren transformasi digital tahun ini",
    excerpt: "Tren teknologi utama yang membentuk transformasi digital perusahaan tahun ini dan seterusnya.",
    date: "12 Okt 2026",
    readTime: "8 menit baca",
    tags: ["#TransformasiDigital", "#SAP", "#ERP", "#Cloud", "#Enterprise"],
  },
  "why-sap-s4hana-matters-for-modern-enterprises": {
    title: "Mengapa SAP S/4HANA penting bagi perusahaan modern",
    excerpt: "Keunggulan penting beralih ke SAP S/4HANA untuk kelincahan dan pertumbuhan bisnis.",
    date: "10 Okt 2026",
    readTime: "5 menit baca",
  },
  "5-ways-to-optimize-your-business-processes": {
    title: "5 cara mengoptimalkan proses bisnis Anda",
    excerpt: "Strategi praktis menemukan hambatan dan menyederhanakan operasional.",
    date: "8 Okt 2026",
    readTime: "4 menit baca",
  },
  "the-future-of-cloud-erp-solutions": {
    title: "Masa depan solusi cloud ERP",
    excerpt: "Bagaimana ERP berbasis cloud mengubah cara bisnis mengelola sumber daya dan data.",
    date: "5 Okt 2026",
    readTime: "5 menit baca",
  },
  "how-to-choose-the-right-sap-partner": {
    title: "Cara memilih mitra SAP yang tepat",
    excerpt: "Kriteria utama memilih mitra implementasi SAP untuk organisasi Anda.",
    date: "2 Okt 2026",
    readTime: "6 menit baca",
  },
  "maximizing-roi-from-your-erp-investment": {
    title: "Memaksimalkan ROI dari investasi ERP Anda",
    excerpt: "Pendekatan untuk memastikan implementasi ERP Anda memberikan nilai yang terukur.",
    date: "28 Sep 2026",
    readTime: "5 menit baca",
  },
  "cybersecurity-best-practices-for-enterprise-systems": {
    title: "Praktik terbaik keamanan siber untuk sistem enterprise",
    excerpt: "Langkah penting melindungi sistem enterprise dan data bisnis yang sensitif.",
    date: "25 Sep 2026",
    readTime: "7 menit baca",
  },
  "the-role-of-ai-in-enterprise-resource-planning": {
    title: "Peran AI dalam enterprise resource planning",
    excerpt: "Bagaimana AI mentransformasi sistem ERP dan memungkinkan keputusan yang lebih cerdas.",
    date: "20 Sep 2026",
    readTime: "6 menit baca",
  },
  "building-a-culture-of-innovation-in-it-teams": {
    title: "Membangun budaya inovasi di tim TI",
    excerpt: "Menumbuhkan kreativitas dan perbaikan berkelanjutan di organisasi teknologi Anda.",
    date: "15 Sep 2026",
    readTime: "5 menit baca",
  },
};

export const idBodies: Record<string, Block[]> = {
  "digital-transformation-trends-this-year": [
    { type: "lead", text: "Laju transformasi digital tidak pernah secepat sekarang. Perusahaan di Indonesia dan dunia mengadopsi teknologi baru agar tetap kompetitif, gesit, dan berorientasi pada pelanggan." },
    { type: "p", text: "Dalam artikel ini, kami mengulas tren paling signifikan yang membentuk lanskap transformasi digital tahun ini — dan bagaimana organisasi dapat memanfaatkannya untuk pertumbuhan berkelanjutan." },
    { type: "h2", text: "Kebangkitan otomatisasi cerdas" },
    { type: "p", text: "Otomatisasi bukan lagi sekadar menggantikan pekerjaan manual. Otomatisasi cerdas memadukan robotic process automation (RPA) dengan kecerdasan buatan untuk menciptakan sistem yang belajar, beradaptasi, dan mengambil keputusan — di bidang keuangan, SDM, rantai pasok, dan layanan pelanggan." },
    { type: "p", text: "Manfaat utamanya meliputi:" },
    { type: "ul", items: [
      "Biaya operasional lebih rendah",
      "Waktu proses lebih cepat dan akurasi lebih baik",
      "Pengalaman karyawan yang lebih baik dengan menghilangkan pekerjaan berulang",
      "Operasional yang dapat diskalakan tanpa penambahan karyawan sebanding",
    ] },
    { type: "quote", text: "“Organisasi yang akan berjaya dalam dekade mendatang adalah mereka yang memandang teknologi bukan sebagai pusat biaya, melainkan pendorong strategis nilai bisnis.”" },
    { type: "h2", text: "Strategi ERP cloud-first" },
    { type: "p", text: "Adopsi cloud ERP terus meningkat seiring bisnis menyadari keterbatasan infrastruktur on-premise. Cloud ERP modern menawarkan akses data real-time, skalabilitas mulus, dan total cost of ownership yang lebih rendah." },
    { type: "p", text: "SAP S/4HANA Cloud khususnya telah menjadi pilihan utama bagi perusahaan yang memodernisasi sistem inti sambil tetap fleksibel untuk memperluas fungsionalitas." },
    { type: "figure", caption: "Infrastruktur cloud modern yang menggerakkan transformasi perusahaan" },
    { type: "h2", text: "Pengambilan keputusan berbasis data" },
    { type: "p", text: "Data telah menjadi salah satu aset paling berharga bagi perusahaan modern. Organisasi berinvestasi pada platform analitik dan business intelligence untuk mengubah data mentah menjadi wawasan yang dapat ditindaklanjuti." },
    { type: "ol", items: [
      "Tetapkan strategi data terpadu yang selaras dengan tujuan bisnis",
      "Berinvestasi pada arsitektur dan tata kelola data modern",
      "Bangun kapabilitas analitik di semua departemen",
      "Ciptakan budaya yang menghargai keputusan berbasis data",
      "Ukur dan optimalkan inisiatif data secara berkelanjutan",
    ] },
    { type: "h2", text: "Bersiap menghadapi masa depan" },
    { type: "p", text: "Transformasi digital bukanlah tujuan akhir, melainkan sebuah perjalanan. Organisasi yang membangun fondasi adaptif dan siap masa depan hari ini akan berada di posisi terbaik untuk menangkap peluang esok hari." },
    { type: "p", text: "Bermitra dengan mitra SAP berpengalaman seperti PT Prima Sistem Terpadu membantu memastikan transformasi Anda menghasilkan dampak bisnis yang terukur." },
  ],
};

// Returns the post with its Indonesian copy applied when available.
export function localPost<T extends { slug: string }>(post: T, lang: Lang): T {
  if (lang !== "id") return post;
  const id = idPosts[post.slug];
  return id ? { ...post, ...id } : post;
}
