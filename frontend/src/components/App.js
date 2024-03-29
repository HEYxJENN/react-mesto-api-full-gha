import React from "react";
import "../index.css";
import ApiX from "../utils/Api.js";
import AuthX from "../utils/Auth.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import InfoTool from "./InfoTooltip";

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isToolOpened, setToolOpened] = useState(false);
  const [success, setSuccess] = useState("../images/Approved.png");

  const history = useHistory();

  React.useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    console.log(jwt);
    if (jwt) {
      jwt = jwt.replace(/["]/g, "");
      AuthX.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setTimeout(() => {
            setEmail(res.data.email);
            history.push("/");
            setToolOpened(false);
          }, 1000);
        }
      });
    }
  }, []);

  const handleEditAvatarClick = () => {
    setEditAvatarOpen(!isEditAvatarOpen);
  };

  const handleEditProfileClick = () => {
    setEditProfileOpen(!isEditProfileOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlaceOpen(!isAddPlaceOpen);
  };

  const handleSelectedCardClick = (card) => {
    const crt = card.target;
    setSelectedCard(crt);
  };

  const closeAllPopups = () => {
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard({ name: "", link: "" });
    setToolOpened(false);
  };

  const onUpdateUser = ({ name, about }) => {
    ApiX.setUser({ name, about })
      .then(ApiX.getUser())
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const onUpdateAvatar = ({ avatar }) => {
    ApiX.setUserAvatar({ avatar })
      .then(ApiX.getUser())
      .then((res) => {
        setCurrentUser(res.data);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const onAddPlace = ({ name, link }) => {
    const likes = [];
    ApiX.addCard({ name, link })
      .then(ApiX.getInitialCards())
      .then((res) => setCards([res.data, ...cards]))
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      jwt = `Bearer ${jwt.replace(/["]/g, "")}`;
    }
    let head = {
      authorization: jwt,
      "Content-Type": "application/json",
    };

    Promise.all([ApiX.getInitialCards(head), ApiX.getUser(head)])
      .then(([itemsApi, userData]) => {
        setCurrentUser(userData.data);
        setCards(itemsApi.data);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }, []);

  //после того как ставится лайк - овнер меняется с объекта на айдишку, не понимаю почему
  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    ApiX.changeLikeStatus(card._id, !isLiked)
      .then(console.log(card._id))
      .then(console.log(!isLiked))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    const newArr = cards.filter((el) => el !== card);
    ApiX.removeCard(card._id)
      .then(setCards(newArr))
      .catch((err) => console.log(err));
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    history.push("/auth");
  }

  async function handleLogIn({ password, email }) {
    try {
      const res = await AuthX.login(password, email);
      localStorage.setItem("jwt", JSON.stringify(res.token));
      setEmail(email);
      setLoggedIn(true);

      let jwt = localStorage.getItem("jwt");
      if (jwt) {
        jwt = `Bearer ${jwt.replace(/["]/g, "")}`;
      }
      let head = {
        authorization: jwt,
        "Content-Type": "application/json",
      };

      ApiX.getInitialCards(head).then((itemsApi) => {
        console.log(itemsApi);
        setCards(itemsApi.data);
      });
      ApiX.getUser(head).then((userApi) => {
        console.log(userApi);
        setCurrentUser(userApi.data);
      });

      setSuccess(true);
      setToolOpened(true);
      setTimeout(() => {
        setToolOpened(false);
      }, 1000);
      // eslint-disable-next-line no-restricted-globals
      // location.reload();
      history.push("/");
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setToolOpened(true);
    }
  }

  function handleRegister({ password, email }) {
    AuthX.register(password, email)
      .then(() => {
        setToolOpened(true);
      })
      .then(() => {
        setTimeout(() => {
          history.push("/auth");
          setToolOpened(false);
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setToolOpened(true);
      });
  }

  return (
    // App.js

    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route path="/reg">
              <Register onSubmit={handleRegister} head={<Header />} />
            </Route>

            <Route path="/auth">
              <Login onSubmit={handleLogIn} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleSelectedCardClick}
              cards={cards}
              onLikeClick={handleCardLike}
              onDelClick={handleCardDelete}
              header={handleLogOut}
              email={email}
            />

            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/reg" />}
            </Route>
          </Switch>

          <Footer />

          <InfoTool
            isOpened={isToolOpened}
            suc={success}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={!!selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfileOpen}
            onClose={closeAllPopups}
            onUpdate={onUpdateUser}
            title="Редактировать профиль"
          ></EditProfilePopup>

          <EditAvatarPopup
            isOpen={isEditAvatarOpen}
            onClose={closeAllPopups}
            onUpdate={onUpdateAvatar}
            title="Обновить аватар"
          ></EditAvatarPopup>

          <AddPlacePopup
            isOpen={isAddPlaceOpen}
            onClose={closeAllPopups}
            onUpdate={onAddPlace}
            title="Новое место"
          ></AddPlacePopup>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
