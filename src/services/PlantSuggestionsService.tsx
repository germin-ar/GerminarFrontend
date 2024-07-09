import { PlantSuggestion } from "@/interfaces/index";

export class PlantSuggestionService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // getPlantsSuggestion
    async getPlantsSuggestion(latitude: string | null, longitude: string | null, sunExposure: string | null, squareCentimeters: string | null): Promise<PlantSuggestion[]> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plant-suggestion?latitude=${latitude}&longitud=${longitude}&sunExposure=${sunExposure}&squareCentimeters=${squareCentimeters}`, {
                method: 'GET',
                headers: {
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
            console.error('Error fetching plant suggestions details:', error);
            throw error;
        }
    }

    // getPLantsSuggestionPlace
    async getPLantsSuggestionPlace(luz: string | null, temporada: string | null, espacio: string | null): Promise<PlantSuggestion[]> {
        const response = await fetch(`${this.apiHost}/api/v1/plant-suggestion/espacio?luz=${luz}&temporada=${temporada}&espacio=${espacio}`, {
            method: 'GET',
            headers: {
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
    } catch(error: any) {
        console.error('Error fetching plant suggestions place:', error);
        throw error;
    }
}