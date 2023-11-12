import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import TodoItem from '../TodoItem';

test("Should Render  To do item", () =>{
    render(<TodoItem />)
    const todotest = screen.getByTestId("todotest");
    expect(todotest).toBeInTheDocument();
    expect(todotest).toBeVisible();
});

test("button to submit information is rendered", () =>{
    render(<TodoItem />)
    const todotest = screen.getByTestId("todotest");
    const todobutton = screen.getByTestId("todobutton");
    expect(todotest).toContainElement(todobutton);
    expect(todobutton).toBeInTheDocument();
    expect(todobutton).toBeVisible();
});

test("Input is option is attached to each todo item", () =>{
    render(<TodoItem />)
    const todotest = screen.getByTestId("todotest");
    const todoinput = screen.getByTestId("todoinput");
    expect(todotest).toContainElement(todoinput);
    expect(todoinput).toBeInTheDocument();
    expect(todotest).toBeVisible();
});

