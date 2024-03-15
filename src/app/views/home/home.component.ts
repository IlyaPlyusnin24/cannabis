import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Category {
  status: string;
  notApplicable: boolean;
}

@Component({
  selector: 'can-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public categoryData: Array<Category> = [
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
    { status: 'Incomplete', notApplicable: false },
  ];

  checkBox(value: string, input: any) {
    this.categoryData[Number(value)].notApplicable = input.checked;
    this.categoryData[Number(value)].status = input.checked
      ? 'Complete'
      : 'Incomplete';
  }

  validateSubmitButton() {
    return this.categoryData.some(
      (category: any) => category.status === 'Incomplete'
    );
  }

  submitData() {
    console.log('submit data');
  }
}
