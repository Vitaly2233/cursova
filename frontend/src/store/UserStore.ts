import { action, makeAutoObservable, observable } from "mobx";
import { User } from "../models";

class UserStore {
  @observable user?: User;
  @observable token: string | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  @action setUser = (user: User) => {
    this.user = user;
  };

  @action setToken = async (token: string) => {
    this.token = token;
  };
}

export default new UserStore();
