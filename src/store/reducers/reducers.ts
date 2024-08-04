import { SAVE_REDIRECT_URL } from "../actions/action";



interface SaveRedirectUrlAction {
  type: typeof SAVE_REDIRECT_URL;
  payload: string;
}

type RedirectActionTypes = SaveRedirectUrlAction;

interface RedirectState {
  url: string | null;
}

const initialState: RedirectState = {
  url: null,
};

const rootReducer = (state = initialState, action: RedirectActionTypes): RedirectState => {
  switch (action.type) {
    case SAVE_REDIRECT_URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;





export type RootState = ReturnType<typeof rootReducer>;

