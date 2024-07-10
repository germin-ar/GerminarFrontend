import {PlantSuggestion} from "@/interfaces";
import { CandidatesService } from "@/services/CandidatesService";


describe("CandidatesServiceTest", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('test get from candidates ok', async () => {

        const responseBody = {
            "id": "1",
            "scientific_name": "Thymus vulgaris"
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: CandidatesService = new CandidatesService("")

        const result: PlantSuggestion = await service.getCandidates("thymus-vulgaris")

        expect(result.id).toBe("1")
        expect(result.scientific_name).toBe("Thymus vulgaris")
    })

    it('test get from candidates with error response', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: CandidatesService = new CandidatesService("")

        await expect(service.getCandidates("thymus-vulgaris")).rejects.toBeDefined()
    })
})
