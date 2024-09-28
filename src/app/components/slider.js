export class Slider {
  slideCounter = 1
  transition = 'transform 0.4s ease'
  startX = 0
  endX = 0
  threshold = 50

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

    this.setupResizeObserver(slider, slides)

    slider.addEventListener('touchstart', this.handleTouchStart.bind(this))
    slider.addEventListener('touchmove', this.handleTouchMove.bind(this))
    slider.addEventListener(
      'touchend',
      this.handleTouchEnd.bind(this, slider, slides, sliderIndicators)
    )

    nextSlideButton.addEventListener('click', () =>
      this.changeSlide(slider, slides, sliderIndicators, 'next')
    )
    prevSlideButton.addEventListener('click', () =>
      this.changeSlide(slider, slides, sliderIndicators, 'prev')
    )

    slider.addEventListener('transitionend', () => {
      if (slides[this.slideCounter].classList.contains('slider-end')) {
        this.slideCounter = Math.abs(this.slideCounter - 3)
        this.moveSlider(slider, 'none')
      }
    })
  }

  setupResizeObserver(slider, slides) {
    window.addEventListener('load', () => {
      const resizeObserver = new ResizeObserver((slide) => {
        this.slideSize = slide[0].borderBoxSize[0].inlineSize
        this.moveSlider(slider, 'none')
      })
      resizeObserver.observe(slides[0])
    })
  }

  makeClone(node, className) {
    const clone = node.cloneNode(true)
    if (className) clone.classList.add(`${className}`)
    return clone
  }

  moveSlider(slider, transition = this.transition) {
    slider.style.transition = transition
    slider.style.transform = `translateX(${-this.slideSize * this.slideCounter}px)`
  }

  handleTouchStart(event) {
    this.startX = event.touches[0].clientX
  }

  handleTouchMove(event) {
    this.endX = event.touches[0].clientX
  }

  handleTouchEnd(slider, slides, sliderIndicators) {
    const distance = this.startX - this.endX
    if (distance > this.threshold) {
      this.changeSlide(slider, slides, sliderIndicators, 'next')
    } else if (distance < -this.threshold) {
      this.changeSlide(slider, slides, sliderIndicators, 'prev')
    }
  }

  changeSlide(slider, slides, sliderIndicators, direction) {
    if (direction === 'next') {
      if (this.slideCounter >= slides.length - 1) {
        sliderIndicators[sliderIndicators.length - 1].classList.remove(
          'current-slide'
        )
        return
      }
      this.updateSlideCounter(1, slides, sliderIndicators)
    }

    if (direction === 'prev') {
      if (this.slideCounter <= 0) {
        sliderIndicators[0].classList.remove('current-slide')
        return
      }
      this.updateSlideCounter(-1, slides, sliderIndicators)
    }

    this.moveSlider(slider)
  }

  updateSlideCounter(change, slides, sliderIndicators) {
    sliderIndicators[this.slideCounter - 1].classList.remove('current-slide')
    this.slideCounter += change

    if (slides[this.slideCounter].classList.contains('slider-end')) {
      const targetIndex = change > 0 ? 0 : sliderIndicators.length - 1
      sliderIndicators[targetIndex].classList.add('current-slide')
    } else {
      sliderIndicators[this.slideCounter - 1].classList.add('current-slide')
    }
  }
}
