export interface Garden {
    id: number | null;
    name: string | null;
    plants: Plant[];
}

export interface Plant {
    id: number;
    alias: string;
    creation_date: string;
    modification_date: string;
    is_favorite: boolean;
    photos: Photo[];
}

export interface Photo {
    url: string;
}

export interface GardenRequestBody {
    user_id: number;
    name: string;
    is_active: boolean;
}

export class GardenService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // getGardensByUser
    async getGardens(): Promise<Garden[]> {
        try {
            const userId = 1;
            const response = await fetch(`${this.apiHost}/api/v1/gardens`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': userId.toString()
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching gardens:', error);
            throw error;
        }
    }

    // saveGarden
    async saveGarden(body: GardenRequestBody): Promise<Garden> {
        try {
            const response = await fetch(`${this.apiHost}/api/v1/gardens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error creating garden:', error);
            throw error;
        }
    }

    // getGarden
    async getGarden(garden: Garden): Promise<Garden> {
        try {
            const userId = 1;
            const response = await fetch(`${this.apiHost}/api/v1/gardens`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': userId.toString()
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
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
            const userId = 1
            const response = await fetch(`${this.apiHost}/api/v1/gardens/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': userId.toString()
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting garden:', error);
            throw error;
        }
    }
}
