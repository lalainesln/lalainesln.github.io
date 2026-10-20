import { useEffect, useRef, useState } from 'react';

let viewerQueue = Promise.resolve();

function enqueueViewerTask(task) {
  const run = viewerQueue.then(task, task);
  viewerQueue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

export function DwgViewer({ url, fileName }) {
  const hostRef = useRef(null);
  const [status, setStatus] = useState('Opening drawing…');
  const [error, setError] = useState('');

  useEffect(() => {
    const host = hostRef.current;
    let cancelled = false;
    let manager;

    const job = enqueueViewerTask(async () => {
      if (cancelled || !host) return;

      const [{ AcApDocManager, AcEdOpenMode, layoutBackgroundColorFromRgb }, dataModel, converter] =
        await Promise.all([
          import('@mlightcad/cad-simple-viewer'),
          import('@mlightcad/data-model'),
          import('@mlightcad/libredwg-converter'),
        ]);

      if (cancelled) return;

      const { AcDbDatabaseConverterManager, AcDbFileType } = dataModel;
      const { AcDbLibreDwgConverter } = converter;
      const parserWorkerUrl = '/cad/libredwg-parser-worker.js';

      AcDbDatabaseConverterManager.instance.register(
        AcDbFileType.DWG,
        new AcDbLibreDwgConverter({
          convertByEntityType: false,
          useWorker: true,
          parserWorkerUrl,
        }),
      );

      const existing = AcApDocManager.tryGetInstance();
      if (existing) await existing.destroy();
      if (cancelled) return;

      const background = layoutBackgroundColorFromRgb(0xf6f1e4);
      manager = AcApDocManager.createInstance({
        container: host,
        autoResize: true,
        useMainThreadDraw: false,
        builtinOpenFileDialog: false,
        notificationCenter: false,
        baseUrl: 'https://cdn.jsdelivr.net/gh/mlightcad/cad-data@main/',
        webworkerFileUrls: {
          dwgParser: parserWorkerUrl,
          mtextRender: '/cad/mtext-renderer-worker.js',
        },
      });

      if (!manager) {
        throw new Error('The drawing viewer is already open.');
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('The drawing file could not be loaded.');
      }
      const content = await response.arrayBuffer();
      if (cancelled) return;

      const opened = await manager.openDocument(fileName, content, {
        mode: AcEdOpenMode.Read,
        sysVars: {
          lwdisplay: false,
          modelbkcolor: background,
          paperbkcolor: background,
        },
      });

      if (!opened) {
        throw new Error('This DWG could not be read.');
      }
      if (cancelled) {
        await manager.destroy();
        manager = undefined;
        return;
      }
      setStatus('');
    });

    job.catch((openError) => {
      if (cancelled) return;
      setStatus('');
      setError(openError?.message || 'Could not open this drawing.');
    });

    return () => {
      cancelled = true;
      job.then(() => manager?.destroy()).catch(() => undefined);
    };
  }, [fileName, url]);

  return (
    <div className="viewer-panel">
      <div className="viewer-stage cad-stage">
        <div className="cad-host" ref={hostRef} />
        {status ? <p className="viewer-status">{status}</p> : null}
        {error ? <p className="viewer-status viewer-error">{error}</p> : null}
      </div>
      <p className="viewer-note">Drag to pan. Scroll or pinch to zoom.</p>
    </div>
  );
}
