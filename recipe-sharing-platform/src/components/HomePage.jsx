import { useState, useEffect } from "react";
import { Link } from "react-router-dom" ;

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch from local JSON file
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        🍽️ Recipe Sharing Platform
      </h1>

<div className="text-center mb-8">
  <Link
    to="/add-recipe"
    className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
  >
    ➕ Add New Recipe
  </Link>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transform transition duration-300"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>
              <p className="text-gray-600 mb-4">{recipe.summary}</p>
              <Link
  to={`/recipe/${recipe.id}`}
  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
>
  View Recipe →
</Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
