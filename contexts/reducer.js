export const setUser = (user) => ({ type: 'SET_USER', payload: user });

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
