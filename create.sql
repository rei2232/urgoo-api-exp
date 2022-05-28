CREATE TABLE Actor (
    aID SERIAL PRIMARY KEY,
    name varchar(50)
);
CREATE TYPE movieState AS ENUM ('ongoing', 'upcoming');
CREATE TYPE ticketType AS ENUM ('3D', '2D', 'IMAX');
CREATE TABLE Movie (
    mID SERIAL PRIMARY KEY,
    title varchar(50),
    image_url varchar(200),
    director varchar(20),
    mState movieState,
    duration smallint,
    releaseDate date
    -- many to many actor
);
CREATE TABLE Movie_Actor (
     mID int REFERENCES Movie(mID) ON UPDATE CASCADE ON DELETE CASCADE,
     aID int REFERENCES Actor(aID) ON UPDATE CASCADE,
     CONSTRAINT movie_actor_pkey PRIMARY KEY(mID, aID)
);
CREATE TABLE Ticket (
    tID SERIAL PRIMARY KEY,
    movieID integer not null,
    -- one to one
    CONSTRAINT fk_movie FOREIGN KEY(movieID) REFERENCES Movie(mID),
    watchDate date,
    hallNum smallint,
    seatNum smallint,
    price integer,
    tType ticketType
);