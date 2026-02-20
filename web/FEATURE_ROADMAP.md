# CoachHub: Feature Roadmap & Development Phases

**Version:** 1.0 (Initial Proposal)

This roadmap outlines the evolution of CoachHub from a baseline platform to a 10x scalable coaching business.

---

## Phase 1: The Foundation (Launch Ready)

_Focus: Marketing, Sales, and Basic Delivery_

- [x] **Secure Authentication:** Supabase-managed logins for students and admin.
- [x] **Marketing Front-end:** High-conversion Landing Page, About, and Contact.
- [x] **Stripe Integration:** Active subscription and pricing management.
- [x] **Admin Shell:** Central hub for Sofi to manage programs and users.
- [ ] **Content Injection:** Migration of Sofi's current PDFs/Docs into the searchable [Workouts Library](<web/app/(admin)/admin/workouts/page.tsx>).

## Phase 2: The Student Experience (V1.5)

_Focus: Engagement and Data Tracking_

- [ ] **Interactive Training Log:** Students can "Check Off" sets and enter the weights used in real-time on the gym floor.
- [ ] **Progress Analytics:** Automated graphing of body weight, body fat %, and PR (Personal Record) trends.
- [ ] **Video Integration:** 4K video demonstrations for every movement in the library.
- [ ] **Onboarding Flow:** Automated survey to categorize students into the right program tier.

## Phase 3: Scaling & Community (V2.0)

_Focus: Automation and Life-Time Value (LTV)_

- [ ] **Weekly Check-in System:** Automated Friday forms with photo upload capability for before/after tracking.
- [ ] **Community Leaderboard:** (Optional) Opt-in leaderboard for students to see "Most Consistent" or "Total Volume" rankings.
- [ ] **Push Notifications:** SMS/Email pings for workout reminders and motivational "Voice from Sofi" messages.
- [ ] **Content Locker:** A vault of educational videos/PDFs about nutrition, mindset, and recovery unlocked by membership tier.

## Phase 4: Intelligence (V3.0)

_Focus: Leveraging Data_

- [ ] **AI Form Analysis:** (Future Concept) Allow students to upload a squat video and get basic posture feedback.
- [ ] **Auto-Progression:** System suggests a 2.5kg increase on a lift based on last week's "Easy" RPE score.
- [ ] **White-Label App Stores:** Launching "CoachHub by Sofi" as a standalone iOS/Android app.

---

### Key Requirements Checklist for Phase 1 Migration:

- [ ] **Stripe Production Keys:** Move from Test Mode to Live.
- [ ] **Final Domain Name:** Setup (e.g., coachhub.sofi.fitness).
- [ ] **Legacy Data Import:** Importing 10-15 existing "Pilot" clients from WhatsApp/Excel into the [Supabase Database](web/types/supabase.ts).
