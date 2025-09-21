import axios from "axios";

const SEARCH_URL = "https://api.github.com/search/users";

// Advanced user search
export const fetchUsers = async ({ username, location, minRepos }) => {
  try {
    let query = "";

    if (username) query += `${username} `;
    if (location) query += `location:${encodeURIComponent(location)} `;
    if (minRepos) query += `repos:>=${minRepos} `;

    // GitHub requires at least 1 query parameter
    if (!query.trim()) {
      throw new Error("Please enter at least one search criteria");
    }

    const response = await axios.get(`${SEARCH_URL}?q=${query.trim()}`);
    return response.data.items; // GitHub returns { total_count, items: [...] }
  } catch (error) {
    console.error("GitHub API error:", error.message);
    throw new Error("Looks like we can't find the user(s)");
  }
};

