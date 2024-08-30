import React from 'react';
import successRegisterationStyle from '../styles/SuccessRegistrationModal.module.css';

interface SuccessModalProps {
    message: string;
    onClose: () => void;
}

const SuccessRegistrationModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
    return (
        <div className={successRegisterationStyle.modal_overlay}>
            <div className={successRegisterationStyle.modal_content}>
                <h2>Congratulations!</h2>
                <p>{message}</p>
                <button onClick={onClose} className={successRegisterationStyle.close_button}>Close</button>
            </div>
        </div>
    );
};

export default SuccessRegistrationModal;