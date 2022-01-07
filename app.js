const express = require("express");

const PORT = 4000;

// Importing all the pokemon for our data file
const allPokemon = require("./data");

const app = express();

app.use(express.json());

// -- Define your route listeners here! --

app.get("/pokemon", (req, res) => {
  res.send(allPokemon);
});

app.get("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const pokemon = allPokemon.find((pokemon) => pokemon.id === id);

  if (pokemon) {
    return res.json(pokemon);
  } else {
    res.status(404).send("Pokemon not found");
  }
});

app.get("/search", (req, res) => {
  let searchTerm = req.query;

  for (let key in searchTerm) {
    const foundPokemon = allPokemon.filter((pokemon) => {
      return pokemon[key].includes(searchTerm[key]);
    });

    if (foundPokemon) {
      return res.json(foundPokemon);
    } else {
      res.status(404).send("Pokemon not found");
    }
  }
});

app.post("/pokemon", (req, res) => {
  const { name, types, height, weight, sprite } = req.body;

  const newPokemon = {
    id: allPokemon.length + 1,
    name: name,
    types: types,
    height: height,
    weight: weight,
    sprite: sprite,
  };

  allPokemon.push(newPokemon);

  return res.json(newPokemon);
});

app.put("/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const formData = req.body;

  const foundPokemon = allPokemon.find((pokemon) => {
    return pokemon.id === id;
  });

  const index = allPokemon.indexOf(foundPokemon);

  allPokemon[index] = { ...foundPokemon, ...formData };

  return res.json(allPokemon[index]);
});

app.delete("/pokemon/:id", (req, res) => {
  const index = allPokemon.findIndex((pokemon) => {
    return pokemon.id == req.params.id;
  });

  if (index >= 0) {
    allPokemon.splice(index, 1);
    return res.json({ msg: "Contact deleted successfully" });
  } else {
    return res.json({ msg: "Contact not found." });
  }
});

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
