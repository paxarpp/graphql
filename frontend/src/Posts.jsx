import React from 'react';

export const Posts = ({ loading, error, data, handlerSelectPost }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    data.posts &&
    data.posts.map(({ title, id, creatorId }) => (
      <div key={`post-${id}`} onClick={handlerSelectPost(id, creatorId)} className={'style_post-content'}>
        <p className={'style_comment'}>
          {title}
        </p>
      </div>
    ))
  )
}