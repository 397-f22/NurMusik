import "./SuggestionCards.css";
import { tagMappings } from "../../utilities/constants";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";
import "../Home/Home.css";

const SuggestionCard = ({}) => {
  const api = new RadioBrowserApi("My Radio App");
  const [stations, setStations] = useState([]);
  const [intialized, setInitialized] = useState(false);

  let { tags } = useParams();
  let genre = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();


  useEffect(() => {
    async function getStations() {
      const waiting_stations = (
        await api.searchStations({
          tag: tags,
          limit: 50,
          offset: 0, // this is the default - can be omited
        })
      ).filter((station) => station.name != "" && !station.name.includes("- 0 N -") && !station.name.includes("- 1 A -"));
      setStations(waiting_stations);
      setInitialized(true);
    }
    getStations();
  }, [intialized]);

  if (!intialized) {
    return (
      <>
        <SearchBar setStations={setStations} tags={tags} />
        <h1>Stations loading...</h1>
      </>
    );
  }

  const firstThreeWords = (stationName) => {
    const splitNames = stationName.replaceAll('_', '').split(" ");
    let returnedName = splitNames
    splitNames.length < 4
      ? returnedName = stationName
      : returnedName = splitNames.slice(0, 4).join(" ");
    return returnedName;
  };

  return (
    <>
      <div className="cardsPageContainer">
        <div className="cardsPageBanner">
          <button className="backButton" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <div className="BannerTitle">
            <h1>NurMusik</h1>
          </div>
          <div className="HeaderPadding"></div>
        </div>

        <div className="searchBar filled">
          <SearchBar setStations={setStations} tags={tags} />
        </div>

        <div className="genre-cards-container">
          {stations.map((station) => (
            <div key={station.id} className="card m-1 p-2 cardsPage">
              <Link
                to={`/player/${station.name}`}
                state={station}
                style={{ textDecoration: "none" }}
              >
                <div className="card-body">
                  <h5>{firstThreeWords(station.name)}</h5>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuggestionCard;
