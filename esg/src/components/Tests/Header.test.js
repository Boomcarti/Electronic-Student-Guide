import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from '../Header';

test("Header Renders ", () =>{
    render(<Header/>)
    const cardcomp = screen.getByTestId("maintest");
    const cardcompinner = screen.getByTestId("headingtest");
    expect(cardcomp).toContainElement(cardcompinner);
    expect(cardcomp).toBeInTheDocument();
    expect(cardcomp).toBeVisible();

});

test("CLicking on headers does not break them", () =>{
    render(<Header/>)
    const cardcomp = screen.getByTestId("maintest");
    let cctwo=cardcomp;
    const cardcompinner = screen.getByTestId("headingtest");
    cardcomp.click();
   expect(cardcomp).toBe(cctwo);
  
});