import clsx from "clsx";

import styles from "./MainButtonUi.module.css";

import type { UiProps } from "@/client/shared/types";

interface GetButtonUiParams {
  text: string;
  pos?: string;
}

type GetMainButtonUi = (params: GetButtonUiParams) => React.FC<UiProps>;

export const getMainButtonUi: GetMainButtonUi = ({ text, pos }) => {
  const component: React.FC<UiProps> = ({
    disabled,
    focus,
    hover,
    active,
    loading,
  }) => {
    return (
      <div
        className={clsx(
          styles.wrapper,
          pos,
          disabled && styles.disabled,
          focus && styles.focus,
          hover && styles.hover,
          active && styles.active,
          loading && styles.loading,
        )}
      >
        <span className={clsx(styles.text)}>{text}</span>
      </div>
    );
  };

  return component;
};
