create database vital_care_group_dev;

use vital_care_group_dev;

CREATE TABLE IF NOT EXISTS users(
    id int primary key auto_increment not null unique,
    user_code varchar(255) not null unique,
    fullname varchar(255) not null,
    username varchar(255) not null unique,
    email varchar(255) not null unique,
    password varchar(255) not null,
    last_login varchar(255) not null default current_timestamp,
    role enum('administrator', 'receptionist', 'doctor', 'nurse', 'pharmacist', 'subscriber') default "subscriber",
    is_active tinyint(1) default 1,
    is_deleted tinyint(0) default 0,

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS categories(
    id int primary key auto_increment not null unique,
    title varchar(255) not null,
    slugs varchar(255) not null unique,
    description text,
    author_id int not null,
    is_active tinyint(1) default 1,
    is_deleted tinyint(0) default 0,

    foreign key(author_id) references users(id),

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS tags(
    id int primary key auto_increment not null unique,
    title varchar(255) not null,
    slugs varchar(255) not null unique,
    description text,
    author_id int not null,

    foreign key(author_id) references users(id),

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS blogs(
    id int primary key auto_increment not null unique,
    title varchar(255) not null,
    slugs varchar(255) not null unique,
    category_id int not null,
    tags JSON null,
    author_id int not null,
    featured_image varchar(255) not null,
    short_description varchar(50) not null,
    description JSON,
    seo JSON null,

    foreign key(author_id) references users(id),
    foreign key(category_id) references categories(id),

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS services(
    id int primary key auto_increment not null unique,
    title varchar(255) not null,
    description varchar(255) not null,
    featured_image text not null,
    author_id int not null,

    foreign key(author_id) references users(id),

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS contacts(
    id int primary key auto_increment not null unique,
    fullname varchar(255) not null,
    email varchar(255) not null,
    subject varchar(255) not null,
    message text not null,
    status enum('pending', 'read', 'unread', 'archive') default 'pending', 

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS appointment_booking(
    id int primary key auto_increment not null unique,
    fullname varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    address varchar(255) not null,
    date_of_visit timestamp not null,
    type_of_service varchar(255) not null,
    message_notes text,
    status enum("pending", "read", "unread", "archive") default "pending",
    is_deleted tinyint(1) default 0,

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS testimonials(
    id int primary key auto_increment not null unique,
    fullname varchar(255) not null,
    description varchar(255) not null,
    rating bigint default 3,

    is_active tinyint(1) default 1,
    is_deleted tinyint(1) default 0,

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS career(
    id int primary key auto_increment not null unique,
    title varchar(255) not null,
    slug varchar(255) not null unique,
    tags JSON not null,
    short_description varchar(100) not null,
    responsibilities JSON not null,
    requirements JSON not null,
    author_id int not null,

    foreign key(author_id) references users(id),

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);

CREATE TABLE IF NOT EXISTS career_cv(
    id int primary key auto_increment not null unique,
);

CREATE TABLE IF NOT EXISTS career_recepients(
    id int primary key auto_increment not null unique,
    career_id int not null,
    fullname varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    employment_type enum("full-time", "part-time", "casual", "internship") default "full-time",
    salary decimal(10,2) default 100,
    message varchar(255) not null,
    status enum("pending", "contact", "hired", "rejected") default "pending",

    foreign key(career_id) references career(id),

    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);