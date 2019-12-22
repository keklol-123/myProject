interface OnClickEventTarget extends EventTarget {
    value: string | null | undefined;
  }
  
export default interface OnClickEvent extends React.MouseEvent<HTMLElement> {
    target: OnClickEventTarget
}