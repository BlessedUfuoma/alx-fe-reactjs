import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users";


export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


const GITHUB_SEARCH_API = "https://api.github.com/search/users?q=";

export const fetchAdvancedUsers = async (username, location, minRepos) => {
  try {
    let query = "";

    if (username) query += `${username} in:login `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos} `;

    const response = await axios.get(`${GITHUB_SEARCH_API}?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching advanced users:", error);
    throw error;
  }
};