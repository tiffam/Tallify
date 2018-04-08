CREATE TABLE IF NOT EXISTS users( 
	id SERIAL PRIMARY KEY, 
	name varchar(255) NOT NULL, 
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS vouchers(
	id SERIAL PRIMARY KEY,
	value INTEGER NOT NULL,
	expiry_date DATE,
	created_at DATE DEFAULT current_timestamp,
	redeemed varchar(255),
	remarks TEXT,
	user_id INTEGER,
	company_id INTEGER,
	voucher_type TEXT
);

CREATE TABLE IF NOT EXISTS company (
	id SERIAL PRIMARY KEY,
	company_name varchar(255) NOT NULL,
	company_image varchar(255) NOT NULL,
	shop_listing TEXT
);

