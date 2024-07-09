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
            const aliasInput = screen.queryByDisplayValue(mockPlant2.alias);
            expect(aliasInput).not.toBeInTheDocument();
        });
    });
});