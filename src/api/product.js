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
        const url = `http://api-web-shop.dev.local/list-product?id_category=`+data.id_category;
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
        const url = `http://api-web-shop.dev.local/detail-product?id_product=`+data.id_product;
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