import {GardenService} from "@/services/GardenService";
import {Garden} from "@/interfaces";
import {id} from "postcss-selector-parser";

describe("GardenServiceTest", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('test get from garde ok', async () => {
        const responseBody = [
            {
                "id": 1,
                "name": "nuevoj",
                "plants": [
                    {
                        "id": 2,
                        "alias": "nueva",
                        "creation_date": "2024-07-09T11:08:04Z",
                        "modification_date": "2024-07-09T11:08:04Z",
                        "photos": [
                            {
                                "url": "https://iili.io/dfGDxVI.jpg"
                            }
                        ],
                        "is_favorite": null
                    }
                ]
            },
            {
                "id": 2,
                "name": "222",
                "plants": []
            },
            {
                "id": null,
                "name": null,
                "plants": [
                    {
                        "id": 1,
                        "alias": "123",
                        "creation_date": "2024-07-09T11:07:03Z",
                        "modification_date": "2024-07-09T11:07:03Z",
                        "photos": [
                            {
                                "url": "https://iili.io/dfGgKfR.jpg"
                            }
                        ],
                        "is_favorite": null
                    }
                ]
            }
        ]

        global.fetch = jest.fn(()=>
        Promise.resolve({
            json: () => Promise.resolve(responseBody),
            status: 200,
            ok: true
        } as Response)
        ) as jest.Mock;

        const service: GardenService = new GardenService("")
        const result: Garden[] = await service.getGardens()

        expect(result.length).toBe(3);

    });

    it('test get from garden with error response', async () => {
        global.fetch = jest.fn(() =>
        Promise.reject({
            json: () => Promise.resolve({message: 'error al obtener jardines'}),
            status: 401,
            ok: false
        } as Response)) as jest.Mock;

        const service: GardenService = new GardenService("")

        await expect(service.getGardens()).rejects.toBeDefined();
    });


    it('test save garden ', async () => {

        const responseBody = {
            "name": "Mariano"
        }

        const fetchJestFn = jest.fn( () =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)) as jest.Mock;

        global.fetch = fetchJestFn

        const service: GardenService = new GardenService("")

        const result = await service.saveGarden("Mariano");
        expect(result).toBeDefined();
        expect(fetchJestFn).toHaveBeenCalledTimes(1);
    });

    it('test save garden error response ', async () => {

        const requestBody = "Mariano"


        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve("error"),
                status: 500,
                ok: false
            } as Response)) as jest.Mock

        const service: GardenService = new GardenService("")

        await expect(service.saveGarden(requestBody)).rejects.toBeDefined();
    });

    it('test delete garden ok ', async () => {
        const idGarden = 1
        const fetchJestFn = jest.fn( () =>
            Promise.resolve({
                json: () => Promise.resolve(idGarden),
                status: 200,
                ok: true
            } as Response)) as jest.Mock;


        global.fetch = fetchJestFn;
        const service: GardenService = new GardenService("")
        const result = await service.deleteGarden(1);

        expect(result).toBeUndefined();
        expect(fetchJestFn).toHaveBeenCalledTimes(1);
    });


    it('test delete garden error ', async () => {
        const idGarden = 1
        global.fetch = jest.fn( () =>
            Promise.resolve({
                json: () => Promise.resolve(idGarden),
                status: 500,
                ok: false
            } as Response)) as jest.Mock;


        const service: GardenService = new GardenService("")


        await expect(service.deleteGarden(idGarden)).rejects.toBeDefined()
    });

})