import React from "react";
import { useState } from "react";

const ArtistTopTracks = ({ topTracks, token }) => {
  const [picActive, setPicActive] = useState(false);
  const [audioState, setAudioState] = useState(false);

  function changePic() {
    setPicActive(!picActive);
  }
  function playAudio(tp) {
    var currAudio = new Audio(tp.preview_url);
    setAudioState(!audioState);
    if (audioState) {
      currAudio.play();
    } else {
      currAudio.pause();
      currAudio.currentTime = 0;
      currAudio.play();
    }
  }
  function renderTopTracks() {
    console.log(topTracks);
    return topTracks.map((tp) => (
      <div className="">
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
