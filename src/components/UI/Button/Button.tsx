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
  small: classes.commonBtn__small,
  medium: classes.commonBtn__medium,
  large: classes.commonBtn__large,
  stretched: classes.commonBtn__stretched,
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
        classes.commonBtn,
        headerBtnSize[size],
        stretched && classes.commonBtn__stretched,
        textPositionLeft && classes.commonBtn__textPositionLeft,
      )}
      {...props}>
      {!image ? (
        children
      ) : (
        <div className={classes.commonBtn__row}>
          <div className={classes.commonBtn__img}>
            <img src={image} alt="btnLogo" />
          </div>
          {children}
        </div>
      )}
    </BaseButton>
  );
};

export const AvatarButton: FC<BaseButtonProps> = ({ children, ...props }) => {
  return (
    <BaseButton className={classes.avatarBtn} {...props}>
      {children}
    </BaseButton>
  );
};
