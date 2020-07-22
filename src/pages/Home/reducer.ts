import { IHome } from "../../interfaces";

export const initialState: IHome = {
  posts: [],
  postsPerPage: 12,
  isLoaded: false,
};

export const ACTIONS: any = {
  INITIAL: "INITIAL-POSTS",
  LIMIT: "LIMIT-POSTS",
};

export const homeReducer = (state: IHome, action: any) => {
  switch (action.type) {
    case ACTIONS.INITIAL: {
      return {
        ...state,
        posts: action.value,
        isLoaded: true,
      };
    }
    case ACTIONS.LIMIT: {
      return {
        ...state,
        postsPerPage: action.value,
      };
    }
    default:
      return state;
  }
};
