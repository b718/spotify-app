import React from "react";
import { useState, useEffect } from "react";

const ArtistTopTrack = ({ topTrack }) => {
  const [audioState, setAudioState] = useState(false);
  const [currSong, setCurrSong] = useState();
  const [currSongName, setCurrSongName] = useState("");

  useEffect(() => {
    /*var currAudio = new Audio(topTrack.preview_url);
    setCurrSong(currAudio);
    setCurrSongName(topTrack.name);*/
    console.log("track1adsadsadas", topTrack);
  }, []);

  function playAudio() {
    if (audioState) {
      currSong.play();
      setAudioState(!audioState);
    } else {
      currSong.pause();
      setAudioState(!audioState);
    }
  }

  /*{" "}
  <div className="titleTopTracks" onClick={playAudio}>
    Title: {topTrack.name}
  </div>
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
      <a href={topTrack.images[0].url} target="_blank">
        <img
          src={topTrack.album.images[0].url}
          className="topTrackIMG"
        ></img>
      </a>
    ) : (
      <h></h>
    )}
  </div>*/
  return <div className="topTracksDiv"></div>;
};

export default ArtistTopTrack;
