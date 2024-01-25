import { loadExperienceSection } from "./experience.js";
import { loadTestimonials, resizeTestimonialCarousel, moveToPage } from "./testimonial.js";
import { loadPortfolios } from "./portfolio.js";
import { loadBlogPostSection } from "./blog.js";
// ================================================
const rootElement = document.querySelector(":root");
const settingsPanelElement = document.getElementById("settings-panel");
const dlModeLabel = document.getElementById("dark-mode-switch-label");
const dlModeCheckbox = document.getElementById("flex-switch-screen-mode");

const lightModeBGMainColor = "#ffffff";
const lightModeBGSubColor = "#fafafa";
const lightModeBorderColor = "#f4f4f4";
const lightModeTextColor = "#000000";
const lightModeDesc = "Dark Mode Disabled";

const darkModeBGMainColor = "#1e1e1e";
const darkModeBGSubColor = "#212121";
const darkModeBorderColor = "#1f1f1f";
const darkModeTextColor = "#ffffff";
const darkModeDesc = "Dark Mode Enabled";
// ================================================
function onLoadPage() {
  loadExperienceSection();
  loadTestimonials();
  loadPortfolios();
  loadBlogPostSection();
  
  swapToDarkMode();
  dlModeCheckbox.checked = true;
}
// ================================================
function onResizePage() {
  resizeTestimonialCarousel();
}

function onSwitchSettingsButtonState() {
  if (!settingsPanelElement.classList.contains("active"))
    settingsPanelElement.classList.add("active");
  else
    settingsPanelElement.classList.remove("active");
}

function onChangeThemeColor(colorHex) {
  // ".match" returns the string "colorHex" into an array of strings.
  // E.g. #ff00ff -> ff00ff (filter out 1st character) -> [ff, 00, ff].
  // .{1, 2} regex groups the first 2 occurences/pair of characters.
  // parseInt(x, 16), "x" is the element mapped from iterating the resultant array.
  // While "16" is the base number system specified.
  const colorParsed = colorHex.substring(1).match(/.{1,2}/g).map(x => parseInt(x, 16));
  const colorRGB = {
    red: colorParsed[0],
    blue: colorParsed[1],
    green: colorParsed[2]
  };

  const isColorLight = isLightColor(colorRGB);
  const textColor = isColorLight ? "black" : "white";

  // Debug
 // console.log("Light Color Flag: " + isColorLight + ", Result: " + textColor);
  
  rootElement.style.setProperty("--core-theme-color", colorHex);
  rootElement.style.setProperty("--core-interactable-elements-color", textColor);
}

function onChangeDarkLightMode() {
  dlModeLabel.textContent === lightModeDesc ? swapToDarkMode() : swapToLightMode();
}

// Start with Light Mode
function swapToLightMode() {
  const root = document.querySelector(":root");
  dlModeLabel.textContent = lightModeDesc;

  root.style.setProperty("--core-text-color", lightModeTextColor);
  root.style.setProperty("--core-bg-main-color", lightModeBGMainColor);
  root.style.setProperty("--core-bg-sub-color", lightModeBGSubColor);
  root.style.setProperty("--core-border-color", lightModeBorderColor);
}

// Start with Dark Mode
function swapToDarkMode() {
  const root = document.querySelector(":root");
  dlModeLabel.textContent = darkModeDesc;

  root.style.setProperty("--core-text-color", darkModeTextColor);
  root.style.setProperty("--core-bg-main-color", darkModeBGMainColor);
  root.style.setProperty("--core-bg-sub-color", darkModeBGSubColor);
  root.style.setProperty("--core-border-color", darkModeBorderColor);
}
// ================================================
// Function to determine if a color is light or dark.
// Note: Obtained when querying with ChatGPT on dynamic text color adjustment
// based on background color brightness.
// E.g. [Dark BG = Light Text] and vice verse.
function isLightColor(colorRGB) {
  // This Formula Source:
  // https://medium.com/sketch-app-sources/mixing-colours-of-equal-luminance-part-2-3e10c07c947c
  //let brightness = parseInt(colorRGB.red) * 0.299;
  //brightness += parseInt(colorRGB.green) * 0.587;
  //brightness += parseInt(colorRGB.blue) * 0.114;

  // Alternative luminance calculation. Based on ITU-R BT.709.
  // https://en.wikipedia.org/wiki/Rec._709
  let brightness = parseInt(colorRGB.red) * 0.2126;
  brightness += parseInt(colorRGB.green) * 0.7152;
  brightness += parseInt(colorRGB.blue) * 0.0722;

  // Debug
  console.log("Resultant Luminance/Brightness: " + brightness);

  // This would cause yellow (72) and orange (66) to be recorded as a dark color.
  //return brightness > 128;
  return brightness > 75;
}
// ================================================
window.onLoadPage = onLoadPage;
window.onResizePage = onResizePage;
window.moveToPage = moveToPage;
window.onSwitchSettingsButtonState = onSwitchSettingsButtonState;
window.onChangeThemeColor = onChangeThemeColor;
window.onChangeDarkLightMode = onChangeDarkLightMode;
// ================================================