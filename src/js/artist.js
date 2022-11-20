import React from "react";

const Artist = ({ artist }) => {
  return (
    <div className="artistDiv">
      <a href={artist.external_urls.spotify}>This Spotify Link</a>
      <p> Total Followers: {artist.followers.total} </p>
      <p> World Popularity: {artist.popularity}</p>
    </div>
  );
};

export default Artist;
