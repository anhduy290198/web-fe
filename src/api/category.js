import axios from "axios";

export default {
    listCategory: (data) => {
        const url = 'http://api-web-shop.dev.local/list-category';
        return new Promise((resolve, reject) => {
            axios.get(url, {
                headers: {
                    // 'Access-Control-Allow-Origin': '*',
                  }
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((response) => {
                    reject(response);
                });
        });
    },
}