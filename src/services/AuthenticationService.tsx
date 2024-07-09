import {AuthRegister, AuthRequestBody, AuthLogin, ConfirmBodyRequest, LoginRequestBody} from "@/interfaces/index";

export class AuthenticationService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // signUp
    async signUp(body: AuthRequestBody): Promise<AuthRegister> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }

     // logout
     async logout(body: string) {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/auth/logout`, {
                method: 'POST',
                body: body
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    // login
    async login(body: LoginRequestBody): Promise<AuthLogin> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error loggin in:', error);
            throw error;
        }
    }

    // confirmSignUp
    async confirmSignUp(body: ConfirmBodyRequest): Promise<AuthRegister> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/auth/confirm-signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error confirming sign up:', error);
            throw error;
        }
    }
}