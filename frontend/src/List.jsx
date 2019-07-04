import React from 'react';

export const List = ({ loading, error, data: { users }, handlerSelectUser }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    users &&
    users.map(({ name, id }) => (
      <div key={id} onClick={handlerSelectUser(id)} className={'style_content'}>
        <p>
          {name}
        </p>
      </div>
    ))
  ) 
}