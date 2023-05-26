import React from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText
  
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={`popup__${name}`}
          noValidate=""
        >
          {children}
          <button
            type="submit"
            className="popup__submit-button popup__submit-button_disabled"
            aria-label="кнопка сохранить"
          >
          {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
