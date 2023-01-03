CREATE TABLE IF NOT EXISTS users(
    id              INT(5) NOT NULL,
    username        VARCHAR(15) NOT NULL,
    password        VARCHAR(255) NOT NULL,
    fullname        VARCHAR(100) NOT NULL
)ENGINE='InnoDB';