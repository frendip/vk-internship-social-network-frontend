import { FC, HTMLAttributes } from 'react';
import classes from './Button.module.scss';
import clsx from 'clsx';

interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export const BaseButton: FC<BaseButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={clsx(classes.baseBtn, className)} {...props}>
      {children}
    </button>
  );
};

interface HeaderButtonProps extends BaseButtonProps {
  size?: 'small' | 'medium' | 'large';
  stretched?: boolean;
  textPositionLeft?: boolean;
  image?: string;
}

const headerBtnSize = {
  small: classes.headerBtn__small,
  medium: classes.headerBtn__medium,
  large: classes.headerBtn__large,
  stretched: classes.headerBtn__stretched,
};

export const CommonButton: FC<HeaderButtonProps> = ({
  children,
  size = 'medium',
  stretched = false,
  textPositionLeft = false,
  image = '',
  ...props
}) => {
  return (
    <BaseButton
      className={clsx(
        classes.headerBtn,
        headerBtnSize[size],
        stretched && classes.headerBtn__stretched,
        textPositionLeft && classes.headerBtn__textPositionLeft,
      )}
      {...props}>
      {!image ? (
        children
      ) : (
        <div className={classes.headerBtn__row}>
          <div className={classes.headerBtn__img}>
            <img src={image} alt="btnLogo" />
          </div>
          {children}
        </div>
      )}
    </BaseButton>
  );
};
