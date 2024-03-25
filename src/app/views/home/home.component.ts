import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../services/category-service/category.service';
import { CategoryActions } from '../../store/categories.actions';
import { StorageService } from '../../services/storage-service/storage.service';

interface Category {
  arrests: number;
  citations: number;
  penaltyAssessments: number;
  gender: {
    male: number;
    female: number;
  };
  age: {
    '0_10': number;
    '11_15': number;
    '16_20': number;
    '21_25': number;
    '26_30': number;
    '31_35': number;
    '36_40': number;
    '41_45': number;
    '46_50': number;
    '51_55': number;
    '56_60': number;
    '61_65': number;
    '66_plus': number;
    unknown: number;
  };
  race: {
    white: number;
    black: number;
    americanIndian_alaskanNative: number;
    asian_Pacific_Islander: number;
    unknown: number;
  };
  ethnicity: {
    hispanic_latino: number;
    not_hispanic_latino: number;
    unknown: number;
  };
  penalty_level: {
    fine?: number;
    community_service?: number;
    fourth_degree_felony?: number;
    misdemeanor: number;
  };
}

interface Categories {
  [key: string]: Category;
  personal_production: Category;
  unlicensed_sale: Category;
  restricted_area: Category;
  unlawful_possession: Category;
  unlicensed_manufacturing: Category;
  dui: Category;
  adui: Category;
  operating_motorboat: Category;
  aggravated_operating_motorboat: Category;
}

interface CategoryData {
  category: string;
  status: string;
  notApplicable: boolean;
}

@Component({
  selector: 'can-home',
  standalone: true,
  imports: [RouterLink, StoreModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public categoryData: Array<CategoryData> = [
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
  private currentState!: Categories;
  private subscription: Subscription;
  public submitResponse: string = '';

  constructor(
    private readonly store: Store<any>,
    private categoryService: CategoryService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.state$ = this.store.select((state) => state);

    this.subscription = this.state$.subscribe(({ categories }) => {
      this.currentState = categories;

      this.categoryData.forEach((obj) => {
        if (Object.hasOwn(categories, obj.category)) {
          obj.status = 'Complete';

          if (Object.hasOwn(categories[obj.category], 'not_applicable')) {
            obj.notApplicable = categories[obj.category].not_applicable;
          }
        }
      });

      console.log({ myState: this.currentState });
    });
  }

  public buttonValue(index: number) {
    const category = this.categoryData[index].category;

    if (
      Object.hasOwn(this.currentState, category) &&
      !Object.hasOwn(this.currentState[category], 'not_applicable')
    ) {
      return 'Update Data';
    }

    return 'Enter Data';
  }

  ngOnInit() {
    this.store
      .select((state) => Object.keys(state['categories']).length === 0)
      .subscribe((isEmpty) => {
        if (isEmpty) {
          const agency_id = this.storageService.getItem('agency_id');
          console.log({ agency_id });
          this.categoryService.retrieveCategories(agency_id!).subscribe({
            next: (response) => {
              console.log({ responseInHomeComponent: response });
              if (response) {
                this.store.dispatch(
                  CategoryActions.replaceState({
                    state: response,
                  })
                );
              }
            },
            error: (err) => {
              console.log({ err });
            },
          });
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkBox(index: number, input: any, event: any) {
    if (this.categoryData[index].status === 'Complete' && input.checked) {
      const result = confirm(
        `The following action will delete ${this.categoryData[index].category}`
      );

      if (result) {
        this.store.dispatch(
          CategoryActions.removeCategory({
            category_name: this.categoryData[index].category,
          })
        );

        console.log(`Removed ${this.categoryData[index].category}`);
      } else {
        event.preventDefault();
        return;
      }
    }

    if (input.checked) {
      this.store.dispatch(
        CategoryActions.updateCategogry({
          category_name: this.categoryData[index].category,
          property: { not_applicable: true },
        })
      );
    } else {
      this.store.dispatch(
        CategoryActions.removeCategory({
          category_name: this.categoryData[index].category,
        })
      );
    }

    this.categoryData[index].notApplicable = input.checked;
    const category = this.categoryData[index].category;

    if (Object.hasOwn(this.currentState, category)) {
      this.categoryData[index].status = 'Complete';
    } else {
      this.categoryData[index].status = input.checked
        ? 'Complete'
        : 'Incomplete';
    }
  }

  validateSaveButton() {
    return this.categoryData.every(
      (category: any) => category.status === 'Incomplete'
    );
  }

  validateSubmitButton() {
    return this.categoryData.some(
      (category: any) => category.status === 'Incomplete'
    );
  }

  postData(data: any, completedValue: boolean) {
    this.submitResponse = '';

    this.categoryService.createCategories(data).subscribe({
      next: (response) => {
        console.log({ response });

        if (completedValue) {
          this.submitResponse = 'Submitted Successfully!';
        } else {
          this.submitResponse = 'Saved Successfully!';
        }
      },
      error: (err) => {
        console.log({ err });
      },
    });
  }

  submitData(completedValue: boolean) {
    console.log({ currentState: this.currentState });

    let obj: any = {
      agency_id: this.storageService.getItem('agency_id'),
      completed: completedValue,
      ...this.currentState,
    };

    console.log({ obj });
    this.postData(obj, completedValue);
  }

  logout() {
    this.storageService.clearStorage();
    this.router.navigate(['/login']);
  }
}
