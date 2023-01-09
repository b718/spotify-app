import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Artist from "./js/artist.js";
import ParticlesBackground from "./components/ParticlesBackground";
import { Buffer } from "buffer";

function App() {
  var clientID = "8749d4d40a72490aac3a512871158c4a";
  var clientSID = "545f835255d6433d9941a15869f83b02";
  const redirectURL = "http://localhost:3000";
  const authendpointURL = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const scopeType =
    "user-top-read user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
  const TOKEN = "https://accounts.spotify.com/api/token";
  const url = `${authendpointURL}?client_id=${clientID}&response_type=${responseType}&redirect_uri=${redirectURL}&scope=${scopeType}`;

  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
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
    console.log("hash", hash);

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      //console.log(token);
      console.log("hash", hash);
      //this line of code removes the hash from the web browser!
      window.location.hash = "";

      //now we set the item within local storage to hold a value!
      window.localStorage.setItem("token", token);
    }

    //onPageLoad();
    setToken(token);
    //handleRedirect();
    //console.log("token", token);
  }, []);

  function onPageLoad() {
    clientID = localStorage.getItem("client_id");
    clientSID = localStorage.getItem("client_secret");
    if (window.location.search.length > 0) {
      handleRedirect();
    }
  }

  function requestAuthorization() {
    clientID = document.getElementById("clientId").value;
    clientSID = document.getElementById("clientSecret").value;
    localStorage.setItem("client_id", clientID);
    localStorage.setItem("client_secret", clientSID); // In a real app you should not expose your client_secret to the user

    let url = authendpointURL;
    url += "?client_id=" + clientID;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI(redirectURL);
    url += "&show_dialog=true";
    url +=
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    window.location.href = url; // Show Spotify's authorization screen
  }

  function handleRedirect() {
    let codeTest = getCode();
    setCode(codeTest);
    fetchAccessToken(codeTest);
    console.log("code", code);
    window.history.pushState("", "", redirectURL);
  }

  function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get("code");
    }
    return code;
  }

  function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + redirectURL;
    body += "&client_id=" + clientID;
    body += "&client_secret=" + clientSID;
    callAuthorizationApi(code);
  }

  async function callAuthorizationApi(code) {
    let holder = Buffer.from(clientID + ":" + clientSID).toString("base64");
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        body: {
          grant_type: "authorization_code",
          code: { code },
          redirect_uri: encodeURI(redirectURL),
        },
        headers: {
          Authorization: "Basic " + holder,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("test", data.access_token);
    return data.access_token;
  }

  function handleAuthorizationResponse() {
    if (this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      setToken(data.access_token);
      var data = JSON.parse(this.responseText);
      if (data.access_token != undefined) {
        setToken(data.access_token);
        localStorage.setItem("access_token", data.access_token);
      }
    } else {
      console.log("test", this.responseText);
      console.log();
      alert(this.responseText);
    }
  }

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

  function addCount() {
    setCurrCount(currCount + 1);
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
          <a href={url} onClick={requestAuthorization}>
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
    </div>
  );
}

export default App;
