
const port = 3000;
//Categories Dropdown
const category_button = document.getElementById("category_button");
const drop_category = document.getElementById('drop_category');
const sub_menu = document.getElementsByClassName('sub_menu');
if (category_button) {
  category_button.addEventListener('mouseover', async function() {
    category_button.classList.add('focus');
    await new Promise(resolve => {
      drop_category.classList.add('show');
      drop_category.classList.remove('hidden');
      setTimeout(resolve, 100);
    });
});
}
  //Categories Dropdown stop showing dropdown when hovering on other items
  document.addEventListener('mouseover', async function(event) {
    if (!category_button.contains(event.target)&&!drop_category.contains(event.target)&&!sub_menu[0].contains(event.target)) {
      if (category_button.classList.contains('focus')) {
        category_button.classList.remove('focus');
      };
      await new Promise(resolve => {
        if (drop_category.classList.contains('show')) {
          drop_category.classList.remove('show');
          drop_category.classList.add('hidden');
          setTimeout(resolve, 200);
        } else {
          resolve();
        }
      });
    }
  });
//Brands Dropdown
const brand_button = document.getElementById("brand_button");
const drop_brand = document.getElementById('drop_brand');
if (brand_button) {
  brand_button.addEventListener('mouseover', async function() {
    brand_button.classList.add('focus');
    await new Promise(resolve => {
      drop_brand.classList.add('show');
      drop_brand.classList.remove('hidden');
      setTimeout(resolve, 100);
    });
});
}
  //Categories Dropdown stop showing dropdown when hovering on other items
  document.addEventListener('mouseover', async function(event) {
    if (!brand_button.contains(event.target)&&!drop_brand.contains(event.target)&&!sub_menu[0].contains(event.target)) {
      if (brand_button.classList.contains('focus')) {
        brand_button.classList.remove('focus');
      };
      await new Promise(resolve => {
        if (drop_brand.classList.contains('show')) {
          drop_brand.classList.remove('show');
          drop_brand.classList.add('hidden');
          setTimeout(resolve, 200);
        } else {
          resolve();
        }
      });
    }
  });

//Slideshow Feature
const container = document.getElementById('slide_container');
let length;
//For the background of the slides
fetch('/api/length')  
  .then(response => response.json())
  .then(length => {
    for (let i = 0; i < length; i++) {
      let slide = document.createElement('div');
      container
        .appendChild(slide)
        .classList.add('slide_item')
      document.getElementsByClassName('slide_item')[0].classList.add('onstage')
      document.getElementsByClassName('slide_item')[i]
        .style.backgroundImage = `url('http://localhost:3000/slide_backgrounds/slide${i+1}.jpg')`
    }
  })

  //For the slides to actually slide
  const slide = document.getElementsByClassName('slide_item');
  const rightButton = document.getElementsByClassName('arrow_right')
  rightButton[0].addEventListener('click', async function() {
    let n = 0;
    for (let i = 0; i < slide.length; i++) {
      if (slide[i].classList.contains('onstage_left')||slide[i].classList.contains('onstage')||slide[i].classList.contains('onstage_right')) {
        slide[i].classList.remove('onstage');
        slide[i].classList.remove('onstage_left');
        slide[i].classList.add('right_wing');
        if (i == 0) {
          n = slide.length - 1
        } else {n = i - 1};
      } else {slide[i].classList.remove('right_wing')}
      slide[i].classList.remove('left_wing');
      slide[i].classList.remove('onstage_right');
    }
    await new Promise(resolve => {
      slide[n].classList.add('onstage_left');
      slide[n].classList.remove('right_wing');
      setTimeout(resolve, 500);
    });
  });

  const leftButton = document.getElementsByClassName('arrow_left')
  leftButton[0].addEventListener('click', async function() {
    let n = 0;
    for (let i = 0; i < slide.length; i++) {
      if (slide[i].classList.contains('onstage_right')||slide[i].classList.contains('onstage')||slide[i].classList.contains('onstage_left')) {
        slide[i].classList.remove('onstage');
        slide[i].classList.remove('onstage_right');
        slide[i].classList.add('left_wing');
        if (i == slide.length - 1) {
          n = 0
        } else {n = i + 1};
      } else {slide[i].classList.remove('left_wing');}
      slide[i].classList.remove('right_wing');
      slide[i].classList.remove('onstage_left');
    };
    await new Promise(resolve => {
      slide[n].classList.add('onstage_right');
      slide[n].classList.remove('left_wing');
      setTimeout(resolve, 500);
    });
  })

