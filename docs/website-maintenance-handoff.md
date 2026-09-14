# HUA website maintenance handoff

## Implemented in the rebuild

- Home calendar CTA retained and linked to `/calendar`; Instagram tiles use the four newest public HUA posts captured on September 13, 2026.
- Calendar cleared of old events and updated with the September 13 general meeting and the civility event. Unconfirmed times and locations are explicitly marked pending.
- Current officer roster added across the executive, team, and contacts pages. Sports now lists Ella McRitchie; Inclusion is marked `Officer TBD` pending snap elections.
- Every public team and cabinet application CTA uses the same common application. The 2022 handbook is removed from the Join page.
- The stale general-meeting guidelines are no longer presented as current. The page directs visitors to request an updated copy from the Co-Presidents.
- Fall 2026 grants are marked `coming soon`; all unconfirmed finance-cycle dates are `TBD`.
- The Newsroom and Crimson Career Closet were removed from navigation and have no live Next.js pages.
- Harvard Guides was reduced to current, useful links. Course listings were removed, room-booking guidance was consolidated, and a maintained Campus Spots page was added using official destination links rather than fragile third-party images.
- Grant resources now follow one flow: funding overview, eligibility, preparation, application timing, receipts, and appeals/reapplication.
- The current 2025–2026 Finance Guidelines are embedded from the official Google document. Airtable application destinations and the Receipts page were not changed.
- Optional Google Analytics support is available through `NEXT_PUBLIC_GA_ID`.

## Inputs or access still required

- Annabella Burton Boone’s approved portrait.
- Confirmed time, location, and event copy for the general meeting and civility event.
- Access to cabinet announcements, or a designated editor, to publish future events.
- The revised general-meeting guidelines from the Co-Presidents.
- Confirmation that the common application should be reopened or replaced. The supplied Google Form currently resolves to its closed-form screen; all application CTAs still point to that one requested URL.
- The exact URL for the “Example Info Session Recording.” No recording link exists in the integrated source, so one was not invented.
- Treasurer confirmation of every Fall 2026/Spring 2027 grant date. Current placeholders remain `TBD`.
- A decision about personal officer emails versus `treasurer@thehua.org`; public pages currently use the role address, while the imported finance system retains its existing leadership contact data.
- The GA4 measurement ID and access to the deployment or GoDaddy DNS/hosting settings.

## Operational follow-ups outside this repository

- Ask Jake and Polina to integrate Harvard-account-only features into this main site instead of maintaining a second public site.
- Share the repository with Angela and Sophie, apply for cloud credits, and confirm the production hosting plan.
- Send the policy one-pager to the social team after its event date and room are confirmed.
- Publish equivalent urgent content fixes on the current GoDaddy site if it remains the public production site during migration.
