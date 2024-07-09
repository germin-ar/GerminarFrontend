import {PlantEdit, PlantRequestBody, PlantResponse, PlantSuggestion} from "@/interfaces";
import { PlantService } from "@/services/PlantService";


describe("PlantServiceTest", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('test get from plant ok', async () => {

        const responseBody: PlantEdit = {
            id: 3,
            alias: "Tomate Cherry",
            creation_date: "2024-06-01",
            modification_date: "2024-07-09",
            planting_date: "2024-05-15",
            description: "Planta de tomate cherry que crece en la huerta urbana.",
            favorite: true,
            height: 30,
            sun_exposure: "Full Sun",
            notes: "Requiere riego diario durante el verano.",
            name_garden: "Huerta Central",
            expo: "Norte",
            id_garden: 101,
            plant_catalog_family_name: "Solanaceae",
            plant_catalog_genus: "Solanum",
            plant_catalog_watering_frecuency: "Diaria",
            plant_catalog_description: "El tomate cherry es una planta de la familia de las solanáceas, conocida por sus pequeños y dulces frutos.",
            plant_catalog_common_name: "Tomate Cherry",
            plant_catalog_scientific_name: "Solanum lycopersicum var. cerasiforme",
            images: [],
            plant_catalog_sun_exposure: "Full Sun",
            history: []
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: PlantService = new PlantService("")

        const result: PlantEdit = await service.getPlant("3")

        expect(result.id).toBe(3)
    })

    it('test get from plant with error response', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: PlantService = new PlantService("")

        await expect(service.getPlant("3")).rejects.toBeDefined()
    })

    it('test save from plant ok', async () => {

        const responseBody: PlantResponse = {
            id: 3
        }

        const requestBody: PlantRequestBody = {
            alias: "plant",
            height: 2,
            planting_date: new Date(),
            id_garden: 1,
            is_favorite: true,
            image_url: "",
            id_plant_catalog: 2,
            notes: ""
        }        

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: PlantService = new PlantService("")

        const result: PlantResponse = await service.savePlant(requestBody)

        expect(result.id).toBe(3)
    })

    it('test save from plant with error response', async () => {
        
        const requestBody: PlantRequestBody = {
            alias: "plant",
            height: 2,
            planting_date: new Date(),
            id_garden: 1,
            is_favorite: true,
            image_url: "",
            id_plant_catalog: 2,
            notes: ""
        } 
       
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: PlantService = new PlantService("")

        await expect(service.savePlant(requestBody)).rejects.toBeDefined()
    })

})
