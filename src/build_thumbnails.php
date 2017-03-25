<?php

array_shift($argv);
foreach($argv as $argv)
{
  $brand = rtrim(getcwd(), '/') . '/public/images/spinners/' . $argv;
  echo 'Looking for images in ' . $brand . '/*.jpg' . "\n";
  $models = glob($brand . '/*.jpg');
  foreach($models as $model)
  {
    if (preg_match('#_thumb\.jpg$#', $model)) continue;
    echo 'Generating ' . $model . "\n";
    list($width, $height) = getimagesize($model);
    $base_image = imagecreatefromjpeg($model);
    $resized_image = imagecreatetruecolor(200, 200);
    imagecopyresampled($resized_image, $base_image, 0, 0, 0, 0, 200, 200, $width, $height);
    imagejpeg($resized_image, str_replace('.jpg', '_thumb.jpg', $model), 100);
  }
}
