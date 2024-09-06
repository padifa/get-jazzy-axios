function onReady() {
  console.log("Hello from client.js");
  fetchArtist();

  fetchSongs();
  // TODO Add Axios request for /songs and display on DOM
}

function addArtist(event) {
  //prevents page from reloading...
  event.preventDefault();

  //getting user provided data from the DOM
  const artistName = document.getElementById("artist-name").value;
  const artistBorn = document.getElementById("artist-born").value;
  const artistDied = document.getElementById("artist-died").value;

  //this is our newArtist object that will be sent to the server via a POST method
  let newArtist = {
    name: artistName,
    born: artistBorn,
    died: artistDied,
  };

  console.log("add artist", newArtist);
  axios({
    method: "POST",
    url: "/artist",
    data: newArtist,
  })
    .then((response) => {
      fetchArtist();

      document.getElementById("artist-name").value = "";
      document.getElementById("artist-born").value = "";
      document.getElementById("artist-died").value = "";
    })
    .catch((err) => console.error(`Error Artist`, err));
}

function addSong(event) {
  event.preventDefault();
  const songTitle = document.getElementById("song-title").value;
  const songArtist = document.getElementById("song-artist").value;

  let newSong = {
    title: songTitle,
    artist: songArtist,
  };
  console.log("add song", newSong);
  axios({
    method: "POST",
    url: "/song",
    data: newSong,
  })
    .then((response) => {
      fetchSongs();

      document.getElementById("song-title").value = "";
      document.getElementById("song-artist").value = "";
    })
    .catch((err) => console.error(`Error Song`, err));
}
function fetchArtist() {
  axios({
    method: "GET",
    url: "/artist",
  })
    .then(function (response) {
      console.log(`we received something from the server`, response);
      const artistData = response.data;
      document.getElementById("artistTableBody").innerHTML = ``;
      for (const artist of artistData) {
        document.getElementById("artistTableBody").innerHTML += `
      <tr>
      <td>${artist.name}</td>
      <td>${artist.born}</td>
      <td>${artist.died}</td>
      </tr>
      `;
      }
    })
    .catch(function (error) {
      console.error(`There was an error fetching artists`, error);
    });
}
function fetchSongs() {
  axios({
    method: "GET",
    url: "/song",
  })
    .then(function (response) {
      console.log(`we received something from the server`, response);
      const songData = response.data;
      document.getElementById("songTableBody").innerHTML = ``;
      for (const song of songData) {
        document.getElementById("songTableBody").innerHTML += `
        <tr>
        <td>${song.artist}</td>
        <td>${song.title}</td>
        </tr>`;
      }
    })
    .catch(function (error) {
      console.error(`There is an error fetching songs`, error);
    });
}

//this function runs when index.html loads...
onReady();
