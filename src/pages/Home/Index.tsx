import React from "react";
import { useLocation } from "react-router-dom";

import Api from "../../utills/Api";
import { IHome, IPost } from "../../interfaces";
import { homeReducer, initialState, ACTIONS } from "./homeReducer";
import { Post } from "./Post";
import { Pagination } from "../../components/Pagination";
import { Spiner } from "../../components/Spiner";
import { SelectLimitPage } from "./SelectLimitPage";

export const Home: React.FC = () => {
  const location = useLocation();
  const [state, dispatch] = React.useReducer<React.Reducer<IHome, any>>(
    homeReducer,
    initialState
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Подгрузка постов
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      const initialPosts = await Api.posts();
      const initialCurPage =
        new URLSearchParams(location.search).get("page") || 1;
      dispatch({
        type: ACTIONS.GET_POSTS,
        value: { initialPosts, initialCurPage },
      });
      setIsLoading(false);
    })();
  }, [location.search]);

  const selectLimit = (value: string) => {
    dispatch({type:ACTIONS.LIMIT, value:+value})
  }

  return isLoading ? (
    <Spiner />
  ) : (
    <div className="container">
      <SelectLimitPage selectLimit={selectLimit} limit={state.postsPerPage}/>
      <Pagination curPage={state.curPage} countPages={state.countPages} />
      <div className="row">
        {state.curPosts.map((post: IPost) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Pagination curPage={state.curPage} countPages={state.countPages} />
    </div>
  );
};
