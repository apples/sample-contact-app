Sample Contact App
==================

This is a sample project for a simple React-driven contact list app.

Security
--------

No public access to the app is permitted. Users must be authorized.

This app uses [next-iron-session](https://github.com/vvo/next-iron-session) to authorize users.
Under the hood, it uses [@hapi/iron](https://github.com/hapijs/iron), which is very similar to an encrypted JWT.

Features
--------

- Encapsulated backend API. Since the business requirements are so simple, creating something like an ASP.NET Web API would be overkill.
- API provides a list of persons, including the following info:
    - Name – first, middle, last, suffix (e.g., Jr., Sr., III)
    - Date of Birth – display as m/d/yyyy
    - Addresses – one to many relationship; i.e. home, mailing, work
    - Email Address
        - Adds an extra "IsValid" column to the grid that says if the Email Address is valid or not, according to standard email address validation rules.
- The fronted displays that info in a table.
    - The table supports paging and sorting.
    - The table supports filtering on Date of Birth using “From” and “To” dates.
