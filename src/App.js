import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const clientID = "8749d4d40a72490aac3a512871158c4a";
  const redirectURL = "http://localhost:3000";
  const authendpointURL = "https://accounts.spotify.com/authorize";
  const responseType = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [number, setNumber] = useState(1);

  //this useEffect will only run once as we do not
  //have it activate with something changing!
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      console.log(token);

      //this line of code removes the hash from the web browser!
      window.location.hash = "";

      //now we set the item within local storage to hold a value!
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  function logoutFunction() {
    //this removes the token we have saved once we logout!
    setToken("");
    window.localStorage.removeItem("token");
  }

  async function searchArtists(e) {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    console.log(data);
    setArtists(data.artists.items);
  }

  function renderArtists() {
    return artists.map((artist) => (
      <div className="showingArtists">
        {" "}
        {artists.indexOf(artist) + 1 + "."} {artist.name}
        {artist.images.length ? (
          <img width="3%" src={artist.images[0].url}></img>
        ) : (
          <h> </h>
        )}
      </div>
    ));
  }

  return (
    <div className="App">
      <h className="spotifyHeader">Who Relates To Your Favourite Artist?</h>

      {!token ? (
        <div className="loginDiv">
          <a
            href={`${authendpointURL}?client_id=${clientID}&redirect_uri=${redirectURL}&response_type=${responseType}`}
            className="loginSpotify"
          >
            Login To Spotify
          </a>
        </div>
      ) : (
        <div className="logoutDiv">
          <button onClick={logoutFunction}>Log Out</button>
        </div>
      )}

      {token ? (
        <div className="searchDiv">
          <form onSubmit={searchArtists}>
            <input
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
            ></input>

            <button type="submit"> Start </button>
          </form>
        </div>
      ) : (
        <h> </h>
      )}
      {token ? renderArtists() : <h></h>}
    </div>
  );
}

export default App;
