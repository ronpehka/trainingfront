import axios from "axios";

export default {
    sendPostNewCustomerRequest(customerProfile) {
        return axios.post('/customer-registration', customerProfile);
    },
}