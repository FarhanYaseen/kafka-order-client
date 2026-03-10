# Kafka Order Client

A React front-end for submitting and tracking orders, backed by the Kafka Order Backend.

## Tech Stack

- **React 18** — UI framework
- **Material UI (MUI 5)** — Component library
- **Formik** + **Yup** — Form management and validation
- **Axios** — HTTP client

## Prerequisites

- Node.js 18+
- [kafka-order-backend](https://github.com/FarhanYaseen/kafka-order-backend) running on port 3000

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_API_URL` | `http://localhost:3000` | Backend API base URL |

### 3. Start the development server

```bash
npm start
```

Opens at [http://localhost:3001](http://localhost:3001).

### 4. Production build

```bash
npm run build
```

Output is in the `build/` directory, ready to be served by any static file server (Nginx, S3, Vercel, etc.).

## Project Structure

```
kafka-order-client/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── api/
│   │   └── orderService.js     # Axios calls to the backend API
│   ├── components/
│   │   └── OrderForm.js        # Order form with validation and feedback
│   ├── App.js                  # Root component
│   └── index.js                # React DOM entry point
├── .env.example                # Environment variable template
└── package.json
```

## Features

- **Order form** — customer name, items, and total with client-side validation
- **Real-time feedback** — success alert with order ID, or descriptive error from the API
- **Loading state** — skeleton animation while the request is in flight
- **Environment-based config** — API URL set via `REACT_APP_API_URL`, no hardcoded URLs

## Running Tests

```bash
npm test
```
