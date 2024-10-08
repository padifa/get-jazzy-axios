const express = require("express");

const app = express();
const PORT = 5001;

const artistListArray = [
  {
    name: "Miles Davis",
    born: 1926,
    died: 1990,
  },
  {
    name: "Duke Ellington",
    born: 1899,
    died: 1974,
  },
  {
    name: "John Coltrane",
    born: 1926,
    died: 1987,
  },
  {
    name: "Louis Daniel Armstrong",
    born: 1901,
    died: 1971,
  },
];

const songListArray = [
  {
    title: "Take Five",
    artist: "The Dave Brubeck Quartet",
  },
  {
    title: "So What",
    artist: "Miles Davis",
  },
  {
    title: "Sing Sing Sing",
    artist: "Benny Goodman",
  },
  {
    title: 'Take the "A" Train',
    artist: "The Dave Brubeck Quartet",
  },
];

//the app.use is express middleware
app.use(express.static("server/public"));
// this line here is ONLY needed for handling POST requests (not GET)
app.use(express.json()); // turns on req.body for POST requests

app.get("/artist", (req, res) => {
  res.send(artistListArray);
});

// TODO - Add GET for songs
app.get("/song", (req, res) => {
  console.log("Get/ song is being handled");
  res.send(songListArray);
});

app.post("/artist", (req, res) => {
  console.log(req.body);
  if (req.body.name && req.body.born && req.body.died) {
    artistListArray.push(req.body);
    res.sendStatus(201);
  } else {
    res
      .status(400)
      .send(
        "Oops! Artist objects should have `name` and `born` and `died` keys"
      );
  }
});
app.post("/song", (req, res) => {
  console.log(req.body);
  if (req.body.title && req.body.artist) {
    songListArray.push(req.body);
    res.sendStatus(201);
  } else {
    res
      .status(400)
      .send("Oops! Song's objects should have `title` and `artist` keys");
  }
});

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
