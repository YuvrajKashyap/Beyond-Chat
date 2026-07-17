# Beyond Chat product and architecture plan

This document is the current repository-level contract for Beyond Chat. Detailed implementation evidence and runbooks live under `docs/`; archived plans and earlier UI experiments live under `old-docs/` and are not current product claims.

## Product north star

Beyond Chat is an organization-first agent workspace where people combine project context, reusable agents, connected knowledge and applications, governed execution, and durable collaborative outputs.

The product is not a collection of isolated AI studios. Home, Chat, Work, Projects, Agents, Knowledge & Apps, Automations, Memory, Outputs, Settings, and Admin are views over the same organization- and project-scoped system.

## Non-negotiable product rules

1. Every organization-scoped request is authenticated and authorized on the server.
2. Project data, knowledge, memory, applications, runs, and outputs never cross tenant boundaries.
3. Agents are immutable, versioned configurations resolved with explicit capabilities and policy.
4. Durable runs exist before execution and preserve ordered events, budgets, recovery state, and generated files.
5. Tool use and code execution occur in isolated sandboxes, not on the shared application host.
6. Provider readiness is server-verified. The UI never converts an unavailable capability into fake success.
7. Useful work is promoted into reviewable outputs with provenance and version history.
8. Human approval gates remain explicit for sensitive or irreversible actions.
9. Public product language separates verified capability, transitional implementation, and future direction.
10. Secrets remain server-side and are never committed or exposed through public configuration.

## Current architecture

```text
React workspace
    |
    v
FastAPI control plane
    |-- WorkOS identity, organizations, invitations, and RBAC
    |-- Supabase Postgres, Storage, Realtime, and RLS
    |-- product records, policies, runs, events, outputs, and memory
    |-- provider readiness and application connections
    |
    v
Durable run orchestration
    |-- versioned agent and capability resolution
    |-- leases, checkpoints, cancellation, suspension, recovery
    |-- budgets, approval gates, event streaming, generated files
    |
    v
Modal sandbox
    |-- Pi runtime adapters
    |-- OpenRouter models
    |-- knowledge, Composio, MCP, native tools, and code execution
    |
    v
Versioned output, review, collaboration, and automation
```

## Implementation map

| Concern | Canonical location |
|---|---|
| Product catalog and frozen journeys | `packages/product-catalog/` |
| Shared product and runtime contracts | `packages/contracts/`, `packages/runtime-contracts/` |
| API and durable persistence | `backend/` |
| Workspace and public product | `frontend/` |
| Agent versions and capability registries | `agents/`, `packages/*-registry/` |
| Pi adapter and provenance | `packages/pi-runtime-adapter/`, `vendor/pi/`, `docs/architecture/pi/` |
| Sandbox contracts and execution | `packages/sandbox-provider/`, `services/modal-runtime/` |
| Database history | `supabase/migrations/` |
| Deployment and provider operations | `docs/operations/` |
| Public claims and transitional limits | `docs/product/public-truthfulness.md` |

## Delivery gates

Changes are ready to merge only when their relevant contracts, migration history, provider boundaries, failure states, and tests agree. The default repository gate is `.github/workflows/ci.yml`.

External production readiness is a separate gate. A green code pipeline does not prove WorkOS configuration, Supabase policy state, Modal promotion, provider credentials, billing activation, DNS, observability, backup/restore, or legal readiness. Those checks remain explicit in `docs/operations/`.

## Current priority

Preserve the working product while completing environment-backed verification. Prefer end-to-end slices that connect a real organization and project to a versioned agent, durable run, isolated execution, cited output, and review decision. Do not expand public claims ahead of verified behavior.
