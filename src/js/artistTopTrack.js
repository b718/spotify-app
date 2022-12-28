import React from "react";
import { useState, useEffect } from "react";

const ArtistTopTrack = ({ topTrack }) => {
  const [audioState, setAudioState] = useState(true);
  const [currSong, setCurrSong] = useState();
  const [currSongName, setCurrSongName] = useState("");

  function playAudio() {
    if (audioState) {
      currSong.play();
      setAudioState(!audioState);
    } else {
      currSong.pause();
      setAudioState(!audioState);
    }
  }

  function setAudio() {
    var currAudio = new Audio(topTrack.preview_url);
    setCurrSong(currAudio);
    setCurrSongName(topTrack.name);
    //console.log("done");
  }

  function nothing() {}

  return (
    <div className="topTracksDiv">
      {
        //console.log("current state", topTrack)
      }

      {topTrack ? (
        <div>
          {" "}
          <div
            className="titleTopTracks"
            onClick={audioState ? setAudio : nothing}
          >
            Title: {topTrack.name}
          </div>
          {audioState ? (
            <button onClick={playAudio}>play</button>
          ) : (
            <button onClick={playAudio}>pause</button>
          )}
          <div className="albumTopTracks">
            <a
              href={topTrack.album.external_urls.spotify}
              target="blank"
              className="topTrackAlbumUrl"
            >
              {" "}
              Album: {topTrack.album.name}
            </a>
          </div>
          <div>
            {topTrack.album.images.length ? (
              // eslint-disable-next-line jsx-a11y/alt-text
              <a href={topTrack.album.images[0].url} target="_blank">
                <img
                  src={topTrack.album.images[0].url}
                  className="topTrackIMG"
                ></img>
              </a>
            ) : (
              <h></h>
            )}
          </div>
        </div>
      ) : (
        <h></h>
      )}
    </div>
  );
};

export default ArtistTopTrack;
