class Api {
  async get(path: string, type: string): Promise<any> {
    return fetch(`https://jsonplaceholder.typicode.com/${path}`).then(
      (response) => {
        if (type === "comments") {
          return response.json();
        }
        return {
          posts: response.json(),
          totalCount: response.headers.get("x-total-count"),
        };
      }
    );
  }
  async posts(curPage: number, limit: number): Promise<any> {
    return this.get(`posts?_limit=${limit}&_page=${curPage}`, "posts");
  }

  async comments(idPost: number): Promise<any> {
    return this.get(`posts/${idPost}/comments`, "comments");
  }
}

export default new Api();
