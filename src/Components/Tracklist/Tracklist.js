import React, { useEffect } from "react";
import "./Tracklist.css";
import Track from "../Track/Track";

const Tracklist = ({ isRemoval, onAdd, onRemove, tracks }) => {
  return (
    <div className="TrackList">
      {tracks.map((track) => (
        <Track
          track={track}
          key={track.id}
          onAdd={onAdd}
          isRemoval={isRemoval}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default Tracklist;
