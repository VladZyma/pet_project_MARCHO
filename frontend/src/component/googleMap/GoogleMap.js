import {useMemo} from "react";
import {GoogleMap as Map, useLoadScript, Marker} from "@react-google-maps/api";

import './googleMap.scss';

const GoogleMap = () => {

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const center = useMemo(() => ({lat: 40.680848, lng: -74.038733}), []);

  return (
      <>
        {
          isLoaded
            ?
            <Map zoom={10} center={center} mapContainerClassName={'google-map'}>
              <Marker position={{lat: 40.680848, lng: -74.038733}}/>
            </Map>
            :
            <div>
              Loading....
            </div>
        }
      </>
  );
};

export {GoogleMap}
