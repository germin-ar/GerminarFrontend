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

export class GardenService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    async getGardens(): Promise<Garden[]> {
        try {
            const userId = 1;
            const response = await fetch(`${this.apiHost}/api/v1/gardens`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'id-user': userId.toString(),
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

    // Métodos para POST, PUT, DELETE
}
