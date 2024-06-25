import {fireEvent, render, screen} from '@testing-library/react'
import {describe} from "node:test";
import IdentificarImagen from "@/components/IdentificarImagen/IdentificarImagen";
import {useRouter} from "next/navigation";



jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('home page', () => {

    beforeEach(() => {

        (useRouter as jest.Mock).mockReturnValue({
            push: jest.fn(),
            pathname: '/resultado', // Example pathname
        });
    });

    it('renders correctly', () => {
        render(
            <IdentificarImagen
                imagen="imagenIdentificar"
                pagina="resultado"
            />
        );


        const imagenElement = screen.getByAltText('usuario prueba');
        expect(imagenElement).toBeInTheDocument();


        const paginaTexts = screen.getAllByText(/Identifica tu planta/i);
        expect(paginaTexts.length).toBeGreaterThanOrEqual(2);


        const submitButton = screen.getByRole('button', { name: /Identificar/i });
        expect(submitButton).toBeInTheDocument();
    });




})

