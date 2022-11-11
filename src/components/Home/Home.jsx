import { useNavigate } from "react-router-dom";
import { tagMappings } from "../../utilities/constants";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const goToPosts = (tags) =>
    navigate({
      pathname: `/genres/${tags}`,
    });

  const tags = Object.keys(tagMappings);

  return (
    <>
      <div className="cardsPageContainer">
        <div className="cardsPageBanner">
          <button className="backButton"></button>
          <div className="BannerTitle">
            <h1>NurMusik</h1>
          </div>
          <div className="HeaderPadding"></div>
        </div>

        <div className="searchBar"></div>

        <div className="genre-cards-container notFilled">
          {tags.map((genre, idx) => (
            <button
              key={idx}
              // className="card m-1 p-2 cardsPage"
              className="homeCards"
              onClick={() => goToPosts(genre)}
            >
              <div className="card-body">
                <h5>{genre.at(0).toUpperCase() + genre.slice(1)}</h5>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
