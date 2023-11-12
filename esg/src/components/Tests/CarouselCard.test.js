import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import Card from '../CarouselCard';

test("Carousel Render and Sub Divs render", () =>{
    render(<Card/>)
    const car = screen.getByTestId("CardTest");
    expect(car).toBeInTheDocument();
    expect(car).toBeVisible();
    screen.debug()
});
test("Carousel Render and Sub Divs render", () =>{
    render(<Card/>)
    const car = screen.getByTestId("CardTest");
    const carI = screen.getByTestId("CardTestImage");
    const carT = screen.getByTestId("CardTestText");
    expect(carI).toBeInTheDocument();
    expect(carI).toBeVisible();
    expect(car).toContainElement(carT);
  
});

test("Carousel Render and Sub Divs render", () =>{
    render(<Card/>)
    const car = screen.getByTestId("CardTest");
    const carI = screen.getByTestId("CardTestImage");
    const carT = screen.getByTestId("CardTestText");
    expect(carT).toBeVisible();
    expect(carT).toBeInTheDocument();
    expect(car).toContainElement(carT);

});
