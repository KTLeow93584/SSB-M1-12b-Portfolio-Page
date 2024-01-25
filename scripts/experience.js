import { experienceList } from "./experience-list.js";

// Max Column Size for Bootstrap to Overflow: 12.
const sizePerColumn = 3;
const maxSizePerRow = 12;

export function loadExperienceSection() {
  const experienceElement = document.getElementById("experiences-group");
  
  // Start of Row
  let result = `<div class="row">`;
  let currentColumnSize = 0;

  for (const experience of experienceList) {
    result += `
      <div class="col-lg-${sizePerColumn} ps-2 pe-5 m-0">
        ${experience.headerHTML}
        <p class="fs-5 mt-2 base-text">${experience.name}</p>
        <p class="base-text">${experience.description}</p>
      </div>
    `;
    
    currentColumnSize += sizePerColumn;
    // Create New Row if reached limit.
    if (currentColumnSize >= maxSizePerRow) {
      currentColumnSize = 0;
      result += `
        </div>
        <div class="row">
      `;
    }
  }
  // End of Row
  result += `</div>`;

  experienceElement.innerHTML += result;
}