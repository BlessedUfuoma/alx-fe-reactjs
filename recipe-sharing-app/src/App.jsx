import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>🍳 Recipe Sharing App</h1>

        {/* Navigation */}
        <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Link to="/">Home</Link>
          <Link to="/favorites">My Favorites</Link>
          <Link to="/recommendations">Recommendations</Link>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div>
                <SearchBar />
                <AddRecipeForm />
                <RecipeList />
              </div>
            }
          />

          {/* Recipe Details */}
          <Route path="/recipes/:id" element={<RecipeDetails />} />

          {/* Favorites Page */}
          <Route path="/favorites" element={<FavoritesList />} />

          {/* Recommendations Page */}
          <Route path="/recommendations" element={<RecommendationsList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

