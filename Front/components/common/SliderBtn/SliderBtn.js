import './SliderBtn.css'

const sliderBtn = (onchecked) => {
  /* create tags */
  const BtnTemplate = `
  <div id="slider-btn">
    <label class="toggle">
      <input type="checkbox" id="check">
      <span class="slider">
    </label>
    </span>
    <p>Dark</p>
  </div>
  `

  return BtnTemplate
}

export default sliderBtn
