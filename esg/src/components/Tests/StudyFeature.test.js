import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import StudyFeature from '../StudyFeature';

test("Should render Study feature", () =>{
    let tname="tadiwa"
    render(<StudyFeature tname />)
    const studfeature = screen.getByTestId("studyftest");

    expect(studfeature).toBeInTheDocument();
    expect(studfeature).toBeVisible();
    
});

test("Study feature should contain todo item" , () =>{
    let tname="tadiwa"
    render(<StudyFeature tname />)
    const studfeature = screen.getByTestId("studyftest");
    const studytodo = screen.getByTestId("studytodo");
    expect(studfeature).toContainElement(studytodo);
    expect(studytodo).toBeInTheDocument();
    expect(studytodo).toBeVisible();
    
});