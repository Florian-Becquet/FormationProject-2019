let current_slide = 0;
/* global btn_slideshow_previous, slideshow_container, slideshow */
btn_slideshow_previous.addEventListener('click', function () {

    if (current_slide === 0) {
        current_slide = slideshow_container.children.length - 1;
        slideshow_container.classList.remove('smooth');
        slideshow_container.scrollLeft = current_slide * slideshow_container.getBoundingClientRect().width;
        slideshow_container.classList.add('smooth');
    }
    current_slide = Math.max(0, --current_slide);
    slideshow_container.scrollLeft = current_slide * slideshow_container.getBoundingClientRect().width;
    focus_button(current_slide);
});

btn_slideshow_next.addEventListener('click', function () {
    if (Math.round(slideshow_container.scrollLeft / slideshow_container.getBoundingClientRect().width) === slideshow_container.children.length - 1) {
        // console.log("on est à la fin");
        current_slide = 0;
        slideshow_container.classList.remove('smooth');
        slideshow_container.scrollLeft = 0;
        slideshow_container.classList.add('smooth');
    }
    current_slide = Math.min(slideshow_container.children.length, ++current_slide);
    slideshow_container.scrollLeft = current_slide * slideshow_container.getBoundingClientRect().width;
    focus_button(current_slide);
});

// console.log(slideshow_container.children);
Array.from(slideshow_container.children).forEach(function (figure, index) {
    let button = document.createElement('button');
    button.innerText = figure.dataset.title;
    button.dataset.slide = index.toString();
    button.classList.toggle('focus', index ===  0);
    nav_slideshow.appendChild(button);

    button.addEventListener('click', function () {
        current_slide = parseInt(this.dataset.slide);
        slideshow_container.scrollLeft = current_slide * slideshow_container.getBoundingClientRect().width;
        focus_button(current_slide);
    });
});

slideshow_container.appendChild(slideshow_container.children[0].cloneNode(true));

function focus_button(index) {
    Array.from(nav_slideshow.children).forEach(function(el ,id) {
        el.classList.toggle('focus', id === index || (index === nav_slideshow.children.length && id === 0));
    });
}
const slideshow_play = function () {
    btn_slideshow_next.dispatchEvent(new MouseEvent('click'));
};

let si = setInterval(slideshow_play, 3500);

slideshow.addEventListener('mouseenter', function() {
    clearInterval(si);
});

slideshow.addEventListener('mouseleave', function () {
    si = setInterval(slideshow_play, 3500);
})
