import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const clientID = "8749d4d40a72490aac3a512871158c4a";
  const redirectURL = "http://localhost:3000";
  const authendpointURL = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const scopeType = "user-top-read";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const [topItems, setTopItems] = useState([]);

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
        limit: 30,
      },
    });

    console.log(data);
    setArtists(data.artists.items);
  }

  async function searchTopItems(e) {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        params: {
          time_range: "medium_term",
          limit: 30,
          offset: 0,
        },
        headers: {
          //fix the authorization so that the token works properly!
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data.items);
    setTopItems(data.items);
  }

  //note that if the length of pictures does not exist, we do not access it!
  function renderArtists() {
    return artists.map((artist) => (
      <div className="showingArtists">
        {" "}
        {artists.indexOf(artist) + 1 + "."}
        <a
          className="artistLink"
          href={artist.external_urls.spotify}
          target="blank"
        >
          {" "}
          {artist.name}{" "}
        </a>
        <h> </h>
        {artist.images.length ? (
          <img src={artist.images[0].url} className="artistIMG"></img>
        ) : (
          <h> </h>
        )}
      </div>
    ));
  }

  function renderTopItems() {
    return topItems.map((topItem) => (
      <div className="showingTopItems">
        {" "}
        {topItems.indexOf(topItem) + 1 + "."}
        <a
          className="artistLink"
          href={topItem.external_urls.spotify}
          target="blank"
        >
          {" "}
          {topItem.name}
        </a>
        <h> </h>
        {topItem.images.length ? (
          <img src={topItem.images[0].url} className="topItemsIMG"></img>
        ) : (
          <h> </h>
        )}
      </div>
    ));
  }

  return (
    <div className="App">
      <h className="spotifyHeader">Spotify API Testing</h>

      {!token ? (
        <div className="loginDiv">
          <a
            href={`${authendpointURL}?client_id=${clientID}&redirect_uri=${redirectURL}&response_type=${responseType}&scope=${scopeType}`}
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
          <h className="searhForHeader"> Search For Your Artists </h>
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

      {token ? <div> {renderArtists()} </div> : <h></h>}

      {token ? (
        <div className="topUserItems">
          {" "}
          <h>Display Top Artists</h>{" "}
          <div>
            <button onClick={searchTopItems}> Find Top Aritsts</button>
          </div>
        </div>
      ) : (
        <h> </h>
      )}

      {token ? <div> {renderTopItems()} </div> : <h></h>}
    </div>
  );
}

export default App;
