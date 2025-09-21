import Search from "./components/Search";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 py-4 shadow-md">
        <h1 className="text-center text-2x1 font-bold text-white">Github User Search</h1>

      </header>

      <main className="container mx-auto px-4">
        <Search />
      </main>
    </div>
  );
}

export default App;
