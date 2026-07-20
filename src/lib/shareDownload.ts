// Shared file-export helper for the map tools (PNG + KML).
//
// iOS Safari mishandles programmatic downloads: navigating to a `data:` URL (what the
// old PNG exporter did) shows a bare "data:" address bar and silently drops the save,
// and an <a download> blob URL saves KML without its .kml extension (a 15 KB text
// thumbnail named "radius-map"). When the Web Share API can share files we hand the
// File to the native share sheet instead — the user taps "Save Image to Photos" or
// "Save to Files" and the filename + MIME type are preserved. Everywhere else (and if
// the user dismisses the sheet, or the share otherwise fails) we fall back to an
// <a download> blob URL. We never navigate to a `data:` URL.
//
// KML is generated synchronously, so the share sheet fires within the tap's transient
// activation. PNG first runs html2canvas + toBlob; if that async work outlives the
// activation window, navigator.share() throws NotAllowedError and we transparently take
// the blob-download fallback below — still correct, just not the share sheet.
//
// Precondition for PNG: the map's tile layer must set crossOrigin so html2canvas can
// produce an untainted canvas — canvas.toBlob() throws SecurityError on a tainted one.

export async function shareOrDownloadFile(blob: Blob, filename: string): Promise<void> {
  const file = new File([blob], filename, { type: blob.type });

  if (
    typeof navigator !== 'undefined' &&
    typeof navigator.canShare === 'function' &&
    navigator.canShare({ files: [file] })
  ) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (err) {
      // AbortError = user dismissed the share sheet on purpose → done, don't also download.
      if (err instanceof Error && err.name === 'AbortError') return;
      // Any other failure (e.g. NotAllowedError from lost activation) → download fallback.
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // Revoke on the next tick so the download has a chance to start.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
