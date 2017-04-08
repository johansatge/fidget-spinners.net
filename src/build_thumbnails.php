<?php

array_shift($argv);
foreach($argv as $argv)
{
  $brand = rtrim(getcwd(), '/') . '/images/spinners/' . $argv;
  echo 'Looking for images in ' . $brand . '/*.jpg' . "\n";
  $models = glob($brand . '/*.jpg');
  foreach($models as $model)
  {
    if (preg_match('#_thumb\.jpg$#', $model)) continue;
    if (preg_match('#_thumb\@2x.jpg$#', $model)) continue;
    if (is_readable(str_replace('.jpg', '_thumb.jpg', $model)))
    {
      echo 'Skipping ' . $model . "\n";
      continue;
    }
    optimize_image($model);
    build_thumbnail($model, str_replace('.jpg', '_thumb.jpg', $model), 200, 200);
    build_thumbnail($model, str_replace('.jpg', '_thumb@2x.jpg', $model), 400, 400);
  }
}

function build_thumbnail($source_path, $dest_path, $dest_width, $dest_height)
{
  echo 'Generating ' . $dest_path . "\n";
  list($source_width, $source_height) = getimagesize($source_path);
  $base_image = imagecreatefromjpeg($source_path);
  $resized_image = imagecreatetruecolor($dest_width, $dest_height);
  imagecopyresampled($resized_image, $base_image, 0, 0, 0, 0, $dest_width, $dest_height, $source_width, $source_height);
  imagejpeg($resized_image, $dest_path, 100);
  optimize_image($dest_path);
}

function optimize_image($path)
{
  echo 'Optimizing ' . $path;
  exec('jpegoptim ' . $path . ' --max=82 --strip-all', $output);
  echo ' (' . round(filesize($path) / 1000) . 'Kb)' . "\n";
}
