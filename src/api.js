import axios from 'axios';
import {store} from './store';
import Cookies from 'js-cookie';
import FormException from "./exceptions/formException";

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

            if (response.data.success) {
                return response.data.result ? response.data.result : null;
            } else {
                if (response.data.error.fields) {
                    return new FormException("Form Validation Error", response.data.error.fields);
                }
                throw new Error(response.data.error);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data.error.fields) {
                    throw new FormException("Form Validation Error", e.response.data.error.fields);
                }
                throw new Error(e.response.data.error);
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
