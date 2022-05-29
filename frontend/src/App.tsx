import Auth from "./pages/public/Auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "./store";
import Game from "./pages/private/Game";
import { observer } from "mobx-react";
import securedStorage from "./utils/SecuredStorage";
import { useEffect } from "react";

function App() {
  const { userStore } = useStore();

  const init = async () => {
    try {
      const token = userStore.token ?? securedStorage.get("access_token");
      if (token && !userStore.user) {
        const user = await userStore.me();
        userStore.setToken(token);
        userStore.setUser(user);
        securedStorage.set("access_token", token);
      }
    } catch (e) {
      securedStorage.remove("access_token");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      {userStore.token ? (
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/game" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default observer(App);
