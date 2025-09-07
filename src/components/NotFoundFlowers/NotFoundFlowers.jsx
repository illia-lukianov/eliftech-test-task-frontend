import { useDispatch } from 'react-redux';
import css from './NotFoundFlowers.module.css';
import { clearFilters, clearSearchQuery } from '../../redux/filters/slice';

export default function NotFoundFlowers() {
  const dispatch = useDispatch();
  return (
    <div className={css.container}>
      <p className={css.text}>We’re sorry! We were not able to find a match.</p>
      <button
        type="button"
        onClick={e => {
          dispatch(clearFilters());
          dispatch(clearSearchQuery());
          e.currentTarget.blur();
        }}
        className={`${css.btn} dark-outline-btn`}
      >
        Reset search and filters
      </button>
    </div>
  );
}
