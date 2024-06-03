import './SliderBtn.css'

const sliderBtn = () => {
  /* create tags */
  const BtnTemplate = `
  <div id="slider-btn">
    <label class="toggle">
      <input type="checkbox" id="check" onchange="${Themes()}" >
      <span class="slider">
    </label>
    </span>
    <p>Dark</p>
  </div>
  `

  return BtnTemplate
}

function Themes() {
  if (this) {
    console.log('checked')
  } else {
    console.log('unchecked')
  }
}
export default sliderBtn
