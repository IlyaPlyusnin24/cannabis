import { createActionGroup, props } from '@ngrx/store';

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'Add Agency Info': props<{ agency_id: string; completed: boolean }>(),
    'Add Category': props<{ category: any; category_name: string }>(),
    'Remove Category': props<{ category_name: string }>(),
    'Replace State': props<{ state: any }>(),
    'Update Categogry': props<{ category_name: string; property: any }>(),
  },
});
