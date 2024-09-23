// import { App } from "./app/app.js";

// new App()

const slider = document.querySelector('.slider')
let slides = slider.children
const prevSlideButton = slider.querySelector('.slider__arrow--left')
const nextSlideButton = slider.querySelector('.slider__arrow--right')

const firstSlideClone = slides[0].cloneNode(true)
const lastSlideClone = slides[slides.length - 1].cloneNode(true)

slider.append(firstSlideClone)
slider.prepend(lastSlideClone)

let slideNumber = 1

window.addEventListener('load', () => {
  const resizeObserver = new ResizeObserver((slide) => {
    const slideSize = slide[0].borderBoxSize[0].inlineSize
    console.log(slideSize, slide)

    slider.style.transform = 'translateX(' + -slideSize * slideNumber + 'px)'
  })

  resizeObserver.observe(slides[0])
})
