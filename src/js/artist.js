import React from "react";
import { useState, useRef } from "react";

const Artist = ({ artist, artistsArray }) => {
  const [isActive, setIsActive] = useState(false);
  const parentRef = useRef();
  return (
    <div className="artistDiv">
      {artistsArray.indexOf(artist) + 1 + "."}
      <h onClick={(e) => setIsActive(!isActive)}> {artist.name} </h>
      {artist.images.length ? (
        <img src={artist.images[0].url} className="artistIMG"></img>
      ) : (
        <h> </h>
      )}
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
        <p> World Popularity: {parseInt(artist.popularity).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Artist;
