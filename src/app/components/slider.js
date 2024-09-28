export class Slider {
  slideCounter = 1
  transition = 'transform 0.4s ease'

  constructor() {
    const slider = document.querySelector('.slider')
    const slides = slider.children
    const sliderNav = document.querySelector('.slider__nav')
    const sliderIndicators = sliderNav.children
    const prevSlideButton = document.querySelector('.slider__arrow--left')
    const nextSlideButton = document.querySelector('.slider__arrow--right')

    const firstSlideClone = this.makeClone(slides[0], 'slider-end')
    const lastSlideClone = this.makeClone(
      slides[slides.length - 1],
      'slider-end'
    )

    slider.append(firstSlideClone)
    slider.prepend(lastSlideClone)

    window.addEventListener('load', () => {
      const resizeObserver = new ResizeObserver((slide) => {
        this.slideSize = slide[0].borderBoxSize[0].inlineSize
        console.log(this.slideSize, slide)

        this.moveSlider(slider, 'none')
      })

      resizeObserver.observe(slides[0])
    })

    nextSlideButton.addEventListener('click', () => {
      if (this.slideCounter >= slides.length - 1) {
        sliderIndicators[sliderIndicators.length - 1].classList.remove(
          'current-slide'
        )
        return
      }

      sliderIndicators[this.slideCounter - 1].classList.remove('current-slide')

      this.slideCounter++

      if (slides[this.slideCounter].classList.contains('slider-end')) {
        sliderIndicators[0].classList.add('current-slide')
      } else {
        sliderIndicators[this.slideCounter - 1].classList.add('current-slide')
      }

      this.moveSlider(slider)
    })

    prevSlideButton.addEventListener('click', () => {
      if (this.slideCounter <= 0) {
        sliderIndicators[0].classList.remove('current-slide')
        return
      }

      sliderIndicators[this.slideCounter - 1].classList.remove('current-slide')

      this.slideCounter--

      if (slides[this.slideCounter].classList.contains('slider-end')) {
        sliderIndicators[2].classList.add('current-slide')
      } else {
        sliderIndicators[this.slideCounter - 1].classList.add('current-slide')
      }

      this.moveSlider(slider)
    })

    slider.addEventListener('transitionend', () => {
      if (slides[this.slideCounter].classList.contains('slider-end')) {
        this.slideCounter = Math.abs(this.slideCounter - 3)
        this.moveSlider(slider, 'none')
      }
    })
  }

  makeClone(node, className) {
    const clone = node.cloneNode(true)
    if (className) clone.classList.add(`${className}`)
    return clone
  }

  moveSlider(slider, transition = this.transition) {
    slider.style.transition = transition
    slider.style.transform =
      'translateX(' + -this.slideSize * this.slideCounter + 'px)'
  }
}
