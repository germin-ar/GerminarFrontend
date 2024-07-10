import {AuthLogin, AuthRegister} from "@/interfaces";
import { AuthenticationService } from "@/services/AuthenticationService";
import { useRouter } from "next/navigation";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe("AuthenticationTest", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('test signup from authentication ok', async () => {
        const requestBody = {
            username: "nombre",
            email: "mail@mail.com",
            password: "passw"
        }

        const responseBody = {
            email: "mail@mail.com",
            isConfirmed: true,
            name: "nombre"
           }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: AuthenticationService = new AuthenticationService("")

        const result: AuthRegister = await service.signUp(requestBody)

        expect(result.email).toBe("mail@mail.com")
    })

    it('test signup from authentication with error response', async () => {
        const requestBody = {
            username: "nombre",
            email: "mail@mail.com",
            password: "passw"
        }
        
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: AuthenticationService = new AuthenticationService("")

        await expect(service.signUp(requestBody)).rejects.toBeDefined()
    })

    it('test logout from authentication ok', async () => {
        const requestBody = "abc123";

        const fetchJestFn = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        global.fetch = fetchJestFn;

        const service: AuthenticationService = new AuthenticationService("")

        const result = await service.logout(requestBody)
        
        expect(result).toBeUndefined();
        expect(fetchJestFn).toHaveBeenCalledTimes(1);
    })

    it('test logout from authentication with error response', async () => {
        const requestBody = "abc123";
        
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: AuthenticationService = new AuthenticationService("")

        await expect(service.logout(requestBody)).rejects.toBeDefined()
    })

    it('test login from authentication ok', async () => {
        const requestBody = {
            email: "mail@mail.com",
            password: "passw"
        }

        const responseBody = {
            id_token: "1",
            access_token: "123abc",
            refresh_token: "123abc"
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: AuthenticationService = new AuthenticationService("")

        const result: AuthLogin = await service.login(requestBody)

        expect(result.access_token).toBe("123abc")
    })

    it('test login from authentication with error response', async () => {
        const requestBody = {
            email: "mail@mail.com",
            password: "passw"
        }
        
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: AuthenticationService = new AuthenticationService("")

        await expect(service.login(requestBody)).rejects.toBeDefined()
    })

    it('test confirm signup from authentication ok', async () => {
        const requestBody = {
            email: "mail@mail.com",
            confirmation_code: "code1234"
        }

        const responseBody = {
            email: "mail@mail.com",
            isConfirmed: true,
            name: "nombre"
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: AuthenticationService = new AuthenticationService("")

        const result: AuthRegister = await service.confirmSignUp(requestBody)

        expect(result.isConfirmed).toBe(true)
    })

    it('test confirm signup from authentication with error response', async () => {
        const requestBody = {
            email: "mail@mail.com",
            confirmation_code: "code1234"
        }
        
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: AuthenticationService = new AuthenticationService("")

        await expect(service.confirmSignUp(requestBody)).rejects.toBeDefined()
    })

})
