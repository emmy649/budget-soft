export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button
            className="modal-close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
