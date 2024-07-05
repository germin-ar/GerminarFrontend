export class CandidatesService {
    private apiHost: string;

    constructor(apiHost: string) {
        this.apiHost = apiHost;
    }

    // getCandidates
    async getCandidates(id: string) {
        try {
            const idUser = 1;
            const response = await fetch(`${this.apiHost}/api/v1/candidates/${id}`, {
                method: 'GET'                
            });
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            } else {
                return await response.json();
            }
        } catch (error) {
            console.error('Error fetching candidates:', error);
            throw error;
        }
    }

}