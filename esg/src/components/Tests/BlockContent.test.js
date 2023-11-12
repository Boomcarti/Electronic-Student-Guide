import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import Block from '../BlockContent';

test("Should Render Block Content", () =>{
    render(<Block/>)
    const block = screen.getByTestId("blocktest");
    expect(block).toBeInTheDocument();
    expect(block).toBeVisible();
});

test("Should contain Button and Label", () =>{
    render(<Block/>)
    const block = screen.getByTestId("blocktest");
    let prompt = screen.getByTestId("prompttest");
    let buts = screen.getByTestId("btest");
    expect(block).toBeInTheDocument();
    expect(block).toContainElement(prompt);
    expect(block).toContainElement(buts);
});

test("The Block should only be interactable with buttons", () =>{
    render(<Block/>)
    const block = screen.getByTestId("blocktest");
    let prompt = screen.getByTestId("prompttest");
    let buts = screen.getByTestId("btest");
    let blockcheck =block;
    block.click();
    prompt.click();
   expect(block).toBe(block);
   //clicks should make no change to the content block
    expect(block).toContainElement(prompt);
    expect(block).toContainElement(buts);
});