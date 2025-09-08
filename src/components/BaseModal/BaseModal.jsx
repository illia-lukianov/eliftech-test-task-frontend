import ReactModal from 'react-modal';
import css from './BaseModal.module.css';
import clsx from 'clsx';

export default function BaseModal({ isOpen, onClose, children, type }) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={{
        base: clsx(css.modal, type === 'cart' && css.cartModal),
        afterOpen: css['modal--after-open'],
        beforeClose: css['modal--before-close'],
      }}
      overlayClassName={{
        base: css.overlay,
        afterOpen: css['overlay--after-open'],
        beforeClose: css['overlay--before-close'],
      }}
      closeTimeoutMS={250}
    >
      <button
        type="button"
        className={css.closeBtn}
        onClick={onClose}
        aria-label="Close modal"
      >
        <svg
          width="24"
          height="24"
          className={css.closeIcon}
          aria-hidden="true"
        >
          <use href="/icons.svg#icon-close"></use>
        </svg>
      </button>
      <div className={css.content}>{children}</div>
    </ReactModal>
  );
}
