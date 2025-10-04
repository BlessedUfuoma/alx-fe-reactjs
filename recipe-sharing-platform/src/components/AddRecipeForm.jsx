import { useState } from "react";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({}); 

  
  const validate = () => {
    const newErrors = {};

    if (!title.trim()) newErrors.title = "Recipe title is required.";
    if (!ingredients.trim())
      newErrors.ingredients = "Ingredients field cannot be empty.";
    else {
      const list = ingredients.split(",").map((i) => i.trim());
      if (list.length < 2)
        newErrors.ingredients = "Please include at least two ingredients.";
    }

    if (!steps.trim())
      newErrors.steps = "Please describe the preparation steps.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return; 

    const newRecipe = {
      title,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      steps,
    };

    console.log("New Recipe Added:", newRecipe);

    // Clear form after submit
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
    alert("Recipe submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          🍳 Add a New Recipe
        </h1>

        {/* Title Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Spaghetti Carbonara"
            className={`w-full border ${
              errors.title ? "border-red-400" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Ingredients Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Ingredients (separated by commas)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. pasta, eggs, bacon, cheese"
            rows="3"
            className={`w-full border ${
              errors.ingredients ? "border-red-400" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
          )}
        </div>

        {/* Steps Field */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Preparation Steps
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Describe how to prepare your recipe..."
            rows="4"
            className={`w-full border ${
              errors.steps ? "border-red-400" : "border-gray-300"
            } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          ></textarea>
          {errors.steps && (
            <p className="text-red-500 text-sm mt-1">{errors.steps}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipeForm;
