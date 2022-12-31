/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useState, useEffect } from "react";

const ArtistTopTrack = ({ topTrack, renderValue }) => {
  const [audioState, setAudioState] = useState(true);
  const [currSong, setCurrSong] = useState();
  const [currSongName, setCurrSongName] = useState(renderValue);

  function playAudio() {
    if (audioState) {
      currSong.play();
      setAudioState(!audioState);
    } else {
      currSong.pause();
      setAudioState(!audioState);
    }
  }

  /*useEffect(() => {
    console.log("useEffect", renderValue);
    setCurrSongName(renderValue);
  }, [currSongName]);*/

  /*{audioState ? (
            <button onClick={playAudio}>play</button>
          ) : (
            <button onClick={playAudio}>pause</button>
          )}
          */

  /*   {currSongName ? (
            <audio className="audioPlayer" controls>
              <source src={currSongName} />
            </audio>
          ) : (
            <h></h>
          )} */
  function setAudio() {
    var currAudio = new Audio(topTrack.preview_url);
    setCurrSong(currAudio);
    //console.log(topTrack.preview_url);
    setCurrSongName(topTrack.preview_url);
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
            <button className="asButton" onClick={playAudio}>
              Play
            </button>
          ) : (
            <button className="asButton" onClick={playAudio}>
              Pause
            </button>
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
