import React from "react";
import api from "../utils/api";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
}) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoApi(), api.getInitialCards()])
      .then(([dataUser, card]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setCards(card);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__form">
          <button
            onClick={onEditAvatar}
            className="profile__avatar-btn"
            typy="button"
          >
            <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          </button>
          <div className="profile__info">
            <h1 className="profile__username">{userName}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
            />
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить фото"
        />
      </section>
      <section className="cards" aria-label="Фотогалерея">
        <ul className="cards__list">
          {cards.map(card => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
