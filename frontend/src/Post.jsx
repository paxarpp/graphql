import React from 'react';

export const Post = ({ loading, error, data, clearPost }) => {
  if (loading) return <p className={'style_post-position'}>Loading...</p>;
  if (error) return <p className={'style_post-position'}>Error</p>;
  return (
    data.post &&
    <div onClick={clearPost} className={'style_post'}>
      <p>
        {data.post.title}
      </p>
      <p>
        {data.post.content}
      </p>
      <p>
        {data.post.date}
      </p>
      <p>
        {data.post.creator.name}
      </p>
    </div>
  )
}