import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ERROR_MESSAGES } from "../../constants";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { addFlowerToFavorite, deleteFlowerFromFavorite } from "../../redux/flowers/operations";
import { selectFlowersOperationIsLoading } from "../../redux/flowers/selectors";
import { selectUserProfile } from "../../redux/user/selectors";
import AuthenticateModal from "../AuthenticateModal/AuthenticateModal";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";
import css from "./FlowerDetails.module.css";
import CartModal from "../CartModal/CartModal";

export default function FlowerDetails({ flower }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });
  const isLoading = useSelector(selectFlowersOperationIsLoading);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const favItems = useSelector(selectUserProfile)?.favourites;

  const isSaved =
    Array.isArray(favItems) && favItems.some((r) => r === flower._id);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = useCallback(() => setAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);
  const [isLoadingBuyBtn, setIsLoadingBuyBtn] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [activeFlower, setActiveFlower] = useState(null);

  const handleCartModalOpen = async () => {
    if (isCartModalOpen) return;
    setIsLoadingBuyBtn(true);

    try {
      setActiveFlower(flower);
      setIsCartModalOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingBuyBtn(false);
    }
  };

  const handleBookmark = async () => {
    if (!flower._id) return;
    setErrorMessage(null);

    try {
      if (isSaved) {
        await dispatch(deleteFlowerFromFavorite(flower._id)).unwrap();
      } else {
        await dispatch(addFlowerToFavorite(flower._id)).unwrap();
      }
    } catch (err) {
      setErrorMessage(
        ERROR_MESSAGES[err.status] ??
          "Failed to update favorite flowers. Please try again later."
      );
    }
  };

  return (
    <>
      <section>
        <div className="container">
          {isTabletOrDesktop && <h1 className={css.header}>{flower.title}</h1>}
          <div className={css.imgContainer}>
            {isMobile &&
              (flower.thumb ? (
                <img
                  className={css.img}
                  src={flower.thumb}
                  alt={flower.title}
                  loading="lazy"
                  decoding="async"
                  width={361}
                  height={276}
                />
              ) : (
                <div className={css.defaultImg}>
                  <svg className={css.iconPhoto} width={80} height={80}>
                    <use href={"/icons.svg#icon-photo"} />
                  </svg>
                </div>
              ))}
            {isTabletOrDesktop &&
              (flower.thumb ? (
                <img
                  className={css.img}
                  src={flower.thumb}
                  alt={flower.title}
                  loading="lazy"
                  decoding="async"
                  width={704}
                  height={624}
                />
              ) : (
                <div className={css.defaultImg}>
                  <svg className={css.iconPhoto} width={140} height={140}>
                    <use href={"/icons.svg#icon-photo"} />
                  </svg>
                </div>
              ))}
          </div>
          {isMobile && <h1 className={css.header}>{flower.title}</h1>}
          <div className={css.desktopWrapper}>
            <div className={css.tabletWrapper}>
              <div className={css.wrapper}>
                <h3 className={css.infoHeader}>General informations</h3>
                <ul className={css.generalList}>
                  <li>
                    <p>
                      <strong>Category: </strong>
                      {flower.category}
                    </p>
                  </li>
                  {flower.area && (
                    <li>
                      <p>
                        <strong>Area: </strong>
                        {flower.area}
                      </p>
                    </li>
                  )}
                  <li>
                    <p>
                      <strong>Blooming time: </strong>
                      {flower.bloomSeason} season
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Popularity: </strong>
                      {flower.popularity ?? 0}
                    </p>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                disabled={isLoading}
                className={`${css.button} brown-btn`}
                onClick={() => {
                  !isLoggedIn ? openAuthModal() : handleBookmark();
                }}
              >
                {!isSaved ? "Save" : "Unsave"}
                <svg
                  className={!isSaved ? `${css.icon}` : `${css.iconSaved}`}
                  width={24}
                  height={24}
                >
                  <use href="/icons.svg#icon-save-to-list"></use>
                </svg>
              </button>
              {isLoggedIn && <button
                type="button"
                disabled={isLoadingBuyBtn}
                className={`${css.button} brown-btn`}
                onClick={() => {
                  !isLoggedIn ? openAuthModal() : handleCartModalOpen();
                }}
              >
                Add to cart
              </button>}
            </div>
            <ul className={css.contentList}>
              <li>
                <h2 className={css.h2}>About flower</h2>
                <p>{flower.description}</p>
              </li>
              <li>
                <h2 className={css.prepHeader}>Care Instructions:</h2>
                <p>{flower.careInstructions}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <CartModal
        cardInfo={activeFlower}
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
      <AuthenticateModal
        isOpen={authModalOpen}
        onClose={() => closeAuthModal()}
        title="Error while saving"
        content="To save this flower, you need to authorize first"
      />
      {isLoading && <FullScreenLoader text={"Just a moment..."} />}
      {errorMessage && <ErrorToastMessage>{errorMessage}</ErrorToastMessage>}
    </>
  );
}
