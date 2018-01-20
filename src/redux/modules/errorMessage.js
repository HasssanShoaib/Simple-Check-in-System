const RESET_ERROR_MESSAGE = 'famly-signin/errorMessage/RESET_ERROR_MESSAGE';

export default function reducer(state = null, action = {}) {
  const { type, error } = action

  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return { error };
  }

  return state;
}

// action creators
export const dismissError = () => {
	return {
		type: RESET_ERROR_MESSAGE
	}
}