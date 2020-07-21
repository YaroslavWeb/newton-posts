class Api {
  async get(path: string): Promise<any> {
    return fetch(
      `https://jsonplaceholder.typicode.com/${path}`
    ).then((response) => response.json());
  }
  async posts(): Promise<any> {
    return this.get("posts");
  }

  async comments(idPost: number): Promise<any> {
    return this.get(`posts/${idPost}/comments`)
  }
}

export default new Api();
