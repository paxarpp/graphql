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
