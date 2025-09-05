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
    status enum("draft", "pending", "published"),
    featured_image varchar(255) not null,
    short_description text not null,
    description JSON,
    seo JSON null,
    is_deleted tinyint(1) default 0,

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

CREATE TABLE IF NOT EXISTS teams(
    id int primary key auto_increment not null unique,
    fullname varchar(255) not null,
    designation varchar(255) not null,
    profile_image varchar(255) not null,
    status enum('active', 'inactive') default 'active',
    
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

CREATE TABLE IF NOT EXISTS career_recepients(
    id int primary key auto_increment not null unique,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null,
    position_applied varchar(255) not null,
    experience_level varchar(255) not null,
    suburb varchar(255) not null,
    is_driver tinyint(1) not null,
    resume varchar(255) not null,
    cover_letter varchar(255) not null,
    supporting_document varchar(255) not null,
    status enum("pending", "contact", "hired", "rejected") default "pending",
    createdAt timestamp default current_timestamp,
    updatedAt timestamp default current_timestamp on update current_timestamp
);