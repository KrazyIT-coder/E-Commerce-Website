/*JavaScript*/

document.addEventListener("DOMContentLoaded", function () {

  // Get the HTML elements
  const searchInput = document.getElementById("faqSearch");
  const faqList = document.getElementById("faqList");
  const faqItems = faqList.querySelectorAll("details");
  const buttons = document.querySelectorAll(".categories .cat.btn");

  // Set the starting category
  let activeCategory = "all";

  // Assign a category to each question
  const categories = {
    q1: "general",
    q2: "products",
    q3: "contact",
    q4: "products",
    q5: "general"
  };

  // Categories follow the order of the HTML buttons
  const buttonCategories = ["all", "products", "contact"];

  // Create a message for when no questions match
  const noResults = document.createElement("p");
  noResults.textContent = "No questions found. Try a different keyword or category.";
  noResults.style.textAlign = "center";
  noResults.style.color = "#665d55";
  noResults.style.display = "none";
  faqList.appendChild(noResults);

  // Function to search and filter questions
  function filterQuestions() {

    const keyword = searchInput.value.toLowerCase();
    let count = 0;

    faqItems.forEach(function (question) {

      const text = question.textContent.toLowerCase();

      const matchesSearch = text.includes(keyword);

      const matchesCategory =
        activeCategory === "all" ||
        categories[question.id] === activeCategory;

      if (matchesSearch && matchesCategory) {
        question.style.display = "";
        count++;
      } else {
        question.style.display = "none";
        question.removeAttribute("open");
      }

    });

    // Show the message if there are no matching questions
    if (count === 0) {
      noResults.style.display = "block";
    } else {
      noResults.style.display = "none";
    }
  }

  // Add a click event to each category button
  buttons.forEach(function (button, index) {

    button.addEventListener("click", function () {

      activeCategory = buttonCategories[index];

      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      filterQuestions();
    });

  });

  // Search while the user types
  searchInput.addEventListener("input", filterQuestions);

});
