function slider({container, slide, nextArrow, prevArrow, total, current, wrapper, track}) {
    // slider
    const slider = document.querySelector(container);
    const sliderTrack = document.querySelector(track);
    const sliderWrapper = document.querySelector(wrapper);
    const slides = slider.querySelectorAll(slide);
    const btnNext = slider.querySelector(nextArrow);
    const btnPrev = slider.querySelector(prevArrow);
    const indicatorCurrent = slider.querySelector(current);
    const indicatorTotal = slider.querySelector(total);
    let slideIndex = 1;
    let sliderOffset = 0;
    const sliderWidth = window.getComputedStyle(sliderWrapper).width;

    // slider on transform
    sliderTrack.style.cssText = `width: ${100 * slides.length}%; display: flex; transition: 0.5s all;`;
    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = sliderWidth;
    });

    if (slides.length > 10) {
        indicatorTotal.textContent = slides.length;
    } else {
        indicatorTotal.textContent = `0${slides.length}`;
    }

    const dotsWrapper = document.createElement('div');
    dotsWrapper.classList.add('carousel-indicators');
    slider.append(dotsWrapper);

    const dots = [];

    slides.forEach((slide, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-slide', i + 1);
        if (i === 0) {
            dot.style.opacity = '1';
        }
        dotsWrapper.append(dot);
        dots.push(dot);
    });

    changeSliderIndicator();

    slider.addEventListener('click', (e) => {
        let target = e.target;
        const currentOffset = +sliderWidth.replace(/\D/gi, '');

        if (target && target === btnNext) {

            if (sliderOffset === currentOffset * (slides.length - 1)) {
                sliderOffset = 0;
            } else {
                sliderOffset += currentOffset;
            }

            if (slideIndex === slides.length) {
                slideIndex = 1;
            } else {
                slideIndex++;
            }

            moveSlider(sliderOffset);
            changeSliderIndicator();
            changeActiveDot();
        }

        if (target && target === btnPrev) {

            if (sliderOffset === 0) {
                sliderOffset = currentOffset * (slides.length - 1)
            } else {
                sliderOffset -= currentOffset;
            }

            if (slideIndex === 1) {
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            moveSlider(sliderOffset);
            changeSliderIndicator();
            changeActiveDot();
        }

        if (target && target.hasAttribute('data-slide')) {
            const slideTo = target.getAttribute('data-slide');
            slideIndex = slideTo;
            sliderOffset = currentOffset * (slideTo - 1);

            moveSlider(sliderOffset);
            changeSliderIndicator();
            changeActiveDot();
        }

    });

    function moveSlider(sliderOffset) {
        sliderTrack.style.transform = `translateX(-${sliderOffset}px)`;
    }

    function changeActiveDot() {
        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        })
        dots[slideIndex - 1].style.opacity = '1';
    }

    function changeSliderIndicator() {
        if (slides.length > 10) {
            indicatorCurrent.textContent = slideIndex;
        } else {
            indicatorCurrent.textContent = `0${slideIndex}`;
        }
    }
}

export default slider;