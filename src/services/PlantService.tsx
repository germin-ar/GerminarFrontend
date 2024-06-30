export interface PlantRequestBody {
    alias: string
    height: number
    planting_date: string
    id_garden: number
    is_favorite: boolean
    image_url: string
    id_plant_catalog: number
    notes: string
}

export interface Plant {
    id: number
    alias: string
    creation_date: string
    modification_date: string
    planting_date: string
    description: string
    favorite: boolean
    height: number
    sun_exposure: string
    notes: string
    name_garden: string
    expo: string
    id_garden: number
    plant_catalog_family_name: string
    plant_catalog_genus: string
    plant_catalog_watering_frecuency: string
    plant_catalog_description: string
    plant_catalog_common_name: string
    plant_catalog_scientific_name: string
    images: Image[]
    plant_catalog_sun_exposure: string
    history: History[]
}

export interface Image {
    url: string
}

export interface History {
    id_plant: number
    notes: string
    height: number
    alias: string
    url_image: string
    modified_at: string
    id_diseases: number
}

export interface Photo {
    id: string
    file_path: string
    is_public: boolean
}

export interface PlantHealth {
    is_healthy: boolean
    candidates: Candidate[]
}

export interface Candidate {
    name: string
    scientific_name_disease: string
    type: string
    common_name: string
    kingdom_taxonomy: string
    entity_id: string
    class_taxonomy: string
    genus_taxonomy: string
    order_taxonomy: string
    family_taxonomy: string
    phylum_taxonomy: string
    wiki_urls: string
}


export class PlantService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // createPlant
    async savePlant(body: PlantRequestBody) {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/plants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': idUser.toString()
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error creating plant:', error);
            throw error;
        }
    }

    // getPlant
    async getPlant(id: number): Promise<Plant[]> {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': idUser.toString()
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching plant:', error);
            throw error;
        }
    }

    // update
    async updatePlant(id: number, body: PlantRequestBody) {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': idUser.toString()
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error updating plant:', error);
            throw error;
        }
    }

    // deletePlant
    async deletePlant(id: number | any): Promise<void> {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}`, {
                method: 'DELETE',
                headers: {
                    'id-user': idUser.toString()
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting plant:', error);
            throw error;
        }
    }

    // uploadPhoto
    async uploadPhoto(id: number, image: Image): Promise<Photo[]> {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}/photo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': idUser.toString()
                },
                body: JSON.stringify(image)
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error deleting plant:', error);
            throw error;
        }
    }

    // getHealthPlantStatus
    async getHealthPlantStatus(id: number): Promise<PlantHealth[]> {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}/health-status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': idUser.toString()
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error deleting plant:', error);
            throw error;
        }
    }
}