import { createActionGroup, props } from '@ngrx/store';

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'Add Category': props<{ category: any; category_name: string }>(),
    'Remove Category': props<{ category_name: string }>(),
  },
});
