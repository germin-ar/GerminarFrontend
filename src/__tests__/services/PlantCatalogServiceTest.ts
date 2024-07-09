import {PlantCatalogService} from "@/services/PlantCatalogService";
import {PlantSuggestion} from "@/interfaces";


describe("PlantCatalogServiceTest", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('test get from plant catalog ok', async () => {

        const responseBody = {
            "id": 3,
            "scientific_name": "Thymus vulgaris",
            "description": "El tomillo (Thymus vulgaris) es una hierba aromática mediterránea de la familia de la menta. Sus hojas de color verde grisáceo son muy fragantes y liberan un embriagador aroma a limón y menta cuando se trituran. Es popular en la cocina y agrega un sabor delicado a salsas, sopas, verduras y platos de carne. El tomillo crece mejor en condiciones soleadas y secas y prefiere suelos bien drenados. Es una planta anual resistente y fácil de cultivar, tolerante a la sequía y de bajo mantenimiento. Si bien se cultiva más comúnmente en jardines de hierbas, el tomillo también resulta atractivo para los polinizadores, lo que lo convierte en una excelente opción para los paisajes.",
            "slug_scientific_name": null,
            "genus": "Tomillos",
            "family_name": "Lamiáceas",
            "max_size": 30.0,
            "fertilizer": "Aplicar fertilizantes minerales en forma de aerosol. Estiércol bien podrido y fertilización con nitrógeno",
            "watering_frecuency": "Necesita agua promedio, agua regularmente pero sin acumulación de agua",
            "pruning": "Recorte las hojas marchitas y enfermas una vez al mes.",
            "soil": "Arena, Franco, Calcáreo, Franco Arenoso, Neutro, Alcalino",
            "insecticide": "No suele requerir insecticidas específicos.",
            "tips": "El tomillo es resistente a la sequía una vez establecido. Se recomienda podar ligeramente después de la floración para mantener su forma y fomentar un nuevo crecimiento.",
            "sun_light": "sol pleno",
            "watering_care": "Necesita agua promedio, agua regularmente pero sin acumulación de agua",
            "common_name": "Tomillo",
            "lifespan": "Perenne",
            "propagation": "Principalmente por esquejes o división de matas.",
            "fruit": "No produce fruto comestible significativo.",
            "edible": "Sí",
            "growth_rate": "Moderado",
            "maintenance": "Bajo",
            "temperature_max": 35.0,
            "temperature_min": 5.0,
            "specie": "Tomillo",
            "toxic": "No",
            "repotting": "Necesita un excelente drenaje en macetas.",
            "dormancy": "Letargo invernal",
            "growth_season": "Primavera, Verano",
            "atmospheric_humidity": 50,
            "planting_time": "primavera",
            "harvest_time": "otoño",
            "plant_type": "Hierba, Arbusto",
            "width": 30.0,
            "url_image": "https://images.immediate.co.uk/production/volatile/sites/10/2018/08/fc028ed6-7629-4db5-8bf4-afe26ba6a0dc-7abaf36.jpg"
        }

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(responseBody),
                status: 200,
                ok: true
            } as Response)
        ) as jest.Mock;

        const service: PlantCatalogService = new PlantCatalogService("")

        const result: PlantSuggestion = await service.getPlantCatalog("thymus-vulgaris")

        expect(result.id).toBe(3)
    })


    it('test get from plant catalog with error response', async () => {
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.resolve({message: 'pasó algo'}),
                status: 401,
                ok: false
            } as Response)
        ) as jest.Mock;

        const service: PlantCatalogService = new PlantCatalogService("")

        await expect(service.getPlantCatalog("thymus-vulgaris")).rejects.toBeDefined()
    })
})
