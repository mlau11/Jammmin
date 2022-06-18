import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { useToast } from "@chakra-ui/react";
import Typed from "typed.js";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");
  const el = useRef(null);
  const typed = useRef(null);
  const toast = useToast();

  useEffect(() => {
    const options = {
      strings: ["Enter A Song, Album, or Artist", ""],
      typeSpeed: 50,
      backSpeed: 50,
    };

    typed.current = new Typed(el.current, options);

    return () => {
      typed.current.destroy();
    };
  }, []);

  const search = () => {
    if (term) {
      onSearch(term);
    } else {
      toast({
        title: "Please type in the search bar",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="SearchBar">
      <input
        id="searchBar"
        type="text"
        ref={el}
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
        onKeyPress={handleEnter}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
