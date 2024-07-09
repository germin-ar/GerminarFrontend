import { GardenService } from "@/services/GardenService";
import { PlantService } from "@/services/PlantService";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DiagnosticarPlanta from "@/app/diagnosticar/page";
import Jardin from "@/app/jardin/page";
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

    it('should handle errors when render gardens in DiagnosticarPlanta', async () => {
        mockGetGardens.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<DiagnosticarPlanta />);

        await waitFor(() => {
            expect(screen.queryByText('Test Garden')).not.toBeInTheDocument();
        });
    });

    it('should render gardens correctly in JardinPage', async () => {
        mockGetGardens.mockResolvedValueOnce(mockGardens);

        render(<Jardin />);

        await waitFor(() => {
            const elementsWithText = screen.queryAllByText('Test Garden');
            expect(elementsWithText.length).toBeGreaterThan(0);
        });
    });

    it('should handle errors when render gardens in Jardin', async () => {
        mockGetGardens.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<Jardin />);

        await waitFor(() => {
            expect(screen.queryByText('Test Garden')).not.toBeInTheDocument();
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

    it('should handle errors when render gardens in Formulario', async () => {
        mockGetGardens.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<Formulario id={mockPlant.id} editar="si" />);

        await waitFor(() => {
            expect(screen.queryByText('Test Garden')).not.toBeInTheDocument();
        });
    });

});

describe('SaveGarden', () => {
    const mockGardens = [
        { id: 1, name: 'Test Garden', plants: [{ id: "1", alias: 'Test Plant' }] }
    ];
    const mockPlant = { id: "1", alias: 'Test Plant', images: [{ url: 'url' }], planting_date: "2024-07-05T12:00:00Z", modification_date: "2024-07-05T12:00:00Z" };

    let mockSaveGarden: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockSaveGarden = jest.fn();
        (GardenService as jest.Mock).mockImplementation(() => {
            return {
                saveGarden: mockSaveGarden
            };
        });

    });

    it('should save garden successfully in Formulario', async () => {
        render(<Formulario id={mockPlant.id} editar="si" />);

        fireEvent.click(screen.getByTestId('popup-button'));
        fireEvent.change(screen.getByPlaceholderText('Nombre del jardín'), { target: { value: 'Test Garden' } });
        fireEvent.click(screen.getByTestId('submit-button'));

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(mockSaveGarden).toHaveBeenCalledWith('Test Garden', 1);
    });

    it('should handle errors when save garden in Formulario', async () => {
        mockSaveGarden.mockRejectedValueOnce(new Error('Failed to save'));

        render(<Formulario id={mockPlant.id} editar="si" />);

        await waitFor(() => {
            expect(mockSaveGarden).toHaveBeenCalledTimes(0);
        });
    });
});

describe('DeleteGarden', () => {
    const mockGardens = [
        { id: 1, name: 'Test Garden', plants: [] },
        { id: 2, name: 'Test Garden 2', plants: [{ id: "1", alias: 'Test Plant' }] }
    ];
    const mockPlant = { id: "1", alias: 'Test Plant', images: [{ url: 'url' }], planting_date: "2024-07-05T12:00:00Z", modification_date: "2024-07-05T12:00:00Z" };

    let mockGetGardens: jest.Mock;
    let mockDeleteGarden: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();

        mockGetGardens = jest.fn();
        mockDeleteGarden = jest.fn();
        (GardenService as jest.Mock).mockImplementation(() => {
            return {
                getGardens: mockGetGardens,
                deleteGarden: mockDeleteGarden
            };
        });

    });

    it('should delete garden successfully in Jardin when garden has 0 plants', async () => {
        mockGetGardens.mockResolvedValueOnce(mockGardens);
        render(<Jardin />);
        await waitFor(() => {
            const elementsWithText = screen.queryAllByText('Test Garden');
            expect(elementsWithText.length).toBeGreaterThan(0);
        });

        fireEvent.click(screen.getByTestId('popup-button-1'));
        fireEvent.click(screen.getByTestId('delete-button'));

        expect(mockDeleteGarden).toHaveBeenCalledWith(mockGardens[0].id);
    });

    it('should handle errors when delete garden in Jardin when garden has plants', async () => {
        mockGetGardens.mockResolvedValueOnce(mockGardens);
        render(<Jardin />);
        await waitFor(() => {
            const elementsWithText = screen.queryAllByText('Test Garden');
            expect(elementsWithText.length).toBeGreaterThan(0);
        });

        fireEvent.click(screen.getByTestId('popup-button-2'));
        fireEvent.click(screen.getByTestId('delete-button'));

        expect(mockDeleteGarden).toHaveBeenCalledWith(mockGardens[1].id);
        const elementsWithText = screen.queryAllByText('Test Garden');
        expect(elementsWithText.length).toBeGreaterThan(0);
    });
});