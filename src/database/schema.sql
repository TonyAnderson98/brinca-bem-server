CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(16) NOT NULL DEFAULT 'user' CHECK(role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE toys(
  id SERIAL PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(64) NOT NULL,
  condition VARCHAR(32) NOT NULL CHECK(condition IN ('new', 'used')),
  status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'available', 'reserved', 'donated')),
  image_url VARCHAR(255),
  user_id INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  CONSTRAINT fk_toys_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_toys_user_id ON toys(user_id);

CREATE INDEX idx_toys_user_id ON toys(user_id);

