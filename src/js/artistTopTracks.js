import React from "react";
import { useState } from "react";

const ArtistTopTracks = ({ topTracks, token }) => {
  const [picActive, setPicActive] = useState(false);
  const [audioState, setAudioState] = useState(false);
  const [currSong, setCurrSong] = useState();
  const [currSongName, setCurrSongName] = useState("");
  function changePic() {
    setPicActive(!picActive);
  }

  function playAudio(tp) {
    console.log("Param song name", tp.name);
    console.log("Current song name", currSongName);
    console.log("Initial Audio State", audioState);

    if (currSongName != tp.name) {
      console.log("reached inside");
      var currAudio = new Audio(tp.preview_url);
      setCurrSong(currAudio);
      setCurrSongName(tp.name);
    }

    //with set states, the true state of it changes when its
    //parent function finishes running!
    console.log("Middle Param song name", tp.name);
    console.log("Middle Current song name", currSongName);
    console.log("Middle Audio State", audioState);

    if (audioState && currSongName === tp.name) {
      currSong.play();
      setAudioState(!audioState);
    } else {
      currSong.pause();
      setAudioState(!audioState);
    }
  }

  function renderTopTracks() {
    console.log(topTracks);
    return topTracks.map((tp) => (
      <div className="topTracksDiv">
        <div className="titleTopTracks" onClick={(event) => playAudio(tp)}>
          Title: {tp.name}
        </div>
        <div className="albumTopTracks">
          <a
            href={tp.album.external_urls.spotify}
            target="blank"
            className="topTrackAlbumUrl"
          >
            {" "}
            Album: {tp.album.name}
          </a>
        </div>
        <div>
          {tp.album.images.length ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              onClick={changePic}
              style={
                !picActive
                  ? { width: "25%", height: "25%" }
                  : { width: "25%", height: "25%" }
              }
              src={tp.album.images[0].url}
              className="topTrackIMG"
            ></img>
          ) : (
            <h></h>
          )}
        </div>
      </div>
    ));
  }

  return (
    <div>
      {" "}
      {token ? <div className="gridDiv"> {renderTopTracks()} </div> : <h></h>}
    </div>
  );
};

export default ArtistTopTracks;
