-- Database schema for Parmanand Sports Academy

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL,
    permissions_json JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    photo_url VARCHAR(255),
    sport_id INTEGER REFERENCES sports(id),
    batch_id INTEGER,
    joining_date DATE NOT NULL
);

CREATE TABLE sports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    fee_structure_json JSONB NOT NULL,
    skill_levels_json JSONB NOT NULL
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    amount DECIMAL(10,2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id),
    batch_id INTEGER,
    date DATE NOT NULL,
    present BOOLEAN NOT NULL,
    marked_by INTEGER REFERENCES users(id)
);
