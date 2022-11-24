import React from "react";
import { useState } from "react";
import axios from "axios";

const ArtistTopTracks = ({ topTracks, token }) => {
  const [picActive, setPicActive] = useState(false);

  function changePic() {
    setPicActive(!picActive);
  }
  function renderTopTracks() {
    console.log(topTracks);
    return topTracks.map((tp) => (
      <div className="">
        {tp.name}
        <div>
          <a
            href={tp.album.external_urls.spotify}
            target="blank"
            className="topTrackAlbumUrl"
          >
            {" "}
            {tp.album.name}
          </a>
          <h> </h>
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
