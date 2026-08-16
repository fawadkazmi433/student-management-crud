let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const studentId = document.getElementById("studentId").value.trim();
    const studentName = document.getElementById("studentName").value.trim();
    const fatherName = document.getElementById("fatherName").value.trim();
    const cnic = document.getElementById("cnic").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const course = document.getElementById("course").value;
    const semester = document.getElementById("semester").value;
    const address = document.getElementById("address").value.trim();

    const editId = document.getElementById("editId").value;

    // Validate Student ID
    const duplicateId = students.some(student =>
        student.studentId === studentId &&
        student.studentId !== editId
    );

    if (duplicateId) {
        alert("Student ID already exists!");
        return;
    }

    // Validate CNIC
    const duplicateCnic = students.some(student =>
        student.cnic === cnic &&
        student.studentId !== editId
    );

    if (duplicateCnic) {
        alert("This CNIC is already registered!");
        return;
    }

    const student = {
        studentId,
        studentName,
        fatherName,
        cnic,
        phone,
        email,
        gender,
        dob,
        course,
        semester,
        address
    };

    // UPDATE
    if (editId) {

        const index = students.findIndex(
            student => student.studentId === editId
        );

        students[index] = student;

        alert("Student updated successfully!");

    }

    // CREATE
    else {

        students.push(student);

        alert("Student added successfully!");
    }

    saveData();
    displayStudents();
    resetForm();
});


function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}


function displayStudents() {

    const tbody = document.getElementById("studentTableBody");

    const searchValue =
        document.getElementById("search").value.toLowerCase();

    tbody.innerHTML = "";

    const filteredStudents = students.filter(student => {

        return (
            student.studentId.toLowerCase().includes(searchValue) ||
            student.studentName.toLowerCase().includes(searchValue) ||
            student.fatherName.toLowerCase().includes(searchValue) ||
            student.cnic.toLowerCase().includes(searchValue) ||
            student.phone.toLowerCase().includes(searchValue)
        );

    });


    filteredStudents.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>${student.studentId}</td>

            <td>${student.studentName}</td>

            <td>${student.fatherName}</td>

            <td>${student.cnic}</td>

            <td>${student.phone}</td>

            <td>${student.course}</td>

            <td>${student.semester}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent('${student.studentId}')">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent('${student.studentId}')">
                    Delete
                </button>

            </td>
        `;

        tbody.appendChild(row);

    });
}


// UPDATE
function editStudent(studentId) {

    const student = students.find(
        student => student.studentId === studentId
    );

    if (!student) return;

    document.getElementById("editId").value = student.studentId;

    document.getElementById("studentId").value = student.studentId;
    document.getElementById("studentName").value = student.studentName;
    document.getElementById("fatherName").value = student.fatherName;
    document.getElementById("cnic").value = student.cnic;
    document.getElementById("phone").value = student.phone;
    document.getElementById("email").value = student.email;
    document.getElementById("gender").value = student.gender;
    document.getElementById("dob").value = student.dob;
    document.getElementById("course").value = student.course;
    document.getElementById("semester").value = student.semester;
    document.getElementById("address").value = student.address;

    document.getElementById("formTitle").textContent =
        "Update Student";

    document.getElementById("submitBtn").textContent =
        "Update Student";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// DELETE
function deleteStudent(studentId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    students = students.filter(
        student => student.studentId !== studentId
    );

    saveData();
    displayStudents();

    alert("Student deleted successfully!");
}


// RESET FORM
function resetForm() {

    form.reset();

    document.getElementById("editId").value = "";

    document.getElementById("formTitle").textContent =
        "Add Student";

    document.getElementById("submitBtn").textContent =
        "Add Student";
}


// Display students when page loads
displayStudents();