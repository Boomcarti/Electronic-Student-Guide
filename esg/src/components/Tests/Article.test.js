import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import Article from '../Article';

test("Should Render Article", () =>{
    render(<Article/>)
    const art = screen.getByTestId("art");
    let body= screen.getByTestId("artbody");
    let artw=0;
    expect(art).toBeInTheDocument();
    expect(art).toBeVisible();
    expect(art).toContainElement(body);
});

test("Should Contain Body and image", () =>{
    render(<Article/>)
    const art = screen.getByTestId("art");
    let body= screen.getByTestId("artbody");
    let img= screen.getByTestId("artimage");
    expect(art).toContainElement(img);
});


