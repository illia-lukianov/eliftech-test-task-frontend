import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAreas } from "../../redux/areas/operations";
import { selectAreas, selectAreasIsLoading } from "../../redux/areas/selectors";
import { getCategories } from "../../redux/categories/operations";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../redux/categories/selectors";
import {
  selectSearchAreas,
  selectSearchCategories,
  selectSortBy,
  selectSortOrder,
} from "../../redux/filters/selectors";
import {
  changeSearchAreas,
  changeSearchCategories,
  changeSortParams,
  clearFilters,
  clearSortParams,
  resetAllSearchParams,
} from "../../redux/filters/slice";
import {
  selectAllFlowersTotalItems,
  selectFavoriteFlowersTotalItems,
} from "../../redux/flowers/selectors";
import styles from "./Filters.module.css";

export default function Filters({ flowerType = "all" }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);
  const modalRef = useRef(null);

  const categories = useSelector(selectCategories);
  const areas = useSelector(selectAreas);
  const isLoadingCategories = useSelector(selectCategoriesIsLoading);
  const isLoadingAreas = useSelector(selectAreasIsLoading);

  const selectedCategories = useSelector(selectSearchCategories);
  const selectedAreas = useSelector(selectSearchAreas);

  const totalItems = useSelector((state) => {
    switch (flowerType) {
      case "all":
        return selectAllFlowersTotalItems(state);
      case "favorites":
        return selectFavoriteFlowersTotalItems(state);
      default:
        return 0;
    }
  });

  const customStylesDesc = {
    control: (base) => ({
      ...base,
      width: "179px",
      minHeight: "33px",
      borderRadius: "4px",
      border: "1px solid rgba(139, 137, 137, 0.5)",
      backgroundColor: "var(--light-grey)",
      boxShadow: "none",
      "&:hover": {
        borderColor: "var(--black)",
      },
      "&:focus": {
        borderColor: "var(--black)",
        outline: "none",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      flexWrap: "wrap",
      padding: "0 8px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "var(--black)",
      padding: "0 8px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };
  const customStylesMob = {
    ...customStylesDesc,
    control: (base, state) => ({
      ...customStylesDesc.control(base, state),
      width: "100%",
    }),
  };

  const sortOptions = [
    { value: ["title", "asc"], label: "Title (A → Z)" },
    { value: ["title", "desc"], label: "Title (Z → A)" },
    // { value: ["time", "asc"], label: "Time (Low → High)" },
    { value: ["popularity", "desc"], label: "Popularity (High → Low)" },
    { value: ["createdAt", "desc"], label: "Created At (Newest First)" },
    { value: ["createdAt", "asc"], label: "Created At (Oldest First)" },
  ];

  const handleCategoriesChange = (selected) => {
    dispatch(changeSearchCategories(selected?.map((c) => c.value) || []));
  };

  const handleAreasChange = (selected) => {
    dispatch(changeSearchAreas(selected?.map((i) => i.label) || []));
  };

  const handleReset = () => {
    dispatch(clearFilters());
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEsc);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    dispatch(resetAllSearchParams());
    dispatch(getCategories());
    dispatch(getAreas());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <section className={styles.filtersSection}>
        <h3 className="visually-hidden">Filters</h3>

        <div className={styles.filtersContainer}>
          <p className={styles.recipeCounter}>{`${totalItems} flowers`}</p>

          <div className={styles.filtersWrapper}>
            <div className={styles.desktopFilters}>
              <div className={styles.rightSide}>
                <button onClick={handleReset} className={styles.reset}>
                  Reset filters
                </button>

                {/* Categories */}
                <Select
                  isMulti
                  isClearable={false}
                  isLoading={isLoadingCategories}
                  options={categories.map((c) => ({
                    value: c,
                    label: c,
                  }))}
                  value={selectedCategories.map((c) => ({
                    value: c,
                    label: c,
                  }))}
                  onChange={handleCategoriesChange}
                  placeholder="Category"
                  classNamePrefix="customSelect"
                  styles={customStylesDesc}
                />

                <Select
                  isMulti
                  isClearable={false}
                  isLoading={isLoadingAreas}
                  options={areas.map((a) => ({
                    value: a._id,
                    label: a.name,
                  }))}
                  value={selectedAreas.map((id) => ({
                    value: id,
                    label: areas.find((a) => a._id === id)?.name || id,
                  }))}
                  onChange={handleAreasChange}
                  placeholder="Area"
                  classNamePrefix="customSelect"
                  styles={customStylesDesc}
                />

                {/* Sort */}
                <Select
                  isClearable
                  options={sortOptions}
                  value={
                    sortBy && sortOrder
                      ? sortOptions.find(
                          (o) =>
                            o.value[0] === sortBy && o.value[1] === sortOrder
                        )
                      : null
                  }
                  onChange={(option) => {
                    if (!option) {
                      dispatch(clearSortParams());
                      return;
                    }
                    const [field, order] = option.value;
                    dispatch(
                      changeSortParams({
                        sortBy: field,
                        sortOrder: order,
                      })
                    );
                  }}
                  placeholder="Sort by"
                  classNamePrefix="customSelect"
                  styles={{
                    ...customStylesDesc,
                    control: (base, state) => ({
                      ...customStylesDesc.control(base, state),
                      width: "250px",
                    }),
                  }}
                />
              </div>
            </div>

            <button
              className={styles.filtersToggle}
              onClick={() => setIsOpen(true)}
            >
              Filters
              <svg className={styles.icon} width="16" height="16">
                <use href="/icons.svg#icon-filter"></use>
              </svg>
            </button>
          </div>

          {
            <div
              className={`${styles.modalOverlay} ${
                isOpen ? styles.isOpen : ""
              }`}
            >
              <div className={styles.modalContent} ref={modalRef}>
                <div className={styles.modalHeader}>
                  <span className={styles.modalTitle}>Filters</span>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setIsOpen(false)}
                  >
                    <svg width="24" height="24">
                      <use href="/icons.svg#icon-close-circle"></use>
                    </svg>
                  </button>
                </div>
                <div className={styles.modalBody}>
                  {/* Categories */}
                  <Select
                    isMulti
                    isClearable={false}
                    isLoading={isLoadingCategories}
                    options={categories.map((c) => ({
                      value: c,
                      label: c,
                    }))}
                    value={selectedCategories.map((c) => ({
                      value: c,
                      label: c,
                    }))}
                    onChange={handleCategoriesChange}
                    placeholder="Category"
                    classNamePrefix="customSelect"
                    styles={customStylesMob}
                  />

                  <Select
                    isMulti
                    isClearable={false}
                    isLoading={isLoadingAreas}
                    options={areas.map((a) => ({
                      value: a._id,
                      label: a.name,
                    }))}
                    value={selectedAreas.map((id) => ({
                      value: id,
                      label: areas.find((a) => a._id === id)?.name || id,
                    }))}
                    onChange={handleAreasChange}
                    placeholder="Area"
                    classNamePrefix="customSelect"
                    styles={customStylesMob}
                  />

                  {/* Sort */}
                  <Select
                    isClearable
                    options={sortOptions}
                    value={
                      sortBy && sortOrder
                        ? sortOptions.find(
                            (o) =>
                              o.value[0] === sortBy && o.value[1] === sortOrder
                          )
                        : null
                    }
                    onChange={(option) => {
                      if (!option) {
                        dispatch(clearSortParams());
                        return;
                      }
                      const [field, order] = option.value;
                      dispatch(
                        changeSortParams({
                          sortBy: field,
                          sortOrder: order,
                        })
                      );
                    }}
                    placeholder="Sort by"
                    classNamePrefix="customSelect"
                    styles={customStylesMob}
                  />
                </div>
                <button onClick={handleReset} className={styles.reset}>
                  Reset filters
                </button>
              </div>
            </div>
          }
        </div>
      </section>
    </>
  );
}
