CREATE DATABASE jwttutorial;

--set extention
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- public.users definition
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name varchar(255) NOT NULL,
  user_email varchar(255) NOT NULL,
  user_password varchar(255) NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT users_user_email_key UNIQUE (user_email)
);

-- insert sample users
INSERT INTO
  users (user_name, user_email, user_password)
VALUES
  ('douglas', 'douglas@gmail.com', 'doug1234');

SELECT
  *
FROM
  users;

SELECT
  u.user_name,
  b.booking_id,
  b.booking_date,
  b.time_in,
  b.time_out
FROM
  users AS u
  LEFT JOIN bookings AS b ON u.user_id = b.user_id
WHERE
  u.user_id = 'e86d035a-66de-44da-ad65-d7bcfc21bdde';

SELECT
  u.user_name,
  b.booking_id,
  b.booking_date,
  b.time_in,
  b.time_out
FROM
  users AS u
  LEFT JOIN bookings AS b ON u.user_id = b.user_id
WHERE
  u.user_id = '54f033e1-77ce-4045-87bc-cfd290149b82';

-- courts definition
DROP TABLE IF EXISTS courts CASCADE;

CREATE TABLE courts(
  court_id INT GENERATED ALWAYS AS IDENTITY,
  court_name VARCHAR(20) NOT NULL,
  PRIMARY KEY (court_id)
);

INSERT INTO
  courts AS c (court_name)
VALUES
  ('court 4');

SELECT
  *
FROM
  courts AS c;

-- bookings definition
DROP TABLE IF EXISTS public.bookings CASCADE;

CREATE TABLE bookings (
  booking_id INT GENERATED ALWAYS AS IDENTITY,
  user_id uuid,
  court_id INT,
  booking_date DATE NOT NULL,
  time_in TIME NOT NULL,
  time_out TIME NOT NULL,
  PRIMARY KEY (booking_id),
  CONSTRAINT fkey_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  CONSTRAINT fkey_court FOREIGN KEY (court_id) REFERENCES courts(court_id) ON DELETE CASCADE
);

INSERT INTO
  bookings (
    user_id,
    court_id,
    booking_date,
    time_in,
    time_out
  )
VALUES
  (
    '54f033e1-77ce-4045-87bc-cfd290149b82',
    1,
    '2022-1-10',
    '10:00:00',
    '12:00:00'
  ) RETURNING user_id,
  court_id,
  booking_date,
  time_in,
  time_out;

SELECT
  *
FROM
  bookings AS b;

WHERE
  b.booking_id = 1;

-- booked_court definition
DROP TABLE IF EXISTS booked_courts CASCADE;

CREATE TABLE booked_courts (
  booked_court_id INT GENERATED ALWAYS AS IDENTITY,
  booking_id INT,
  available BOOLEAN DEFAULT 't',
  PRIMARY KEY (booked_court_id),
  CONSTRAINT fkey_booking FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
);