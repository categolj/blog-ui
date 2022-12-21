export class TokenHolder {
    getToken() {
        if (typeof window === 'undefined') {
            return null;
        }
        return window.localStorage.getItem('token');
    }

    setToken(token) {
        window.localStorage.setItem('token', token);
    }

    clear() {
        window.localStorage.removeItem('token');
    }
}

export default new TokenHolder();