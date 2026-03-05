# PlussMobil Bestilling — NextJS Rebuild

Rebuild of [bestilling.plussmobil.no](https://bestilling.plussmobil.no/) in Next.js.

## Future consideration — site merge

`bestilling.plussmobil.no` is currently a subdomain separate from `plussmobil.no`.
A future option is to merge the marketing site and the order flow into a single Next.js app.
Not a priority to explore now, but worth keeping in mind when making structural decisions.

---

## Phases

**Phase 1 — Demo** _(current)_
Interactive frontend with hardcoded data. No API calls, no Sanity, no backend.
Simulates the full buying flow so the UX can be validated before integration work.
Stack: Next.js + TypeScript + Tailwind only.

**Phase 2 — Production**
Wire up the real backend, add Sanity CMS for editable content, real validation.

## Docs

| File | Contents |
|------|----------|
| [products.md](./products.md) | All subscription plans with prices, IDs, and feature highlights |
| [form-logic.md](./form-logic.md) | Form fields, validation rules, and business logic |
| [api.md](./api.md) | Backend integration — current workaround and ideal future REST API |
| [cms.md](./cms.md) | Sanity.io setup — editable plans and UI texts |
| [design.md](./design.md) | Visual design system, colors, layout, component specs |
| [architecture.md](./architecture.md) | Project structure, tech stack, implementation plan |
