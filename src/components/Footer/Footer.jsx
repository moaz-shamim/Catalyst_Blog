import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <footer className="dark:bg-gray-800 dark:text-gray-50 text-gray-900 bg-gray-100 ">
      <div className="container flex flex-col p-4 mx-auto md:p-8 lg:flex-row dark:divide-gray-600">
        {authStatus ? (
          <div className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
            {/* tab section */}
            <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap bg-gray-100  text-gray-800 dark:bg-gray-800 ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg border-violet-400 dark:text-violet-400  text-violet-600"
                      : "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-violet-400 dark:text-violet-400  text-violet-600"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 "
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Home</span>
              </NavLink>

              <NavLink
                to="/all-posts"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg border-violet-400 dark:text-violet-400  text-violet-600"
                      : "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-violet-400 dark:text-violet-400  text-violet-600"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <span>All Post</span>
              </NavLink>
              <NavLink
                to="/add-post"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg border-violet-400 dark:text-violet-400  text-violet-600"
                      : "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-violet-400 dark:text-violet-400  text-violet-600"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>Add Post</span>
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="self-center py-6 space-y-4 text-center sm:flex sm:space-y-0 sm:justify-around sm:space-x-4 lg:flex-1 lg:justify-start">
            <div className="flex items-center -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap bg-gray-100  text-gray-800 dark:bg-gray-800 ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${
                    isActive
                      ? "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border border-b-0 rounded-t-lg border-violet-400 dark:text-violet-400  text-violet-600"
                      : "flex items-center flex-shrink-0 px-5 py-3 space-x-2 border-b border-violet-400 dark:text-violet-400  text-violet-600"
                  }`
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 "
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Home</span>
              </NavLink>
            </div>
          </div>
        )}

        <div className="flex flex-col justify-center pt-6 lg:pt-0">
          <div className="flex justify-center space-x-4">
            <a
              rel="noopener noreferrer"
              href="http://www.linkedin.com/in/md-moaz-shamim-241672211"
              title="linkdin"
              className="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-600 dark:bg-violet-400   dark:text-gray-900 text-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="-9 -8 35 33"
                className="w-8 h-8"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"></path>
              </svg>
            </a>

            <a
              aria-label="Write me an email"
              rel="noopener noreferrer"
              href="mailto:moaz.shamim1575@gmail.com"
              class="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-600 dark:bg-violet-400 dark:text-gray-900 text-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </a>

            <a
              href="https://github.com/moaz-shamim"
              class="flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-violet-600 dark:bg-violet-400 dark:text-gray-900 text-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-github w-5 h-5"
                viewBox="0 0 16 16"
              >
                {" "}
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />{" "}
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
