import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import Carousel from '../Carousel';
import {total} from '../Carousel';

test("Carousel Render", () =>{
    render(<Carousel/>)
    const car = screen.getByTestId("carouseltest");
    screen.debug()
    expect(car).toBeInTheDocument();
    expect(car).toBeVisible();
});

test("Carousel Content", () =>{
    render(<Carousel/>)
    const car = screen.getByTestId("carouseltest");
    screen.debug()
    expect(car.innerHTML).toBe("Loading...");
    expect(car).toBeInTheDocument();
    expect(car).toBeVisible();
    //when server is not running ther ehsould not be anything dipalying on crousel
    
});



