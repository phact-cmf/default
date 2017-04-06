<?php

return [
    [
        'route' => '/sitemap',
        'path' => 'Modules.Sitemap.routes',
        'namespace' => 'sitemap'
    ],
    [
        'route' => '',
        'path' => 'Modules.Main.routes',
        'namespace' => 'main'
    ],
    [
        'route' => '/admin',
        'path' => 'Modules.Admin.routes',
        'namespace' => 'admin'
    ],
    [
        'route' => '/admin/files',
        'path' => 'Modules.Files.routes',
        'namespace' => 'files'
    ],
    [
        'route' => '/admin/editor',
        'path' => 'Modules.Editor.routes',
        'namespace' => 'editor'
    ],
];