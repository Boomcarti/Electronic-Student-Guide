import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import FeatureBox from '../FeatureBox';

test("Feature Renders", () =>{
    render(<FeatureBox/>)
    const cardcomp = screen.getByTestId("fctest");
    const cardcompinner = screen.getByTestId("fcitest");
    const cardcompinnerq = screen.getByTestId("fcttest");
  
    expect(cardcomp).toBeInTheDocument();
    expect(cardcomp).toBeVisible();
});

test("Feature Contains feature cards", () =>{
    render(<FeatureBox/>)
    const cardcomp = screen.getByTestId("fctest");
    const cardcompinner = screen.getByTestId("fcitest");
    const cardcompinnerq = screen.getByTestId("fcttest");
    expect(cardcomp).toContainElement(cardcompinner);
    expect(cardcomp).toContainElement(cardcompinnerq);
});