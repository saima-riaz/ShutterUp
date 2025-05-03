import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

/**
 * Reusable Loading Component
 * Handles:
 * - Authentication loading
 * - Content loading
 * - Error states
 */
const LoadingState = ({ type, error }) => {
  if (type === "auth") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Initializing session...</div>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error || "An error occurred"}
        </div>
      </div>
    );
  }

  // Default content loading state
  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-green-200 to-blue-100">
      <aside className="w-64 bg-white p-6 rounded-tr-3xl rounded-br-3xl shadow-md">
        <div className="flex items-center gap-2 mb-10">
          <FontAwesomeIcon icon={faCamera} className="text-3xl" />
          <h1 className="text-2xl font-bold text-gray-800">ShutterUp</h1>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LoadingState;