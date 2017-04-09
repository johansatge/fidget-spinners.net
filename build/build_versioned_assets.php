<?php

$html = file_get_contents('dist/index.html');
$images = get_images();
foreach($images as $image_path)
{
  $hash = hash_file('md5', 'dist/' . $image_path);
  $image_path_hash = preg_replace('#\.(jpg|png)$#', '.' . $hash . '.$1', $image_path);
  rename('dist/' . $image_path, 'dist/' . $image_path_hash);
  $html = str_replace($image_path, $image_path_hash, $html);
}
file_put_contents('dist/index.html', $html);

function get_images()
{
  $images = array_merge([], get_base_images(), get_spinner_images());
  return array_map(function($path)
  {
    return preg_replace('#^dist\/#', '', $path);
  }, $images);
}

function get_base_images()
{
  return glob('dist/images/*.{jpg,png}', GLOB_BRACE);
}

function get_spinner_images()
{
  $images = [];
  $brands = glob('dist/images/spinners/*', GLOB_ONLYDIR);
  foreach($brands as $brand)
  {
    $images = array_merge($images, glob($brand . '/*.{jpg,png}', GLOB_BRACE));
  }
  return $images;
}
