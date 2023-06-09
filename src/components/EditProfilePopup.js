import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onMouseDown, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeAbout(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
        name,
        about: description,
      });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." :"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onMouseDown={onMouseDown}
      onSubmit={handleSubmit}
    >
      <input
        required={true}
        minLength={2}
        maxLength={40}
        className="popup__input popup__input_value_username"
        id="username-input"
        type="text"
        name="name"
        placeholder="Введите имя"
        value={name || ''}
        onChange={handleChangeName}
      />
      <span className="popup__input-error username-input-error" />
      <input
        required={true}
        minLength={2}
        maxLength={200}
        className="popup__input popup__input_value_job"
        id="job-input"
        type="text"
        name="about"
        value={description || ''}
        placeholder="Введите род занятий"
        onChange={handleChangeAbout}
      />
      <span className="popup__input-error job-input-error" />
    </PopupWithForm>
  );
}
