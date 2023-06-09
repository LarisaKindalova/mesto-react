import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect } from "react";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  function handleEscClose(evt) {
    evt.key === "Escape" && closeAllPopups();
  }

  function handleOverlayClose(evt) {
    evt.target === evt.currentTarget && closeAllPopups();
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handelDeleteClick() {
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setIsConfirmPopupOpen(false);

  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    if (!isLiked) {
      api
        .setLikeCardApi(card._id)
        .then(newCard =>
          setCards(state =>
            state.map(item => (item._id === card._id ? newCard : item))
          )
        )
        .catch(err => console.log(`Ошибка ${err}`));
    } else {
      api
        .removeLikeCardApi(card._id)
        .then(newCard =>
          setCards(state =>
            state.map(item => (item._id === card._id ? newCard : item))
          )
        )
        .catch(err => console.log(`Ошибка ${err}`));
    }
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api
      .deledeCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== selectedCard._id));
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(()=> {
        setIsLoading(false);
      })
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api
      .setUserInfoApi(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(()=> {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api
      .editNewAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(()=> {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .addNewCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(()=> {
        setIsLoading(false)
      })
  }

  function handelDeletion(card) {
    handelDeleteClick(card)
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onAddPlace={handleAddPlaceClick}
          onCardDelete={handelDeletion}
          cards={cards}
        />

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onMouseDown={handleOverlayClose}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onMouseDown={handleOverlayClose}
          onConfirmDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onMouseDown={handleOverlayClose}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onMouseDown={handleOverlayClose}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onMouseDown={handleOverlayClose}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
