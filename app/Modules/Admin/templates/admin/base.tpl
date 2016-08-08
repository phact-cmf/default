<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    {* Title, description, keywords *}
    {block 'seo'}{/block}

    {* Another head information *}
    {block 'head'}{/block}

    <link rel="stylesheet" href="/static/frontend/css/main.css">
    <script src="/static/frontend/js/main.js"></script>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="row">
                <div class="column large-12">
                    <div class="header-inner">
                        <div class="row">
                            <div class="column large-2">
                                <div class="header-block v-align">
                                    <div>
                                        <a href="/" class="logo">
                                            <img src="/static/frontend/images/base/logo.png" alt="">
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="column large-10">
                                <div class="header-block v-align">
                                    <div>
                                        <ul class="main-menu justify">
                                            <li>
                                                <a href="#">Index</a>
                                            </li>
                                            <li>
                                                <a href="#">News</a>
                                            </li>
                                            <li>
                                                <a href="#">Articles</a>
                                            </li>
                                            <li>
                                                <a href="#">About</a>
                                            </li>
                                            <li>
                                                <a href="#">Contacts</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        {block 'content-header'}
            <div class="content-header">
                <div class="row">
                    <div class="column large-12">
                        {block 'heading'}
                        {/block}
                    </div>
                </div>
            </div>
        {/block}

        <div id="main">
            {block 'main'}
                <div class="main-content">
                    {block 'before-content'}

                    {/block}

                    <div class="row">
                        <div class="column large-12">
                            {block 'content'}

                            {/block}
                        </div>
                    </div>

                    {block 'after-content'}

                    {/block}
                </div>
            {/block}
        </div>

        <div id="push"></div>
    </div>
    <footer id="footer">
        <div class="row">
            <div class="column large-12">
                <div class="footer-inner">
                    <div class="row">
                        <div class="column large-4">
                            <div class="footer-block v-align">
                                <div>
                                    Компания <br/>
                                    Все права защищены &copy; {'now'|date:"Y"}
                                </div>
                            </div>
                        </div>
                        <div class="column large-4">
                            &nbsp;
                        </div>
                        <div class="column large-4">
                            <div class="footer-block v-align text-right">
                                <div>
                                    Разработано в <a href="http://hashstudio.ru">#hashstudio</a> <br/>
                                    &copy; {'now'|date:"Y"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    {block 'wrapper'}

    {/block}

    {block 'js'}

    {/block}
</body>
</html>