export function ConfirmModal({ onConfirm, onCancel }) {
    return (
        <div className="confirm-modal">
            <p>Are you sure you want to delete this post?</p>

            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
