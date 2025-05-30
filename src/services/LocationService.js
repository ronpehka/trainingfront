import axios from "axios";

export default {

    sendGetLocationsRequest() {
        return axios.get('/locations');
    },

    sendGetLocationRequest(locationnId){
        return axios.get('/location')
    }
}