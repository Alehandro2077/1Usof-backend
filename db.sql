CREATE TABLE users (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	login varchar(255) UNIQUE NOT NULL,
	password varchar(255) NOT NULL,
	full_name varchar(255) NULL,
	email varchar(255) UNIQUE NOT NULL,
	profile_pic varchar(255) NULL,
	rating bigint NOT NULL DEFAULT 0,
	active boolean DEFAULT false,
    role varchar(255) NOT NULL DEFAULT 'user',
	token varchar(255) NULL
);

CREATE TABLE token (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_id bigint REFERENCES users (id) ON DELETE CASCADE,
	role varchar(100) NOT NULL, 
	token varchar(300) NOT NULL
);

CREATE TABLE posts (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	author_id bigint REFERENCES users (id) ON DELETE CASCADE,
	title varchar(255) NOT NULL,
	publish_date DATE NOT NULL,
	status boolean NOT NULL,
	content text NOT NULL,
	content_picture varchar(255) NULL
);

CREATE TABLE categories (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	title varchar(255) NOT NULL,
	description varchar(255) NOT NULL
);

CREATE TABLE comments (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	author_id bigint REFERENCES users (id) ON DELETE CASCADE,
	post_id bigint REFERENCES posts (id) ON DELETE CASCADE,
	publish_date timestamp NOT NULL,
	content text NOT NULL
);

CREATE TABLE like_post (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	id_post bigint REFERENCES posts (id) ON DELETE CASCADE,
	author_id bigint REFERENCES users (id) ON DELETE CASCADE,
	publish_date timestamp NOT NULL,
	type boolean NOT NULL
);

CREATE TABLE like_comments (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	id_comment bigint REFERENCES comments (id) ON DELETE CASCADE,
	author_id bigint REFERENCES users (id) ON DELETE CASCADE,
	publish_date timestamp NOT NULL,
	type BOOLEAN NOT NULL
);


CREATE TABLE post_category (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	id_post bigint REFERENCES posts (id) ON DELETE CASCADE,
	id_category bigint REFERENCES categories (id) ON DELETE CASCADE
);
