import axios from 'axios';
import {store} from './store';
import Cookies from 'js-cookie';
import FormException from "./exceptions/formException";
import GenericException from "./exceptions/genericException";

const API_URL = process.env.API_URL ? process.env.API_URL : "http://localhost:8000/api/";

class API {
    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
        });

        this.axios.interceptors.request.use((config) => {
            const token = Cookies.get("authorization");

            if (token) {
                config.headers.Authorization = "Bearer " + token;
            }

            return config;
        });
    }

    async sendRequest(url, method, data = {}) {
        try {
            const response = await this.axios({
                method,
                url,
                data,
            });

            return response.data.result; 

        } catch (e) {
            console.log(e);
            if (e.response) {
                if (e.response.data.error.hasOwnProperty("fields")) {
                    throw new FormException("Form Validation Error", e.response.data.error.fields);
                }
                
                throw new GenericException(e.message, e.response.data.error);
            }
            throw new Error(e.message);
        }
    }

    async get(url) {
        return await this.sendRequest(url, 'get');
    }

    async post(url, data) {
        return await this.sendRequest(url, 'post', data);
    }

    async put(url, data) {
        return await this.sendRequest(url, 'put', data);
    }

    async delete(url) {
        return await this.sendRequest(url,'delete');
    }
}

export default API;
