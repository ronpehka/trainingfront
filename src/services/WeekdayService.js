import axios from "axios";

export default {
    sendGetWeekdayRequest(){
        return axios.get('/weekdays')
    }
}