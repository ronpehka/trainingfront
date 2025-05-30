import axios from "axios";

export default{
    sendGetDistrictRequest(){
       return  axios.get('/district')
    }

}