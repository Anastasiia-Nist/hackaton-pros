import clsx from 'clsx';

import CloseImage from '../../images/btn-close.svg?react';

import './Popup.scss';

type PopupProps = {
  isOpened: boolean;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export const Popup = ({
  isOpened,
  children,
  onClose,
  className = '',
}: PopupProps) => {
  const handleQuitClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={clsx({
        popup: true,
        popup_opened: isOpened,
        [className]: className,
      })}
      onClick={handleQuitClick}
    >
      <section className="popup__container">
        {children}
        <button
          className={`popup__close-btn popup__close-btn_${name}`}
          type="button"
          onClick={() => onClose()}
        >
          <CloseImage className="popup__close-image" />
        </button>
      </section>
    </div>
  );
};
