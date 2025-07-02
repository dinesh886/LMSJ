const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button className="btn cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn remove-btn" onClick={onConfirm}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
