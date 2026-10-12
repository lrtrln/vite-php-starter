<?php

declare(strict_types=1);

function vite_tags(string $entry = 'resources/js/app.js'): string
{
    $root = dirname(__DIR__);
    $hotFile = $root . '/public/hot';

    if (is_file($hotFile)) {
        $server = rtrim(trim((string) file_get_contents($hotFile)), '/');

        if ($server !== '') {
            return sprintf(
                '<script type="module" src="%1$s/@vite/client"></script>' . "\n" .
                '<script type="module" src="%1$s/%2$s"></script>',
                htmlspecialchars($server, ENT_QUOTES, 'UTF-8'),
                htmlspecialchars($entry, ENT_QUOTES, 'UTF-8')
            );
        }
    }

    $manifestFile = $root . '/public/build/.vite/manifest.json';

    if (!is_file($manifestFile)) {
        return '';
    }

    $manifest = json_decode((string) file_get_contents($manifestFile), true);
    $asset = $manifest[$entry] ?? null;

    if (!is_array($asset)) {
        return '';
    }

    $tags = [];
    foreach ($asset['css'] ?? [] as $css) {
        $tags[] = '<link rel="stylesheet" href="/public/build/' . htmlspecialchars($css, ENT_QUOTES, 'UTF-8') . '">';
    }

    if (isset($asset['file'])) {
        $tags[] = '<script type="module" src="/public/build/' . htmlspecialchars($asset['file'], ENT_QUOTES, 'UTF-8') . '"></script>';
    }

    return implode("\n", $tags);
}
