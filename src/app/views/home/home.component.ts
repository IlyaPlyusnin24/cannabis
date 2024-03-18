import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { CategoryService } from '../../services/category-service/category.service';

interface Category {
  category: string;
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
export class HomeComponent implements OnInit {
  public categoryData: Array<Category> = [
    {
      category: 'personal_production',
      status: 'Incomplete',
      notApplicable: false,
    },
    { category: 'unlicensed_sale', status: 'Incomplete', notApplicable: false },
    { category: 'restricted_area', status: 'Incomplete', notApplicable: false },
    {
      category: 'unlawful_possession',
      status: 'Incomplete',
      notApplicable: false,
    },
    {
      category: 'unlicensed_manufacturing',
      status: 'Incomplete',
      notApplicable: false,
    },
    { category: 'dui', status: 'Incomplete', notApplicable: false },
    { category: 'adui', status: 'Incomplete', notApplicable: false },
    {
      category: 'operating_motorboat',
      status: 'Incomplete',
      notApplicable: false,
    },
    {
      category: 'aggravated_operating_motorboat',
      status: 'Incomplete',
      notApplicable: false,
    },
  ];

  private state$: Observable<any>;
  private currentState: any;
  private subscription: Subscription;

  constructor(
    private store: Store<any>,
    private categoryService: CategoryService
  ) {
    this.state$ = this.store.select((state) => state);

    this.subscription = this.state$.subscribe(({ categories }) => {
      this.currentState = categories;

      this.categoryData.forEach((obj) => {
        if (Object.hasOwn(categories, obj.category)) {
          obj.status = 'Complete';
        }
      });
    });

    console.log({ myState: this.currentState });
  }

  public buttonValue(index: number) {
    const category = this.categoryData[index].category;

    if (Object.hasOwn(this.currentState, category)) {
      return 'Update Data';
    }

    return 'Enter Data';
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkBox(index: number, input: any) {
    const category = this.categoryData[index].category;
    this.categoryData[index].notApplicable = input.checked;

    if (Object.hasOwn(this.currentState, category)) {
      this.categoryData[index].status = 'Complete';
    } else {
      this.categoryData[index].status = input.checked
        ? 'Complete'
        : 'Incomplete';
    }
  }

  validateSubmitButton() {
    return this.categoryData.some(
      (category: any) => category.status === 'Incomplete'
    );
  }

  postData() {
    this.categoryService.createCategories(this.currentState).subscribe({
      next: (response) => {
        console.log({ response });
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }

  submitData() {
    console.log('submit data');
    this.postData();
  }
}
