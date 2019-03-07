-- Defines the Schema of the database tables

-- Schema of the flights table
CREATE TABLE flights (
  flightId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  plane_model ENUM('A320', 'A330', 'A350'),
  msn INT NOT NULL,
  harness_length DECIMAL(5, 2) NOT NULL,
  gross_weight DECIMAL(5, 2) NOT NULL,
  atmospheric_pressure DECIMAL(5, 2) NOT NULL,
  room_temperature DECIMAL(5, 2) NOT NULL,
  fuel_capacity_left_wing DECIMAL(5, 2) NOT NULL,
  fuel_capacity_right_wing DECIMAL(5, 2) NOT NULL,
  fuel_quantity_left_wing DECIMAL(5, 2) NOT NULL,
  fuel_quantity_right_wing DECIMAL(5, 2) NOT NULL,
  maximum_reachable_altitude DECIMAL(5, 2) NOT NULL,

  flight_no VARCHAR(10) NOT NULL,
  source_airport VARCHAR(300) NOT NULL,
  destination_airport VARCHAR(300) NOT NULL,
  take_off_time DATETIME NOT NULL,
  landing_time DATETIME NOT NULL,
  created DATETIME NOT NULL DEFAULT NOW()
);

ALTER TABLE flights AUTO_INCREMENT = 10000;

-- Schema of the newsfeed table
CREATE TABLE newsfeed (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content VARCHAR(300) NOT NULL,
  created DATETIME NOT NULL DEFAULT NOW()
);

ALTER TABLE newsfeed AUTO_INCREMENT = 10000;
