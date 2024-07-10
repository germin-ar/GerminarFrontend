import { SpacePlantingService } from "@/services/SpacePlantingService";
import { Space } from "@/interfaces";



describe("SpacePlantingServiceTest", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('test get from Space ok', async () => {

        const responseBody: Space = {
            'space_name': "cuarto"
        }
        const photo: FormData = new FormData();

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: SpacePlantingService = new SpacePlantingService("")

        const result: Space = await service.getSpacePlanting(photo);

        expect(result.space_name).toEqual("cuarto");
    })


    it('test get from space with error response', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;
        const photo: FormData = new FormData();

        const service: SpacePlantingService = new SpacePlantingService("")

        await expect(service.getSpacePlanting(photo)).rejects.toBeDefined()
    })
})
