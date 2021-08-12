Sample Contact App
==================

This is a sample project for a simple React-driven contact list app.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

Setup
-----

```sh
npm install
```

Create a `.env.local` file:
```
SECRET_COOKIE_PASSWORD=<some secret key>
```

Running the Development Server
------------------------------

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Running the Production Server
-----------------------------

```sh
npm run start
```
