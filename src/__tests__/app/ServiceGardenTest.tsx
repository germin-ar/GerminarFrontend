import { GardenService } from "@/services/GardenService";
import { PlantService } from "@/services/PlantService";
import { render, screen, waitFor } from '@testing-library/react';
import DiagnosticarPlanta from "@/app/diagnosticar/page";
import JardinPage from "@/app/jardin/page";
import Formulario from "@/components/formularioEditarRegistro/formulario";
import { useRouter } from "next/navigation";

jest.mock("@/services/GardenService");
jest.mock("@/services/PlantService");

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('GetGardens', () => {
    const mockGardens = [
        { id: 1, name: 'Test Garden', plants: [{ id: "1", alias: 'Test Plant' }] }
    ];

    const mockPlant = { id: "1", alias: 'Test Plant', images: [{ url: 'url' }], planting_date: "2024-07-05T12:00:00Z", modification_date: "2024-07-05T12:00:00Z" };

    let mockGetGardens: jest.Mock;

    let mockGetPlant: jest.Mock;

    beforeEach(() => {
        mockGetGardens = jest.fn();
        (GardenService as jest.Mock).mockImplementation(() => {
            return {
                getGardens: mockGetGardens
            };
        });

        mockGetPlant = jest.fn();
        (PlantService as jest.Mock).mockImplementation(() => {
            return {
                getPlant: mockGetPlant
            };
        });

        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            pathname: '/jardin',
        });
    });

    it('should render gardens correctly in DiagnosticarPlanta', async () => {
        mockGetGardens.mockResolvedValueOnce(mockGardens);

        render(<DiagnosticarPlanta />);

        await waitFor(() => {
            expect(screen.queryByText('Test Garden')).toBeInTheDocument();
        });
    });

    it('should render gardens correctly in JardinPage', async () => {
        mockGetGardens.mockResolvedValueOnce(mockGardens);

        render(<JardinPage />);

        await waitFor(() => {
            const elementsWithText = screen.queryAllByText('Test Garden');
            expect(elementsWithText.length).toBeGreaterThan(0);
        });
    });

    it('should render gardens correctly in Formulario', async () => {
        mockGetPlant.mockResolvedValueOnce(mockPlant);
        mockGetGardens.mockResolvedValueOnce(mockGardens);

        render(<Formulario id={mockPlant.id} editar="si" />);

        await waitFor(() => {
            const elementsWithText = screen.queryAllByText('Test Garden');
            expect(elementsWithText.length).toBeGreaterThan(0);
        });
    });

    it('should handle errors', async () => {
        mockGetGardens.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<DiagnosticarPlanta />);

        await waitFor(() => {
            expect(screen.queryByText('Test Garden')).not.toBeInTheDocument();
        });
    });

});