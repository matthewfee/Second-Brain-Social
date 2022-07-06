export const setUser = (user) => ({ type: 'SET_USER', payload: user });

export const setModal = (modal) => ({ type: 'SET_MODAL', payload: modal });

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    case 'SET_MODAL':
      return {
        ...state,
        modal: action.payload,
      };

    default:
      return state;
  }
};
