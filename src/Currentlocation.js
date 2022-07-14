import currentlacation from "./currentlocation.css";
import { currentlo, geolocate } from "./utility";

const { kakao } = window;

function Currentlacation() {
  const onClick = () => {
    geolocate();
  };

  return (
    <button className="currentlocation" type="" onClick={onClick}>
      <span className="material-symbols-outlined">share_location</span>
    </button>
  );
}

export default Currentlacation;
