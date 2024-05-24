import axios from "axios";

export default {
    login: (data) => {
        const url = 'http://api-web-shop.dev.local/login';
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((response) => {
                    reject(response);
                });
        });
    },
}