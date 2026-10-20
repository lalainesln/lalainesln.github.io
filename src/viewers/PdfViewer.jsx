import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function PdfViewer({ url }) {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const pdfRef = useRef(null);
  const renderTaskRef = useRef(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [status, setStatus] = useState('Opening PDF…');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    let loadingTask;

    setPage(1);
    setPageCount(0);
    setError('');
    setStatus('Opening PDF…');

    (async () => {
      const pdfjs = await import('pdfjs-dist');
      const workerModule = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
      pdfjs.GlobalWorkerOptions.workerSrc = workerModule.default;
      loadingTask = pdfjs.getDocument({ url });
      const pdf = await loadingTask.promise;
      if (cancelled) return;
      pdfRef.current = pdf;
      setPageCount(pdf.numPages);
      setStatus('');
    })().catch((loadError) => {
      if (!cancelled) {
        setError(loadError?.message || 'Could not open this PDF.');
        setStatus('');
      }
    });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      pdfRef.current = null;
      loadingTask?.destroy();
    };
  }, [url]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const measure = () => {
      setStageSize({ width: stage.clientWidth, height: stage.clientHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') setPage((current) => Math.min(pageCount || current, current + 1));
      if (event.key === 'ArrowLeft') setPage((current) => Math.max(1, current - 1));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [pageCount]);

  useEffect(() => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!pdf || !canvas || !stage || !pageCount) return undefined;
    if (stageSize.width < 40 || stageSize.height < 40) return undefined;

    let cancelled = false;

    (async () => {
      const pdfPage = await pdf.getPage(page);
      if (cancelled) return;

      const styles = getComputedStyle(stage);
      const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const availableWidth = Math.max(stage.clientWidth - padX, 1);
      const availableHeight = Math.max(stage.clientHeight - padY, 1);
      const baseViewport = pdfPage.getViewport({ scale: 1 });
      const fitScale = Math.min(availableWidth / baseViewport.width, availableHeight / baseViewport.height);
      const pixelRatio = window.devicePixelRatio || 1;
      const viewport = pdfPage.getViewport({ scale: fitScale * pixelRatio });
      const context = canvas.getContext('2d');

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width / pixelRatio)}px`;
      canvas.style.height = `${Math.floor(viewport.height / pixelRatio)}px`;
      renderTaskRef.current?.cancel();
      const task = pdfPage.render({ canvas, canvasContext: context, viewport });
      renderTaskRef.current = task;
      await task.promise;
    })().catch((renderError) => {
      if (cancelled || renderError?.name === 'RenderingCancelledException') return;
      setError(renderError?.message || 'Could not draw this page.');
    });

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
    };
  }, [page, pageCount, stageSize.height, stageSize.width, url]);

  return (
    <div className="viewer-panel">
      <div className="pdf-stage" ref={stageRef}>
        {status ? <p className="viewer-status">{status}</p> : null}
        {error ? <p className="viewer-status viewer-error">{error}</p> : null}
        <canvas ref={canvasRef} />
      </div>
      <div className="viewer-toolbar">
        <button
          type="button"
          className="button button-secondary"
          onClick={() => setPage((current) => Math.max(1, current - 1))}
          disabled={page <= 1}
        >
          <ChevronLeft size={18} aria-hidden="true" />
          Previous
        </button>
        <span>
          {pageCount ? `Page ${page} of ${pageCount}` : 'PDF'}
        </span>
        <button
          type="button"
          className="button button-secondary"
          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
          disabled={!pageCount || page >= pageCount}
        >
          Next
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
