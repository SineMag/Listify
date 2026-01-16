export const addItem = (item) => ({
  type: 'ADD_ITEM',
  payload: item,
});

export const editItem = (id, data) => ({
  type: 'EDIT_ITEM',
  payload: { id, data },
});

export const deleteItem = (id) => ({
  type: 'DELETE_ITEM',
  payload: id,
});
