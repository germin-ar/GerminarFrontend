import { Space } from "@/interfaces";

export class SpacePlantingService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // getSpacePlanting
    async getSpacePlanting(body: FormData): Promise<Space>{ 
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/space-planting`, {
                method: 'POST',
                headers: {
                    'id-user': idUser.toString()
                },
                body: body
            });

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching space planting:', error);
            throw error;
        }
    }
}