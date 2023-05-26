import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen (true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen (true);
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false); 
    setIsImagePopupOpen(false)
    // setSelectedCard ({});
  }

  return (
    <div className="page">
      <Header />
      <Main 
      onEditAvatar = {handleEditAvatarClick}
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onCardClick={handleCardClick}
      />

      <Footer />
      {/* Попап обновить автар */}
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose ={closeAllPopups}     
      >
        <input
          required=""
          className="popup__input popup__input_value_avatar"
          name="avatar"
          id="avatar-input"
          type="url"
          placeholder="Ссылка на фото"
        />
        <span className="popup__input-error avatar-input-error" />
      </PopupWithForm>

      {/* Попап  подтвреждения*/}
      <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />

      {/* Попап редкатирование профиля*/}
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose ={closeAllPopups} 
      >
        <input
          required=""
          minLength={2}
          maxLength={40}
          className="popup__input popup__input_value_username"
          id="username-input"
          type="text"
          name="name"
          placeholder="Введите имя"
        
        />
        <span className="popup__input-error username-input-error" />
        <input
          required=""
          minLength={2}
          maxLength={200}
          className="popup__input popup__input_value_job"
          id="job-input"
          type="text"
          name="about"
          placeholder="Введите род занятий"
        />
        <span className="popup__input-error job-input-error" />
      </PopupWithForm>

      {/* Попап добавление фотографии */}
      <PopupWithForm 
      name="add-card" 
      title="Новое место" 
      buttonText="Создать"
      isOpen={isAddPlacePopupOpen}
      onClose ={closeAllPopups} >
        <input
          required=""
          minLength={2}
          maxLength={30}
          className="popup__input popup__input_value_card-name"
          id="card-name-input"
          type="text"
          name="name"
          placeholder="Название"
        />
        <span className="popup__input-error card-name-input-error" />
        <input
          required=""
          className="popup__input popup__input_value_card-link"
          type="url"
          id="card-link-input"
          name="link"
          placeholder="Ссылка на картинку"
        />
        <span className="popup__input-error card-link-input-error" />
      </PopupWithForm>

      {/* Попап фотографии */}
      <ImagePopup
      card={selectedCard}
      isOpen ={isImagePopupOpen}
      onClose={closeAllPopups}
      />

    </div>
  );
}

