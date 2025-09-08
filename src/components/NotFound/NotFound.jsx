import { useMediaQuery } from 'react-responsive';
import css from './NotFound.module.css';
import Image from '../../assets/img/not-found/not-found-img-mob.png';
import Image2 from '../../assets/img/not-found/not-found-img-mob@2x.png';
import ImageTablet from '../../assets/img/not-found/not-found-img-tab.png';
import ImageTablet2 from '../../assets/img/not-found/not-found-img-tab@2x.png';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <section className={css.section}>
      <div className={`container ${css.wrapper}`}>
        {isMobile && (
          <img
            className={css.img}
            src={Image}
            srcSet={`${Image} 1x, ${Image2} 2x`}
            alt="Flower was not found"
          />
        )}

        {isTabletOrDesktop && (
          <img
            className={css.img}
            src={ImageTablet}
            srcSet={`${ImageTablet} 1x, ${ImageTablet2} 2x`}
            alt="Flower was not found"
          />
        )}
        <h1 className={css.h1}>404</h1>
        <p className={css.h3}>Flower not found</p>
        <Link
          to="/"
          type="button"
          className={`brown-btn ${css.button}`}
        >
          <svg className={css.icon} width={24} height={24}>
            <use href="/icons.svg#icon-left-short-arrow"></use>
          </svg>
          Back To Home
        </Link>
      </div>
    </section>
  );
}
