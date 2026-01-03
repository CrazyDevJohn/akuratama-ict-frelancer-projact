const filtersContainer = document.querySelector(".filters--container");
const classContainer = document.querySelector(".class-container");

const fetchTheCourseByGrade = async ({ grade, div }) => {
  const grades = filtersContainer.childNodes;

  grades.forEach((gradeElement) => {
    gradeElement.classList.remove("active");
  });

  div.classList.add("active");

  // it not developed in backned yet

  // const res = await axios.get(`"https://a51765b7-f73d-4e77-834a-3ef9f3335267-00-3i95ktytocixz.pike.replit.dev:3000/api/v2/"/course/grade/${grade}`);
};

const genFilters = (grade) => {
  const div = document.createElement("div");
  div.classList.add("filter");
  div.innerHTML = `
  <h1>${grade.toString()}</h1>
  `;

  filtersContainer.appendChild(div);

  div.addEventListener("click", () => {
    fetchTheCourseByGrade({ grade, div });
  });
};

(async function () {
  const fetchedGrades = [
    "Grade1",
    "Grade2",
    "Grade3",
    "Grade4",
    "Grade5",
    "Grade6",
    "Grade7",
  ];

  fetchedGrades.forEach((grade) => genFilters(grade));
})();

const genCards = () => {
  const card = document.createElement("div");
  card.classList.add("class--card");
  card.innerHTML = `
  <img src="../image.png" alt="class image" class="class--image" />
  <h2 class="class--title">Mathematics for Grade 1</h2>
  <p class="class--instructor">by John Doe</p>
  <div class="class--info">
    <span class="class--price">$49.99</span>
    <button class="enroll--button">Enroll Now</button>
  </div>
  `;

  classContainer.appendChild(card);
};

(async function () {
  // Simulate fetching courses from an API
  const fetchedCourses = [
    { title: "Mathematics for Grade 1", instructor: "John Doe", price: 49.99 },
    { title: "Science for Grade 2", instructor: "Jane Smith", price: 59.99 },
    { title: "History for Grade 3", instructor: "Emily Johnson", price: 39.99 },
  ];

  fetchedCourses.forEach(() => genCards());
})();
