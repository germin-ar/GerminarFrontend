import { Image, PlantHealth, PlantRequestBody, Photo, FormValuesEdit, PlantResponse, PlantEdit } from "@/interfaces/index";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export class PlantService {



    private apiHost: string;
    router = useRouter();
    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // createPlant
    async savePlant(body: PlantRequestBody): Promise<PlantResponse> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(body)
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
            console.error('Error saving plant:', error);
            throw error;
        }
    }

    // getPlant
    async getPlant(id: number | string): Promise<PlantEdit> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}`, {
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
            console.error('Error fetching plant:', error);
            throw error;
        }
    }

    // update
    async updatePlant(id: number, body: FormValuesEdit) {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(body)
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
            console.error('Error updating plant:', error);
            throw error;
        }
    }

    // deletePlant
    async deletePlant(id: number | any): Promise<void> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
            });

            if (!response.ok) {
                const error = await response.json();
                if (response.status === 401) {
                    throw { code: 'NotAuthorizedException', message: error.message };
                } else {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
            }

        } catch (error) {
            console.error('Error deleting plant:', error);
            throw error;
        }
    }

    // uploadPhoto
    async uploadPhoto(id: number, image: FormData): Promise<Photo[]> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}/photo`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: image
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
            console.error('Error uploading photo:', error);
            throw error;
        }
    }

    // getHealthPlantStatus
    async getHealthPlantStatus(id: number): Promise<PlantHealth[]> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/plants/${id}/health-status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
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
            console.error('Error fetching health plant status:', error);
            throw error;
        }
    }
}