import {axios} from "../helpers";

class ProductService {

    getProducts = () => {
        return axios.get(`/products`)
            .then(res => {
                return res.data;
            })
    };

    addProduct = (product) => {
        let params = new  URLSearchParams();
        params.append('name', product.name);
        params.append('code', product.code);
        params.append('nettoPrice', product.nettoPrice);
        params.append('VAT', product.VAT);
        params.append('bruttoPrice', product.bruttoPrice);
        params.append('category', product.category);
        params.append('options', product.options);
        params.append('rating', product.rating);

        console.log(product);
        axios.post('/products', params)
            .then(function (response) {
            console.log(response.data);
        })
    }
}

export default new ProductService();