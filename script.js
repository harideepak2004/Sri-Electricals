/* WHY CHOOSE US SLIDER */
(function () {

  const track = document.getElementById("whyTrack");
  if (!track) return;

  const cards = Array.from(track.children);
  const visibleWhy = 3;
  let indexWhy = visibleWhy;

  cards.slice(-visibleWhy).forEach(c => track.prepend(c.cloneNode(true)));
  cards.slice(0, visibleWhy).forEach(c => track.append(c.cloneNode(true)));

  const cardWidth = track.children[0].offsetWidth + 30;
  track.style.transform = `translateX(-${indexWhy * cardWidth}px)`;

  window.moveWhy = function (dir) {
    indexWhy += dir;
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${indexWhy * cardWidth}px)`;
  };

  track.addEventListener("transitionend", () => {
    if (indexWhy >= cards.length + visibleWhy) {
      indexWhy = visibleWhy;
      track.style.transition = "none";
      track.style.transform = `translateX(-${indexWhy * cardWidth}px)`;
    }
    if (indexWhy <= 0) {
      indexWhy = cards.length;
      track.style.transition = "none";
      track.style.transform = `translateX(-${indexWhy * cardWidth}px)`;
    }
  });

})();


/* TESTIMONIAL SLIDER */
(function () {

  const tTrack = document.getElementById("testimonialTrack");
  if (!tTrack) return;

  const tCards = Array.from(tTrack.children);
  const visibleTestimonial = 2;
  let tIndex = visibleTestimonial;

  tCards.slice(-visibleTestimonial).forEach(c =>
    tTrack.prepend(c.cloneNode(true))
  );
  tCards.slice(0, visibleTestimonial).forEach(c =>
    tTrack.append(c.cloneNode(true))
  );

  const cardWidth = tTrack.children[0].offsetWidth + 60;
  tTrack.style.transform = `translateX(-${tIndex * cardWidth}px)`;

  window.moveTestimonial = function (dir) {
    tIndex += dir;
    tTrack.style.transition = "transform 0.5s ease";
    tTrack.style.transform = `translateX(-${tIndex * cardWidth}px)`;
  };

  tTrack.addEventListener("transitionend", () => {
    if (tIndex >= tCards.length + visibleTestimonial) {
      tIndex = visibleTestimonial;
      tTrack.style.transition = "none";
      tTrack.style.transform = `translateX(-${tIndex * cardWidth}px)`;
    }
    if (tIndex <= 0) {
      tIndex = tCards.length;
      tTrack.style.transition = "none";
      tTrack.style.transform = `translateX(-${tIndex * cardWidth}px)`;
    }
  });

})();
