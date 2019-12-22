interface OnChangeEventTarget extends EventTarget {
    value: string | null | undefined;
  }
  
export default interface OnClickEvent extends React.ChangeEvent<HTMLElement> {
    target: OnChangeEventTarget
}