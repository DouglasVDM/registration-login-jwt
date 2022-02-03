import React from 'react';

const Courts = ({ courts, getCourtId }) => {

  return (
    <div>
      <h1>Select a Court</h1>
      {
        courts.map(({ court_name, court_id }) => {
          return (
            <p
              style={{ background: 'limegreen' }}
              onClick={() => getCourtId(court_id)}
              key={court_id}
            >
              {court_name}
            </p>
          )
        })
      }
    </div>
  )
};

export default Courts;
