import axios from 'axios';

export class HomesApi {
    private base: string;

    constructor(base: string) {
        this.base = base;
    }

    public getAllHomes = async (): Promise<IHome[]> => {
        const response = await axios.get(`${this.base}/v1/homes`);

        return response.data;
    }
}
