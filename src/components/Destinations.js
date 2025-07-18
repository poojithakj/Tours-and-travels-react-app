import { useNavigate } from "react-router-dom";

const Destinations = () => {
  const navigate = useNavigate();

  const handleBookNow = (destination) => {
    localStorage.setItem("selectedDestination", JSON.stringify(destination));
    navigate("/payment"); // Navigate to payment page
  };

  return (
    <div>
      {["Bangalore", "Chennai", "Bangkok", "Australia", "Italy"].map((place) => (
        <button key={place} onClick={() => handleBookNow(place)}>
          {place}
        </button>
      ))}
    </div>
  );
};

export default Destinations; 