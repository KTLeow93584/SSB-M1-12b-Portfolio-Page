import { portfolios } from "./portfolio-list.js";

const portfolioThumbnailsBaseProjectURL = "images/portfolio-thumbnails";
const portfolioGroupElement = document.getElementById("portfolio-list");

export function loadPortfolios() {
  let result = ""
  for (let i = 0; i < portfolios.length; ++i) {
    const portfolio = portfolios[i];
    
    result += `
      <div id="portfolio-project-${i}" class="col-md-6 col-lg-4 mb-1 portfolio">    
        <div class="row">
          <div class="col-12 col-xl-5 portfolio-description"">
            <img src="${portfolioThumbnailsBaseProjectURL}/${portfolio.imageSrc}" alt=""
              class="portfolio-thumbnail">
          </div>
          <div class="col-12 col-xl-7 portfolio-description"">
            <p class="fs-2 thin-underline base-text">${portfolio.name}</p>
            <p class="base-text">${portfolio.description}</p>
            <small>Project Type: ${portfolio.projectType}</small>
          </div>
          
          <div class="col-12 portfolio-masked-group">
            <a href="${portfolio.url}" class="btn btn-info" target="_blank">View Project Site</a>
          </div>
        </div>
      </div>
    `;
  }
  
  portfolioGroupElement.innerHTML += result;
}