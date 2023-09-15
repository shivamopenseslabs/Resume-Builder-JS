let data = JSON.parse(localStorage.getItem("resumeData")) || [];
let info = document.getElementById("info");
let resume = document.getElementById("resume");
function getdata() {
  event.preventDefault();
  console.log("data");
  // let id = uniqueId();
  let obj = {
    id: data.length - 1,
    personal: {},
    education: [],
    work: [],
    skills: [],
  };
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let phone = document.getElementById("phone");
  let address = document.getElementById("address");
  let education = document.getElementsByClassName("education-Div");
  let work = document.getElementsByClassName("workDiv");
  let skills = document.getElementsByClassName("skillsDiv");
  console.log(skills);
  obj.personal = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
  };

  // let uniqueEducation = checkDuplicate(education, [arr]);


  for (let i = 0; i < education.length; i++) {
    let university = education[i].querySelector(".university").value;
    let degree = education[i].querySelector(".degree").value;
    let graduationYear = education[i].querySelector(".graduationYear").value;

    if (!(university == "") && !(degree == "") && !(graduationYear == "")) {
      obj.education.push({
        university: university,
        degree: degree,
        graduationYear: graduationYear,
      });
    } else {
      alert("fill all education fields");
      return;
    }
  }
  console.log("obj.education", obj.education);

  for (let i = 0; i < work.length; i++) {
    let jobTitle = work[i].querySelector(".jobTitle").value;
    let company = work[i].querySelector(".company").value;
    let startDate = work[i].querySelector(".startDate").value;
    let endDate = work[i].querySelector(".endDate").value;
    let jobDescription = work[i].querySelector(".jobDescription").value;

    console.log("startDate", startDate, "endDate", endDate);

    let validDate = compareDates(startDate, endDate);
    console.log("validDate", validDate);

    if (
      !(jobTitle == "") &&
      !(company == "") &&
      !(startDate == "") &&
      !(endDate == "") &&
      !(jobDescription == "") &&
      validDate
    ) {
      obj.work.push({
        jobTitle: jobTitle,
        company: company,
        startDate: startDate,
        endDate: endDate,
        jobDescription: jobDescription,
      });
    } else {
      alert("fill all work fields");
      return;
    }
  }

  let uniqueSkills = checkDuplicate(skills, ".skills");

//   uniqueSkills.forEach((value) => {
//     console.log("value" , value);
// });
uniqueSkills.forEach((value) => {
    let skillsValue = value;
    console.log("skillsvalue" , skills)
    if (!(skillsValue == "")) {
      console.log("skills value pushed")
      obj.skills.push({
        skills: skillsValue,
      });
    } else {
      alert("fill all skills fields");
      return;
    }
  });

  data.push(obj);

  let validEmail = validateEmail(email.value);
  console.log("validEmail", validEmail);
  // Save data in localStorage
  if (
    !(name.value == "") &&
    !(email.value == "") &&
    !(phone.value == "") &&
    !(address.value == "") &&
    validEmail
  ) {
    localStorage.setItem("resumeData", JSON.stringify(data));
    name.value = "";
    email.value = "";
    phone.value = "";
    address.value = "";
    for (let i = 0; i < education.length; i++) {
      education[i].querySelector(".university").value = "";
      education[i].querySelector(".degree").value = "";
      education[i].querySelector(".graduationYear").value = "";
    }

    for (let i = 0; i < work.length; i++) {
      work[i].querySelector(".jobTitle").value = "";
      work[i].querySelector(".company").value = "";
      work[i].querySelector(".startDate").value = "";
      work[i].querySelector(".endDate").value = "";
      work[i].querySelector(".jobDescription").value = "";
    }
    for (let i = 0; i < skills.length; i++) {
      skills[i].querySelector(".skills").value = "";
    }
    generateResume(data, obj.id);
    console.log("obj", obj);
  } else {
    alert("enter the fields");
  }
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

function generateResume(data, id) {
  const userData = data.find((user) => user.id == id);
  console.log(data);
  console.log(userData, "usrdt");
  info.style.display = "none";
  resume.style.display = "block";
  let resumeHtml = document.getElementById("resume");
  if (userData) {
    console.log("User Data: selected", userData);
    let innerResumeDiv = document.createElement("div");
    let personalInfo = userData.personal;
    console.log(personalInfo);
    innerResumeDiv.innerHTML += `

    <section id="sec2">
          <section id="sec2-1">
            <div id="sec2-1-2">
              <h2 style="color: white" id="name-render">${
                personalInfo.name
              }</h2>
              <p>Graphics Designer & web developer</p>
              <button class="btn" id="btn1">Download CV</button>
              <button class="btn" id="btn2">Hire me</button>
            </div>
            <div id="info-render">
                <div>Email : ${personalInfo.email}</div>
                <div>Phone : ${personalInfo.phone}</div>
                <div>Address : ${personalInfo.address}</div>
                <div></div>

            </div>
          </section>
          <hr />
          <section id="prof-skills">
            <h2>Professional Skills</h2>
            <div id="skills1">
             ${userData.skills.map((item) => {
               return item.skills;
             })}
            </div>
          </section>
          <hr />
          <section class="work">
            <h2>Work Experience</h2>
            ${userData.work.map((item) => {
              return `<div id="work-exp" class="work-exp">
                        <h3>
                          ${item.jobTitle}
                          <span style="font-size: 20px">at ${item.company}</span>
                        </h3>
                        <p class="work-date">${item.startDate} - ${item.endDate}</p>
                        <p>
                         ${item.jobDescription}
                        </p>
                      </div>`;
            })}  
          </section>
          <hr />
          <section class="work">
            <h2>Education</h2>
            ${userData.education.map((item) => {
              return `<div id="work-exp" class="work-exp edu">
              <h3>
                ${item.degree}
                <span style="font-size: 20px"
                  >from ${item.university}</span
                >
              </h3>
              <p class="work-date">${item.graduationYear}</p>
            </div>`;
            })}  
          </section>
          <hr />
        </section>
        <section>
        <div id="section-edit">
          <button onclick="editResume()">EDIT</button>
        </div>
      </section>`;
    resumeHtml.append(innerResumeDiv);
  } else {
    alert("User not found.");
  }
}

// function uniqueId() {
//   const existingIds = data.map((user) => parseInt(user.id) || 0);
//   const highestId = Math.max(...existingIds);
//   // Generate a new unique ID by incrementing the highest ID
//   const newId = highestId + 1;
//   return newId;
// }

function goBack() {
  resume.style.display = "none";
  info.style.display = "block";
}

let urlId = window.location.search;
urlId = new URLSearchParams(urlId);
urlId = urlId.get("id");
console.log("urlId", urlId);
if (urlId) {
  console.log("data", data);
  generateResume(data, urlId);
}

function addField(param) {
  if (param == "addEducation") {
    let divEdu = document.getElementById("education");
    let innerDivEducation = document.createElement("div");
    innerDivEducation.classList = "education-Div";
    innerDivEducation.innerHTML = ` 
  <label for="university">University:</label>
    <input
      type="text"
      id="university"
      name="university"
      class="university"
      required
    /><br /><br />

    <label for="degree">Degree:</label>
    <input type="text" id="degree" name="degree" class="degree" required  /><br /><br />

    <label for="graduationYear">Graduation Year:</label>
    <input
      type="number"
      id="graduationYear"
      name="graduationYear"
      class="graduationYear"
      required
    /><br /><br />
  `;
    divEdu.append(innerDivEducation);
    //   // Create a remove button and add it to the last child div
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      divEdu.removeChild(innerDivEducation);
    });
    innerDivEducation.appendChild(removeButton);

    divEdu.append(innerDivEducation);
  } else if (param == "addExperience") {
    let divWork = document.getElementById("work");
    let innerDivWork = document.createElement("div");
    innerDivWork.classList = "workDiv";
    innerDivWork.innerHTML += `
   
    <label for="jobTitle1">Job Title:</label>
            <input
              type="text"
              id="jobTitle1"
              name="jobTitle1"
              class="jobTitle"
              required
            /><br /><br />

            <label for="company1">Company:</label>
            <input
              type="text"
              id="company1"
              name="company1"
              class="company"
              required
            /><br /><br />

            <label for="startDate1">Start Date:</label>
            <input
              type="date"
              id="startDate1"
              name="startDate1"
              class="startDate"
              required
            /><br /><br />

            <label for="endDate1">End Date:</label>
            <input
              type="date"
              id="endDate1"
              name="endDate1"
              class="endDate"
              required
            /><br /><br />

            <label for="jobDescription1">Job Description:</label>
            <textarea
              id="jobDescription1"
              name="jobDescription1"
              class="jobDescription"
              rows="4"
              required
            ></textarea
            ><br /><br />
    `;
    divWork.append(innerDivWork);
    // Create a remove button and add it to the last child div
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      divWork.removeChild(innerDivWork);
    });
    innerDivWork.appendChild(removeButton);

    divWork.append(innerDivWork);
  } else {
    let divSkills = document.getElementById("skills");
    let innerDivSkills = document.createElement("div");
    innerDivSkills.classList = "skillsDiv";
    innerDivSkills.innerHTML += `
    <input
              type="text"
              name="skills"
              class="skills"
              id="skills2"
              placeholder="Add Skills"
            />`;
    divSkills.append(innerDivSkills);
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function () {
      divSkills.removeChild(innerDivSkills);
    });
    innerDivSkills.appendChild(removeButton);
  }
}

function compareDates(d1, d2) {
  if (d1 < d2) {
    return true; 
  } else if (d1 > d2) {
    alert("invalid dates");
    return false; 
  } else {
    return true; 
  }
}

function checkDuplicate(param, querySelector) {
  console.log(param);
  let arr = [];
  for (let i = 0; i < param.length; i++) {
    let duplicateValue = param[i].querySelector(querySelector).value.trim();
    arr[i] = duplicateValue;
  }
  const uniqueSet = new Set(arr);
  return uniqueSet;
}
