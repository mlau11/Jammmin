import React, { useEffect, useRef } from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";
import Typed from "typed.js";

const Playlist = ({ onNameChange, onRemove, onSave, playlistTracks }) => {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Enter a name for your playlist", ""],
      typeSpeed: 50,
      backSpeed: 50,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);
  const handleNameChange = (e) => {
    onNameChange(e.target.value);
  };

  return (
    <div className="Playlist">
      <input ref={el} onChange={handleNameChange} placeholder="New Playlist" />
      <Tracklist tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
