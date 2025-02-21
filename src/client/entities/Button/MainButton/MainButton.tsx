import { ButtonModel } from "@/client/shared";

import { getMainButtonUi } from "./ui/MainButtonUi";

import type { OnClick } from "@/client/shared/types";

interface MainButtonProps {
  onClick?: OnClick;
  disabled?: boolean;
  forceLoading?: boolean;
  forceTabIndex?: number;
  text: string;
}

export const MainButton: React.FC<MainButtonProps> = ({
  onClick,
  disabled,
  forceLoading,
  forceTabIndex,
  text,
}) => {
  return (
    <ButtonModel
      disabled={disabled}
      forceLoading={forceLoading}
      forceTabIndex={forceTabIndex}
      onClick={onClick}
      Ui={getMainButtonUi({
        text,
      })}
    />
  );
};
