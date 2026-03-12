import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=100&offset=151")
      .then((res) => res.json())
      .then((data) => setPokemon(data.results));
  }, []);

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pokedex">
      <h1>Johto Pokédex</h1>

      <input
        className="search"
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="screen">
        {filtered.map((p, index) => {
          const id = index + 152;
          const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          return (
            <div
              className="pokemon"
              key={id}
              onClick={() => setSelected({ name: p.name, id })}
            >
              <img src={img} alt={p.name} />
              <p>#{id}</p>
              <span>{p.name}</span>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="modal" onClick={() => setSelected(null)}>
          <div className="modal-content">
            <h2>{selected.name}</h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.id}.png`}
              alt={selected.name}
            />
            <p>#{selected.id}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;