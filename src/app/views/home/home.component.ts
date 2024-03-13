import { Component } from '@angular/core';

@Component({
  selector: 'can-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public categoryData: any = {
    1: { status: 'Incomplete', notApplicable: false },
    2: { status: 'Incomplete', notApplicable: false },
    3: { status: 'Incomplete', notApplicable: false },
    4: { status: 'Incomplete', notApplicable: false },
    5: { status: 'Incomplete', notApplicable: false },
    6: { status: 'Incomplete', notApplicable: false },
    7: { status: 'Incomplete', notApplicable: false },
    8: { status: 'Incomplete', notApplicable: false },
    9: { status: 'Incomplete', notApplicable: false },
  };

  checkBox(value: string, input: any) {
    this.categoryData[value].notApplicable = input.checked;
    this.categoryData[value].status = input.checked ? 'Complete' : 'Incomplete';
  }
}
