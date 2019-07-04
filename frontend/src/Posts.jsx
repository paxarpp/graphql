import React from 'react';

export const Posts = ({ loading, error, data: { posts }, handlerSelectPost }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    posts &&
    posts.map(({ title, id }) => (
      <div key={`post-${id}`} onClick={handlerSelectPost(id)} className={'style_post-content'}>
        <p className={'style_comment'}>
          {title}
        </p>
      </div>
    ))
  )
}