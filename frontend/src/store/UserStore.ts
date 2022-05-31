import { action, makeAutoObservable, observable } from "mobx";
import { User } from "../models";
import { api } from "../utils/Api";

class UserStore {
  @observable
  user?: User;

  @observable
  token?: string;

  constructor() {
    makeAutoObservable(this);
  }

  @action
  login = async (username: string, password: string) => {
    const { data } = await api.post<{ access_token: string }>("auth/login", {
      username,
      password,
    });

    if (data.access_token)
      api.defaults.headers.Authorization = `Bearer ${data.access_token}`;

    return data;
  };

  @action
  register = async (username: string, password: string) => {
    const res = await api.post<{ access_token: string }>("auth/register", {
      username,
      password,
    });

    if (res.status !== 201) {
      return false;
    }

    return true;
  };

  @action
  setUser = (user: User) => {
    this.user = user;
  };

  @action
  setToken(token: string) {
    this.token = token;
  }

  @action
  me = async () => {
    const { data, status } = await api.get("user/me");

    if (status !== 200) {
      throw new Error("Unauthorized");
    }

    return data;
  };
}

export default new UserStore();
