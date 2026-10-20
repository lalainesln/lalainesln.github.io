import { useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Building2,
  ClipboardCheck,
  DraftingCompass,
  HardHat,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { CvSection, WorkSamples } from './WorkSamples.jsx';

const portfolio = {
  name: 'Engr. Lalaine Aubrey T. Solano',
  title: 'Structural-focused Civil Engineer',
  location: 'Malabon City, Philippines',
  email: 'sln.lalaineaubrey@gmail.com',
  linkedinUrl: '',
  summary:
    'Licensed Civil Engineer and Registered Master Plumber with a structural engineering foundation and practical construction site execution experience across commercial, resort, residential, and villa developments.',
};

const credentials = [
  {
    label: 'Registered Civil Engineer',
    detail: 'Professional Regulation Commission, November 2024 passer',
    icon: Award,
  },
  {
    label: 'Registered Master Plumber',
    detail: 'Professional Regulation Commission, July 2026 passer',
    icon: ShieldCheck,
  },
  {
    label: 'Safety Officer 2',
    detail: '40-hour Construction Safety and Health Training, May 2023',
    icon: HardHat,
  },
];

const projects = [
  {
    name: 'Narra Palm Resort and Villas',
    location: 'Newport World Resort, Pasay City',
    company: 'R.M. Cabanela Construction Management Corporation',
    period: 'February 2025 - May 2026',
    focus: 'Project engineering, QA, document control, billing review, and handover coordination.',
    highlights: [
      'Coordinated clients, consultants, engineers, contractors, and procurement teams during execution.',
      'Managed RFIs, RFAs, submittals, and drawings under ISO 9001 document control standards.',
      'Supported punch list closure and project handover tracking.',
    ],
  },
  {
    name: 'Magsalin Law Office',
    location: 'Katipunan Extension, Marikina City',
    company: 'Victor Consunji Development Corporation',
    period: 'May 2026 - Present',
    focus: 'Site engineering support, contract review, project reporting, and subcontractor coordination.',
    highlights: [
      'Reviews construction contracts, agreements, invoices, change orders, and correspondence.',
      'Monitors delays, site issues, non-compliance, manhour reports, and wage expenses.',
      'Coordinates with project managers, architects, CAD operators, site engineers, and subcontractors.',
    ],
  },
  {
    name: 'M Residences Mowelfund',
    location: 'Katipunan Extension, Marikina City',
    company: 'Victor Consunji Development Corporation',
    period: 'May 2026 - Present',
    focus: 'Residential site coordination and project documentation support.',
    highlights: [
      'Tracks progress and documentation across a multi-disciplinary site team.',
      'Processes project reports and administrative controls that keep field execution accountable.',
    ],
  },
  {
    name: 'Carmen Garden Villas',
    location: 'Katipunan Extension, Marikina City',
    company: 'Victor Consunji Development Corporation',
    period: 'May 2026 - Present',
    focus: 'Villa development coordination, site reporting, and construction administration.',
    highlights: [
      'Supports field coordination between technical staff and subcontractors.',
      'Maintains issue visibility through progress reporting and document tracking.',
    ],
  },
];

const strengths = [
  {
    label: 'Structural + BIM Toolkit',
    description: 'Midas Gen, Midas Design+, Revit, AutoCAD, SketchUp, PlanSwift, and MS Project.',
    icon: DraftingCompass,
  },
  {
    label: 'Site Execution',
    description: 'Progress monitoring, inspection support, technical coordination, and issue escalation.',
    icon: Building2,
  },
  {
    label: 'Quality Systems',
    description: 'ISO 9001 document control, RFIs, RFAs, submittals, drawings, and handover requirements.',
    icon: ClipboardCheck,
  },
];

const timeline = [
  {
    date: '2026 - Present',
    title: 'Junior Project Site Engineer',
    body: 'Victor Consunji Development Corporation',
  },
  {
    date: '2025 - 2026',
    title: 'Project Engineer',
    body: 'R.M. Cabanela Construction Management Corporation',
  },
  {
    date: '2024',
    title: 'BS Civil Engineering',
    body: 'University of the East - Caloocan, specialized in Structural Engineering',
  },
];

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function BlueprintVisual() {
  return (
    <div className="blueprint" aria-label="Abstract structural frame visualization">
      <div className="blueprint-grid" />
      <div className="beam beam-a" />
      <div className="beam beam-b" />
      <div className="beam beam-c" />
      <div className="beam beam-d" />
      <div className="column column-a" />
      <div className="column column-b" />
      <div className="joint joint-a" />
      <div className="joint joint-b" />
      <div className="joint joint-c" />
      <div className="load-card">
        <span>Structural Review</span>
        <strong>QA + BIM + Site Coordination</strong>
      </div>
    </div>
  );
}

function App() {
  const [activeSample, setActiveSample] = useState(null);

  return (
    <main>
      <section className="hero-section" id="top">
        <nav className="nav-bar" aria-label="Portfolio navigation">
          <a className="brand" href="#top">
            LAS
          </a>
          <div className="nav-links">
            <a href="#cv">CV</a>
            <a href="#projects">Projects</a>
            <a href="#drawings">Drawings</a>
            <a href="#credentials">Credentials</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Civil Engineering Portfolio</p>
            <h1>{portfolio.name}</h1>
            <p className="hero-title">{portfolio.title}</p>
            <p className="hero-summary">{portfolio.summary}</p>

            <div className="hero-actions" aria-label="Contact actions">
              <a className="button button-primary" href={`mailto:${portfolio.email}`}>
                <Mail size={18} aria-hidden="true" />
                Email
              </a>
              {portfolio.linkedinUrl ? (
                <a className="button button-secondary" href={portfolio.linkedinUrl}>
                  <ArrowUpRight size={18} aria-hidden="true" />
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>

          <BlueprintVisual />
        </div>

        <div className="stat-strip" aria-label="Portfolio quick facts">
          <StatCard value="PRC" label="Licensed civil engineer" />
          <StatCard value="4" label="Highlighted project assignments" />
          <StatCard value="ISO 9001" label="Document control exposure" />
        </div>
      </section>

      <section className="section-block intro-band">
        <div className="section-heading">
          <p className="eyebrow">Engineering Focus</p>
          <h2>Field-ready structural judgment with disciplined documentation.</h2>
        </div>
        <div className="strength-grid">
          {strengths.map((item) => {
            const Icon = item.icon;
            return (
              <article className="strength-card" key={item.label}>
                <Icon size={24} aria-hidden="true" />
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CvSection onOpen={setActiveSample} />

      <section className="section-block" id="projects">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2>Project assignments across resort, residential, villa, and commercial spaces.</h2>
          </div>
          <p>
            Experience spans site supervision, contractor coordination, document control, billing review,
            inspections, and handover tracking.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-topline">
                <span>{project.period}</span>
                <MapPin size={17} aria-hidden="true" />
              </div>
              <h3>{project.name}</h3>
              <p className="project-location">{project.location}</p>
              <p className="project-company">{project.company}</p>
              <p className="project-focus">{project.focus}</p>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <WorkSamples
        activeSample={activeSample}
        onOpen={setActiveSample}
        onClose={() => setActiveSample(null)}
      />

      <section className="section-block credential-band" id="credentials">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">Credentials</p>
            <h2>Licensed, certified, and trained for technical construction environments.</h2>
          </div>
        </div>

        <div className="credential-grid">
          {credentials.map((credential) => {
            const Icon = credential.icon;
            return (
              <article className="credential-card" key={credential.label}>
                <Icon size={25} aria-hidden="true" />
                <div>
                  <h3>{credential.label}</h3>
                  <p>{credential.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block timeline-section">
        <div className="section-heading">
          <p className="eyebrow">Path</p>
          <h2>A concise timeline of engineering practice and preparation.</h2>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={`${item.date}-${item.title}`}>
              <span>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Available for structural-focused civil engineering opportunities.</h2>
          <p>
            Based in {portfolio.location}, with practical experience coordinating site teams,
            contractors, consultants, and construction documentation.
          </p>
        </div>
        <a className="button button-primary" href={`mailto:${portfolio.email}`}>
          <Mail size={18} aria-hidden="true" />
          {portfolio.email}
        </a>
      </section>
    </main>
  );
}

export default App;
