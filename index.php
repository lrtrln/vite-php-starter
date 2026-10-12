<?php require __DIR__ . '/includes/vite.php'; ?>
<!doctype html>
<html lang="fr" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vite + PHP + Tailwind</title>
  <?= vite_tags() ?>
</head>
<body class="min-h-screen bg-stone-50 text-slate-900">
  <main class="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-16">
    <section>
      <p class="mb-3 text-sm font-semibold tracking-widest text-brand uppercase">Starter</p>
      <h1 class="text-4xl font-bold tracking-tight sm:text-6xl">Vite, PHP et Tailwind CSS v4.</h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
        Modifie ce fichier ou <code class="rounded bg-slate-200 px-1.5 py-0.5 text-sm">resources/css/app.css</code> : la page se met à jour à chaud.
      </p>
    </section>
  </main>
</body>
</html>
