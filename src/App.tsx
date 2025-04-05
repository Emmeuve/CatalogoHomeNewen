import React, { useState } from "react";
import { products as initialProducts } from "./data/products";
import { Home, TreePine } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("todos");
  const [filterMounting, setFilterMounting] = useState("todos");
  const [filterCategory, setFilterCategory] = useState("todos");

  const categories = ["todos", ...new Set(initialProducts.map(p => p.category))];

  const filteredProducts = initialProducts.filter((product) => {
    const matchName = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLocation = filterLocation === "todos" || product.location === filterLocation;
    const matchMounting = filterMounting === "todos" || product.mounting === filterMounting;
    const matchCategory = filterCategory === "todos" || product.category === filterCategory;
    return matchName && matchLocation && matchMounting && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Catálogo de Productos</h1>

        <div className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="px-4 py-2 border rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="px-4 py-2 border rounded-md"
            onChange={(e) => setFilterLocation(e.target.value)}
            value={filterLocation}
          >
            <option value="todos">Todos los usos</option>
            <option value="interior">Interior</option>
            <option value="exterior">Exterior</option>
          </select>

          <select
            className="px-4 py-2 border rounded-md"
            onChange={(e) => setFilterMounting(e.target.value)}
            value={filterMounting}
          >
            <option value="todos">Todos los montajes</option>
            <option value="adhesivo">Adhesivo</option>
            <option value="tornillo">Tornillo</option>
            <option value="fijación">Fijación</option>
          </select>

          <select
            className="px-4 py-2 border rounded-md"
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
          >
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat === "todos" ? "Todas las categorías" : cat}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
            <p className="text-sm text-gray-600">Código: {product.code}</p>

            {product.formato && (
              <p className="text-sm text-gray-600">Formato: {product.formato}</p>
            )}
            {product.mm && (
              <p className="text-sm text-gray-600">Espesor: {product.mm} mm</p>
            )}

            <p className="text-sm">Rinde: {product.coverage} m²</p>
            <p className="text-sm font-semibold">${product.price.toLocaleString("es-CL")}</p>

            <div className="flex items-center gap-2 mt-1">
              {product.location === "interior" ? (
                <>
                  <Home className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-600 text-sm">Interior</span>
                </>
              ) : (
                <>
                  <TreePine className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 text-sm">Exterior</span>
                </>
              )}
            </div>
            <p className="text-sm">Montaje: {product.mounting}</p>
            <p className="text-sm text-gray-500">Categoría: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
