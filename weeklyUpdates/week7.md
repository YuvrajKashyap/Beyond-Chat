# NISHANT

## Weekly Summary
- Week 7 focused on auditing the Image Studio against its original Linear acceptance criteria and closing the remaining gaps to bring the feature to a fully complete state.
- I reviewed the three Linear issues tied to the Image Studio (BEY-48, BEY-40, BEY-32) and traced each acceptance criterion through the codebase to confirm what was implemented and what was missing.
- The one gap identified was that clicking a generated image was supposed to open it full-size in a modal — this behavior was specified in BEY-48 but had not been implemented. I built and shipped the lightbox modal this week.

## Work Completed
- Pulled and reviewed all three Image Studio Linear issues (BEY-48, BEY-40, BEY-32) to systematically check acceptance criteria against the current implementation.
- Confirmed BEY-40 (backend workflow) and BEY-32 (Supabase Storage) were fully implemented — prompt enhancement, image generation, upload pipeline, and signed URL delivery were all working correctly.
- Identified the missing feature from BEY-48: clicking a generated image should open it full-size in a modal, which was not yet implemented.
- Added `modalUrl` state to `ImagePage.tsx` to track which image is currently open in the lightbox.
- Added `onClick` and `onKeyDown` handlers to all image preview elements in both the fresh outputs section and the saved gallery section.
- Built the lightbox overlay — a fixed full-screen backdrop that dismisses on click, rendering the selected image at up to 90vw/90vh with `object-fit: contain`.
- Added `image-gallery-preview--clickable` CSS class with a zoom-in cursor to communicate interactivity on hoverable images.
- Added `.image-lightbox-overlay` and `.image-lightbox-img` CSS rules to `index.css` to style the modal and prevent image clicks from closing it unintentionally.
- Pushed the changes to `main` and verified the commit included only the intended files.

## Research / Technical Findings
- A fixed-position overlay with `inset: 0` is the simplest reliable approach for a full-screen lightbox without pulling in a modal library.
- Using `e.stopPropagation()` on the inner image element prevents the backdrop click-to-close from firing when the user clicks directly on the image.
- Keyboard accessibility for the lightbox required both `role="button"` and `onKeyDown` on the clickable preview divs since they are `<div>` elements rather than native buttons.
- Saved gallery images conditionally get the clickable class only when a `previewImage` URL is present, which prevents giving a zoom cursor to placeholder tiles that have no image to show.

## Blockers / Risks
- Signed URL expiration from week 6 remains an open issue — images in the saved gallery will eventually return broken `<img>` tags as their 24-hour URLs expire. A URL refresh mechanism or longer-lived signed URLs are needed before production.
- The lightbox does not currently have a close button, relying entirely on backdrop click and keyboard dismiss — a visible close affordance may be needed for mobile users.

## Hours Worked
- Total estimated time: 10 hours


# YUVRAJ

## Weekly Summary
- Week 7 was focused on deployment, stability, and making the product actually usable outside of local development.
- I spent most of the time getting the app deployed, fixing breaking issues across the stack, and ensuring the frontend, backend, and Supabase integrations all worked together in a real environment.
- The goal was to move from a “works locally sometimes” state to something that can actually be accessed, tested, and demoed reliably.

## Work Completed
- Set up and deployed the frontend to Vercel and configured environment variables for production usage.
- Created and wired the backend deployment entrypoint so the API could run correctly in a hosted environment.
- Debugged multiple deployment issues related to environment variables, API routing, and backend initialization.
- Fixed issues with Supabase connectivity in production, including auth/session handling and data access inconsistencies.
- Worked through cross-origin and request handling issues to ensure frontend requests could successfully reach backend endpoints.
- Debugged run execution failures and ensured model requests were properly handled in the deployed environment.
- Verified artifact persistence and storage flows worked correctly outside of local development.
- Ran repeated end-to-end tests across login, dashboard, studio flows, and model execution to validate system stability.
- Helped clean up inconsistencies between local and deployed behavior so the app behaves predictably across environments.
- Assisted with general debugging across frontend and backend issues to keep the system stable during rapid changes.

## Research / Technical Findings
- Deployment introduces a different class of bugs compared to local development, especially around environment variables and API routing.
- Supabase integration requires careful handling of auth tokens and session state in production environments.
- Having a proper backend entrypoint and consistent API structure is critical for deployment platforms like Vercel.
- End-to-end testing in a deployed environment is necessary to catch issues that don’t appear locally.

## Blockers / Risks
- Environment-specific bugs can still appear as more features are added or modified.
- Deployment configuration needs to remain consistent across team members to avoid breaking production.
- Debugging across frontend, backend, and database layers simultaneously can slow down iteration.

## Startup / Execution Notes
- This week was heavily focused on making the product actually usable and demo-ready rather than adding new features.
- Stabilizing deployment and fixing bugs significantly improved the overall reliability of the system and made further development easier.

## Hours Worked
- Total estimated time: 22 hours
