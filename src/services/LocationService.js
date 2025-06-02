import axios from "axios";

export default {

    sendGetLocationsRequest() {
        return axios.get('/locations');
    },

    sendGetLocationRequest(locationId) {
        return axios.get('/location', {
            params: {
                locationId: locationId
            }
        });
    },
    sendPostLocationRequest(newLocation) {
        return axios.post('/location', newLocation)
    },
    sendLocationPutRequest(locationId, location) {
        return axios.put('/location', location, {
                params: {
                    locationId: locationId,

                }
            }
        )
    },

}