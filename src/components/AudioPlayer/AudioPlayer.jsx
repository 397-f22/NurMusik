import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ControlBar from '../ControlBar/ControlBar';
import Timer from '../Timer/Timer';
import './AudioPlayer.css';
import { RadioBrowserApi } from 'radio-browser-api';

const Player = () => {
  const { name } = useParams();

  const api = new RadioBrowserApi('My Radio App');

  const [station, setStation] = useState();
  const [intialized, setInitialized] = useState(false);
  useEffect(() => {
    async function getStation() {
      const waitingStations = await api.searchStations({
        name: name,
        nameExact: true,
      });
      const filteredStations = waitingStations.filter(
        (station) => station.name === name
      );
      const result =
        filteredStations.length === 0
          ? waitingStations[0]
          : filteredStations[0];
      setStation(result);
      setInitialized(true);
    }

    getStation();
  }, [intialized]);

  const [playState, setPlayState] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const minutes = Array.from(new Array(60), (val, index) =>
    String(index).padStart(2, '0')
  );
  const seconds = Array.from(new Array(60), (val, index) =>
    String(index).padStart(2, '0')
  );
  const [minutesState, setMinutes] = useState('05');
  const [secondsState, setSeconds] = useState('00');

  const totalSeconds = parseInt(minutesState) * 60 + parseInt(secondsState);

  const stopPlayer = () => {
    const player = document.getElementById('player');
    player['pause']();
    setPlayState(false);
  };

  const startPlayer = () => {
    const player = document.getElementById('player');
    player['play']();
    setPlayState(true);
  };

  const togglePlayer = () => (playState ? stopPlayer() : startPlayer());

  if (station == undefined) {
    return <h1>loading...</h1>;
  }

  return (
    <>
      <audio id="player" preload="none">
        <source src={station.url} type="audio/mp3" />
      </audio>
      <div className="PlayerPage">
        {/* <div className="Banner"> */}
        {/* <i className="bi bi-arrow-left"></i> */}
        {/* <h1 className="BannerTitle">NurMusik</h1> */}
        {/* <i className="bi bi-three-dots"></i> */}
        {/* </div> */}
        <div className="RadioInfo">
          <h1 className="radio-name">{station.name}</h1>
          {/* TODO: add more information */}
          {/* <h4 className="radio-description">The world's greatest music</h4> */}
        </div>
        <div className="TimerInfo">
          <Timer
            timerKey={timerKey}
            setTimerKey={setTimerKey}
            playState={playState}
            stopPlayer={stopPlayer}
            duration={totalSeconds}
          />
          <div className="time-selector-container">
            <label style={{ fontWeight: 'bold' }}>
              <select
                className="time-selector mx-2"
                required={true}
                value={minutesState}
                disabled={playState}
                onChange={(e) => {
                  setMinutes(e.target.value);
                  setTimerKey(timerKey + 1);
                }}
              >
                {minutes.map((h, id) => (
                  <option key={id} value={h}>
                    {h}{' '}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ fontWeight: 'bold' }}>
              <select
                className="time-selector mx-2"
                required={true}
                value={secondsState}
                disabled={playState}
                onChange={(e) => {
                  setSeconds(e.target.value);
                  setTimerKey(timerKey + 1);
                }}
              >
                {seconds.map((h, id) => (
                  <option key={id} value={h}>
                    {h}{' '}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <ControlBar playState={playState} togglePlayer={togglePlayer} />
      </div>
    </>
  );
};

export default Player;
