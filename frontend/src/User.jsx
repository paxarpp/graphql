import React from 'react';

export const User = ({ loading, error, data, clearUser }) => {
  if (loading) return <p className={'style_position'}>Loading...</p>;
  if (error) return <p className={'style_position'}>Error</p>;

  return (
    data.user &&
    <div onClick={clearUser} className={'style_user'}>
      <p>
        {data.user.name}
      </p>
      <p>
        {data.user.email}
      </p>
      <p>
        {data.user.age}
      </p>
      {
        data.posts.map(({ id, title, content }) => {
          return (
            <p key={`idpost-${id}`}>{title} <span>{content}</span></p>
          )
        })
      }
    </div>
  )
}