<div class="main">
  <div class="filters">
    <span class="sort">
      <span class="js-sort-label label"></span>
      <svg class="sort-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 444.819 444.819" xml:space="preserve">
        <path d="M434.252,114.203l-21.409-21.416c-7.419-7.04-16.084-10.561-25.975-10.561c-10.095,0-18.657,3.521-25.7,10.561
        L222.41,231.549L83.653,92.791c-7.042-7.04-15.606-10.561-25.697-10.561c-9.896,0-18.559,3.521-25.979,10.561l-21.128,21.416
        C3.615,121.436,0,130.099,0,140.188c0,10.277,3.619,18.842,10.848,25.693l185.864,185.865c6.855,7.23,15.416,10.848,25.697,10.848
        c10.088,0,18.75-3.617,25.977-10.848l185.865-185.865c7.043-7.044,10.567-15.608,10.567-25.693
        C444.819,130.287,441.295,121.629,434.252,114.203z">
      </svg>
      <select class="js-sort-select">
        <option value="">Sort by company</option>
        <option value="" selected>Sort by date added</option>
        <option value="">Sort by price ($ → $$)</option>
        <option value="">Sort by price ($$ → $)</option>
      </select>
    </span>
    <input class="js-search search" value="" type="text" placeholder="Search a model or brand...">
    <svg class="search-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 56.966 56.966" xml:space="preserve">
      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
      s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
      c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
      s-17-7.626-17-17S14.61,6,23.984,6z">
    </svg>
  </div>
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
