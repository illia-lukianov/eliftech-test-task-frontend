import { useState } from "react";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import { ERROR_MESSAGES } from "../../constants";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import {
  addFlowerToFavorite,
  deleteFlowerFromFavorite,
} from "../../redux/flowers/operations";
import { selectFlowersOperationError } from "../../redux/flowers/selectors";
import { selectUserProfile } from "../../redux/user/selectors";
import CartModal from "../CartModal/CartModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage";
import SmallLoader from "../SmallLoader/SmallLoader";
import styles from "./FlowerCard.module.css";

export default function FlowerCard({ flower, flowerType, openModal }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const error = useSelector(selectFlowersOperationError);
  const [isLoadingBtn, setLoadingBtn] = useState(false);
  const [isLoadingBuyBtn, setIsLoadingBuyBtn] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeFlower, setActiveFlower] = useState(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const favItems = useSelector(selectUserProfile)?.favourites;

  const { _id, name, bloomSeason, description, price, thumb } = flower || {};
  const imgSrc = thumb;

  const type = (flowerType || "").trim().toLowerCase();
  const isAll = type === "all";
  const isFavorites = type === "favorites";

  const errorMessages = {
    ...ERROR_MESSAGES,
    404: "Sorry, this recipe was not found",
  };

  const isSaved =
    isFavorites || (Array.isArray(favItems) && favItems.some((r) => r === _id));

  const handleBookmark = async (e) => {
    if (!_id) return;
    e.currentTarget.blur();

    if (isSaved) {
      setDeleteModalOpen(true);
      return;
    }

    setLoadingBtn(true);
    try {
      await dispatch(addFlowerToFavorite(_id)).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBtn(false);
    }
  };

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

  const handleRemoveFromFavourites = async () => {
    if (!_id) return;

    setLoadingBtn(true);
    try {
      setDeleteModalOpen(false);
      await dispatch(deleteFlowerFromFavorite(_id)).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleEditRecipe = () => {
    if (!_id) return;
    navigate(`/edit-recipe/${_id}`);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.defaultImg}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={name}
              className={styles.image}
              width={isMobile ? 337 : isTablet ? 315 : 264}
              height={isMobile ? 230 : isTablet ? 230 : 178}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <svg className={styles.iconPhoto} width={48} height={48}>
              <use href={"/icons.svg#icon-photo"} />
            </svg>
          )}
        </div>

        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.timeBadge} title="Blooming time">
            <svg className={styles.iconClock}>
              <use href={"/icons.svg#icon-clock"} />
            </svg>
            <span>{bloomSeason}</span>
          </div>
        </div>

        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>{description}</p>
          <p>{`Price: ${price} grn`}</p>
        </div>

        <div className={styles.btnContainer}>
          <Link
            className={`${styles.learnMoreBtn} dark-outline-btn`}
            to={`/flowers/${_id}`}
          >
            Learn more
          </Link>

          {isAll || isFavorites ? (
            <button
              type="button"
              disabled={isLoadingBtn}
              onClick={(e) => {
                !isLoggedIn ? openModal() : handleBookmark(e);
              }}
              aria-label={isSaved ? "Remove from saved" : "Save recipe"}
              className={`${styles.bookmarkBtn} ${
                isAll
                  ? isSaved
                    ? "brown-btn"
                    : "dark-outline-btn"
                  : "brown-btn"
              }`}
            >
              {isLoadingBtn ? (
                <SmallLoader />
              ) : (
                <svg className={styles.iconBtn}>
                  <use href={"/icons.svg#icon-save-to-list"} />
                </svg>
              )}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleEditRecipe}
                aria-label={"Edit recipe"}
                className={`${styles.bookmarkBtn} dark-outline-btn`}
              >
                <svg className={styles.iconBtn}>
                  <use href={"/icons.svg#icon-edit"} />
                </svg>
              </button>

              <button
                type="button"
                disabled={isLoadingBtn}
                onClick={(e) => {
                  setDeleteModalOpen(true);
                  e.currentTarget.blur();
                }}
                aria-label={"Remove recipe"}
                className={`${styles.bookmarkBtn} red-btn`}
              >
                {isLoadingBtn ? (
                  <SmallLoader />
                ) : (
                  <svg className={styles.iconBtn}>
                    <use href={"/icons.svg#icon-delete"} />
                  </svg>
                )}
              </button>
            </>
          )}
          {isLoggedIn && !isFavorites && (
            <button
              type="button"
              disabled={isLoadingBtn}
              onClick={(e) => {
                if (!isLoggedIn) {
                  openModal();
                } else {
                  handleCartModalOpen(e);
                }
              }}
              className={`${styles.bookmarkBtn} ${
                isAll ? "brown-btn" : "dark-outline-btn"
              }`}
            >
              {isLoadingBuyBtn ? <SmallLoader /> : <FaCartArrowDown />}
            </button>
          )}
        </div>
      </div>
      <CartModal
        cardInfo={activeFlower}
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          handleRemoveFromFavourites();
        }}
      />
      {error && (
        <ErrorToastMessage>
          {errorMessages[error.status] ??
            "Failed to perform operation. Please retry in a moment"}
        </ErrorToastMessage>
      )}
    </>
  );
}
