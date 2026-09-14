export type HuaCard = {
  title: string;
  eyebrow?: string;
  text?: string;
  meta?: string;
  image?: string;
  link?: string;
  label?: string;
};

export type HuaSection = {
  title: string;
  text?: string;
  cards?: HuaCard[];
  cardColumns?: 3 | 4;
  list?: string[];
  stats?: [string, string][];
  logos?: string[];
  cta?: { label: string; href: string };
};

export type HuaPage = {
  title: string;
  kicker: string;
  image: string;
  intro: string;
  sections: HuaSection[];
};

const COMMON_APPLICATION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdSa-5bn-3_Ip_K4-FT3SnUy1zojCZoDMzMN9W05UcMmMjdXQ/viewform?usp=dialog';

const OFFICER_IMAGES = {
  zach: '/hua-assets/officers/zach-berg.webp', daniel: '/hua-assets/officers/daniel-zhao.webp',
  jake: '/hua-assets/officers/jake-marino.webp', polina: '/hua-assets/officers/polina-krumkachev.webp',
  maritella: '/hua-assets/officers/maritella-petsa.webp', asante: '/hua-assets/officers/asante-kiio.webp',
  ella: '/hua-assets/officers/ella-mcritchie.webp', tess: '/hua-assets/officers/tess-sumner.webp',
  finn: '/hua-assets/officers/finn-berard.webp', adam: '/hua-assets/officers/adam-han.webp',
  jaden: '/hua-assets/officers/jaden-lee.webp', evan: '/hua-assets/officers/evan-epstein.webp',
  angela: '/hua-assets/officers/angela-yang.webp', sophie: '/hua-assets/officers/sophie-zeng.webp',
  luke: '/hua-assets/officers/luke-kim.webp', ryan: '/hua-assets/officers/ryan-wang.webp',
  oliver: '/hua-assets/officers/oliver-epstein.webp', marissa: '/hua-assets/officers/marissa-gottman.webp',
  matthew: '/hua-assets/officers/matthew-tobin.webp', colin: '/hua-assets/officers/colin-chu.webp',
  kevin: '/hua-assets/officers/kevin-wu.webp', vy: '/hua-assets/officers/vy-le.webp',
  eshaan: '/hua-assets/officers/eshaan-mani.webp', melissa: '/hua-assets/officers/melissa-chai.webp',
  sean: '/hua-assets/officers/sean-brady-merrill.webp', joshua: '/hua-assets/officers/joshua-lee.webp',
  sarah: '/hua-assets/officers/sarah-anschell.webp', annabella: '/hua-assets/officers/annabella-burton-boone.webp',
} as const;

export const huaPages: Record<string, HuaPage> = {
  executiveofficers: {
    title: 'Executive Officers', kicker: 'Leadership', image: '/hua-assets/executive.webp',
    intro: 'Meet the students elected by the undergraduate student body to represent student priorities and lead the HUA for a one-year cycle.',
    sections: [
      { title: 'Co-Presidents', text: 'The Co-Presidents set organization-wide priorities, coordinate the Executive Team, and represent students in regular conversations with College and University leadership.', cardColumns: 4, cards: [
        { title: 'Zach Berg', eyebrow: 'Co-President', text: 'Organization-wide leadership and student advocacy.', meta: 'copresidents@thehua.org', image: OFFICER_IMAGES.zach },
        { title: 'Daniel Zhao', eyebrow: 'Co-President', text: 'Organization-wide leadership and student advocacy.', meta: 'copresidents@thehua.org', image: OFFICER_IMAGES.daniel }
      ]},
      { title: 'Officers', text: 'Each officer leads a team focused on a major part of undergraduate life and is accountable for that team’s effective work.', cardColumns: 4, cards: [
        { title: 'Jake Marino', eyebrow: 'Co-Treasurer', meta: 'treasurer@thehua.org', image: OFFICER_IMAGES.jake, link: '/finance-team', label: 'Finance Team' }, { title: 'Polina Krumkachev', eyebrow: 'Co-Treasurer', meta: 'treasurer@thehua.org', image: OFFICER_IMAGES.polina, link: '/finance-team', label: 'Finance Team' },
        { title: 'Maritella Petsa', eyebrow: 'Academic Life', meta: 'academics@thehua.org', image: OFFICER_IMAGES.maritella, link: '/academic-team', label: 'Academic Team' }, { title: 'Asante Kiio', eyebrow: 'Social Life', meta: 'social-life@thehua.org', image: OFFICER_IMAGES.asante, link: '/social-life-team', label: 'Social Life Team' },
        { title: 'Ella McRitchie', eyebrow: 'Sports', meta: 'sports@thehua.org', image: OFFICER_IMAGES.ella, link: '/sports-team', label: 'Sports Team' }, { title: 'Tess Sumner', eyebrow: 'Well-Being', meta: 'well-being@thehua.org', image: OFFICER_IMAGES.tess, link: '/well-being-team', label: 'Well-Being Team' },
        { title: 'Finn Berard', eyebrow: 'Residential Life', meta: 'residential-life@thehua.org', image: OFFICER_IMAGES.finn, link: '/residential-life-team', label: 'Residential Life Team' }, { title: 'Adam Han', eyebrow: 'Extracurriculars', meta: 'extracurriculars@thehua.org', image: OFFICER_IMAGES.adam, link: '/extracurriculars-team', label: 'Extracurriculars Team' },
        { title: 'Officer TBD', eyebrow: 'Inclusion', text: 'This role will be filled through snap elections.', link: '/inclusion-team', label: 'Inclusion Team' }
      ]}
    ]
  },
  'academic-team': {
    title: 'Academic Life Team', kicker: 'Current officer', image: '/hua-assets/guides.webp',
    intro: 'The Academic Life Team advocates for a stronger, more navigable undergraduate academic experience.',
    sections: [
      { title: 'What the team does', text: 'The team works with the Office of Undergraduate Education, Academic Resource Center, Program in General Education, Office of Undergraduate Research and Fellowships, Office of International Education, Honor Council, Administrative Board, and Mignone Center for Career Success. It advocates for student interests, helps make academic grants and opportunities easier to navigate, and prepares student appointments to the Committee on Undergraduate Education.' },
      { title: 'Team leadership', cards: [{ title: 'Maritella Petsa', eyebrow: 'Academic Life Officer', meta: 'academics@thehua.org', image: OFFICER_IMAGES.maritella }] },
      { title: 'Join the team', text: 'All HUA team applications use the common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } }
    ]
  },
  'social-life-team': {
    title: 'Social Life Team', kicker: 'Current officer', image: '/hua-assets/instagram-bg.webp',
    intro: 'The Social Life Team builds inclusive opportunities for students to connect across campus.',
    sections: [
      { title: 'What the team does', text: 'The team creates inclusive social events and builds relationships with local businesses and community organizations. It works with House Committees, the College Events Board, the First-Year Social Committee, and other student groups, and partners with the Extracurriculars Team on student appointments to the Committee on Student Life.' },
      { title: 'Team leadership', cards: [{ title: 'Asante Kiio', eyebrow: 'Social Life Officer', meta: 'social-life@thehua.org', image: OFFICER_IMAGES.asante }] },
      { title: 'Join the team', text: 'All HUA team applications use the common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } }
    ]
  },
  'sports-team': {
    title: 'Sports Team', kicker: 'Current officer', image: '/hua-assets/widener.webp',
    intro: 'The Sports Team represents student priorities across athletics, recreation, and wellness through movement.',
    sections: [
      { title: 'What the team does', text: 'The team works with Harvard Athletics and House Committees to improve intramural, club, and varsity athletics for participants and spectators. Its remit includes equitable access to funding and facilities as well as programs that help more students participate in sports.' },
      { title: 'Team leadership', cards: [{ title: 'Ella McRitchie', eyebrow: 'Sports Officer', meta: 'sports@thehua.org', image: OFFICER_IMAGES.ella }] },
      { title: 'Join the team', text: 'All HUA team applications use the common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } }
    ]
  },
  'well-being-team': {
    title: 'Well-Being Team', kicker: 'Current officer', image: '/hua-assets/improve.webp',
    intro: 'The Well-Being Team works on student mental, physical, and emotional well-being and access to support.',
    sections: [
      { title: 'What the team does', text: 'The team helps students navigate emotional, mental, and physical health resources and advocates for accessible campus spaces. It works with offices including CAMHS, Harvard University Health Services, the Accessible Education Office, and the Office of Gender Equity, and supports student appointments to relevant advisory committees.' },
      { title: 'Team leadership', cards: [{ title: 'Tess Sumner', eyebrow: 'Well-Being Officer', meta: 'well-being@thehua.org', image: OFFICER_IMAGES.tess }] },
      { title: 'Join the team', text: 'All HUA team applications use the common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } }
    ]
  },
  'residential-life-team': {
    title: 'Residential Life Team', kicker: 'Current officer', image: '/hua-assets/meeting.webp',
    intro: 'The Residential Life Team advocates for students across houses, yards, dining, transportation, and campus living.',
    sections: [
      { title: 'What the team does', text: 'The team works with Harvard University Dining Services, the First-Year Experience Office, the Dean of Students Office, and campus safety partners. It seeks solutions to issues affecting Houses and first-year residential communities and prepares student appointments to dining and safety committees.' },
      { title: 'Team leadership', cards: [{ title: 'Finn Berard', eyebrow: 'Residential Life Officer', meta: 'residential-life@thehua.org', image: OFFICER_IMAGES.finn }] },
      { title: 'Join the team', text: 'All HUA team applications use the common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } }
    ]
  },
  'extracurriculars-team': {
    title: 'Extracurriculars Team', kicker: 'Current officer', image: '/hua-assets/structure.webp',
    intro: 'The Extracurriculars Team supports student organizations and the communities they create.',
    sections: [
      { title: 'What the team does', text: 'The team supports the student-organization recognition process, helps groups navigate Dean of Students Office policies, and advocates for improvements when those processes create barriers. It partners with the Social Life Team on student appointments to the Committee on Student Life.' },
      { title: 'Team leadership', cards: [{ title: 'Adam Han', eyebrow: 'Extracurriculars Officer', meta: 'extracurriculars@thehua.org', image: OFFICER_IMAGES.adam }] },
      { title: 'Join the team', text: 'All HUA team applications use the common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } }
    ]
  },
  'inclusion-team': {
    title: 'Inclusion Team', kicker: 'Snap election pending', image: '/hua-assets/executive.webp',
    intro: 'The Inclusion Team helps students navigate identity-related resources and advances access, belonging, and inclusion across campus.',
    sections: [
      { title: 'What the team does', text: 'The team helps students navigate identity-related resources and works with the Office of Gender Equity, Harvard Foundation, Accessible Education Office, and other equity and belonging partners. It also supports student appointments to the Office of Gender Equity Student Advisory Committee.' },
      { title: 'Team leadership', cards: [{ title: 'Officer TBD', eyebrow: 'Inclusion Officer', text: 'This role will be updated after snap elections.', meta: 'inclusion@thehua.org' }] },
      { title: 'Join the team', text: 'All HUA team applications use the common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } }
    ]
  },
  'finance-team': {
    title: 'Finance Team', kicker: 'Current officers', image: '/hua-assets/structure.webp',
    intro: 'The Finance Team administers student organization funding and supports transparent stewardship of HUA resources.',
    sections: [
      { title: 'What the team does', text: 'The team administers student-organization funding, maintains HUA financial records and required filings, and applies conflict-of-interest and financial-control standards. Team members receive financial training, and anyone with a financial stake in a decision must recuse themselves from that review.' },
      { title: 'Co-Treasurers', cards: [{ title: 'Jake Marino', eyebrow: 'Co-Treasurer', meta: 'treasurer@thehua.org', image: OFFICER_IMAGES.jake }, { title: 'Polina Krumkachev', eyebrow: 'Co-Treasurer', meta: 'treasurer@thehua.org', image: OFFICER_IMAGES.polina }] },
      { title: 'Finance resources', text: 'Funding guidance, applications, budgets, and reports are maintained in the integrated Finance section.', cta: { label: 'Open Finance & Funding', href: '/finance' } }
    ]
  },
  'executive-team': {
    title: 'Executive Team', kicker: 'How HUA works', image: '/hua-assets/structure.webp',
    intro: 'The Executive Team brings elected officers together to turn student priorities into coordinated action.',
    sections: [
      { title: 'Shared leadership', text: 'The Executive Team meets regularly, maintains accountability across projects, and carries student concerns into conversations with Harvard administrators. The Co-Presidents meet with senior College and University leaders, report back to the team, and work with officers to propose and approve each semester’s team budgets.', stats: [['2', 'Co-Presidents'], ['8', 'Issue areas'], ['1', 'Student body']] },
      { title: 'Co-Presidents', cardColumns: 4, cards: [
        { title: 'Zach Berg', eyebrow: 'Co-President', text: 'Office hours by appointment over email.', meta: 'copresidents@thehua.org', image: OFFICER_IMAGES.zach },
        { title: 'Daniel Zhao', eyebrow: 'Co-President', text: 'Office hours by appointment over email.', meta: 'copresidents@thehua.org', image: OFFICER_IMAGES.daniel }
      ]},
      { title: 'The Cabinet', text: 'Cabinet members support communications, advocacy, operations, service, civic engagement, and organizational memory.', cardColumns: 4, cards: [
        { title: 'Jaden Lee', eyebrow: 'Chief of Staff', image: OFFICER_IMAGES.jaden },
        { title: 'Evan Epstein', eyebrow: 'Executive Vice President', image: OFFICER_IMAGES.evan },
        { title: 'Angela Yang', eyebrow: 'Co-VP of Technology', image: OFFICER_IMAGES.angela },
        { title: 'Sophie Zeng', eyebrow: 'Co-VP of Technology', image: OFFICER_IMAGES.sophie },
        { title: 'Luke Kim', eyebrow: 'VP of Photography', image: OFFICER_IMAGES.luke },
        { title: 'Ryan Wang', eyebrow: 'Co-VP of Social Media', image: OFFICER_IMAGES.ryan },
        { title: 'Oliver Epstein', eyebrow: 'Co-VP of Social Media', image: OFFICER_IMAGES.oliver },
        { title: 'Marissa Gottman', eyebrow: 'Co-VP of Social Media', image: OFFICER_IMAGES.marissa },
        { title: 'Matthew Tobin', eyebrow: 'Co-VP of Advocacy', image: OFFICER_IMAGES.matthew },
        { title: 'Colin Chu', eyebrow: 'Co-VP of Advocacy', image: OFFICER_IMAGES.colin },
        { title: 'Kevin Wu', eyebrow: 'Co-VP of Communications', image: OFFICER_IMAGES.kevin },
        { title: 'Vy Le', eyebrow: 'Co-VP of Communications', image: OFFICER_IMAGES.vy },
        { title: 'Eshaan Mani', eyebrow: 'VP of HUA History', image: OFFICER_IMAGES.eshaan },
        { title: 'Melissa Chai', eyebrow: 'Co-VP of Service', image: OFFICER_IMAGES.melissa },
        { title: 'Sean Brady Merrill', eyebrow: 'Co-VP of Service', image: OFFICER_IMAGES.sean },
        { title: 'Joshua Lee', eyebrow: 'Co-VP of Civic Engagement', image: OFFICER_IMAGES.joshua },
        { title: 'Sarah Anschell', eyebrow: 'Co-VP of Civic Engagement', image: OFFICER_IMAGES.sarah },
        { title: 'Annabella Burton Boone', eyebrow: 'VP of Special Projects', image: OFFICER_IMAGES.annabella }
      ]},
      { title: 'Join the Cabinet', text: 'All HUA applications use one common application.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } },
      { title: 'Get in touch', text: 'Questions for the Executive Team can be sent to copresidents@thehua.org.', cta: { label: 'Email the Co-Presidents', href: 'mailto:copresidents@thehua.org' } }
    ]
  },
  join: {
    title: 'Join the HUA', kicker: 'Take a seat at the table', image: '/hua-assets/widener.webp',
    intro: 'Every Harvard College undergraduate can contribute. Choose an issue you care about, find a team, and help turn ideas into action.',
    sections: [
      { title: 'Who can participate', text: 'Any Harvard College undergraduate can join HUA. Members may contribute to more than one team and work directly with the officer responsible for each issue area.' },
      { title: 'Three ways to start', cards: [
        { title: 'Join a team', eyebrow: '01', text: 'Work alongside students focused on academics, campus life, well-being, sports, or extracurriculars.', link: '/teams-and-contacts/', label: 'Meet the teams' },
        { title: 'Lead a solution', eyebrow: '02', text: 'Bring forward a problem, shape a plan, and organize a project with officer support.' },
        { title: 'Share an idea', eyebrow: '03', text: 'Not ready to lead? Help the right team understand an issue and contribute when you can.' }
      ]},
      { title: 'Apply', text: 'The previous handbook has been retired. Use the common HUA application for every team and cabinet role.', cta: { label: 'Open the common application', href: COMMON_APPLICATION_URL } },
      { title: 'Built for participation', text: 'HUA is designed around action, openness, and the belief that students closest to a problem should help shape the response.', cta: { label: 'Find your team', href: '/teams-and-contacts/' } }
    ]
  },
  calendar: {
    title: 'Calendar', kicker: 'Meetings & events', image: '/hua-assets/instagram-bg.webp',
    intro: 'HUA meetings are open to Harvard College undergraduates. Come listen, contribute, or connect with an officer.',
    sections: [
      { title: 'Current events', cards: [
        { title: 'HUA General Meeting', eyebrow: 'Sunday, September 13, 2026', text: 'Open to all Harvard College undergraduates. Time and location will be posted when confirmed.' },
        { title: 'HUA Civility Event', eyebrow: 'September 2026', text: 'A campus conversation centered on constructive dialogue and community. Event details will be posted when confirmed.' }
      ]},
      { title: 'Updates', text: 'This calendar intentionally contains only current events. Future events will be added as details are officially announced.', cta: { label: 'Ask about an event', href: 'mailto:copresidents@thehua.org' } }
    ]
  },
  'governing-docs': {
    title: 'Governing Documents', kicker: 'Rules & accountability', image: '/hua-assets/guides.webp',
    intro: 'The documents that define HUA’s responsibilities, decision-making practices, and standards for fair participation.',
    sections: [{ title: 'Document library', cards: [
      { title: 'Constitution & Bylaws', eyebrow: 'Foundation', text: 'The organization’s authority, structure, responsibilities, and amendment process.', link: 'https://docs.google.com/document/d/1OkwkJenKI9kRywA1fZyyjdSipJ-oiVQ-Ub-R-Z6Cflc/edit?usp=sharing', label: 'Open document' },
      { title: 'General Meeting Guidelines', eyebrow: 'Revision requested', text: 'The published copy is dated 2022–2023. A current version has been requested from the Co-Presidents.', link: 'mailto:copresidents@thehua.org?subject=Current%20General%20Meeting%20Guidelines', label: 'Request the current version' },
      { title: 'Election Commission Guidelines', eyebrow: 'Elections', text: 'Standards for administration, neutrality, candidate access, and dispute resolution.', link: 'https://docs.google.com/document/d/1Is-ab0PZwPB95tKRzkXSxD0X5EOCbGNx3NLc8UsE1pI/edit?usp=sharing', label: 'Open document' }
    ]}]
  },
  'hua-semesterly-grant-opening': {
    title: 'Semesterly Grants', kicker: 'Club funding', image: '/hua-assets/meeting.webp',
    intro: 'Fall 2026 grant applications are coming soon.',
    sections: [
      { title: 'Before you apply', list: ['Review the current finance guidelines.', 'Confirm that your organization is eligible and in good standing.', 'Prepare an itemized budget and funding supplement.', 'Track deadlines and retain receipts for every approved expense.'] },
      { title: 'Fall 2026 status', text: 'Applications are not open yet. Dates will be posted by the Finance Team when confirmed.', cta: { label: 'Prepare in the funding hub', href: '/grant-information' } }
    ]
  },
  'election-guidelines': {
    title: 'Election Guidelines', kicker: 'Current election information', image: '/hua-assets/widener.webp',
    intro: 'Clear campaign expectations help create a fair, respectful, and accessible election for every student.',
    sections: [
      { title: 'Campaign principles', cards: [
        { title: 'Fair access', eyebrow: '01', text: 'Candidates should have equitable access to information, deadlines, and approved campaign channels.' },
        { title: 'Respectful conduct', eyebrow: '02', text: 'Campaigns should focus on ideas and avoid harassment, misrepresentation, or disruption.' },
        { title: 'Transparent process', eyebrow: '03', text: 'Rules, decisions, and enforcement should be documented and communicated consistently.' }
      ]},
      { title: 'Official regulations', text: 'Read the complete 2026 Spring Election campaign regulations before campaigning begins.', cta: { label: 'Open campaign regulations', href: 'https://docs.google.com/document/d/1Is-ab0PZwPB95tKRzkXSxD0X5EOCbGNx3NLc8UsE1pI/edit?usp=sharing' } },
      { title: '2027 elections', text: 'The 2027 election guidelines will be published before those elections begin.' },
      { title: 'Questions or concerns', text: 'Election questions should be directed to the appropriate HUA election administrators before campaigning begins.', cta: { label: 'Contact HUA', href: 'mailto:copresidents@thehua.org' } }
    ]
  },
  'teams-and-contacts': {
    title: 'Teams & Contacts', kicker: 'Find the right people', image: '/hua-assets/executive.webp',
    intro: 'Start with the issue area closest to your question. Every team welcomes thoughtful input from students.',
    sections: [{ title: 'HUA teams', cards: [
      { title: 'Academic Life · Maritella Petsa', eyebrow: 'Courses & learning', meta: 'academics@thehua.org', image: OFFICER_IMAGES.maritella, link: '/academic-team', label: 'Team page' }, { title: 'Social Life · Asante Kiio', eyebrow: 'Campus connection', meta: 'social-life@thehua.org', image: OFFICER_IMAGES.asante, link: '/social-life-team', label: 'Team page' },
      { title: 'Sports · Ella McRitchie', eyebrow: 'Athletics & recreation', meta: 'sports@thehua.org', image: OFFICER_IMAGES.ella, link: '/sports-team', label: 'Team page' }, { title: 'Well-Being · Tess Sumner', eyebrow: 'Student support', meta: 'well-being@thehua.org', image: OFFICER_IMAGES.tess, link: '/well-being-team', label: 'Team page' },
      { title: 'Residential Life · Finn Berard', eyebrow: 'Housing & community', meta: 'residential-life@thehua.org', image: OFFICER_IMAGES.finn, link: '/residential-life-team', label: 'Team page' }, { title: 'Extracurriculars · Adam Han', eyebrow: 'Clubs & activities', meta: 'extracurriculars@thehua.org', image: OFFICER_IMAGES.adam, link: '/extracurriculars-team', label: 'Team page' },
      { title: 'Inclusion · Officer TBD', eyebrow: 'Snap election pending', link: '/inclusion-team', label: 'Team page' }, { title: 'Finance · Jake Marino & Polina Krumkachev', eyebrow: 'Funding & receipts', meta: 'treasurer@thehua.org', image: OFFICER_IMAGES.jake, link: '/finance-team', label: 'Team page' }, { title: 'Executive Team', eyebrow: 'General inquiries', meta: 'copresidents@thehua.org', image: OFFICER_IMAGES.zach }
    ]}]
  },
  'harvard-guides': {
    title: 'Harvard Guides', kicker: 'Navigate campus', image: '/hua-assets/guides.webp',
    intro: 'A concise, current set of official tools for navigating Harvard academics and reserving campus space.',
    sections: [{ title: 'Explore by topic', cards: [
      { title: 'Harvard Terms & Acronyms', eyebrow: 'Harvard guide', text: 'A current guide to common Harvard terminology, offices, and locations.', link: 'https://college.harvard.edu/guides/harvard-terms-and-acronyms', label: 'Open the Harvard guide' },
      { title: 'Q Guide', eyebrow: 'Course reviews', text: 'Read student feedback and course evaluation results.', link: 'https://qreports.fas.harvard.edu/', label: 'Open the Q Guide' },
      { title: 'Book a room', eyebrow: 'RoomBook', text: 'One consolidated starting point for reserving FAS spaces with your HarvardKey.', link: 'https://roombook.harvard.edu/request-room', label: 'View room-booking instructions' },
      { title: 'Student-friendly spots', eyebrow: 'Study & gather', text: 'A short, maintained list of reliable places to study, meet, and recharge around campus.', link: '/spots', label: 'Browse campus spots' }
    ]}, { title: 'Help improve this guide', text: 'Know a resource that should be included? Send your suggestion to copresidents@thehua.org.', cta: { label: 'Suggest a resource', href: 'mailto:copresidents@thehua.org' } }]
  },
  spots: {
    title: 'Campus Spots', kicker: 'Study, meet & recharge', image: '/hua-assets/widener.webp',
    intro: 'A practical starting list of dependable campus spaces, with official tools for checking current hours and amenities.',
    sections: [
      { title: 'Places to start', cards: [
        { title: 'Lamont Library', eyebrow: 'Late-night study', text: 'A central option for individual work, group study, printing, and late-night access. Check current hours before visiting.', link: 'https://library.harvard.edu/libraries/lamont', label: 'Check Lamont details' },
        { title: 'Smith Campus Center', eyebrow: 'Meet & recharge', text: 'Indoor and outdoor common space for informal meetings, meals, and time between classes.', link: 'https://commonspaces.harvard.edu/smith-campus-center', label: 'Explore the Smith Center' },
        { title: 'Science Center', eyebrow: 'Central & practical', text: 'A convenient crossroads with study tables, food nearby, and easy access from the Yard.', link: 'https://map.harvard.edu/?bld=04420', label: 'Open the campus map' },
        { title: 'Harvard Library spaces', eyebrow: 'Find your fit', text: 'Filter official library spaces by noise level, furniture, accessibility, and available equipment.', link: 'https://library.harvard.edu/services-tools/find-space', label: 'Find a library space' }
      ]},
      { title: 'Keep it current', text: 'Hours, access rules, and room availability can change. Use the linked official pages before making plans, and send corrections or additions to the HUA.', cta: { label: 'Suggest a spot', href: 'mailto:copresidents@thehua.org?subject=Campus%20Spots%20Suggestion' } }
    ]
  },
  'hua-logos': {
    title: 'HUA Logos', kicker: 'Brand resources', image: '/hua-assets/widener.webp',
    intro: 'A simple collection of HUA marks for approved reports, promotions, presentations, and funding materials.',
    sections: [{ title: 'Logo collection', logos: ['Primary crimson', 'Black', 'Crimson field', 'Compact mark'], cta: { label: 'Download the primary logo', href: '/hua-assets/hua-logo.webp' } }, { title: 'Need another format?', text: 'Contact copresidents@thehua.org for usage guidance or a file type not shown here.', cta: { label: 'Request an asset', href: 'mailto:copresidents@thehua.org' } }]
  },
  finances: {
    title: 'Finances', kicker: 'Transparency', image: '/hua-assets/structure.webp',
    intro: 'Budgets, reports, and procedures that help students understand how HUA resources support campus life.',
    sections: [
      { title: 'Financial overview', cards: [
        { title: 'Current budget', eyebrow: 'Date TBD', text: 'An active view of planned allocations, expenditures, and program support.' },
        { title: 'Year-end reporting', eyebrow: 'Date TBD', text: 'Final budget and profit-and-loss records from the latest completed fiscal year.' },
        { title: 'Policies & procedures', eyebrow: 'Governance', text: 'Finance guidelines, internal procedures, and constitutional requirements.' }
      ]},
      { title: 'Ask a question', text: 'The Co-Treasurers welcome questions about budgets, funding decisions, and financial procedures.', cta: { label: 'Email the Co-Treasurers', href: 'mailto:treasurer@thehua.org' } }
    ]
  },
  funding: {
    title: 'Funding Sources', kicker: 'For organizations & projects', image: '/hua-assets/meeting.webp',
    intro: 'Student ideas can draw support from many corners of Harvard. Use this guide to identify the funding source that best fits your project.',
    sections: [{ title: 'Explore opportunities', cards: [
      { title: 'HUA SAF Funding', eyebrow: 'Student activities', text: 'Semesterly and emergency support for eligible recognized student organizations.', link: '/club-funding/grant-information/', label: 'HUA funding details' },
      { title: 'Community & Campus Life', eyebrow: 'Campus culture', text: 'Support for learning, belonging, events, and community-building programs.' },
      { title: 'Public Service', eyebrow: 'Greater Boston', text: 'Resources for student projects that serve communities beyond campus.' },
      { title: 'Arts & Culture', eyebrow: 'Creative work', text: 'Funding for performances, exhibitions, publications, and artistic collaboration.' },
      { title: 'Regional & global study', eyebrow: 'International', text: 'Centers and institutes support programming focused on regions and global issues.' },
      { title: 'Innovation', eyebrow: 'New ideas', text: 'Entrepreneurship and culture-lab programs can support experiments with clear community value.' }
    ]}]
  },
  'club-funding/pubbing': {
    title: 'Club Pubbing', kicker: 'Share your event', image: '/hua-assets/instagram-bg.webp',
    intro: 'Student organizations can submit upcoming events for consideration in HUA communications and newsletters.',
    sections: [
      { title: 'A strong submission includes', list: ['Organization and event name', 'Date, time, and accessible location', 'A concise student-facing description', 'Registration link or contact information', 'A square promotional image when available'] },
      { title: 'Ready to submit?', text: 'Send complete information early so the communications team has time to review and schedule it.', cta: { label: 'Email event details', href: 'mailto:copresidents@thehua.org' } }
    ]
  },
  'club-funding/grant-information': {
    title: 'Grant Information', kicker: 'Plan before you apply', image: '/hua-assets/structure.webp',
    intro: 'Understand available grants, eligible costs, review expectations, and the responsibilities that come with HUA funding.',
    sections: [
      { title: 'Grant types', cards: [
        { title: 'Semesterly grants', eyebrow: 'Plan ahead', text: 'The primary funding cycle for anticipated event and general operating expenses.' },
        { title: 'Emergency grants', eyebrow: 'Unforeseen needs', text: 'Limited support for urgent expenses that could not reasonably be anticipated.' }
      ]},
      { title: 'Application checklist', list: ['Read the current finance guidelines.', 'Confirm organizational eligibility.', 'Build a detailed, realistic budget.', 'Disclose outside funding.', 'Submit before the published deadline.', 'Retain receipts after every purchase.'], cta: { label: 'Start an application', href: '/club-funding/grant-application/' } },
      { title: 'Common questions', cards: [
        { title: 'Which cycle should I use?', text: 'Use semesterly funding whenever an expense can be planned. Emergency funding is intentionally limited.' },
        { title: 'Why include all expenses?', text: 'A complete budget helps reviewers apply outside funding and eligibility rules consistently.' },
        { title: 'What happens after an award?', text: 'Spend within the approved purpose and submit compliant receipts by the required deadline.' }
      ]}
    ]
  },
  'club-funding/grant-application': {
    title: 'Grant Application', kicker: 'Prepare your request', image: '/hua-assets/meeting.webp',
    intro: 'A clear request connects your organization’s goals, event plan, and itemized expenses to the HUA finance guidelines.',
    sections: [
      { title: 'Application workflow', cards: [
        { title: 'Check eligibility', eyebrow: '01', text: 'Confirm good standing with the Dean of Students Office and HUA requirements.' },
        { title: 'Build the budget', eyebrow: '02', text: 'List every expense, expected outside funding, and the amount requested from HUA.' },
        { title: 'Submit materials', eyebrow: '03', text: 'Complete the application and required supplement before the cycle deadline.' },
        { title: 'Prepare for review', eyebrow: '04', text: 'Be ready to clarify costs, timing, attendance, and the value to undergraduate life.' }
      ]},
      { title: 'Need help?', text: 'Read the grant information page first, then contact treasurer@thehua.org with questions specific to your organization.', cta: { label: 'Review grant information', href: '/club-funding/grant-information/' } }
    ]
  },
  'club-funding/receipts': {
    title: 'Receipt Collection', kicker: 'Stay compliant', image: '/hua-assets/improve.webp',
    intro: 'Every organization receiving HUA funding must document how awarded funds were spent.',
    sections: [
      { title: 'Receipt checklist', list: ['Keep an itemized receipt for each purchase.', 'Match spending to the approved application and supplement.', 'Label documentation so reviewers can connect it to the correct event and line item.', 'Submit before the stated compliance deadline.', 'Contact the Finance Team early when a receipt is missing or unclear.'] },
      { title: 'Why receipts matter', text: 'Complete records protect student organizations, support transparent use of the Student Activities Fee, and strengthen the case for future funding.' },
      { title: 'Questions', text: 'Noncompliance can affect future eligibility. Contact the Co-Treasurers before a deadline if your organization needs help.', cta: { label: 'Email the Finance Team', href: 'mailto:treasurer@thehua.org' } }
    ]
  },
  donations: {
    title: 'Alumni Donations', kicker: 'Invest in student ideas', image: '/hua-assets/widener.webp',
    intro: 'Alumni support expands what student leaders can build—from inclusive community programs to practical resources and campus-wide initiatives.',
    sections: [
      { title: 'What support makes possible', stats: [['More', 'student-led programs'], ['Stronger', 'campus communities'], ['Lasting', 'undergraduate impact']] },
      { title: 'Make a gift', text: 'Use Harvard’s secure giving form to support the HUA, or review the official instructions for additional ways to donate.', cards: [
        { title: 'Donate online', eyebrow: 'Harvard giving', text: 'Make a secure gift through the Harvard Alumni community.', link: 'https://community.alumni.harvard.edu/give/16040771', label: 'Open the donation form' },
        { title: 'Donation instructions', eyebrow: 'Other methods', text: 'Review the official HUA instructions for additional ways to contribute.', link: 'https://docs.google.com/document/d/1ZAxA66DyFPIzpNGL4f1An8t92VYj2vRkHWgT9-Pc1tY/edit?usp=sharing', label: 'Read the instructions' }
      ]},
      { title: 'Thank you', text: 'HUA is grateful to alumni who help current and future students experiment, collaborate, and respond to emerging campus needs.', cta: { label: 'Contact HUA about giving', href: 'mailto:copresidents@thehua.org' } }
    ]
  }
};
