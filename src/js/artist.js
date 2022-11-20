import React from "react";
import { useState, useRef } from "react";

const Artist = ({ artist, artistsArray }) => {
  const [isActive, setIsActive] = useState(false);
  const [picActive, setPicActive] = useState(false);
  const parentRef = useRef();

  function changePic() {
    setPicActive(!picActive);
  }
  return (
    <div className="artistDiv">
      {artistsArray.indexOf(artist) + 1 + "."}
      <h onClick={(e) => setIsActive(!isActive)}> {artist.name} </h>
      {artist.images.length ? (
        <img
          onClick={changePic}
          style={
            !picActive
              ? { width: "3%", height: "3%" }
              : { width: "30%", height: "30%" }
          }
          src={artist.images[0].url}
          className="artistIMG"
        ></img>
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
      </div>
    </div>
  );
};

export default Artist;
