import { Space } from "@/interfaces";

export class SpacePlantingService {
    

    
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // getSpacePlanting
    async getSpacePlanting(body: FormData): Promise<Space>{ 
        try {
            const response = await fetch(`${this.apiHost}/api/v1/space-planting`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: body
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
            console.error('Error fetching space planting:', error);
            throw error;
        }
    }
}