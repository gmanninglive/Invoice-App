## Vie Invoice App

This is a [Next.js](https://nextjs.org/) and [MongoDb](https://www.mongodb.com/) project.


Using TailwindCss for styling.
Auth0 for Authentication.
Chartjs for Data Visualisation.
And Framer Motion for Animation.

## Getting Started

First Set up a mongodb Atlas Database and an Auth0 account.

Follow their tutorials to get started.

Then make a .env file with the following:

```bash
AUTH_SECRET=****
PORT=3000

AUTH0_SECRET=****
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL=****
AUTH0_CLIENT_ID=****
AUTH0_CLIENT_SECRET=****

MONGODB_URI=****
DB_NAME=****
```

-------------------------------------------

Then run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
