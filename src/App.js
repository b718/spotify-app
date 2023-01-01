import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Artist from "./js/artist.js";
import ParticlesBackground from "./components/ParticlesBackground";

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
  const [topTracks, setTopTracks] = useState([]);
  const [currTimeRange, setTimeRange] = useState("");
  const [currCount, setCurrCount] = useState(0);
  const [currType, setcurrType] = useState("");

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

      //console.log(token);

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
    setTimeRange("");
    setcurrType("");
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
        limit: 15,
        offset: 0,
      },
    });

    console.log(data);
    setArtists(data.artists.items.splice(0, 5));
  }

  async function searchTopItems(e) {
    e.preventDefault();

    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists",
      {
        params: {
          time_range: `${currTimeRange}`,
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
    //searchTopTracks();
  }

  //note that if the length of pictures does not exist, we do not access it!
  function renderArtists() {
    return artists.map((artist) => (
      <div className="showingArtists">
        <Artist
          artist={artist}
          artistsArray={artists}
          token={token}
          topTracks={topTracks}
          range={currTimeRange}
        />
      </div>
    ));
  }

  function addCount() {
    setCurrCount(currCount + 1);
  }

  function renderTopItems() {
    return topItems.map((topItem) => (
      <div className="showingTopItems">
        <Artist
          artist={topItem}
          artistsArray={topItems}
          token={token}
          topTracks={topTracks}
          range={currCount}
        />
      </div>
    ));
  }

  function setDaily() {
    setTimeRange("short_term");
  }
  function setMonthly() {
    setTimeRange("medium_term");
  }
  function setYearly() {
    setTimeRange("long_term");
  }

  function result() {
    if (currTimeRange.length == "short_term".length) {
      return "Daily";
    } else if (currTimeRange.length == "medium_term".length) {
      return "Monthly";
    } else if (currTimeRange.length == "long_term".length) {
      return "Yearly";
    } else {
      return "";
    }
  }

  function combine(e) {
    addCount();
    searchTopItems(e);
  }

  return (
    <div className="App">
      <ParticlesBackground />

      <h className="spotifyHeader">Spotify API Testing</h>

      {!token ? (
        <div className="loginDiv">
          <a
            href={`${authendpointURL}?client_id=${clientID}&redirect_uri=${redirectURL}&response_type=${responseType}&scope=${scopeType}`}
          >
            <button>Login To Spotify</button>
          </a>
        </div>
      ) : (
        <div className="logoutDiv">
          <button onClick={logoutFunction}>Log Out</button>
        </div>
      )}

      {token ? (
        <div className="btnSide">
          <button
            onClick={() => {
              setcurrType("Search");
            }}
          >
            Search
          </button>
          <button
            onClick={() => {
              setcurrType("Recap");
            }}
          >
            Recap
          </button>
        </div>
      ) : (
        <h></h>
      )}

      <div className="currTypeDiv"> {currType}</div>
      {token && currType.length == 5 ? (
        <div>
          <div className="topUserItems">
            {" "}
            <h>Display Top Artists</h>
            <div className="buttonDiv">
              <button onClick={setDaily}>Daily</button>
              <button onClick={setMonthly}>Monthly</button>
              <button onClick={setYearly}>Yearly</button>
            </div>
            <h>{result()}</h>
            <div className="findTopArtistsBTN">
              <button onClick={combine}> Find Top Artists</button>
            </div>
          </div>

          <div> {renderTopItems()} </div>
        </div>
      ) : token && currType.length == 6 ? (
        <div>
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

          <div> {renderArtists()} </div>
        </div>
      ) : (
        <h></h>
      )}

      {/*token ? (
        <div className="topUserItems">
          {" "}
          <h>Display Top Artists</h>
          <div className="buttonDiv">
            <button onClick={setDaily}>Daily</button>
            <button onClick={setMonthly}>Monthly</button>
            <button onClick={setYearly}>Yearly</button>
          </div>
          <h>{result()}</h>
          <div>
            <button onClick={combine}> Find Top Aritsts</button>
          </div>
        </div>
      ) : (
        <h> </h>
      )*/}

      {/*token ? <div> {renderTopItems()} </div> : <h></h>*/}

      {/*token ? (
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
      )*/}

      {/*token ? <div> {renderArtists()} </div> : <h></h>*/}
    </div>
  );
}

export default App;
