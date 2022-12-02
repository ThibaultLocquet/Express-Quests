require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { validateMovie } = require("./validators.js");
const { validateUsers } = require("./validators.js");

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.get("/api/users", movieHandlers.getUsers);
app.get("/api/users/:id", movieHandlers.getUserById);
app.post("/api/users", movieHandlers.postUsers);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUsers, movieHandlers.updateUsers);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", movieHandlers.deleteUsers);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUsers, movieHandlers.postUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
