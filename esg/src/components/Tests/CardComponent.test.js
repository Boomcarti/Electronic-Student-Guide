import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import CardComponent from '../CardComponent';

test("Card Render ", () =>{
    render(<CardComponent/>)
    const cardcomp = screen.getByTestId("cardcomptest");
    const cardcompinner = screen.getByTestId("cardcomptestinner");
expect(cardcomp.isOpen).not.toBeDefined();
    screen.debug()
    expect(cardcomp).toBeInTheDocument();
    expect(cardcomp).toContainElement(cardcompinner);
    expect(cardcomp).toBeVisible();
});