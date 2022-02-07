import React from 'react';

const Users = ({ users, getUserEmail }) => {
  return (
    <div>
      <h1>All Users</h1>
      {
        users.map(({ user_id, user_name, user_email }) => {
          return (
            <p
              style={{ background: 'lightblue' }}
              onClick={() => getUserEmail(user_email)}
              key={user_email}
            >
              {user_email}
            </p>
          )
        })
      }
    </div>
  )
};

export default Users;