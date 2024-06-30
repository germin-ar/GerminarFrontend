export interface PlantSuggestion {
    id: number;
    scientific_name: string;
    description: string;
    slug_scientific_name: string;
    genus: string;
    family_name: string;
    max_size: number;
    fertilizer: string;
    watering_frecuency: string;
    pruning: string;
    soil: string;
    insecticide: string;
    tips: string;
    sun_light: string;
    watering_care: string;
    common_name: string;
    lifespan: string;
    propagation: string;
    fruit: string;
    edible: string;
    growth_rate: string;
    maintenance: string;
    temperature_max: number;
    temperature_min: number;
    specie: string;
    toxic: string;
    repotting: string;
    dormancy: string;
    growth_season: string;
    atmospheric_humidity: number;
    planting_time: string;
    harvest_time: string;
    plant_type: string;
    width: number;
    url_image: string;
}

export class PlantCatalogService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // getPlantCatalog
    async getPlantCatalog(scientificName: string) {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/plant-catalog/${scientificName}`, {
                method: 'GET'                
            });
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching plant catalog:', error);
            throw error;
        }
    }

}