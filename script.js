const icInput = document.getElementById("icNumber");
const genderField = document.getElementById("gender");
const fullNameInput = document.getElementById("fullName");
const courseSelect = document.getElementById("course");
const greetingText = document.getElementById("greeting");
const courseMessage = document.getElementById("courseMessage");
const form = document.getElementById("registrationForm");

function ValidIC(ic) {
  if (ic.length !== 12) return false;
  for (let i = 0; i < ic.length; i++) {
    if (ic[i] < '0' || ic[i] > '9') return false;
  }
  return true;
}

icInput.addEventListener("input", () => {
  const ic = icInput.value;

  if (ValidIC(ic)) {
    const lastDigit = parseInt(ic[ic.length - 1]);
    const gender = (lastDigit % 2 === 0) ? "Female" : "Male";
    genderField.value = gender;

    const name = fullNameInput.value.toUpperCase();
    const prefix = (gender === "Male") ? "Mr." : "Ms.";
    greetingText.textContent = `Welcome, ${prefix} ${name}!`;
  } else {
    genderField.value = "";
    greetingText.textContent = "";
  }
});

courseSelect.addEventListener("change", () => {
  const course = courseSelect.value;
  let message = "";

  switch (course) {
    case "Web Development":
      message = "Get ready to design amazing websites!";
      break;
    case "Mobile App":
      message = "Build powerful apps for Android and iOS.";
      break;
    case "Database":
      message = "Learn how to manage and secure data.";
      break;
    case "Cybersecurity":
      message = "Defend systems from digital threats.";
      break;
  }

  courseMessage.textContent = message;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = fullNameInput.value.toUpperCase();
  const ic = icInput.value;
  const course = courseSelect.value;
  const agreed = document.getElementById("terms").checked;

  if (!ValidIC(ic)) {
    Swal.fire({
        title: "Incorrect Input",
        text: "IC Number must be exactly 12 digits and numbers only.",
        icon: "error"
      });
      return;
  }

  const birthYear = parseInt(ic.substring(0, 2), 10);
  const currentYear = new Date().getFullYear();
  const fullYear = birthYear > 30 ? 1900 + birthYear : 2000 + birthYear;
  const age = currentYear - fullYear;

  if (age < 17) {
    Swal.fire({
        title: "You are bocil.",
        text: "You must be at least 17 years old to register.",
        icon: "error"
      });
      return;
  }

  if (!agreed) {
    Swal.fire({
        title: "Does not agree",
        text: "You must agree to the Terms and Conditions.",
        icon: "warning"
      });
      return;
  }

  const lastDigit = parseInt(ic[ic.length - 1]);
  const gender = (lastDigit % 2 === 0) ? "Female" : "Male";
  const prefix = (gender === "Male") ? "Mr." : "Ms.";
  const greeting = `Welcome, ${prefix} ${fullName}!`;

  // Registration Fee
  let fee = 1000;
  if (age < 20) fee *= 0.9;
  if (course === "Cybersecurity") fee += 200;

  // Course Message
  const message = courseMessage.textContent;

  Swal.fire({
    title: `Student Name: ${fullName}\n`+ 
    `Gender: ${gender}\n` + 
    `${greeting}\n` + 
    `Course: ${course}\n`+ 
    `Message: ${message}\n` + 
    `Student Name: ${fullName}\n`,
    icon: "success",
    draggable: true
  });
});
