import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import getCenter from "geolib/es/getCenter";

function Map(searchResults) {
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "100%",
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 11,
    });
    
    return( 
        <ReactMapGL 
            mapStyle="mapbox://styles/momnaazmat/ckv3vd8hx538m14o3bhi1138u" 
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport) }
        ></ReactMapGL>
    );
}

export default Map;
