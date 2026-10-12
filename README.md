# Vite + PHP + Tailwind CSS

A minimal starter for using [Vite](https://vite.dev/) and [Tailwind CSS v4](https://tailwindcss.com/) with plain PHP.

PHP renders the page, while Vite builds the CSS and JavaScript assets. In development, the PHP helper automatically uses the Vite dev server when it is running; in production, it reads Vite's generated manifest.

## Requirements

- A current LTS version of Node.js and npm
- PHP (to serve the project locally)

## Getting started

Install the JavaScript dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

In another terminal, serve the PHP application from the project directory:

```bash
php -S localhost:8000
```

Open [http://localhost:8000](http://localhost:8000). Vite hot-reloads CSS and JavaScript; Tailwind also detects utility classes added to PHP files without a manual rebuild.

## Project structure

```text
├── index.php              # Example PHP page
├── includes/vite.php      # Development/production asset tags helper
├── resources/
│   ├── css/app.css        # Tailwind entry point and theme tokens
│   └── js/app.js          # JavaScript entry point
├── public/
│   ├── hot                # Created while Vite runs in development
│   └── build/             # Generated production assets
└── vite.config.js         # Vite, Tailwind, and PHP integration settings
```

## Production build

Generate versioned production assets:

```bash
npm run build
```

Vite writes the output and manifest to `public/build`. When `public/hot` is absent, `vite_tags()` in `includes/vite.php` loads the assets declared in that manifest.

Deploy the generated `public/build` directory alongside the PHP files, and make sure `/public/build` is accessible from the site's web root.

## Customization

- Edit `index.php` to change the PHP markup.
- Add styles or Tailwind theme tokens in `resources/css/app.css`.
- Add JavaScript in `resources/js/app.js`.
- PHP files are registered as Tailwind content sources through `@source "../../**/*.php"`, so new utility classes are detected automatically.

## Environment variables

The Vite server defaults to `localhost:5173`. Override either value when needed:

```bash
VITE_HOST=127.0.0.1 VITE_PORT=5174 npm run dev
```
