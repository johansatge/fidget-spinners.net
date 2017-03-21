<div class="main">
  <?php foreach($models as $model) : ?>
    <div class="item">
      <img class="pic" src="assets/images/<?php echo $model['brand']['id'] . '/' . $model['file']; ?>" alt="<?php echo $model['name']; ?>">
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
