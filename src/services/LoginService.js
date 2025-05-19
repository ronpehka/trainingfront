import axios from "axios";

export default {
    sendLoginRequest(email, password) {
        return axios.get('/login', {
                params: {
                    username: email,
                    password: password
                }
            }
        )
    }
}