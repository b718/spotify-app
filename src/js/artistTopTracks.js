import React from "react";
import axios from "axios";

const artistTopTracks = ({ topTracks, token }) => {
  function renderTopTracks() {
    console.log(topTracks);
    return topTracks.map((tp) => (
      <div className="">
        {tp.name}
        <div>
          {tp.album.name}
          <h> </h>
          {tp.album.images.length ? (
            <img src={tp.album.images[0].url} className="topTrackIMG"></img>
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

export default artistTopTracks;
