import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./App/Features/Slices/productsSlice";

function App() {
  const dispatch = useDispatch();
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchText, setSeachText] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const {
    items: dukaanSaman,
    loading,
    error,
  } = useSelector((state) => state.products);

  // Get all unique tags
  const tags = [...new Set(dukaanSaman.flatMap((product) => product.tags))];

  // Filter products based on the selected tag and search text
  const filteredProducts = dukaanSaman
    .filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter(
      (product) => (selectedTag ? product.tags.includes(selectedTag) : true) // Check for tag in product tags
    );
  // .filter(
  //   (product) => (selectedTag ? product.tags.includes(selectedTag) : true) // Check for tag in product tags
  // );

  // #############################################
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  // Function to handle tag selection
  function filterProoducts(tag) {
    setSelectedTag(tag); // Set selected tag
  }

  return (
    <>
      <h1>Ecommer App By Nomankhial</h1>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSeachText(e.target.value)}
          placeholder="Search products"
        />
      </div>

      {selectedTag && (
        <button
          style={{ backgroundColor: "crimson", color: "white" }}
          onClick={() => setSelectedTag(null)}
        >
          Clear Filter
        </button>
      )}

      {/* Render buttons for each tag */}
      {tags.map((tag, index) => (
        <button
          key={index}
          onClick={() => filterProoducts(tag)}
          style={{
            backgroundColor: selectedTag === tag ? "green" : "transparent",
          }}
        >
          {tag}
        </button>
      ))}

      {/* Render filtered products */}
      <div className="appStore">
        {!filteredProducts.length ? (
          <h2>No Items Found...</h2>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={index}>
              <img src={product.thumbnail} alt={product.title} />
              <p>{product.title}</p>
              <span>{product.price} $</span>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
