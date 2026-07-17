import { Link, useSearchParams } from "react-router-dom";
import "./recruiter-showcase.css";

type PreviewView = "run" | "output" | "architecture";

const navItems = ["Home", "Chat", "Work", "Projects", "Agents", "Knowledge & Apps", "Automations"];

const runSteps = [
  { label: "Frame the decision", detail: "Mapped the brief to a market-entry research plan.", state: "done" },
  { label: "Collect evidence", detail: "Reviewed 18 sources across customer, pricing, and regulatory signals.", state: "done" },
  { label: "Synthesize findings", detail: "Comparing risks, confidence, and competing recommendations.", state: "active" },
  { label: "Prepare output", detail: "A reviewable brief and source bundle will be saved together.", state: "queued" },
] as const;

const architectureRows = [
  ["Identity & policy", "WorkOS organizations, RBAC, server-enforced scope"],
  ["Knowledge & memory", "Project sources, citations, and durable scoped memory"],
  ["Agent runtime", "Versioned agents, Pi adapters, budgets, approvals, and replay"],
  ["Isolated execution", "Modal sandboxes for tools, code, and generated files"],
  ["Durable outputs", "Version history, collaboration, review state, and provenance"],
] as const;

function RunPreview() {
  return (
    <div className="showcase-run-grid">
      <section id="showcase-panel-run" role="tabpanel" className="showcase-panel showcase-run-panel" aria-labelledby="showcase-tab-run">
        <div className="showcase-panel-heading">
          <div>
            <span className="showcase-kicker">Live execution</span>
            <h2 id="run-progress-title">Build a US market-entry brief</h2>
          </div>
          <span className="showcase-status is-running"><i /> Running</span>
        </div>
        <blockquote>
          Compare the top three launch paths, cite every material claim, and flag assumptions that need an executive decision.
        </blockquote>
        <ol className="showcase-timeline">
          {runSteps.map((step, index) => (
            <li key={step.label} className={`is-${step.state}`}>
              <span className="showcase-step-marker">{step.state === "done" ? "✓" : index + 1}</span>
              <div><strong>{step.label}</strong><p>{step.detail}</p></div>
              <small>{step.state === "done" ? "Complete" : step.state === "active" ? "In progress" : "Queued"}</small>
            </li>
          ))}
        </ol>
        <div className="showcase-tool-call">
          <span><i /> Research tool</span>
          <strong>Searching project knowledge + connected sources</strong>
          <small>Policy checked · read-only access</small>
        </div>
      </section>

      <aside className="showcase-side-stack" aria-label="Run context">
        <section className="showcase-panel showcase-context-panel">
          <span className="showcase-kicker">Run context</span>
          <dl>
            <div><dt>Project</dt><dd>Atlas expansion</dd></div>
            <div><dt>Agent</dt><dd>Research · v3</dd></div>
            <div><dt>Budget</dt><dd>$1.42 of $5.00</dd></div>
            <div><dt>Sources</dt><dd>18 reviewed</dd></div>
          </dl>
        </section>
        <section className="showcase-panel showcase-files-panel">
          <div className="showcase-panel-heading"><span className="showcase-kicker">Outputs</span><small>2 files</small></div>
          <div className="showcase-file"><span>DOC</span><div><strong>Market-entry brief</strong><small>Draft · updating now</small></div></div>
          <div className="showcase-file"><span>REF</span><div><strong>Evidence bundle</strong><small>18 cited sources</small></div></div>
        </section>
        <div className="showcase-approval">
          <span>Next gate</span>
          <strong>Executive review required</strong>
          <p>The agent can prepare the recommendation, but cannot publish it without approval.</p>
        </div>
      </aside>
    </div>
  );
}

function OutputPreview() {
  return (
    <section id="showcase-panel-output" role="tabpanel" className="showcase-output" aria-labelledby="showcase-tab-output">
      <header>
        <div><span className="showcase-kicker">Durable output · Version 4</span><h2 id="output-title">US market-entry recommendation</h2></div>
        <div className="showcase-output-actions" aria-label="Preview-only output controls"><button type="button" disabled>Compare</button><button type="button" className="is-primary" disabled>Request review</button></div>
      </header>
      <div className="showcase-document-layout">
        <article className="showcase-document">
          <span className="showcase-document-label">Decision brief · July 2026</span>
          <h3>Lead with a partner-first launch in the Northeast.</h3>
          <p className="showcase-document-lead">The evidence favors a focused regional entry before a national rollout. This path reduces regulatory exposure while preserving access to the highest-confidence demand segment.</p>
          <h4>Why this direction</h4>
          <ul>
            <li><span>01</span><p><strong>Strongest signal density.</strong> Twelve of eighteen reviewed sources support concentrated demand in two initial verticals.</p></li>
            <li><span>02</span><p><strong>Lower operational risk.</strong> A partner-led model shortens the compliance path and limits fixed launch cost.</p></li>
            <li><span>03</span><p><strong>Clear decision gates.</strong> Expansion is tied to three measurable milestones instead of an open-ended pilot.</p></li>
          </ul>
          <div className="showcase-citation-row"><span>[1] Customer interviews</span><span>[2] Pricing analysis</span><span>[3] Regulatory memo</span></div>
        </article>
        <aside className="showcase-review-rail">
          <div><span className="showcase-kicker">Review state</span><strong>Ready for review</strong><p>All material claims are linked to the saved evidence bundle.</p></div>
          <div><span className="showcase-kicker">Validation</span><ul><li>12 cited claims</li><li>0 unresolved source gaps</li><li>3 assumptions flagged</li></ul></div>
          <div className="showcase-comment"><span>YK</span><p><strong>Yuvraj</strong> Flag the partner margin assumption before approval.</p></div>
        </aside>
      </div>
    </section>
  );
}

function ArchitecturePreview() {
  return (
    <section id="showcase-panel-architecture" role="tabpanel" className="showcase-architecture" aria-labelledby="showcase-tab-architecture">
      <div className="showcase-architecture-intro">
        <span className="showcase-kicker">System view</span>
        <h2 id="architecture-title">A durable execution contract, not a loose browser prompt.</h2>
        <p>Every run resolves identity, project scope, agent version, knowledge, tools, budget, and approval policy before work begins.</p>
      </div>
      <div className="showcase-architecture-flow" aria-label="Beyond Chat system layers">
        {architectureRows.map(([title, detail], index) => (
          <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{detail}</p></div></article>
        ))}
      </div>
    </section>
  );
}

export default function RecruiterShowcasePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedView = searchParams.get("view");
  const view: PreviewView = requestedView === "output" || requestedView === "architecture" ? requestedView : "run";
  return (
    <div className="showcase-page">
      <div className="showcase-disclosure">
        <span>Interactive product preview</span>
        <p>Synthetic data · no account or backend access required</p>
        <Link to="/">Back to public site</Link>
      </div>
      <div className="showcase-app">
        <aside className="showcase-sidebar">
          <Link className="showcase-brand" to="/" aria-label="Beyond Chat home"><span>B</span><strong>Beyond</strong></Link>
          <div className="showcase-project-switcher"><small>Current project</small><strong>Atlas expansion</strong><span>Organization workspace</span></div>
          <nav aria-label="Preview navigation">
            {navItems.map((item) => <span key={item} className={item === "Work" ? "is-active" : ""}><i />{item}</span>)}
          </nav>
          <div className="showcase-user"><span>YK</span><div><strong>Yuvraj</strong><small>Builder</small></div></div>
        </aside>

        <main className="showcase-main">
          <header className="showcase-header">
            <div><span className="showcase-breadcrumb">Work / Atlas expansion</span><h1>Market intelligence brief</h1><p>One workspace for context, execution, evidence, and review.</p></div>
            <div className="showcase-header-actions">
              <a href="https://github.com/YuvrajKashyap/Beyond-Chat" target="_blank" rel="noreferrer">View source</a>
              <Link to="/login" className="is-primary">Open live app</Link>
            </div>
          </header>
          <div className="showcase-view-tabs" role="tablist" aria-label="Product preview views">
            {([['run', 'Agent run'], ['output', 'Durable output'], ['architecture', 'System design']] as const).map(([id, label]) => (
              <button key={id} id={`showcase-tab-${id}`} type="button" role="tab" aria-controls={`showcase-panel-${id}`} aria-selected={view === id} onClick={() => setSearchParams(id === "run" ? {} : { view: id })}>{label}</button>
            ))}
          </div>
          {view === "run" ? <RunPreview /> : view === "output" ? <OutputPreview /> : <ArchitecturePreview />}
        </main>
      </div>
    </div>
  );
}
