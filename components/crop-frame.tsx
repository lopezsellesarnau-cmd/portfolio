/**
 * Registration framing — a dashed top/bottom die-line with a dot at each of the
 * four corners, echoing a print crop sheet (ref image 2). Drop <CropMarks/> as
 * the first child of any element that has the `crop-frame` class (position:
 * relative). The marks align to `--edge`, the content-column edge.
 */

export function CropMarks() {
  return (
    <>
      <span className="crop-inset" aria-hidden />
      <span className="crop-dot" style={{ left: 'var(--edge)', top: 0, transform: 'translate(-50%,-50%)' }} aria-hidden />
      <span className="crop-dot" style={{ right: 'var(--edge)', top: 0, transform: 'translate(50%,-50%)' }} aria-hidden />
      <span className="crop-dot" style={{ left: 'var(--edge)', bottom: 0, transform: 'translate(-50%,50%)' }} aria-hidden />
      <span className="crop-dot" style={{ right: 'var(--edge)', bottom: 0, transform: 'translate(50%,50%)' }} aria-hidden />
    </>
  )
}
