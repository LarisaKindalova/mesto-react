import React from "react";

export default function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  onMouseDown
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
    onMouseDown={onMouseDown}>
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
            className="popup__submit-button"
            aria-label="кнопка сохранить"
            onClick = {onSubmit}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
