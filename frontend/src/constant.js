import gql from "graphql-tag";

export const CREATE_POST = gql`
  mutation CreatePost($post: PostInput!) {
    createPost(post: $post) {
      id
      title
      content
      date
      creatorId
    }
  }`;
export const GET_POSTS = gql`{
  posts {
    id
    title
    creatorId
  }
}`;
export const GET_USER = gql`{
  users {
      id
      name
  }
}`;
export const SELECTED_USER = (id) => gql`{
  user(id: ${id}) {
    id
    name
    email
    age
    posts {
      title
      content
      id
    }
  }
}`;
export const SELECTED_POST = (id) => gql`{
  post(id: ${id}) {
      id
      title
      content
      date
      creator {
        name
      }
  }
}`;
