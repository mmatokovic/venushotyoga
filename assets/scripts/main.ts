//@ts-nocheck
import "instant.page";
import "autotrack";
import Swiper from "swiper/bundle";

const togglers = document.getElementsByClassName("hamburger");
for (const toggle of togglers) {
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("is-active");
    });
}

const hamburger = document.getElementById("hamburger-btn");
const mobile = document.getElementById("mobile-menu");
const open = document.getElementById("open");
const notopen = document.getElementById("notopen");
if (hamburger != null) {
  hamburger.addEventListener('click', () => {
    mobile.toggleAttribute("hidden");
    open.toggleAttribute("hidden");
    notopen.toggleAttribute("hidden");
  });
}

document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 32,
      autoplay: {
        delay: 8000,
      },
      navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
      },
      breakpoints: {
        640: {
          slidesPerView: 1.5,
          centeredSlides: true,
        },
        1024: {
          centeredSlides: false,
          slidesPerView: 2.25,
        },
      },
    })
})

window.addEventListener('scroll', function() {

  let btt = document.getElementById('btt');

  if (window.scrollY >= 1080) {
      btt.classList.remove('hidden');
      btt.classList.add('block');
  } else {
      btt.classList.add('hidden');
      btt.classList.remove('block');
  }

});

document.addEventListener("DOMContentLoaded", () => {
    for (const e of document.getElementsByClassName("js-only")) {
        e.classList.remove("js-only");
    }
    const recipes = document.querySelectorAll("#artlist #post");
    const search = document.getElementById("search");
    const oldheading = document.getElementById("newest-posts");
    const artlist = document.getElementById("artlist");
    
    if (search) {
      search.addEventListener("input", () => {
          // grab search input value
          const searchText = search.value.toLowerCase().trim().normalize('NFD').replace(/\p{Diacritic}/gu, "");
          const searchTerms = searchText.split(" ");
          const hasFilter = searchText.length > 0;
      
          artlist.classList.toggle("list-searched", hasFilter);
          oldheading.classList.toggle("hidden", hasFilter);
      
          // for each recipe hide all but matched
          recipes.forEach(recipe => {
          const searchString = `${recipe.textContent} ${recipe.dataset.tags}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "");
          const isMatch = searchTerms.every(term => searchString.includes(term));
      
          recipe.hidden = !isMatch;
          recipe.classList.toggle("matched-recipe", hasFilter && isMatch);
          })
      })
    }
})