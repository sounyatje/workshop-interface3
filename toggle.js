const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const footer = document.querySelector('footer');
    footer.classList.toggle('dark-mode');
});

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const footer = document.querySelector('footer');
    footer.classList.toggle('dark-mode');
}


// Get the button for back to top
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  console.log("top");
}

