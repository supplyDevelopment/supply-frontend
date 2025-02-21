"use client";

import { useCallback, useRef, useState } from "react";

import type { UiProps, OnClick } from "./types";

interface ButtonModelProps {
  onClick?: OnClick;
  disabled?: boolean;
  forceLoading?: boolean;
  forceTabIndex?: number;
  Ui: React.FC<UiProps>;
}

export const ButtonModel: React.FC<ButtonModelProps> = ({
  Ui,
  disabled,
  forceLoading,
  forceTabIndex,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null!);

  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);

  const _onClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    async event => {
      if (disabled) {
        return;
      }
      setLoading(true);

      await onClick?.(event);

      setLoading(false);
    },
    [disabled, onClick],
  );

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    async event => {
      if (event.code !== "Enter") {
        return;
      }

      ref.current.dispatchEvent(
        new Event("click", {
          bubbles: true,
        }),
      );
    },
    [],
  );

  const onFocus: React.FocusEventHandler<HTMLDivElement> = useCallback(() => {
    if (active) {
      return;
    }

    setFocus(true);
  }, [active]);

  const onBlur: React.FocusEventHandler<HTMLDivElement> = useCallback(() => {
    setFocus(false);
  }, []);

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      setActive(true);
    }, []);

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = useCallback(() => {
    setActive(false);
  }, []);

  const onMouseOver: React.MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      setHover(true);
    }, []);

  const onMouseOut: React.MouseEventHandler<HTMLDivElement> =
    useCallback(() => {
      setHover(false);
      setActive(false);
    }, []);

  return (
    <div
      ref={ref}
      role="button"
      onClick={_onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      aria-disabled={disabled}
      tabIndex={(forceTabIndex ?? disabled) ? -1 : 0}
      style={{
        outline: "none",
      }}
    >
      <Ui
        disabled={Boolean(disabled)}
        focus={focus}
        active={active}
        hover={hover}
        loading={loading || Boolean(forceLoading)}
      />
    </div>
  );
};
