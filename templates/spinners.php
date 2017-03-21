<div class="main">
  <input class="js-search" value="" type="text">
  <?php foreach($models as $model) : ?>
    <div class="item js-item" data-search="<?php echo strtolower($model['brand']['name']) . ' ' . strtolower($model['name']) ?> ">
      <a href="assets/images/spinners/<?php echo $model['brand']['id'] . '/' . $model['file']; ?>">
        <img class="pic" src="assets/images/spinners/<?php echo $model['brand']['id'] . '/' . str_replace('.jpg', '_thumb.jpg', $model['file']); ?>" alt="<?php echo $model['name']; ?>">
      </a>
      <div class="info">
        <a class="brand" href="<?php echo $model['brand']['url']; ?>" target="_blank">
          <?php echo $model['brand']['name']; ?>
        </a>
        <span class="model">
          <?php echo $model['name']; ?>
        </span>
        <?php if ($model['price'] != '?') : ?>
          <span class="price">
            <?php echo $model['price']; ?>$
          </span>
        <?php endif; ?>
      </div>
    </div>
  <?php endforeach; ?>
</div>
