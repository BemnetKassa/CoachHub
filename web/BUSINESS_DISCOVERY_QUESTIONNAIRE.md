# CoachHub: Business Discovery Questionnaire

**Client:** Sofonias Nebiyu (Sofi)
**Date:** February 19, 2026

The goal of this questionnaire is to refine the technical requirements for **CoachHub** and align the platform with Sofi's brand and daily operations.

---

## 1. Brand Identity & Voice

- **Theme:** We currently use a dark, high-intensity aesthetic. Are there specific hex colors (e.g., #FF0000 red) or fonts from your existing brand we must use?
- **Tone:** Should the app's copy be motivational/coaching-heavy or strictly professional/data-driven?
- **Assets:** Do you have professional photos/videos for the [Hero Section](web/components/hero.tsx) and [About Page](<web/app/(marketing)/about/page.tsx>)

## 2. Product Architecture

- **Program Structure:**
  - Are your programs fixed-length (e.g., _Sofi's 12-Week Shred_)?
  - Or are they continuous monthly memberships (e.g., _Elite Athlete Club_)?
- **Difficulty Tiers:** Do you categorize students by experience level (Beginner/Intermediate/Advanced) or by goal (Fat Loss/Muscle Gain)?
- **Customization:** How much is "one-size-fits-all" vs. custom programmed? (This affects how we build the [Program Editor](<web/app/(admin)/admin/programs/page.tsx>)).

## 3. Daily Coaching Operations

- **Workout Logic:** Beyond exercise names and reps, do your students need to track:
  - RPE (Rate of Perceived Exertion)?
  - Rest Times?
  - Tempo (e.g., 3s eccentric)?
- **Feedback Loops:** Do you want a mandatory "Weekly Check-in" form (Weight, Sleep, Mood, Photos) that stays pinned to their [Dashboard](<web/app/(dashboard)/dashboard/page.tsx>)?
- **The "Sofi Signature":** Is there one specific thing you do for every client that we can automate (e.g., a personalized "Friday Focus" video)?

## 4. Sales & Onboarding

- **Payment Strategy:**
  - Full [Stripe Integration](web/lib/stripe/actions.ts): Seamless 24/7 checkout.
  - Application-Based: Users "Apply" first, then you send them a private payment link after approval.
- **First 5 Minutes:** When a client pays, what is the _very first_ action they should take? (e.g., Fill out a medical waiver, watch a "How to Navigate the App" video).

## 5. Communications & Support

- **Support Channels:** Should students contact you via:
  - In-app support tickets?
  - Direct WhatsApp integration?
  - Weekly group Q&A calls (Zoom integration)?
- **Accountability:** Do you want the system to alert you if a student hasn't logged a weight or workout for more than 4 days?

---

**Notes / Feedback from Sofi:**
_(Space for your notes during the meeting)_
