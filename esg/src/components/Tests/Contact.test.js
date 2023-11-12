import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import Contact from '../Contact';

test("Card Render ", () =>{
    render(<Contact/>)
    const cardcomp = screen.getByTestId("contactTest");
    
    const cardcompinner = screen.getByTestId("contactTestInner");
    expect(cardcomp).toBeInTheDocument();
    expect(cardcomp).toContainElement(cardcompinner);
    expect(cardcomp).toBeVisible();
    screen.debug()
});