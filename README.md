# User Dashboard App (Vue 3 + Pinia + Vite)

This project is a user dashboard built with Vue 3, TypeScript, Pinia, and Vite. It fetches and displays user data from an external API and supports search, sorting, and pagination through a modular and maintainable architecture.

## Features

### User Dashboard

- Displays a list of users retrieved from an external API.
- Table-based layout with dynamic data.
- Sidebar navigation with a clear layout.

### State Management

- Centralized state using Pinia.
- Stores user data, loading states, search input, pagination state, and sorting configuration.
- Efficient filtering, sorting, and paginating using computed properties and reactive logic.

### Search, Sort, and Pagination

- Full-text search across all fields.
- Sortable columns with toggle between ascending and descending order.
- Pagination with options to display 5 or 10 rows per page.

## Project Structure

- Vue 3 with Composition API and TypeScript
- Pinia for state management
- Vite for build tooling and local development
- Tailwind CSS for styling

## Getting Started

Install dependencies and run the project:

```bash
npm install && npm run dev or yarn && yarn dev
```
