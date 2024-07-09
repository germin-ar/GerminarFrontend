import { Garden } from "@/interfaces/index";
import {useRouter} from "next/navigation";

export class GardenService {


    router = useRouter()

    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;

    }

    // getGardensByUser
    async getGardens(): Promise<Garden[]> {
        try {

            const response = await fetch(`${this.apiHost}/api/v1/gardens`, {
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
            console.error('Error fetching gardens:', error);
            throw error;
        }
    }
    //todo ver id usuario
    // saveGarden
    async saveGarden(gardenName: string) {
        const gardenData = {
            name: gardenName
        };
        try {
            const response = await fetch(`${this.apiHost}/api/v1/gardens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(gardenData)
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
            console.error('Error creating garden:', error);
            throw error;
        }
    }

    // getGarden
    async getGarden(id: number): Promise<Garden> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/gardens/${id}`, {
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
            console.error('Error fetching garden details:', error);
            throw error;
        }
    }

    // deleteGarden
    async deleteGarden(id: number): Promise<void> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/gardens/${id}`, {
                method: 'DELETE',
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
            }
        } catch (error) {
            console.error('Error deleting garden:', error);
            throw error;
        }
    }
}
