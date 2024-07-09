import { PlantSuggestion } from "@/interfaces/index";

export class PlantCatalogService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // getPlantCatalog
    async getPlantCatalog(scientificName: string): Promise<PlantSuggestion> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plant-catalog/${scientificName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            if (!response.ok) {
                const error = await response.json();
                if (response.status === 401) {
                    throw { code: 'NotAuthorizedException', message: error.message };
                } else {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching plant catalog:', error);
            throw error;
        }
    }

}