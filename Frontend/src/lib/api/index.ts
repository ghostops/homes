import axios from 'axios';
import qs from 'querystring';
import { HSAuthStore } from '../store/auth';
import { Auth0Client } from '@auth0/auth0-spa-js';

interface HomeOpts {
    name?: string;
    lat?: number;
    lng?: number;
    movedIn?: string;
    movedOut?: string;
}

export class ApiClient {
    constructor(private base: string) {}

    private auth0Client: Auth0Client | null = null;
    private client = axios.create();

    public setAuth0Client = (client: Auth0Client) => {
        this.auth0Client = client;
    }

    public getAllHomes = async (): Promise<IHome[]> => {
        const response = await this.client.get(`${this.base}/v1/homes`);

        return response.data;
    }

    public getHome = async (id: number): Promise<IHome> => {
        const response = await this.client.get(`${this.base}/v1/homes/${id}`);

        return response.data;
    }

    public deleteHome = async (id: number): Promise<IHome> => {
        const response = await this.client.delete(`${this.base}/v1/homes/${id}`);

        return response.data;
    }

    public createHome = async (opts: HomeOpts): Promise<IHome> => {
        const formData = {
            images: JSON.stringify([]),
            ...opts,
        };

        const response = await this.client.post(
            `${this.base}/v1/homes`,
            qs.stringify(formData),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        return response.data;
    }

    public updateHome = async (id: number, opts: Partial<HomeOpts>): Promise<IHome> => {
        const response = await this.client.put(
            `${this.base}/v1/homes/${id}`,
            qs.stringify(opts),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        );

        return response.data;
    }

    public uploadImage = async (id: number, image: Blob): Promise<string> => {
        const formData = new FormData();

        formData.append('file', image);

        const response = await this.client.post(
            `${this.base}/v1/images/home/${id}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            },
        );

        return response.data.Path;
    }
}
