import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import Homepage from '../Homepage';

test("HomePage Renders ", () =>{
    render(<Homepage/>)
    const cardcomp = screen.getByTestId("hometest");

    expect(cardcomp).toBeInTheDocument();
    expect(cardcomp).toBeVisible();
    screen.debug();

});
test("HomePage Displays welcome header when rendered", () =>{
    render(<Homepage/>)
    const cardcomp = screen.getByTestId("hometest");
    const cardcomp1 = screen.getByTestId("maintest");
expect(cardcomp).toContainElement(cardcomp1);
    screen.debug();

});