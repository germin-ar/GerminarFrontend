import { Photo } from "@/interfaces/index";

export class ImageService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // saveImage
    async saveImage(body: FormData): Promise<Photo> { 
        try {
            const response = await fetch(`${this.apiHost}/api/v1/images`, {
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
            //console.error('Error saving image:', error);
            throw error;
        }
    }

}