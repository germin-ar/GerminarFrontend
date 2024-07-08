import EstadoPage from "@/app/estado/[id]/page";
import Formulario from "@/components/formularioEditarRegistro/formulario";
import { PlantService } from "@/services/PlantService";
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from "next/navigation";

jest.mock("@/services/PlantService");

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('GetPlant', () => {
    const mockPlant = { id: 1, alias: 'Test Plant', images: [{ url: 'url' }], planting_date: "2024-07-05T12:00:00Z", modification_date: "2024-07-05T12:00:00Z" };
    const mockPlant2 = { id: "1", alias: 'Test Plant 2', images: [{ url: 'url' }], planting_date: "2024-07-05T12:00:00Z", modification_date: "2024-07-05T12:00:00Z" };

    let mockGetPlant: jest.Mock;
    let mockGetHealthPlantStatus: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockGetPlant = jest.fn();
        mockGetHealthPlantStatus = jest.fn();
        (PlantService as jest.Mock).mockImplementation(() => {
            return {
                getPlant: mockGetPlant,
                getHealthPlantStatus: mockGetHealthPlantStatus
            };
        });

        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            pathname: '/jardin',
        });
    });

    it('should render plant correctly in EstadoPage', async () => {
        mockGetPlant.mockResolvedValueOnce(mockPlant);

        render(<EstadoPage params={{ id: mockPlant.id }} />);

        await waitFor(() => {
            expect(screen.getByTestId('img')).toBeInTheDocument();
            expect(screen.getByTestId('img')).toHaveAttribute('src', 'url');
        });
    });

    it('should handle errors when render plant in EstadoPage', async () => {
        mockGetPlant.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<EstadoPage params={{ id: mockPlant.id }} />);

        await waitFor(() => {
            expect(screen.queryByTestId('img')).not.toBeInTheDocument();
        });
    });

    it('should render plant correctly in Formulario', async () => {
        mockGetPlant.mockResolvedValueOnce(mockPlant2);

        render(<Formulario id={mockPlant2.id} editar="si" />);

        await waitFor(() => {
            expect(screen.getByDisplayValue(mockPlant2.alias)).toBeInTheDocument();
        });
    });

    it('should handle errors when render plant in Formulario', async () => {
        mockGetPlant.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<Formulario id={mockPlant2.id} editar="si" />);

        await waitFor(() => {
            expect(screen.getByDisplayValue(mockPlant2.alias)).not.toBeInTheDocument();
        });
    });
});

describe('SavePlant', () => {
    const mockPlant = { id: "1", alias: 'Test Plant', images: [{ url: 'url' }], planting_date: "2024-07-05T12:00:00Z", modification_date: "2024-07-05T12:00:00Z" };
    const mockCandidates = {
        id: "1",
        language: 'es',
        candidates: [{ plant_data: { id: "1" } }],
        image: { url: "url" },
        health: null,
    };

    let mockSavePlant: jest.Mock;
    let mockGetCandidates: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockSavePlant = jest.fn();
        mockGetCandidates = jest.fn();
        (PlantService as jest.Mock).mockImplementation(() => {
            return {
                savePlant: mockSavePlant,
                getCandidates: mockGetCandidates
            };
        });

        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            pathname: '/jardin',
        });
    });

    it('should save plant correctly in Formulario', async () => {
        await act(async () => {
            render(<Formulario id={mockPlant.id} editar="no" />);
        });

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId('guardar-button'));

        await waitFor(() => {
            expect(mockSavePlant).toHaveBeenCalledWith(expect.objectContaining({
                id: mockPlant.id,
                image_url: mockCandidates.image.url,
                id_plant_catalog: mockCandidates.candidates[0].plant_data.id,
            }));
        });

        expect(window.location.pathname).toBe(`/jardin/${mockPlant.id}`);
    });
});

// it('should handle errors when render plant in EstadoPage', async () => {
//     mockGetPlant.mockRejectedValueOnce(new Error('Failed to fetch'));

//     render(<EstadoPage params={{ id: mockPlant.id }} />);

//     await waitFor(() => {
//         expect(screen.queryByTestId('img')).not.toBeInTheDocument();
//     });
// });
