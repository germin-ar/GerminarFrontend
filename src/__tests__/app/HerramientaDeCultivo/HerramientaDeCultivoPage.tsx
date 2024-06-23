import React, { RefObject } from 'react';
import { render, fireEvent } from '@testing-library/react';
import HerramientasDeCultivo from "@/components/HerramientasDeCultivo/HerramientasDeCultivo";


describe('HerramientasDeCultivo component', () => {
    it('renders correctly', () => {
        const targetRef: RefObject<HTMLDivElement> = { current: document.createElement('div') };

        const { getByText } = render(<HerramientasDeCultivo targetRef={targetRef} />);


        expect(getByText('Herramientas de cultivo inteligentes')).toBeInTheDocument();
        expect(getByText('¿Cómo identifico mi planta?')).toBeInTheDocument();
    });


});