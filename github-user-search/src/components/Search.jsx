import { useState } from "react";
import { fetchUsers } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const users = await fetchUsers({ username, location, minRepos });
      setResults(users);
      if (users.length === 0) {
        setError("Looks like we can't find the user(s)");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl grid gap-4 sm:grid-cols-3"
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          placeholder="Min Repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="sm:col-span-3 rounded-lg bg-blue-600 px-5 py-2 text-white font-medium shadow-md hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="mt-6 text-gray-500">Loading...</p>}

      {/* Error Message */}
      {error && (
        <p className="mt-6 text-red-500 font-semibold">{error}</p>
      )}

      {/* Results */}
      <div className="mt-8 w-full max-w-2xl grid gap-6 sm:grid-cols-2">
        {results.map((user) => (
          <div
            key={user.id}
            className="rounded-xl border border-gray-200 bg-white shadow-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full border-2 border-blue-500"
            />
            <h2 className="mt-3 text-lg font-semibold text-gray-800">
              {user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
