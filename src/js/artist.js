import React, { useEffect } from "react";
import { useState, useRef } from "react";
import ArtistTopTracks from "./artistTopTracks";
import ArtistTopTrack from "./artistTopTrack";

import axios from "axios";

const Artist = ({ artist, artistsArray, token, range }) => {
  const [isActive, setIsActive] = useState(false);
  const [picActive, setPicActive] = useState(false);
  const [privTopTracks, privSetTopTracks] = useState([]);
  const [track1, setTrack1] = useState(null);
  const [track2, setTrack2] = useState(null);
  const [track3, setTrack3] = useState(null);

  const parentRef = useRef();

  function changePic() {
    setPicActive(!picActive);
  }

  async function searchTopTracks(e) {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`,
      {
        params: {
          market: "ES",
        },
        headers: {
          //fix the authorization so that the token works properly!
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(artist.name, artist.id);
    // console.log("top songs", data.tracks);
    //console.log("in search top tracks", data.tracks.splice(0, 3));
    //privSetTopTracks(data.tracks.splice(0, 3));

    setTrack1(data.tracks[0]);
    setTrack2(data.tracks[1]);
    setTrack3(data.tracks[2]);

    //console.log(privTopTracks, artist.id);
    //it seems that usestate is not instant
  }

  useEffect(() => {
    console.log("reaching the effect");
    searchTopTracks();
  }, [range]);

  return (
    <div className="artistDiv">
      <div className="picNName">
        {artist.images.length ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <a href={artist.images[0].url} target="_blank">
            <img
              onClick={changePic}
              /*style={
                !picActive
                  ? { width: "4em", height: "4em" }
                  : { width: "30%", height: "30%" }
              }*/
              src={artist.images[0].url}
              className="artistIMG"
            ></img>
          </a>
        ) : (
          <h> </h>
        )}
        <div>
          <h onClick={(e) => setIsActive(!isActive)}>
            {artistsArray.indexOf(artist) + 1 + ". "}
            {artist.name}
          </h>
        </div>
      </div>
      <div
        className="contentDropDown"
        ref={parentRef}
        style={
          isActive
            ? {
                height: parentRef.current.scrollHeight + "px",
              }
            : {
                height: "0px",
              }
        }
      >
        <a
          className="artistLink"
          href={artist.external_urls.spotify}
          target="blank"
        >
          {artist.name}'s Spotify Link
        </a>
        <p> Total Followers: {artist.followers.total.toLocaleString()}</p>
        <p>
          {" "}
          Popularity: {parseInt(artist.popularity).toLocaleString()}{" "}
          <p className="popularityP">
            {" "}
            The popularity of the artist. The value will be between 0 and 100,
            with 100 being the most popular. The artist's popularity is
            calculated from the popularity of all the artist's tracks.
          </p>
        </p>

        <p>Genres: {artist.genres.join(", ")}</p>
        <p className="discL">
          Note: If you want to play the track, click the track first!
        </p>

        {
          //<ArtistTopTracks topTracks={track1} token={token} />
        }

        <div className="gridDiv">
          {/*<ArtistTopTrack topTrack={privTopTracks[0]} />
          <ArtistTopTrack topTrack={privTopTracks[1]} />
          <ArtistTopTrack topTrack={privTopTracks[2]} />
          <ArtistTopTracks topTracks={privTopTracks} token={token} />
                    
          

        */}

          <ArtistTopTrack topTrack={track1} />
          <ArtistTopTrack topTrack={track2} />
          <ArtistTopTrack topTrack={track3} />
        </div>
      </div>
    </div>
  );
};

export default Artist;
