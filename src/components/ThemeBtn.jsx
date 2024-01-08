import React from "react";
import { lightTheme, darkTheme } from "../slices/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";

// import { login as authSliceLogin } from "../slices/authentication/authSlice";

// const userData = useSelector((state) => state.auth.userData);

export default function ThemeBtn() {
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.themeMode);
  console.log(themeMode);
  // const {themeMode, lightTheme, darkTheme} = useTheme()

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked;
    if (darkModeStatus) {
      dispatch(darkTheme());
    } else {
      dispatch(lightTheme());
    }
  };
  return (
    <>
    <label className="relative  items-center cursor-pointer   border-emerald-400 ">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={onChangeBtn}
        checked={themeMode === "dark"}
        />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
    </label>

    
        </>
  );
}
