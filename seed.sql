-- populate table with seed data 
INSERT INTO users
(name, email, password)
VALUES
('Rose', 'rose@gmail.com', 'password');

INSERT INTO users
(name, email, password)
VALUES
('Alice', 'alice@gmail.com', 'password');

INSERT INTO users
(name, email, password)
VALUES
('Tom', 'tom@gmail.com', 'password');

INSERT INTO vouchers
(value, expiry_date, created_at, redeemed, user_id, company_id)
VALUES
('10', '10/10/2018', '10/9/2018', 'No', 1, 1);

INSERT INTO vouchers
(value, expiry_date, created_at, redeemed,  user_id, company_id)
VALUES
('10', '10/10/2018', '10/9/2018', 'No', 1, 1);

INSERT INTO vouchers
(value, expiry_date, created_at, redeemed, user_id, company_id)
VALUES
('20', '10/10/2018', '10/9/2018', 'No', 1, 2);

INSERT INTO vouchers
(value, expiry_date, created_at, redeemed, user_id, company_id)
VALUES
('20', '10/10/2018', '10/9/2018', 'No', 2, 1);

INSERT INTO vouchers
(value, expiry_date, created_at, redeemed, user_id, company_id)
VALUES
('50', '10/10/2018', '10/9/2018', 'No', 2, 1);

INSERT INTO vouchers
(value, expiry_date, created_at, redeemed, user_id, company_id)
VALUES
('20', '01/10/2018', '01/9/2018', 'No', 1, 2);

INSERT INTO company
(company_name, company_image, shop_listing)
VALUES
('NTUC', '/fairprice.jpeg', 'https://www.google.com.sg/maps/search/NTUC/');

INSERT INTO company
(company_name, company_image, shop_listing)
VALUES
('Takashimaya', '/takashimaya.png', 'https://www.google.com.sg/maps/search/takashimaya/');


