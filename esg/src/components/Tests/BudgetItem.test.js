import {render, screen, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom'
import BudgetItem from '../BudgetItem';

test("Budget Item render", () =>{
    render(<BudgetItem/>)
    const budgetitem = screen.getByTestId("existbudgetitem");
    expect(budgetitem).toBeInTheDocument();
    expect(budgetitem).toBeVisible();
});
test("Budget Item Name and Price should render on the Budget Item", () =>{
    render(<BudgetItem/>)
    const budgetitem = screen.getByTestId("existbudgetitem");
    const itemname = screen.getByTestId("existbudgetitemname");
    const itemprice = screen.getByTestId("testprice");
    expect(itemname).toBeInTheDocument();
    expect(itemname).toBeVisible();
    expect(itemprice).toBeInTheDocument();
    expect(itemprice).toBeVisible();
});