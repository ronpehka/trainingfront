import axios from "axios";

export default {

    sendGetLocationsRequest() {
        return axios.get('/locations');
    }
}