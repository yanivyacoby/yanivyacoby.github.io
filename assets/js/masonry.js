$(document).ready(function() {
  // Init Masonry
  var $grid = $('.grid').masonry({
    gutter: 10,
    horizontalOrder: true,
    itemSelector: '.grid-item',
  });

  function relayout() { $grid.masonry('layout'); }

  // Re-layout after each image loads (cards have no reserved image height).
  $grid.imagesLoaded().progress(relayout);

  // Web fonts (e.g. Roboto) load async and change the card text height after the
  // initial layout — without this the grid height stays stale and the last card
  // overlaps whatever follows it. Re-layout once fonts settle, and once more
  // after everything else has loaded, as a safety net.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(relayout);
  }
  $(window).on('load', relayout);
});
