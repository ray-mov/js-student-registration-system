

// getting existing register student from localstorage
// and displaying

loadSaveData();

// method to get data from local storage
function getData() {
  const myData = localStorage.getItem("student");
  return myData == null ? [] : JSON.parse(myData)
}

//display student record

function loadSaveData() {

  let studentData = getData()
  if (!studentData) {
    return
  }
  console.log(studentData)
  const tableBody = document.getElementById("table-body")

  for (const obj of studentData) {
    const tableRow = tableBody.insertRow();

    //adding table data in row
    const studentName = tableRow.insertCell(0);
    const id = tableRow.insertCell(1);
    const studentClass = tableRow.insertCell(2);
    const contactNumber = tableRow.insertCell(3);
    const email = tableRow.insertCell(4);
    const address = tableRow.insertCell(5);
    const editBtn = tableRow.insertCell(6);
    const deleteBtn = tableRow.insertCell(7)

    // delete and edit button

    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    deleteButton.innerText = "Delete"
    editButton.innerText = "Edit"

    deleteButton.classList = "delete-btn"
    editButton.classList = "edit-btn"

    deleteButton.addEventListener("click", deleteStudentData)
    editButton.addEventListener("click", editStudentData)

    //populating table data

    studentName.textContent = obj.studentName
    id.textContent = obj.id
    studentClass.textContent = obj.studentClass
    contactNumber.textContent = obj.contactNumber
    email.textContent = obj.email
    address.textContent = obj.address
    deleteBtn.appendChild(deleteButton)
    editBtn.appendChild(editButton)
  }
}


// --- registering student ------

function registerStudent() {
  const studentName = document.getElementById("name").value.trim();
  const id = document.getElementById("id").value;
  const studentClass = document.getElementById("class").value;
  const contactNumber = document.getElementById("contactNumber").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  //check for all feilds are filled 

  if (!(studentName && id && studentClass && contactNumber && email && address)) {
    alert("Please fill all fields")
    return
  }

  //check if student name container number 

  for (const char of studentName) {
    if (isNaN(char)) {
      continue;
    }
    if (char === " ") {
      continue;
    }
    alert("Student Name can not have any Number, Only characters are allowed")
    return
  }


  //creating student object

  const studentObj = {
    studentName,
    id,
    studentClass,
    contactNumber,
    email,
    address
  }

  // getting data from localStorage 

  let studentData = getData()

  //check for unique id and email 
  if (studentData) {
    for (let i = 0; i < studentData.length; i++) {
      if (studentData[i].id === id) {
        alert("Student Id should be unique")
        return
      }
      if (studentData[i].email === email) {
        alert("Email already exists")
        return
      }
    }
  }

  // saving to  localStorage 

  studentData.push(studentObj)
  localStorage.setItem("student", JSON.stringify(studentData))

  //refresh tab to reflect update
  window.location.reload();
}

// delete Student Record

function deleteStudentData(event) {

  const tableRow = event.target.closest("tr");

  if (tableRow) {
    const id = tableRow.cells[1].textContent.trim();
    const studentData = getData()

    for (let i = 0; i < studentData.length; i++) {
      if (studentData[i].id === id) {
        const confirm = prompt("Please Write \" confirm \" to delete")

        if (confirm === "confirm") {
          studentData.splice(i, 1)
          --i
          break
        } else {
          alert("Record Not deleted")
          return
        }

      }
    }

    alert("Record Deleted Successfully")

    localStorage.setItem("student", JSON.stringify(studentData))

    //refresh tab to reflect update
    window.location.reload();

  }

}

//------- edit form -----------

//for storing previous id and email for update purpose
let preId;
let preEmail;

function editStudentData(event) {

  //open overlay form
  const overlay = document.getElementById("overlay")
  overlay.style.display = "flex"
  const tableRow = event.target.closest("tr");

  if (tableRow) {
    const id = tableRow.cells[1].textContent.trim();
    const studentData = getData()

    for (let i = 0; i < studentData.length; i++) {
      if (studentData[i].id === id) {
        const studentName = document.getElementById("new_name")
        const id = document.getElementById("new_id")
        const studentClass = document.getElementById("new_class")
        const contactNumber = document.getElementById("new_contactNumber")
        const email = document.getElementById("new_email")
        const address = document.getElementById("new_address")

        //set value on form to diplay current value
        studentName.value = studentData[i].studentName
        id.value = studentData[i].id
        studentClass.value = studentData[i].
          studentClass
        contactNumber.value = studentData[i].
          contactNumber
        email.value = studentData[i].
          email
        address.value = studentData[i].address

        preId = studentData[i].id;
        preEmail = studentData[i].
          email;
        break
      }
    }

  }
}

//------close overlay--------

function closeOverlay() {
  const overlay = document.getElementById("overlay")
  overlay.style.display = "none"
}

//-----update student----------

function updateStudentData() {
  console.log("update event trigger")
  const studentName = document.getElementById("new_name").value;
  const id = document.getElementById("new_id").value;
  const studentClass = document.getElementById("new_class").value;
  const email = document.getElementById("new_email").value;
  const contactNumber = document.getElementById("new_contactNumber").value;
  const address = document.getElementById("new_address").value;

  console.log(id)

  const studentData = getData()
  console.log(studentData)

  for (let i = 0; i < studentData.length; i++) {
    if (studentData[i].id === preId.toString()) {
      //updating record

      studentData[i].studentName = studentName
      studentData[i].id = id
      studentData[i].studentClass = studentClass
      studentData[i].contactNumber = contactNumber
      studentData[i].
        email = email
      studentData[i].address = address
      break;
    }
  }

  //check if student name container number 

  for (const char of studentName) {
    if (isNaN(char)) {
      continue;
    }
    if (char === " ") {
      continue;
    }
    alert("Student Name can not have any Number, Only characters are allowed")
    return
  }

  //check for unique id and email 
  
  for (let i = 0; i < studentData.length; i++) {
      if (studentData[i].id === preId && id !== preId) {
        alert("Student Id should be unique")
        return
      }
      if (studentData[i].email === preEmail && email !== preEmail) {
        alert("Email already exists")
        return
      }
  }
  

  alert("Record Updated Successfully")

  localStorage.setItem("student", JSON.stringify(studentData))

  //refresh tab to reflect update
  window.location.reload();

}







