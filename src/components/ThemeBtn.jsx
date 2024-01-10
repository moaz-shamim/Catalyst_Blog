import React from "react";
import { lightTheme, darkTheme } from "../slices/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function ThemeBtn() {
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.themeMode);
  console.log(themeMode);

  useEffect(() => {
    // Get the themeMode value from local storage
    const storedThemeMode = JSON.parse(localStorage.getItem("mode"));

    // Set the themeMode to the stored value if it exists, otherwise use the default value
    dispatch(
      storedThemeMode
        ? storedThemeMode === "dark"
          ? darkTheme()
          : lightTheme()
        : lightTheme()
    );
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      dispatch(darkTheme());
      
      // set value to local storage.
      localStorage.setItem("mode", JSON.stringify("dark"));
    } else {
      dispatch(lightTheme());
      // set value to local storage.

      localStorage.setItem("mode", JSON.stringify("light"));
    }
  };
  return (
    <>
      <label className="relative  items-center cursor-pointer p-2   border-emerald-400 ">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={onChangeBtn}
          checked={themeMode === "dark"}
        />

        <div className="border-2 p-1 rounded-full border-violet-400">
          <svg
            class="dark:hidden"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg "
          >
            <path
              class="fill-violet-300"
              d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
            />
            <path
              class="fill-violet-400"
              d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
            />
          </svg>
          <svg
            class="hidden dark:block"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="fill-slate-400"
              d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
            />
            <path
              class="fill-slate-500"
              d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
            />
          </svg>
        </div>
      </label>
    </>
  );
}
