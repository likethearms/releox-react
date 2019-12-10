import { actionCreator, requestCreator, reducerCreator } from 'redux-rest-helper-for-loopback';
import { push } from 'react-router-redux';

const actions = actionCreator('ITEM', requestCreator<any>('http://localhost:3001/api/Items'), push);
export const itemReducer = reducerCreator('ITEM', { name: '' }).getReducer();

export const createItemAction = actions.getCreateAction();
export const listItemAction = actions.getListAndCountAction();
export const updateItemAction = actions.getUpdateAction();
export const fetchItemAction = actions.getFetchAction();
export const deleteItemAction = actions.getDeleteAction();
export const clearItemAction = actions.getCleanAction();
