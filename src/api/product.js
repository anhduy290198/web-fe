import axios from "axios";

export default {
    CreateProduct: (data) => {
        const url = 'http://api-web-shop.dev.local/create';
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
    getListProduct: (data) => {
        let params = new URLSearchParams(data);
        const url = `http://api-web-shop.dev.local/list-product?`+params;
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((response) => {
                    reject(response);
                });
        });
    },
    getDetailProduct: (data) => {
        let params = new URLSearchParams(data);
        const url = `http://api-web-shop.dev.local/detail-product?`+params;
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((response) => {
                    reject(response);
                });
        });
    },
    DeleteProduct: (data) => {
        const url = 'http://api-web-shop.dev.local/delete-product';
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
    UpdateProduct: (data) => {
        const url = 'http://api-web-shop.dev.local/update-product';
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