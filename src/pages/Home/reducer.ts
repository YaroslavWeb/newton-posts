import { IHome } from "../../interfaces";

export const initialState: IHome = {
  posts: [],
  countPage: 0,
  curPage:1,
  isLoaded: false,
};

export const ACTIONS: any = {
  INITIAL: "INITIAL-POSTS",
};

export const homeReducer = (state: IHome, action: any) => {
  switch (action.type) {
    case ACTIONS.INITIAL: {
      return {
        ...state,
        posts: action.value.posts,
        countPage: Math.ceil(action.value.totalCount / 12),
        curPage: action.value.curPage,
        isLoaded: true,
      };
    }
    default:
      return state;
  }
};
