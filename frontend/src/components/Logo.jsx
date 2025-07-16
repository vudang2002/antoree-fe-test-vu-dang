import { Link } from "react-router-dom";

export default function Logo({
  className = "",
  showText = true,
  textSize = "text-2xl",
}) {
  return (
    <Link to="/" className={`flex items-center space-x-3 ${className}`}>
      <div className="flex-shrink-0">
        <img
          src="/images/antoree-logo.png"
          alt="Antoree Logo"
          className="h-10 w-10 rounded-lg object-cover shadow-sm"
        />
      </div>
      {showText && (
        <span
          className={`${textSize} font-bold text-green-600 hover:text-green-700 transition-colors duration-200`}
        >
          Antoree
        </span>
      )}
    </Link>
  );
}
