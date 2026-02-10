# PRD: Client Software Generator (UI Kit V1.0)

**Status:** Draft
**Owner:** Matt
**Last Updated:** February 10, 2026
**Target Release:** Q2 2026 (V1.0)
**Availability:** Internal tool only
**Rationale:** This is an internal productivity tool for the consultancy team, not a client-facing product.

---

## Context

**From uploaded strategy doc:**
- Current architecture follows industry standard package-based approach
- Monorepo structure with apps + shared UI package
- Shadcn components + Tailwind as foundation
- Storybook + Chromatic for component documentation
- Next.js as primary framework

**Strategic fit:**
This tool directly enables the consultancy's core business model - rapidly delivering custom marketing software to clients while maintaining quality and consistency.

---

## Problem

**Who:** Marketing Creative Consultancy team members (developers) starting new client engagements

**What:** Setting up a new client's branded UI and project structure takes 4-5 weeks and results in:
- Inconsistent UI across multiple apps built for the same client
- No easy way to push updates to existing client projects
- Manual, error-prone theming/branding process
- Duplicated work across 5-6 client engagements per year

**When:** At the start of every new client engagement and when updates need to be deployed

**Impact:** 
- 20-30 weeks/year of setup time across engagements (4-5 weeks × 5-6 clients)
- Quality inconsistency damages client perception
- Update deployment is so painful that improvements don't make it back to existing clients

---

## Evidence

### Validated
✅ **Volume:** 5-6 client engagements per year (confirmed)
✅ **Current timeline:** 4-5 weeks to set up UI for new client (confirmed)
✅ **Pain points:** Consistency issues across apps, inability to version/update existing client UIs (confirmed)
✅ **Technical foundation:** Shadcn + Tailwind + Next.js monorepo already in progress (confirmed)

### Assumed
⚠️ **Theming scope:** Assumption that font + brand colors + logo are sufficient for 80% of branding needs. May need more granular control (spacing, border radius, shadows, etc.)
⚠️ **Developer skill level:** Assuming team members can use a web UI but may not know how to manually configure Tailwind themes
⚠️ **Update frequency:** Unknown how often universal updates need to be pushed to existing clients
⚠️ **Client app types:** Mentioned "marketing intelligence, SOPs, planning tools" but exact app patterns unclear

---

## Success Criteria

### Lagging Indicators (post-launch outcomes)

| Metric | Current | Target | Timeframe |
|--------|---------|--------|-----------|
| Time to spin up new client project | 4-5 weeks | < 1 day | 6 months post-launch |
| UI consistency across client apps | [SUBJECTIVE - need QA metric] | 100% component reuse | 3 months post-launch |
| Successful update deployments | 0 (too painful to attempt) | 2+ universal updates/quarter | 6 months post-launch |
| Setup time saved annually | 0 | 120-150 days (5 clients × 4-5 weeks) | End of Year 1 |

### Leading Indicators (pre-launch signals)

| Metric | Current | Target | What This Predicts |
|--------|---------|--------|-------------------|
| Real-world test projects created | 0 | 2 (internal + 1 client) | Predicts production readiness |
| Time to complete theming in UI | N/A | < 15 minutes | Predicts adoption vs. manual process |
| Generated project builds without errors | N/A | 100% success rate | Predicts production reliability |
| Team satisfaction with generated projects | N/A | 8/10 or higher | Predicts long-term adoption |
| Components sufficient for test projects | Unknown | 90%+ of needs met | Predicts V1.0 completeness |

💡 **Real-world tests give us actual signals, not hypothetical ones.**

---

## Proposed Solution

### How It Works

**The Client Software Generator is a web-based UI that allows team members to:**

1. **Input branding assets** via simple form:
   - Brand colors (primary, secondary, accent)
   - Typography (font families for headings/body)
   - Logo files (SVG/PNG)
   - Client name/project identifier

2. **Generate a branded monorepo** with one click:
   - Full Next.js monorepo structure (apps + packages)
   - Pre-configured Tailwind theme with client brand
   - All Shadcn components styled with client theme
   - Storybook instance showing branded components
   - Example apps demonstrating the UI in context

3. **Manage versions and updates:**
   - Track which version of base UI kit each client is on
   - Push universal improvements to all clients (e.g., bug fixes, new components)
   - Push targeted updates to specific client instances

**Technical Architecture:**
- Web UI built with Next.js (dogfooding our own kit)
- Template generation engine that:
  - Clones base monorepo template
  - Injects brand variables into Tailwind config
  - Replaces logo placeholders
  - Configures package names/identifiers
- Version control integration (Git) for generated projects
- Update mechanism using package versioning (as outlined in component-library-strategy.md)

---

### User Stories

**Story 1: New Client Onboarding**
- **As a** developer starting a new client engagement
- **I want to** input the client's brand assets into a web form and generate a ready-to-use monorepo
- **So that** I can start building their marketing software immediately instead of spending weeks on setup

**Story 2: Universal UI Improvements**
- **As a** lead developer maintaining the base UI kit
- **I want to** push improvements (new components, bug fixes) to all existing client projects
- **So that** all clients benefit from our latest work without manual migration

**Story 3: Brand Consistency Across Apps**
- **As a** developer building the 3rd app for an existing client
- **I want to** clone the client's branded UI package
- **So that** the new app automatically matches the look and feel of their existing apps

**Story 4: Client-Specific Customization**
- **As a** project lead
- **I want to** make a client-specific UI tweak without affecting other clients
- **So that** I can accommodate unique brand requirements while still benefiting from the shared base

---

## Non-Goals

### V1.0 Explicitly Out of Scope:
- **Advanced theming controls:** No granular control over spacing, border radius, shadows, animations in V1.0. Focus on colors + fonts + logo only.
- **Non-Next.js frameworks:** V1.0 only generates Next.js projects. No Vue/Svelte/Angular support.
- **Component customization via UI:** Can't add/remove components through the generator UI - that happens in the base kit itself.
- **Client self-service:** This is an internal tool. Clients don't use the generator themselves.
- **Automated deployment:** Generated projects still need manual deployment setup. Not handling CI/CD configuration.
- **Design file integration:** No Figma/Sketch import in V1.0. Manual input only.

### Future Considerations (Post-V1.0):
- White-label version for clients to maintain their own instances
- Integration with design tools (Figma tokens, etc.)
- Support for additional frameworks
- Automated testing setup in generated projects

---

## Dependencies

### Feature Dependencies
- **Base UI Kit V1.0**: The Shadcn + Tailwind component library must be complete and stable — **IN PROGRESS, target completion Q1 2026**
- **Storybook hosting**: Chromatic setup for component documentation — **APPEARS COMPLETE based on strategy doc**
- **Package publishing pipeline**: GitHub Packages or NPM for versioned UI package — **DEFINED in strategy doc, needs implementation**

### Team Dependencies
- **Design**: Need finalized component designs for V1.0 base kit — **Timeline: Before generator dev starts**
- **DevOps**: CI/CD pipeline for publishing UI package versions — **Timeline: Parallel with generator dev**

### External Dependencies
- **Chromatic**: For Storybook hosting and visual regression testing — **ACTIVE subscription needed**
- **GitHub Packages or NPM**: For private package registry — **Account/billing needed**

**Critical Path:** Base UI Kit needs minimum viable component set to start real-world tests. If core components (buttons, forms, layout, typography) aren't stable, tests will produce false negatives. Generator UI can be rough initially - we'll polish based on feedback.

💡 **Flag dependencies early to avoid last-minute surprises.**

---

## Risks

| Risk | Type | Impact | Mitigation |
|------|------|--------|------------|
| Base UI kit isn't actually "complete enough" for V1.0 | F | H | Build real projects (internal + 1 client) to discover gaps. Iterate based on actual usage vs. upfront definition. |
| Theming variables don't cover enough brand variance | V | M | Validate with 2-3 past client projects. Can they be recreated with just colors + fonts + logo? |
| Generated projects break when dependencies update | F | H | Lock dependency versions in templates. Document upgrade path. |
| Team resists using generator (manual process faster/familiar) | V | H | Dogfood internally on next 2 client projects. Gather feedback and iterate. |
| Update mechanism breaks existing client projects | F | H | Extensive testing before any universal update. Implement rollback capability. |
| Time to theme in UI exceeds "simple" threshold (>15 min) | U | M | User testing with team members unfamiliar with the tool. Optimize form UX. |

---

## Open Questions

| Question | Assumption | How to Validate | Timeline |
|----------|-----------|-----------------|----------|
| What's the minimum viable component set for V1.0? | Shadcn's core set is sufficient | **Real-world test #1:** Build internal use software with generator | Sprint 1-2 (4 weeks) |
| Do clients need brand-specific component variants? | No, default Shadcn variants work with new colors/fonts | **Real-world test #2:** Generate one client project, get feedback | Sprint 3 (2 weeks) |
| How granular should theming be beyond colors/fonts? | Colors + fonts + logo covers 80% | Validate through both real-world tests above | Sprints 1-3 (6 weeks) |
| What's the update strategy for breaking changes? | Clients can opt-in to major version bumps | Push minor update to test projects, document friction points | After tests (Week 7-8) |
| Should generator support multiple themes per client? | No, one theme per client engagement | Gather feedback during client test #2 | Sprint 3 (2 weeks) |
| What gaps emerge from real usage? | TBD - this is what we'll learn | Retrospective after both tests to identify V1.1 priorities | Week 7-8 |

**Validation Strategy:**
Rather than auditing past projects, we'll validate through **two real-world builds:**
1. **Internal software (dogfooding):** Use generator to build our own internal tools - proves it works, creates value, we become our own best feedback source
2. **One client starter project:** Generate a real client's branded monorepo and start building their first app - validates client brand requirements and theming scope

This "build to learn" approach gives us concrete feedback and creates real value while validating assumptions.

---

## Technical Specifications

### Generator UI (Web Application)

**Input Form:**
```
Client Information:
- Client Name (used for package naming)
- Project Identifier (slug format)

Brand Assets:
- Primary Color (hex or color picker)
- Secondary Color (hex or color picker)  
- Accent Color (hex or color picker)
- Heading Font (dropdown or custom)
- Body Font (dropdown or custom)
- Logo Upload (SVG/PNG, max 2MB)

Output:
- "Generate Project" button → triggers generation
- Download link for generated .zip or Git repo URL
```

**Generation Process:**
1. Clone base template monorepo
2. Update `packages/ui/tailwind.config.ts` with brand colors
3. Update font imports in global CSS
4. Replace logo files in assets folder
5. Update package.json names to `@client-slug/ui`
6. Initialize Git repository
7. Run `pnpm install` and build verification
8. Package as .zip or push to new GitHub repo

**Versioning System:**
- Base UI Kit version tracked in generator
- Each generated project records which base version it used
- Dashboard showing all generated projects + their versions
- "Update Available" notifications when base kit updates

---

## Before Finalizing

Before you ship this PRD, double-check:
- [ ] Confirm base UI Kit has minimum viable component set for internal tools test
- [ ] Chromatic subscription is active for Storybook hosting
- [ ] Package publishing strategy reviewed with DevOps team
- [ ] Generator UI can produce working project (even if manual process initially)
- [ ] Identified internal tool project for dogfooding test
- [ ] Identified willing client for real-world test #2

---

## Sign-off

| Role | Name | Approved |
|------|------|----------|
| Product Lead | Matt | ⬜ |
| Engineering Lead | [TBD] | ⬜ |
| Design Lead | [TBD] | ⬜ |

---

## Appendix: Example Client Theming Workflow

**Scenario:** New client "Acme Corp" engagement starts

1. Team member opens Generator UI
2. Inputs:
   - Client Name: "Acme Corp"
   - Project ID: "acme-corp"
   - Primary: #FF6B35 (Acme orange)
   - Secondary: #004E89 (Acme navy)
   - Accent: #F7F7F9 (light gray)
   - Heading Font: "Montserrat"
   - Body Font: "Open Sans"
   - Logo: uploads acme-logo.svg
3. Clicks "Generate Project"
4. Generator creates `acme-corp-workspace/` with:
   - `packages/ui` → `@acme-corp/ui` package
   - `apps/example` → Demo app showing branded components
   - `apps/docs` → Branded documentation site
   - `apps/storybook` → Branded Storybook
5. Team member clones repo, runs `pnpm install`, starts building Acme's marketing dashboard
6. Three months later, base UI kit releases V1.1 with new Chart components
7. Update dashboard shows "Update Available for Acme Corp"
8. Team member clicks "Apply Update" → Acme's UI package bumps to v1.1, gets new Chart components

---

## Next Steps

### Phase 1: Generator MVP + Internal Test (Weeks 1-4)
1. **Build generator UI prototype** — Basic web form that outputs branded monorepo
2. **Real-world test #1: Internal dogfooding** — Use generator to build our own internal tools
3. **Capture learnings** — What worked? What broke? What's missing?

### Phase 2: Client Validation (Weeks 5-6)
4. **Real-world test #2: Client project** — Generate starter for one client engagement
5. **Build first client app** — Start actual development, stress-test the system
6. **Gather team feedback** — Does theming scope work? Are components sufficient?

### Phase 3: Iterate & Stabilize (Weeks 7-8)
7. **Retrospective** — Review both tests, identify gaps and V1.1 priorities
8. **Update approach** — Refine generator, component set, and update mechanism
9. **Document learnings** — Create runbook for future client projects

### Phase 4: Production Rollout (Week 9+)
10. **Stabilize base UI Kit V1.0** — Lock version based on learnings
11. **Production-ready generator** — Polish UI, error handling, documentation
12. **Roll out to team** — Train team, use for all new client engagements
