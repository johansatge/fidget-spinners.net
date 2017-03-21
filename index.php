<?php

$route = !empty($_GET['route']) ? trim($_GET['route'], '/') : false;

if (empty($route))
{
  $models = [];
  $brands = json_decode(file_get_contents('assets/json/spinners.json'), true);
  foreach($brands as $brand_id => $brand)
  {
    foreach($brand['models'] as $model)
    {
      $model['brand'] = [
        'id'   => $brand_id,
        'name' => $brand['name'],
        'name' => $brand['name'],
        'url'  => $brand['url'],
      ];
      $models[] = $model;
    }
  }
  ob_start();
  require 'templates/spinners.php';
  $current = 'spinners';
  $page = ob_get_clean();
}
else if ($route == 'faq')
{
  $current = 'faq';
  $page = '@todo FAQ';
}
else if ($route == 'contact')
{
  $current = 'contact';
  $page = '@todo contact';
}
else
{
  header('HTTP/1.0 404 Not Found');
  echo 'Not found.';
  exit;
}

?>

<!DOCTYPE HTML>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <link href="//fonts.googleapis.com/css?family=Open+Sans:400" rel="stylesheet" type="text/css" media="all">
    <link href="assets/css/styles.css" rel="stylesheet" type="text/css">
    <link rel="icon" type="image/png" href="assets/css/images/favicon.png?v1">
    <meta name="viewport" content="width=device-width">
  </head>
  <body>
    <div class="topbar">
      <h1>
        Fidget Spinners.
      </h1>
      <ul>
        <li class="<?php echo $current == 'spinners' ? 'current' : ''; ?>">
          <a href=".">Spinners</a>
        </li>
        <li class="<?php echo $current == 'faq' ? 'current' : ''; ?>">
          <a href="faq">FAQ</a>
        </li>
        <li class="<?php echo $current == 'contact' ? 'current' : ''; ?>">
          <a href="contact">Contact</a>
        </li>
      </ul>
    </div>
    <?php echo $page; ?>
    <script src="assets/js/scripts.js"></script>
    <script>
      App.init()
    </script>
  </body>
</html>
