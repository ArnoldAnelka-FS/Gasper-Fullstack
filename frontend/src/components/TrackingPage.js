import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NavigationBar from './NavigationBar';
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const Tracking = () => {
  const initialCenter = {
    lat: 28.5956, // latitude for Winter Park, FL
    lng: -81.3555, // longitude for Winter Park, FL
  };

  const [currentPosition, setCurrentPosition] = useState(initialCenter);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAI0p9UY-Oy7vocKpIi4zboYXiyF7G3wc0",
  });

  // Simulate moving vehicle
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate random coordinates within Winter Park area
      const newLat = initialCenter.lat + (Math.random() - 0.5) * 0.01;
      const newLng = initialCenter.lng + (Math.random() - 0.5) * 0.01;
      setCurrentPosition({ lat: newLat, lng: newLng });
    }, 3000); // Update position every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <NavigationBar/>
      <Container fluid>
        <br></br>
        <h1>Real time tracking!</h1>
        <br></br>
        {isLoaded && (
          <GoogleMap
            center={initialCenter}
            zoom={12}
            mapContainerStyle={{ width: "75%", height: "90vh" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={currentPosition} />
          </GoogleMap>
        )}
        <br>
        </br>
      </Container>
    </div>
  );
};

export default Tracking;