import axios from "axios";

export default {

    sendGetLocationsRequest() {
        return axios.get('/locations');
    },

    sendGetLocationRequest(locationId){
        return axios.get('/location')
    },
    sendPostLocationRequest(newLocation){
    return axios.post('/location', newLocation)
       }
}