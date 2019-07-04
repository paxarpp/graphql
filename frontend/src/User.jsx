import React from 'react';

export const User = ({ loading, error, data: { user }, clearUser }) => {
  if (loading) return <p className={'style_position'}>Loading...</p>;
  if (error) return <p className={'style_position'}>Error</p>;

  return (
    user &&
    <div onClick={clearUser} className={'style_user'}>
      <p>
        {user.name}
      </p>
      <p>
        {user.email}
      </p>
      <p>
        {user.age}
      </p>
      {
        user.posts.map(({ id, title, content }) => {
          return (
            <p key={`idpost-${id}`}>{title} <span>{content}</span></p>
          )
        })
      }
    </div>
  )
}