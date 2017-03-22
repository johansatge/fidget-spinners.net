<?php if (php_sapi_name() != 'cli') exit('No');

$brands = glob('assets/images/spinners/*', GLOB_ONLYDIR);
foreach($brands as $brand)
{
  $models = glob($brand . '/*.jpg');
  foreach($models as $model)
  {
    if (preg_match('#_thumb\.jpg$#', $model)) continue;
    echo 'Generating ' . $model . "\n";
    list($width, $height) = getimagesize($model);
    $base_image = imagecreatefromjpeg($model);
    $resized_image = imagecreatetruecolor(220, 220);
    imagecopyresampled($resized_image, $base_image, 0, 0, 0, 0, 220, 220, $width, $height);
    imagejpeg($resized_image, str_replace('.jpg', '_thumb.jpg', $model), 100);
  }
}
