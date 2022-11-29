const movies = [
  {
    id: 1,
    title: "Citizen Kane",
    director: "Orson Wells",
    year: "1941",
    colors: false,
    duration: 120,
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: "1972",
    colors: true,
    duration: 180,
  },
  {
    id: 3,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    year: "1994",
    color: true,
    duration: 180,
  },
];

const getMovies = (req, res) => {
  res.json(movies);
  database
    .query("select * from movies")
    .then((result) => {
      const movies = result[0];
      console.log(movies);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send("Not Found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  getMovies,
  getMovieById,
};

/*Créer une route GET /api/users, cette route doit renvoyer un statut 200 et une liste d'utilisateurs de la base de données au format json
Créez une route GET /api/users/:id qui renverra uniquement l'utilisateur de la base de données correspondant à l'identifiant défini dans l'url
S'il y a un utilisateur qui correspond aux paramètres, renvoie une réponse avec un statut 200 et l'utilisateur correspondant en tant qu'objet json
Sinon, retourne un statut 404 avec un message "Not Found"
Publie une URL d'un dépôt GitHub avec ton application complète comme solution.*/
