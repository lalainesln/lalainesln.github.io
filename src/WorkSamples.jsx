import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Box, Download, DraftingCompass, FileText, X } from 'lucide-react';
import { DwgViewer } from './viewers/DwgViewer.jsx';
import { PdfViewer } from './viewers/PdfViewer.jsx';

const resume = {
  id: 'cv',
  kind: 'pdf',
  format: 'PDF',
  title: 'Curriculum vitae',
  detail: 'Licenses, technical toolkit, site roles, and education, on two pages.',
  href: '/documents/lalaine-aubrey-solano-cv.pdf',
  fileName: 'lalaine-aubrey-solano-cv.pdf',
  icon: FileText,
};

const samples = [
  {
    id: 'floor-plans',
    kind: 'pdf',
    format: 'PDF',
    title: 'Multi-storey floor plans',
    detail: 'Ground floor through the fifth-to-eighth floor plates, with Czar Cayolette Asgar.',
    href: '/documents/asgar-solano-floor-plans.pdf',
    fileName: 'asgar-solano-floor-plans.pdf',
    icon: FileText,
  },
  {
    id: 'midterm-sheets',
    kind: 'pdf',
    format: 'PDF',
    title: 'Two-storey residency',
    detail: 'Site plan, floor plans, and window schedule for the midterm design set.',
    href: '/documents/midterm-design.pdf',
    fileName: 'midterm-design.pdf',
    icon: FileText,
  },
  {
    id: 'midterm-dwg',
    kind: 'dwg',
    format: 'DWG',
    title: 'Midterm drawing compilation',
    detail: 'AutoCAD 2018 drawing, opened in the browser with a LibreDWG viewer.',
    href: '/drawings/midterm-compilation.dwg',
    fileName: 'midterm-compilation.dwg',
    icon: DraftingCompass,
  },
  {
    id: 'final-model',
    kind: 'rvt',
    format: 'RVT',
    title: 'Final Revit model',
    detail: 'Revit 2023 structural model. Browsers cannot read RVT, so this one is a download for Revit.',
    href: '/models/final-model.rvt',
    fileName: 'final-model.rvt',
    icon: Box,
  },
];

function SampleViewer({ sample }) {
  if (sample.kind === 'pdf') return <PdfViewer url={sample.href} />;
  if (sample.kind === 'dwg') return <DwgViewer url={sample.href} fileName={sample.fileName} />;

  return (
    <div className="viewer-panel">
      <div className="rvt-panel">
        <Box size={28} aria-hidden="true" />
        <h3>Open this model in Revit 2023 or newer.</h3>
        <p>
          Revit stores the building in a proprietary file. There is no browser renderer for it,
          and converting it needs Autodesk Revit or a commercial BIM translator. The original
          model is ready to download.
        </p>
      </div>
    </div>
  );
}

export function CvSection({ onOpen }) {
  return (
    <section className="section-block" id="cv">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Curriculum Vitae</p>
          <h2>Licenses, toolkit, and site experience.</h2>
        </div>
        <p>A two-page résumé covering licenses, the technical toolkit, and site roles.</p>
      </div>
      <article className="sample-card resume-card">
        <div>
          <div className="sample-topline">
            <span>{resume.format}</span>
            <FileText size={18} aria-hidden="true" />
          </div>
          <h3>{resume.title}</h3>
          <p>{resume.detail}</p>
        </div>
        <div className="sample-actions">
          <button type="button" className="button button-primary" onClick={() => onOpen(resume.id)}>
            View
          </button>
          <a className="button button-secondary" href={resume.href} download={resume.fileName}>
            <Download size={18} aria-hidden="true" />
            Download
          </a>
        </div>
      </article>
    </section>
  );
}

export function WorkSamples({ activeSample, onOpen, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);
  const sample = activeSample === resume.id ? resume : samples.find((item) => item.id === activeSample);

  useEffect(() => {
    if (!sample) return undefined;

    document.querySelector('.viewer-dialog')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, sample]);

  return (
    <>
    <section className="section-block" id="drawings">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">Drawings</p>
          <h2>Sheets, a CAD compilation, and the Revit model.</h2>
        </div>
        <p>
          Academic structural studies, including the two-storey residency and a multi-storey floor-plan set
          prepared with Czar Cayolette Asgar.
        </p>
      </div>

      <div className="sample-grid">
        {samples.map((item) => {
          const Icon = item.icon;
          return (
            <article className="sample-card" key={item.id}>
              <div className="sample-topline">
                <span>{item.format}</span>
                <Icon size={18} aria-hidden="true" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <div className="sample-actions">
                <button type="button" className="button button-primary" onClick={() => onOpen(item.id)}>
                  {item.kind === 'rvt' ? 'About this model' : 'View'}
                </button>
                <a className="button button-secondary" href={item.href} download={item.fileName}>
                  <Download size={18} aria-hidden="true" />
                  Download
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>

      {sample
        ? createPortal(
        <div className="viewer-backdrop">
          <div
            className="viewer-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
          >
            <header className="viewer-header">
              <div>
                <p className="eyebrow">{sample.format}</p>
                <h3 id={titleId}>{sample.title}</h3>
              </div>
              <div className="viewer-header-actions">
                <a className="button button-secondary" href={sample.href} download={sample.fileName}>
                  <Download size={18} aria-hidden="true" />
                  Download
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  className="button button-secondary viewer-close"
                  onClick={onClose}
                >
                  <X size={18} aria-hidden="true" />
                  Close
                </button>
              </div>
            </header>
            <SampleViewer sample={sample} />
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
