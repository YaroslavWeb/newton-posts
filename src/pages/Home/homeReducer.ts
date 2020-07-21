import { IHome } from "../../interfaces";

export const initialState: IHome = {
  posts: [],
  curPosts: [],
  curPage: 1,
  postsPerPage: 12,
  countPages: 0,
};

export const ACTIONS: any = {
    GET_POSTS: 'GET-POSTS',
    LIMIT:'LIMIT'
}

export const homeReducer = (state: IHome, action: any) => {
  switch (action.type) {
    case ACTIONS.GET_POSTS: {
      return {
        ...state,
        posts: action.value.initialPosts,
        curPage: action.value.initialCurPage,
        curPosts: action.value.initialPosts.slice(
          (action.value.initialCurPage - 1) * state.postsPerPage,
          state.postsPerPage + (action.value.initialCurPage-1) * state.postsPerPage
        ),
        countPages: Math.ceil(action.value.initialPosts.length / state.postsPerPage),
      };
    }
    case ACTIONS.LIMIT: {
      return{
        ...state,
        curPosts: state.posts.slice(
          (state.curPage - 1) * action.value,
          action.value + (state.curPage-1) * action.value
        ),
        countPages: Math.ceil(state.posts.length / action.value),
        postsPerPage: action.value
      }
    }
    default:
      return state;
  }
};
