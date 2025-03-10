export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "bg-transparent",
  loading = false, // New loading prop
  ...props
}) {
  console.log("loading",loading);
  
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}   `}
      {...props}  
    >{loading ? (
      <span className="flex justify-center items-center">
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </span>
    ) : (
      children
    )}</button>
  );
}
