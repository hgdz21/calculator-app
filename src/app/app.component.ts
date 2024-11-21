import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  stringToEvaluate: string = ''; // Stores the complete mathematical expression
  output: string | number = '0'; // Stores the current result or input
  operator: string = ''; // Stores the last selected operator

  squareNumber() {
    const num = parseFloat(this.output.toString());
    if (!isNaN(num)) {
      const squared = num * num;
      this.output = squared;
      this.stringToEvaluate = squared.toString();
    } else {
      this.output = 'Error';
    }
  }

  // Handle number input
  takeInput(num: number) {
    if (this.operator === '=') {
      this.stringToEvaluate = ''; // Reset after an evaluation
      this.operator = '';
    }
    this.stringToEvaluate += num; // Append the number to the expression
    this.output = this.stringToEvaluate; // Update the display
  }

  // Handle operator input
  takeOp(operator: string) {
    if (this.operator === '=') {
      this.stringToEvaluate = this.output.toString(); // Start a new calculation
    }
    this.operator = operator;
    this.stringToEvaluate += operator; // Append the operator to the expression
  }

  // Handle special characters (e.g., decimal points)
  takeSp(input: string) {
    if (this.operator === '=') {
      this.stringToEvaluate = '';
      this.operator = '';
    }
    if (input === '.' && !this.stringToEvaluate.includes('.')) {
      this.stringToEvaluate += '.'; // Append a decimal point if not already present
    }
    this.output = this.stringToEvaluate;
  }

  // Evaluate the result of the current expression
  evaluateResult() {
    try {
      this.output = eval(this.stringToEvaluate); // Evaluate the expression
      this.stringToEvaluate = this.output.toString(); // Update the expression
      this.operator = '='; // Indicate evaluation is complete
    } catch (error) {
      this.output = 'Error'; // Handle invalid expressions
    }
  }

  // Reset the calculator
  resetInput() {
    this.stringToEvaluate = '';
    this.output = '0';
    this.operator = '';
  }

  // Clear the last input
  clear() {
    this.stringToEvaluate = this.stringToEvaluate.slice(0, -1);
    this.output = this.stringToEvaluate || '0'; // Prevent empty display
  }
}
