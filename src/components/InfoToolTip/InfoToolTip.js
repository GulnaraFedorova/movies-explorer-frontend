import React from 'react';
import { useCallback, useEffect } from "react";
import './InfoToolTip.css'
import successIcon from '../../images/success.svg';
import failIcon from '../../images/fail.svg';

function InfoTooltip({ infoTooltip, onClose }) {
  
  const handleESC = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleESC);
    return () => {
      document.removeEventListener("keydown", handleESC);
    };
  }, [handleESC]);

  const { success, message, isOpen } = infoTooltip;

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
          className="popup__close-button">
        </button>
        <img
          src={success ? successIcon : failIcon}
          className="popup__image"
          alt="Успешная регистрация"
        />
        <h3 className="popup__title">{message}</h3>
      </div>
    </div>
  );
};

export default InfoTooltip;