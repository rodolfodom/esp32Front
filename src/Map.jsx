import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { CircularProgress } from "@mui/material";

const containerStyle = {
    width: '400px',
    height: '400px'
};

export default function Map({ location }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB1D1442x1XduEBxs8Y9dbtctIFvlfSYWk"
    })

    if(location.lat === 0 & location.lng === 0 || !isLoaded) return <CircularProgress />  

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={18}
        >
            <MarkerF position={location} />
            <></>
        </GoogleMap>
    ) : <></>


}

