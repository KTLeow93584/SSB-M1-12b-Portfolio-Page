import { testimonials } from "./testimonial-list.js";

const avatarBaseProjectURL = "images/avatars";
const carouselItemListElement = document.getElementById("testimonial-carousel-item-list");
const carouselButtonListElement = document.getElementById("testimonials-carousel-nav");
const carouselPlaceholderItemElement = document.getElementById("testimonial-placeholder");

let currentCarouselElementIndex = 0;
let cachedNumberOfElementsPerPage = 0;
const carouselIntervalDuration = 10000;

export function loadTestimonials() {
  currentCarouselElementIndex = 0;
  resizeTestimonialCarousel();

  if (!carouselPlaceholderItemElement.classList.contains("hidden"))
    carouselPlaceholderItemElement.classList.add("hidden");
}

export function resizeTestimonialCarousel() {
  let elementListHTMLResult = "";
  let buttonListHTMLResult = "";
  // ====================
  const screenWidth = window.innerWidth;
  const screenWidthThresholds = [
    // Small (< or = or >) = 1 element per section.
    768,
    // Medium (>) = 2 elements per section.
    1024,
    // Large (>) = 3 elements per section.
    1270,
    // Xtra Large (>) = 4 elements per section.
    1526,
    // XXtra Large (>) = 5 elements per section.
    1782
  ];

  // Debug
  //console.log("Screen Width: " + screenWidth + ", Screen Height: " + screenHeight);
  // ====================
  // Minimum number of elements per page: 1
  let numberOfElementsPerPage = Math.max(screenWidthThresholds.reduce((total, number) => number < screenWidth ? total + 1 : total, 0), 1);

  // Only execute recalibration when diff. screen width thresholds are met.
  if (cachedNumberOfElementsPerPage != numberOfElementsPerPage) {
    cachedNumberOfElementsPerPage = numberOfElementsPerPage;

    const numberOfPages = Math.ceil(testimonials.length/numberOfElementsPerPage);
    const currentPage = Math.floor(currentCarouselElementIndex/numberOfElementsPerPage);

    // Debug
    //console.log("Number of Elements Per Page: " + numberOfElementsPerPage);
    //console.log("Number of Pages: " + numberOfPages);
    //console.log("Current Element Index: " + currentCarouselElementIndex);
    //console.log("Current Page: " + currentPage);
    // ====================
    const elementWidthPerc = (100/numberOfElementsPerPage) - (2/numberOfElementsPerPage);

    // Debug
    //console.log("Element Width (% of area): " + elementWidthPerc);
    // ====================
    for (let i = 0; i < numberOfPages; ++i) {
      elementListHTMLResult += `
        <div id="testimonial-carousel-item-${i}"
          class="px-3 carousel-item ${i == currentPage ? "active" : ""}"
          data-bs-interval="${carouselIntervalDuration}">
            <div class="row">
      `;
      
      buttonListHTMLResult += `
        <button type="button" onclick="moveToPage(${i},${i * numberOfElementsPerPage})" 
          data-bs-target="#testimonials-carousel" data-bs-slide-to="${i}" 
          class="${i == currentPage ? "active" : ""}"
          aria-current="${i == currentPage ? "true" : "false"}"
          aria-label="Slide ${i + 1}">
        </button>
      `;

      for (let j = 0; j < numberOfElementsPerPage; ++j) {
        const index = (i * numberOfElementsPerPage) + j;
        if (index >= testimonials.length)
          break;
        
        const testimonial = testimonials[index];
        
        elementListHTMLResult += `
          <div id="testimonial-content-${i}" 
            class="column d-flex flex-column justify-content-evenly 
              testimonial-content-box ps-5 pe-2 pt-3 pb-2 mx-auto my-3" 
            style="width:${elementWidthPerc}%;">

            <div class="quotation-container">
              <i class="fas fa-quote-left quotation-mark"></i>
            </div>

            <blockquote class="testimonial-content-blockquote">
              ${testimonial.quote}
            </blockquote>
  
            <div class="d-flex align-items-center testimonial-content-info">
              <img src="${avatarBaseProjectURL}/${testimonial.imageSrc}" alt="" 
                height="120px" class="rounded-circle">
                
              <div class="align-items-center justify-content-center ms-2 me-1">
                <p class="my-0 py-0">${testimonial.name}</p>
                <small class="mt-2">${testimonial.companyPosition}</small>
              </div>
            </div>
          </div>
        `;

        // Debug
        //console.log("Testimonial #" + index);
      }

      elementListHTMLResult += `
          </div>
        </div>
      `;
    }
    
    carouselItemListElement.innerHTML = elementListHTMLResult;
    carouselButtonListElement.innerHTML = buttonListHTMLResult;
  }
  // ====================
}

export function moveToPage(pageIndex, newElementStartIndex) {
  currentCarouselElementIndex = newElementStartIndex;

  // Debug
  //console.log("Moving to another page [" + pageIndex + "], Carousel Element Index Starts at [" + newElementStartIndex +"].");
}