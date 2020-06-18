class Auth {
    private authKey: string = 'homes-authentication-token';

    public isAuthenticated = (): boolean => {
        const token = window.localStorage.getItem(this.authKey);

        return !!token;
    }

    public setAuthToken = (token: string | null): void => {
        window.localStorage.setItem(this.authKey, String(token));
    }

    public getAuthToken = (): string => {
        const token = window.localStorage.getItem(this.authKey);

        if (!token || token === 'null') {
            throw new Error('no auth token found');
        }

        return token;
    }
}

export const Authentication = new Auth();
