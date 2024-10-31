CREATE TABLE maitasks (
    id SERIAL PRIMARY KEY,
    flat_number INTEGER,
    device TEXT,
    error_code INTEGER,
    repair_status TEXT,
    repair_measure TEXT,
    employee TEXT,
    time_ticket_created TEXT,
    time_eta TEXT,
    resident_message TEXT,
    visible BOOLEAN
)
