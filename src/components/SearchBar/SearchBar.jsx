import { RadioBrowserApi } from "radio-browser-api";
import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ setStations, tags = "" }) => {
  const api = new RadioBrowserApi("My Radio App");
  const [userInput, setUserInput] = useState("");
  async function getStations() {
    return await api.searchStations({
      name: userInput,
      tag: tags,
      limit: 100,
      offset: 0, // this is the default - can be omited
    });
  }

  const handleKeyDown = async (event) => {
    if (event.key == "Enter") {
      const stationList = (await getStations()).filter(
        (station) => station.name != ""
      );
      setStations(stationList);
    }
  };

  return (
    <input
      className="search-bar"
      type="search"
      placeholder="Enter Radio Name:"
      onChange={(e) => setUserInput(e.currentTarget.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default SearchBar;
