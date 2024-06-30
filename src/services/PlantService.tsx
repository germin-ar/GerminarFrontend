import { Plant, Image, PlantHealth, PlantRequestBody, Photo } from "@/interfaces/index";

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
            console.error('Error saving plant:', error);
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
            console.error('Error uploading photo:', error);
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
            console.error('Error fetching health plant status:', error);
            throw error;
        }
    }
}