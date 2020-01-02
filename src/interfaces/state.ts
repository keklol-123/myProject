export interface ILink {
    link: string;
    price: number;
    name: string;
  }
  
export default interface IState {
    token: string | null;
    isAuthenticated: boolean;
    links: [ILink] | null | undefined;
    registerSuccess: boolean;
    registerFailure: boolean;
    loginFailure: boolean;
    addFailure: boolean;
  }