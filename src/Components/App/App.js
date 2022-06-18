import React, { useEffect, useState } from "react";
import "./App.css";
import SearchResults from "../SearchResults/SearchResults";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import {
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const URI =
  "https://accounts.spotify.com/authorize?client_id=2f11d66ae74440a5be695213f8c4f571&response_type=token&scope=playlist-modify-public&redirect_uri=http://jammmin-ml.surge.sh/";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setToken(Spotify.getAccessToken());
    if (token === URI) {
      onOpen();
    }
  }, [token]);

  const addTrack = (track) => {
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  };

  const removeTrack = (track) => {
    setPlaylistTracks([
      ...playlistTracks.filter((savedTrack) => savedTrack.id !== track.id),
    ]);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  const savePlaylist = () => {
    if (playlistTracks.length > 0) {
      const trackUris = playlistTracks.map((track) => track.uri);
      Spotify.savePlaylist(playlistName, trackUris).then(() => {
        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
      });
    } else {
      toast({
        title: "Please add a track to the playlist",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const search = (searchTerm) => {
    Spotify.search(searchTerm).then((searchResults) => {
      setSearchResults(searchResults);
    });
  };

  return (
    <div>
      <Flex justify="space-between" bg="#010c3f" alignItems="center">
        <Button size="sm" opacity={0} ml={4}>
          Sign In
        </Button>
        <h1 style={{ fontSize: "2rem" }}>
          Ja<span className="highlight">mmm</span>in'
        </h1>
        <Button
          bg="#6c41ec"
          color="white"
          size="sm"
          mr={4}
          onClick={() => {
            onClose();
            window.location =
              "https://accounts.spotify.com/authorize?client_id=2f11d66ae74440a5be695213f8c4f571&response_type=token&scope=playlist-modify-public&redirect_uri=http://jammmin-ml.surge.sh/";
          }}
        >
          Sign In
        </Button>
      </Flex>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log Into Spotify</ModalHeader>
          <ModalBody>
            You must log into Spotify first to use this application.
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#6c41ec"
              color="white"
              mr={3}
              onClick={() => {
                onClose();
                window.location = token;
              }}
            >
              Sign In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default App;
