--Employee CRUD 

DROP TABLE IF EXISTS employees;

-- Create employees table 

CREATE TABLE employees(
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    employee_email VARCHAR(255) NOT NULL UNIQUE,
    employee_phone VARCHAR(20) NOT NULL UNIQUE,
    employee_status SMALLINT NOT NULL DEFAULT 1,
    employee_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    employee_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function for auto update timestamp

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.employee_updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update timestamp on update
DO $$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_trigger WHERE tgname = 'set_timestamp') THEN
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON employees
        FOR EACH ROW
        EXECUTE FUNCTION update_timestamp();
        END IF;
END;
$$;

--Indexes for faster search

CREATE INDEX index_employee_phone ON employees(employee_phone);