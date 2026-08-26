import { Link } from "react-router-dom";

export default function Logo({ isDarkBg = false }) {
  return (
    <Link to="/" className="flex items-end active:scale-95 transition-transform">
      <span className="text-3xl lg:text-4xl font-bold text-primaryBlue tracking-tighter">
        V
      </span>
      <span
        className={`text-xl lg:text-2xl font-bold tracking-tight font-logo transition-colors duration-300 ${
          isDarkBg ? "text-white" : "text-gray-900"
        }`}
      >
        isorix
      </span>
    </Link>
  );
}


