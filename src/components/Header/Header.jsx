import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate , useLocation } from "react-router-dom";
import authService from "../../appwrite/authentiation";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authentication/authSlice";
import { useEffect, useState } from "react";
import ThemeBtn from "../ThemeBtn";
import { NavLink } from "react-router-dom";

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [showMenus, setShowMenus] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    // Update the state with the selected value
    setSelectedValue(event.target.value);
  };

  // console.log(selectedValue);

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Post",
      slug: "/all-posts",
      // active: authStatus,
      active: true,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      // active: authStatus,
      active: true,
    },
  ];

  useEffect(() => {
    setShowMenus(false);
  }, [location]); // Runs every time the route changes

  return (
    <header className="p-4 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 sticky top-0 z-50">
      <div className="container flex justify-between h-16 mx-auto ">
        {/* <Logo width="70px" /> */}
        <Link to="/ " className="flex items-center p-2  ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 32 32"
            className="w-8 h-8  dark:text-violet-400 text-violet-600"
          >
            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
          </svg>
        </Link>
        <ul className="items-stretch hidden max-md:hidden space-x-3 max-lg:flex lg:flex font-medium  ">
          {navItems.map((item) =>
            item.active && item.name !== "Login" ? (
              <NavLink
                key={item.name}
                to={item.slug}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "flex items-center px-4 -mb-1 border-b-2 border-violet-600 dark:border-violet-400 dark:border-transparent text-violet-600 hover:border-violet-600 dark:text-violet-400 hover:dark:border-violet-400"
                      : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-violet-600 hover:border-violet-600 dark:text-violet-400 hover:dark:border-violet-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ) : null
          )}

          {authStatus && (
            <select
              name="pets"
              id="pet-select"
              className=" flex items-center border-0 p-0  w-48  text-violet-600 bg-transparent  border-b-2 border-gray-200 dark:border-transparent dark:text-violet-400 appearance-none focus:outline-none focus:ring-0 focus:border-violet-200 peer hover:border-violet-600 hover:dark:border-violet-400"
              value={selectedValue}
              onChange={(event) => {
                handleSelectChange(event);
                // Use the callback function to access the updated state value
                setSelectedValue((prevSelectedValue) => {
                  // Navigate with the updated selectedValue
                  navigate("/", { state: { data: prevSelectedValue } });
                  // Return the new value for the state
                  return prevSelectedValue;
                });
              }}
            >
              <option value="Web Tech">Web Tech</option>
              <option value="Tech & Gadgets">Tech & Gadgets</option>
              <option value="Science & Innovation">Science & Innovation</option>
              <option value="Personal Finance">Personal Finance</option>
              <option value="Arts & Culture">Arts & Culture</option>
              <option value="Travel Dest">Travel Dest</option>
              <option value="Other">Other</option>
            </select>
          )}
        </ul>

        <div className="flex items-center md:space-x-4   ">
          {authStatus && (
            <div className="relative flex flex-row ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-10 h-10 dark:text-violet-400 text-violet-600   "
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <p className=" flex flex-row py-1 text-lg font-semibold text-center md:text-left dark:text-violet-400 text-violet-600 ">
                {userData.name}
              </p>
            </div>
          )}
          <ThemeBtn />

          {authStatus && (
            <button
              onClick={logoutHandler}
              type="button"
              className="hidden md:block sm:ml-2  sm:block px-6 py-2 font-semibold rounded bg-violet-600  dark:bg-violet-400 dark:text-gray-900 text-gray-100 "
            >
              Logout
            </button>
          )}

          <ul className="items-stretch hidden  space-x-3 lg:flex  ">
            {navItems.map((item) =>
              item.active && item.name === "Login" ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug)
                      setShowMenus(false); 
                    }}
                    
                    className="hidden px-6 py-2 font-semibold rounded lg:block dark:bg-violet-400 bg-violet-600 dark:text-gray-900 text-gray-100"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
        </div>

        <button
          title="Open menu"
          type="button"
          className="p-4 hidden max-sm:block "
          onClick={() => setShowMenus(!showMenus)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-violet-400 text-violet-600 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {showMenus && (
        <div className="hidden max-sm:flex flex-col   dark:border-violet-400  font-medium content-center">
          <ul>
            {navItems.map((item) =>
              item.active && item.name !== "Login" ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug)
                      setShowMenus(false); 
                    }}
                    className="w-full items-center px-4 -mb-1 border-b-2 dark:border-transparent   dark:text-violet-400 text-violet-600 dark:border-violet-400 hover:border-violet-400"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <select
                name="pets"
                id="pet-select"
                className=" w-full items-center border-0 p-0 my-3  text-violet-600 bg-transparent  border-b-2 border-gray-200 dark:border-transparent dark:text-violet-400 appearance-none focus:outline-none focus:ring-0 focus:border-violet-200 peer hover:border-violet-600 hover:dark:border-violet-400"
                value={selectedValue}
                onChange={(event) => {
                  handleSelectChange(event);
                  // Use the callback function to access the updated state value
                  setSelectedValue((prevSelectedValue) => {
                    // Navigate with the updated selectedValue
                    navigate("/", {
                      state: { data: prevSelectedValue },
                    });
                    // Return the new value for the state
                    return prevSelectedValue;
                  });
                }}
              >
                <option value="Web Tech">Web Tech</option>
                <option value="Tech & Gadgets">Tech & Gadgets</option>
                <option value="Science & Innovation">
                  Science & Innovation
                </option>
                <option value="Personal Finance">Personal Finance</option>
                <option value="Arts & Culture">Arts & Culture</option>
                <option value="Travel Dest">Travel Dest</option>
                <option value="Other">Other</option>
              </select>
            )}
          </ul>

          {authStatus && (
            <button
              onClick={logoutHandler}
              type="button"
              className=" px-6 py-2 font-semibold   dark:bg-violet-400 bg-violet-600  dark:text-gray-900 text-gray-100"
            >
              Logout
            </button>
          )}
        </div>
      )}

      <div className="w-full flex justify-center  mx-auto font-medium ">
        <ul className="items-stretch hidden max-sm:hidden space-x-3 max-md:flex ">
          {navItems.map((item) =>
            item.active && item.name !== "Login" ? (
              <NavLink
                key={item.name}
                to={item.slug}
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "flex items-center px-4 -mb-1 border-b-2 border-violet-600 dark:border-violet-400 dark:border-transparent text-violet-600 hover:border-violet-600 dark:text-violet-400 hover:dark:border-violet-400"
                      : "flex items-center px-4 -mb-1 border-b-2 dark:border-transparent text-violet-600 hover:border-violet-600 dark:text-violet-400 hover:dark:border-violet-400"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ) : null
          )}

          {authStatus && (
            <select
              name="pets"
              id="pet-select"
              className=" flex items-center border-0 p-0  w-48  text-violet-600 bg-transparent  border-b-2 border-gray-200 dark:border-transparent dark:text-violet-400 appearance-none focus:outline-none focus:ring-0 focus:border-violet-200 peer hover:border-violet-600 hover:dark:border-violet-400"
              value={selectedValue}
              onChange={(event) => {
                handleSelectChange(event);
                // Use the callback function to access the updated state value
                setSelectedValue((prevSelectedValue) => {
                  // Navigate with the updated selectedValue
                  navigate("/", { state: { data: prevSelectedValue } });
                  setShowMenus(false); 
                  // Return the new value for the state
                  return prevSelectedValue;
                });
              }}
            >
              <option value="Web Tech">Web Tech</option>
              <option value="Tech & Gadgets">Tech & Gadgets</option>
              <option value="Science & Innovation">Science & Innovation</option>
              <option value="Personal Finance">Personal Finance</option>
              <option value="Arts & Culture">Arts & Culture</option>
              <option value="Travel Dest">Travel Dest</option>
              <option value="Other">Other</option>
            </select>
          )}
        </ul>
      </div>
    </header>
  );
}
