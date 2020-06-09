import axios from 'axios';
import qs from 'querystring';

interface HomeOpts {
    name?: string;
    lat?: number;
    lng?: number;
}

export class ApiClient {
    constructor(private base: string) {}

    public getAllHomes = async (): Promise<IHome[]> => {
        const response = await axios.get(`${this.base}/v1/homes`);

        return response.data;
    }

    public getHome = async (id: number): Promise<IHome> => {
        const response = await axios.get(`${this.base}/v1/homes/${id}`);

        return response.data;
    }

    public deleteHome = async (id: number): Promise<IHome> => {
        const response = await axios.delete(`${this.base}/v1/homes/${id}`);

        return response.data;
    }

    public createHome = async (opts: HomeOpts): Promise<IHome> => {
        const formData = {
            images: JSON.stringify([]),
            movedIn: '2020-01-01',
            movedOut: '2020-01-02',
            ...opts,
        };

        const response = await axios.post(
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
        const response = await axios.put(
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
}
