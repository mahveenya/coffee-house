export class HeroButtonAnimation {
  constructor() {
    this.btn = document.querySelector('.hero_btn')
    this.btn_svg = this.btn.querySelector('.btn_svg')
    this.btn_text = this.btn.querySelector('.btn_text')

    const handleHover = (action) => {
      this.btn_svg.classList[action]('btn_svg__displayed')
      this.btn_text.classList[action]('btn_text__shifted')
    }

    this.btn.addEventListener('mouseover', () => handleHover('add'))
    this.btn.addEventListener('mouseout', () => handleHover('remove'))
  }
}
