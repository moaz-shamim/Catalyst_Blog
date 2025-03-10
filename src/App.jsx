import { useEffect, useState } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import authService from "./appwrite/authentiation";
import { login, logout } from "./slices/authentication/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";




export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.themeMode);

  useEffect(() => {

    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));


      document.querySelector("html").classList.remove("light", "dark");
      document.querySelector("html").classList.add(themeMode);


  }, [themeMode]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between dark:bg-gray-800">
      <div className="w-full block">
        <Header />
        <main className=" flex items-center justify-center ">
        <Outlet />
        </main>
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={themeMode === "dark" ? "dark" : "light"}
        />
      </div>
    </div>
  ) : null;
}
