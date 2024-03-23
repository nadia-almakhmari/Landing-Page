/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


const navBar = document.querySelector('.navbar__menu');
const navList = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');
const footer = document.querySelector('footer');
const header = document.querySelector('.page__header');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Assuming that 'navList' is an empty <ul> element

// Create a document fragment to append list items
const fragment = document.createDocumentFragment();

// Loop through each section and create a list item for each
sections.forEach((section, index) => {
  const listItem = document.createElement('li');
  const link = document.createElement('a');

  // Set the link text to be the section's data-nav attribute
  link.textContent = section.getAttribute('data-nav');

  // Set the href attribute of the link to the corresponding section's id
  link.setAttribute('href', `#${section.id}`);

  // Add an event listener to scroll to the clicked section
  link.addEventListener('click', (event) => {
    event.preventDefault();
    section.scrollIntoView({ behavior: 'smooth' });
  });

  // Append the link to the list item, and the list item to the fragment
  listItem.appendChild(link);
  fragment.appendChild(listItem);
});

// Append the fragment to the navigation list
navList.appendChild(fragment);



// Options for the Intersection Observer
const options = {
  threshold: 0.5 // Adjust the threshold based on your requirement
};

// Callback function to handle the intersection changes
const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    const sectionId = entry.target.id;
    const correspondingNavItem = document.querySelector(`a[href="#${sectionId}"]`);

    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      correspondingNavItem.classList.add('active');
    } else {
      entry.target.classList.remove('active');
      correspondingNavItem.classList.remove('active');
    }
  });
};

// Create an Intersection Observer with the callback and options
const observer = new IntersectionObserver(handleIntersection, options);

// Observe each section
sections.forEach((section) => {
  observer.observe(section);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
// Update active section on scroll
document.addEventListener('scroll', () => {
  let currentActiveSection = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    // Adjust the following condition based on your requirement
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      currentActiveSection = section;
    }
  });

  // Remove 'active' class from all sections and corresponding nav items
  sections.forEach((section) => {
    section.classList.remove('active');
    const correspondingNavItem = document.querySelector(`a[href="#${section.id}"]`);
    if (correspondingNavItem) {
      correspondingNavItem.classList.remove('active');
      correspondingNavItem.classList.remove('highlighted');

    }
  });

  // Add 'active' class to the currently active section and corresponding nav item
  if (currentActiveSection) {
    currentActiveSection.classList.add('active');
    const correspondingNavItem = document.querySelector(`a[href="#${currentActiveSection.id}"]`);
    if (correspondingNavItem) {
      correspondingNavItem.classList.add('active');
      correspondingNavItem.classList.add('highlighted');


    }
  }
});


let timeout;

// Function to show the navbar
const showNavbar = () => {
  const navbar = document.querySelector('.navbar__menu');
  navbar.style.display = 'block';

  // Reset the timeout
  clearTimeout(timeout);

  // Set a new timeout to hide the navbar after 5 seconds of inactivity
  timeout = setTimeout(() => {
    navbar.style.display = 'none';
  }, 5000);
};

// Show the navbar initially
showNavbar();

// Add event listeners for user interaction to show the navbar
document.addEventListener('mousemove', showNavbar);
document.addEventListener('scroll', showNavbar);
document.addEventListener('click', showNavbar);


// Create a "Go Up" button element
const goUpButton = document.createElement('button');
goUpButton.textContent = 'Go Up';
goUpButton.classList.add('go-up-button');
document.body.appendChild(goUpButton);

// Event listener for the "Go Up" button
goUpButton.addEventListener('click', () => {
  document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Event listener for scrolling to show/hide the "Go Up" button
document.addEventListener('scroll', () => {
  // Show the button if the user has scrolled down, hide otherwise
  if (window.scrollY > 0) {
    goUpButton.style.display = 'block';
  } else {
    goUpButton.style.display = 'none';
  }
});



