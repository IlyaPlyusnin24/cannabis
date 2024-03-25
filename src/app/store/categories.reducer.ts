import { createReducer, on } from '@ngrx/store';
import { CategoryActions } from './categories.actions';

export const initialState: any = {};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.addCategory, (_state, { category, category_name }) => {
    return { ..._state, [category_name]: category };
  }),
  on(CategoryActions.removeCategory, (_state, { category_name }) => {
    const updatedState = { ..._state };
    delete updatedState[category_name];

    return updatedState;
  }),
  on(CategoryActions.replaceState, (_state, { state }) => {
    return state;
  }),
  on(CategoryActions.addAgencyInfo, (_state, { agency_id, completed }) => {
    return { ..._state, agency_id, completed };
  }),
  on(CategoryActions.updateCategogry, (_state, { category_name, property }) => {
    const updatedState = { ..._state, [category_name]: property };

    return updatedState;
  })
);
