import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlowerCard from "../FlowerCard/FlowerCard.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import styles from "./FlowersList.module.css";

import {
  getAllFlowers,
  getFavoriteFlowers,
} from "../../redux/flowers/operations.js";

import { useDebounce } from "use-debounce";
import { ERROR_MESSAGES } from "../../constants/index.js";
import {
  selectSearchAreas,
  selectSearchCategories,
  selectSearchQuery,
  selectSortBy,
  selectSortOrder,
} from "../../redux/filters/selectors.js";
import {
  selectAllFlowersItems,
  selectAllFlowersTotalPages,
  selectFavoriteFlowersItems,
  selectFavoriteFlowersTotalPages,
  selectFlowersListError,
  selectFlowersListIsLoading,
} from "../../redux/flowers/selectors.js";
import AuthenticateModal from "../AuthenticateModal/AuthenticateModal.jsx";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage.jsx";
import Loader from "../Loader/Loader.jsx";
import NotFoundFlowers from "../NotFoundFlowers/NotFoundFlowers.jsx";

export default function FlowersList({ flowerType }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const [authModalIsOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const errorMessages = {
    ...ERROR_MESSAGES,
    404: "Flowers are not found. Please try again later.",
  };

  const flowersListRef = useRef();

  const items = useSelector((state) => {
    switch (flowerType) {
      case "favorites":
        return selectFavoriteFlowersItems(state);
      case "all":
        return selectAllFlowersItems(state);
      default:
        return [];
    }
  });

  const isLoading = useSelector(selectFlowersListIsLoading);

  const error = useSelector(selectFlowersListError);

  const totalPages = useSelector((state) => {
    switch (flowerType) {
      case "favorites":
        return selectFavoriteFlowersTotalPages(state);
      case "all":
        return selectAllFlowersTotalPages(state);
      default:
        return false;
    }
  });

  const searchQuery = useSelector(selectSearchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 600);
  const selectedCategories = useSelector(selectSearchCategories);
  const selectedAreas = useSelector(selectSearchAreas);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  useEffect(() => {
    setPage(1);
  }, [
    debouncedSearchQuery,
    selectedCategories,
    selectedAreas,
    sortBy,
    sortOrder,
  ]);
  useEffect(() => {
    if (flowerType === "all") {
      dispatch(getAllFlowers(page));
    }
    if (flowerType === "favorites") {
      dispatch(getFavoriteFlowers(page));
    }

    if (flowersListRef.current) {
      const newTop = flowersListRef.current.offsetTop - 140;
      if (newTop < window.scrollY) {
        window.scrollTo({
          top: newTop,
          behavior: "smooth",
        });
      }
    }
  }, [
    dispatch,
    flowerType,
    page,
    debouncedSearchQuery,
    selectedCategories,
    selectedAreas,
    sortBy,
    sortOrder,
  ]);

  const isEmpty = !isLoading && (!items || items.length === 0);

  const emptyMessages = {
    favorites: "You haven't saved any Flowers yet",
    all: "No flowers found",
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
  };

  return (
    <>
      {isLoading && !error && <Loader />}
      <ul className={styles.list} ref={flowersListRef}>
        {items?.map((flower, idx) => (
          <li className={styles.item} key={`${flower._id}-${idx}`}>
            <FlowerCard
              flower={flower}
              flowerType={flowerType}
              openModal={openAuthModal}
            />
          </li>
        ))}
      </ul>

      {isEmpty && emptyMessages[flowerType] && <NotFoundFlowers />}

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
      <AuthenticateModal
        isOpen={authModalIsOpen}
        onClose={() => closeAuthModal()}
        title="Error while saving"
        content="To save this flower, you need to authorize first"
      />
      {error && (
        <ErrorToastMessage>{errorMessages[error.status]}</ErrorToastMessage>
      )}
    </>
  );
}
