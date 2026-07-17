# Public product truthfulness

`plan.md` is the canonical repository-level product and architecture contract. This note records the public-surface rules for the transitional product and should be updated when an implementation is verified.

## Current public position

- Beyond Chat is a working pre-production product moving from its earlier studio-centric UI toward a project- and organization-centered AI work environment.
- Existing chat, run-step, artifact, research, finance, image, and data flows are prototype behavior. They are not promises about final navigation, provider availability, or future packaging.
- Public pages must not list specific model vendors or model versions as generally available unless the current product verifies that availability.
- Public pages must not claim unlimited usage, a free trial, savings, customer results, autonomous completion times, or live connector coverage without current evidence.
- Draft Terms and Privacy pages must remain explicitly labeled as drafts and not effective legal documents.

## Pricing and billing

- The locked initial commercial target is **$30 per user per month**.
- The price is a planning target until a live product, price, account activation, and billing operations are verified.
- Paid checkout is disabled during this phase. A pricing CTA may create or request an account, but it must not create a checkout session or imply a paid entitlement.
- A billing return page is only a neutral handoff. It must never infer entitlement from URL parameters or the fact that a user returned from a payment provider.
- Entitlements and plan state become effective only after server-side verification and idempotent webhook processing.

## Architecture language

Public and repository documentation may describe current infrastructure when it is clearly separated from unverified production readiness and future direction. The current architecture contract lives in `plan.md`; legacy Supabase Auth, legacy schema, studio navigation, and earlier sandbox assumptions must not be presented as the final product architecture.

## Recruiter showcase

- `/showcase` is a public, read-only product walkthrough with synthetic data.
- The route must remain visually and technically distinct from an authenticated workspace session.
- It must not call authenticated product APIs, expose account or provider data, bypass `ProtectedRoute`, or claim that synthetic records were created by the live backend.
- Screenshots captured from the route must retain the synthetic-data disclosure.
