import { action, computed, observable } from 'mobx';
import { Auth0Client, PopupLoginOptions } from '@auth0/auth0-spa-js';
import { Auth0User } from '../../../views/scenes/login/auth0';
import { ApiClient } from '../../api';

export class HSAuthStore {
    constructor(private apiClient: ApiClient) {}

    private auth0: Auth0Client | null = null;

    @observable
    public popupOpen: boolean = false;

    @observable
    public loading: boolean = true;

    @observable
    public user: Auth0User | null = null;

    @observable
    public isAuthenticated: boolean = false;

    @computed
    get getAuth0(): Auth0Client {
        return this.auth0 as Auth0Client;
    }

    @action
    setLoading(loading: boolean) {
        this.loading = loading;
    }

    @action
    initialize(auth0: Auth0Client) {
        this.auth0 = auth0;
        this.apiClient.setAuth0Client(this.auth0);
    }

    @action
    async loginWithPopup(params?: PopupLoginOptions): Promise<void> {
        this.popupOpen = true;

        try {
            await this.auth0?.loginWithPopup(params);
        } catch (error) {
            console.error(error);
        } finally {
            this.popupOpen = false;
        }

        const user = await this.auth0?.getUser();

        this.isAuthenticated = !!user;
        this.user = user || null;
    }

    @action
    async logout(): Promise<void> {
        this.auth0?.logout();
    }
}
