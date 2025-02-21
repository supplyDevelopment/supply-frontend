export type OnClick =
  | ((event: React.MouseEvent) => Promise<void>)
  | React.MouseEventHandler;
export interface UiProps {
  disabled: boolean;
  focus: boolean;
  active: boolean;
  hover: boolean;
  loading: boolean;
}
