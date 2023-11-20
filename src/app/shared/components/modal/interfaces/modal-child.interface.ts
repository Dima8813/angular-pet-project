export interface ModalChild<T = any> {
  onConfirm: (...args: any) => any;
  payload?: T;
  closeModal?: (arg?: any) => void;
}
