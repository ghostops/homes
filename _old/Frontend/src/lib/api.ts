import axios from 'axios';
import qs from 'querystring';

interface NewHomeOpts {
    name: string;
    lat: number;
    lng: number;
}

export class HomesApi {
    private base: string;

    constructor(base: string) {
        this.base = base;
    }

    public getAllHomes = async (): Promise<IHome[]> => {
        const response = await axios.get(`${this.base}/v1/homes`);

        return response.data;
    }

    public addHome = async (opts: NewHomeOpts): Promise<IHome> => {
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
}
