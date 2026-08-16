// =====================================================
// STUDENT MANAGEMENT SYSTEM
// =====================================================


// ================= INITIAL DATA =================

const sampleStudents = [
    {
        id: "STU-00001",
        name: "Ahmad Raza",
        father: "Muhammad Raza",
        cnic: "35202-1234567-1",
        phone: "0300-1234567",
        email: "ahmad@example.com",
        gender: "Male",
        dob: "2002-05-12",
        course: "Computer Science",
        semester: "6th",
        address: "Lahore, Pakistan"
    },

    {
        id: "STU-00002",
        name: "Zainab Fatima",
        father: "Ali Hassan",
        cnic: "35202-7654321-2",
        phone: "0301-2345678",
        email: "zainab@example.com",
        gender: "Female",
        dob: "2003-02-18",
        course: "Software Engineering",
        semester: "5th",
        address: "Islamabad, Pakistan"
    },

    {
        id: "STU-00003",
        name: "Usman Khan",
        father: "Khalid Khan",
        cnic: "35202-1112223-3",
        phone: "0302-3456789",
        email: "usman@example.com",
        gender: "Male",
        dob: "2001-09-25",
        course: "Information Technology",
        semester: "7th",
        address: "Peshawar, Pakistan"
    },

    {
        id: "STU-00004",
        name: "Ayesha Noor",
        father: "Shakeel Ahmed",
        cnic: "35202-4445556-4",
        phone: "0303-4567890",
        email: "ayesha@example.com",
        gender: "Female",
        dob: "2003-11-10",
        course: "Data Science",
        semester: "4th",
        address: "Karachi, Pakistan"
    },

    {
        id: "STU-00005",
        name: "Hassan Ali",
        father: "Imran Ali",
        cnic: "35202-7778889-5",
        phone: "0304-5678901",
        email: "hassan@example.com",
        gender: "Male",
        dob: "2002-07-15",
        course: "Artificial Intelligence",
        semester: "6th",
        address: "Lahore, Pakistan"
    },

    {
        id: "STU-00006",
        name: "Sana Khan",
        father: "Akram Khan",
        cnic: "35202-9991112-6",
        phone: "0305-6789012",
        email: "sana@example.com",
        gender: "Female",
        dob: "2003-04-22",
        course: "Computer Science",
        semester: "3rd",
        address: "Rawalpindi, Pakistan"
    }
];


// ================= STORAGE =================

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// Add sample data only first time
if (students.length === 0) {

    students = sampleStudents;

    saveStudents();

}


// ================= DOM ELEMENTS =================

const studentForm =
    document.getElementById("studentForm");

const modal =
    document.getElementById("studentModal");

const viewModal =
    document.getElementById("viewModal");


// ================= SAVE =================

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


// ================= DATE =================

function setCurrentDate() {

    const dateElement =
        document.getElementById("currentDate");

    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


// ================= UNIQUE ID =================

function generateStudentID() {

    let maxNumber = 0;

    students.forEach(student => {

        const number =
            parseInt(
                student.id.replace("STU-", "")
            );

        if (number > maxNumber) {
            maxNumber = number;
        }

    });

    return `STU-${String(maxNumber + 1).padStart(5, "0")}`;

}


// ================= OPEN ADD MODAL =================

function openAddModal() {

    resetForm();

    document.getElementById("modalTitle").textContent =
        "Add Student";

    document.getElementById("saveButtonText").textContent =
        "Save Student";

    document.getElementById("generatedId").textContent =
        generateStudentID();

    modal.classList.add("show");

}


// ================= CLOSE MODAL =================

function closeModal() {

    modal.classList.remove("show");

}


// ================= RESET FORM =================

function resetForm() {

    studentForm.reset();

    document.getElementById("editStudentId").value = "";

    clearErrors();

    document.getElementById("generatedId").textContent =
        generateStudentID();

}


// ================= CLEAR ERRORS =================

function clearErrors() {

    document.getElementById("nameError").textContent = "";

    document.getElementById("fatherError").textContent = "";

    document.getElementById("cnicError").textContent = "";

    document.getElementById("phoneError").textContent = "";

    document.getElementById("emailError").textContent = "";

}


// ================= CNIC FORMAT =================

document
    .getElementById("cnic")
    .addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        if (value.length > 13) {
            value = value.substring(0, 13);
        }

        if (value.length > 5) {

            value =
                value.substring(0, 5)
                + "-"
                + value.substring(5);

        }

        if (value.length > 13) {

            value =
                value.substring(0, 13)
                + "-"
                + value.substring(13);

        }

        this.value = value;

    });


// ================= PHONE FORMAT =================

document
    .getElementById("phone")
    .addEventListener("input", function () {

        let value =
            this.value.replace(/\D/g, "");

        if (value.length > 11) {
            value = value.substring(0, 11);
        }

        if (value.length > 4) {

            value =
                value.substring(0, 4)
                + "-"
                + value.substring(4);

        }

        this.value = value;

    });


// ================= VALIDATION =================

function validateForm() {

    clearErrors();

    let valid = true;

    const name =
        document.getElementById("studentName").value.trim();

    const father =
        document.getElementById("fatherName").value.trim();

    const cnic =
        document.getElementById("cnic").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const editId =
        document.getElementById("editStudentId").value;


    // NAME

    if (name.length < 3) {

        document.getElementById("nameError").textContent =
            "Please enter a valid student name.";

        valid = false;

    }


    // FATHER NAME

    if (father.length < 3) {

        document.getElementById("fatherError").textContent =
            "Please enter a valid father name.";

        valid = false;

    }


    // CNIC

    const cnicRegex =
        /^\d{5}-\d{7}-\d{1}$/;

    if (!cnicRegex.test(cnic)) {

        document.getElementById("cnicError").textContent =
            "CNIC must be like 35202-1234567-1.";

        valid = false;

    }


    // DUPLICATE CNIC

    const duplicateCNIC =
        students.some(student =>
            student.cnic === cnic &&
            student.id !== editId
        );

    if (duplicateCNIC) {

        document.getElementById("cnicError").textContent =
            "This CNIC is already registered.";

        valid = false;

    }


    // PHONE

    const phoneRegex =
        /^03\d{2}-\d{7}$/;

    if (!phoneRegex.test(phone)) {

        document.getElementById("phoneError").textContent =
            "Phone must be like 0300-1234567.";

        valid = false;

    }


    // EMAIL

    if (email !== "") {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            document.getElementById("emailError").textContent =
                "Please enter a valid email.";

            valid = false;

        }

    }

    return valid;

}


// ================= CREATE / UPDATE =================

studentForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }


        const editId =
            document.getElementById("editStudentId").value;


        const student = {

            id:
                editId ||
                document.getElementById("generatedId").textContent,

            name:
                document.getElementById("studentName").value.trim(),

            father:
                document.getElementById("fatherName").value.trim(),

            cnic:
                document.getElementById("cnic").value.trim(),

            phone:
                document.getElementById("phone").value.trim(),

            email:
                document.getElementById("email").value.trim(),

            gender:
                document.getElementById("gender").value,

            dob:
                document.getElementById("dob").value,

            course:
                document.getElementById("course").value,

            semester:
                document.getElementById("semester").value,

            address:
                document.getElementById("address").value.trim()

        };


        // UPDATE

        if (editId) {

            const index =
                students.findIndex(
                    student => student.id === editId
                );

            students[index] = student;

            showToast(
                "Updated!",
                "Student information updated successfully."
            );

        }


        // CREATE

        else {

            students.push(student);

            showToast(
                "Success!",
                "Student added successfully."
            );

        }


        saveStudents();

        renderStudents();

        updateStatistics();

        closeModal();

    }
);


// ================= RENDER =================

function renderStudents() {

    const tbody =
        document.getElementById("studentTableBody");

    const emptyState =
        document.getElementById("emptyState");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const course =
        document.getElementById("courseFilter").value;

    const gender =
        document.getElementById("genderFilter").value;


    let filtered =
        students.filter(student => {

            const searchMatch =
                student.id.toLowerCase().includes(search) ||
                student.name.toLowerCase().includes(search) ||
                student.father.toLowerCase().includes(search) ||
                student.cnic.toLowerCase().includes(search) ||
                student.phone.toLowerCase().includes(search);


            const courseMatch =
                !course ||
                student.course === course;


            const genderMatch =
                !gender ||
                student.gender === gender;


            return (
                searchMatch &&
                courseMatch &&
                genderMatch
            );

        });


    tbody.innerHTML = "";


    if (filtered.length === 0) {

        emptyState.style.display = "block";

        document.querySelector(".table-wrapper")
            .style.display = "none";

    }

    else {

        emptyState.style.display = "none";

        document.querySelector(".table-wrapper")
            .style.display = "block";

    }


    filtered.forEach(student => {

        const row =
            document.createElement("tr");


        const initials =
            student.name
                .split(" ")
                .map(word => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();


        row.innerHTML = `

            <td>
                <strong>${student.id}</strong>
            </td>


            <td>

                <div class="student-info">

                    <div class="student-avatar">
                        ${initials}
                    </div>

                    <div>

                        <div class="student-name">
                            ${escapeHTML(student.name)}
                        </div>

                        <div class="student-id">
                            ${escapeHTML(student.email || "No email")}
                        </div>

                    </div>

                </div>

            </td>


            <td>
                ${escapeHTML(student.father)}
            </td>


            <td>
                ${escapeHTML(student.course)}
            </td>


            <td>

                <span
                    class="gender-badge ${
                        student.gender === "Male"
                            ? "gender-male"
                            : "gender-female"
                    }"
                >
                    ${student.gender}
                </span>

            </td>


            <td>
                ${escapeHTML(student.phone)}
            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn view-btn"
                        onclick="viewStudent('${student.id}')"
                        title="View"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>


                    <button
                        class="action-btn edit-btn"
                        onclick="editStudent('${student.id}')"
                        title="Edit"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>


                    <button
                        class="action-btn delete-btn"
                        onclick="deleteStudent('${student.id}')"
                        title="Delete"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(row);

    });


    document.getElementById("resultCount").textContent =
        `Showing ${filtered.length} of ${students.length} students`;

}


// ================= ESCAPE HTML =================

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ================= EDIT =================

function editStudent(id) {

    const student =
        students.find(
            student => student.id === id
        );

    if (!student) return;


    document.getElementById("editStudentId").value =
        student.id;

    document.getElementById("studentName").value =
        student.name;

    document.getElementById("fatherName").value =
        student.father;

    document.getElementById("cnic").value =
        student.cnic;

    document.getElementById("phone").value =
        student.phone;

    document.getElementById("email").value =
        student.email;

    document.getElementById("gender").value =
        student.gender;

    document.getElementById("dob").value =
        student.dob;

    document.getElementById("course").value =
        student.course;

    document.getElementById("semester").value =
        student.semester;

    document.getElementById("address").value =
        student.address;


    document.getElementById("generatedId").textContent =
        student.id;


    document.getElementById("modalTitle").textContent =
        "Edit Student";


    document.getElementById("saveButtonText").textContent =
        "Update Student";


    modal.classList.add("show");

}


// ================= VIEW =================

function viewStudent(id) {

    const student =
        students.find(
            student => student.id === id
        );

    if (!student) return;


    const initials =
        student.name
            .split(" ")
            .map(word => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();


    document.getElementById("studentDetails").innerHTML = `

        <div class="details-header">

            <div class="big-avatar">
                ${initials}
            </div>

            <div>

                <h3>
                    ${escapeHTML(student.name)}
                </h3>

                <p>
                    ${student.id} • ${escapeHTML(student.course)}
                </p>

            </div>

        </div>


        <div class="details-grid">

            <div class="detail-item">
                <label>Student ID</label>
                <strong>${student.id}</strong>
            </div>

            <div class="detail-item">
                <label>Student Name</label>
                <strong>${escapeHTML(student.name)}</strong>
            </div>

            <div class="detail-item">
                <label>Father Name</label>
                <strong>${escapeHTML(student.father)}</strong>
            </div>

            <div class="detail-item">
                <label>CNIC</label>
                <strong>${escapeHTML(student.cnic)}</strong>
            </div>

            <div class="detail-item">
                <label>Phone</label>
                <strong>${escapeHTML(student.phone)}</strong>
            </div>

            <div class="detail-item">
                <label>Email</label>
                <strong>${escapeHTML(student.email || "N/A")}</strong>
            </div>

            <div class="detail-item">
                <label>Gender</label>
                <strong>${escapeHTML(student.gender)}</strong>
            </div>

            <div class="detail-item">
                <label>Date of Birth</label>
                <strong>${student.dob || "N/A"}</strong>
            </div>

            <div class="detail-item">
                <label>Course</label>
                <strong>${escapeHTML(student.course)}</strong>
            </div>

            <div class="detail-item">
                <label>Semester</label>
                <strong>${escapeHTML(student.semester || "N/A")}</strong>
            </div>

            <div class="detail-item">
                <label>Address</label>
                <strong>${escapeHTML(student.address || "N/A")}</strong>
            </div>

        </div>

    `;


    viewModal.classList.add("show");

}


// ================= CLOSE VIEW =================

function closeViewModal() {

    viewModal.classList.remove("show");

}


// ================= DELETE =================

function deleteStudent(id) {

    const student =
        students.find(
            student => student.id === id
        );

    if (!student) return;


    const confirmed =
        confirm(
            `Are you sure you want to delete ${student.name}?\n\nThis action cannot be undone.`
        );


    if (!confirmed) return;


    students =
        students.filter(
            student => student.id !== id
        );


    saveStudents();

    renderStudents();

    updateStatistics();


    showToast(
        "Deleted!",
        "Student removed successfully."
    );

}


// ================= STATISTICS =================

function updateStatistics() {

    const total =
        students.length;


    const male =
        students.filter(
            student => student.gender === "Male"
        ).length;


    const female =
        students.filter(
            student => student.gender === "Female"
        ).length;


    const courses =
        new Set(
            students.map(
                student => student.course
            )
        ).size;


    const malePercent =
        total
            ? ((male / total) * 100).toFixed(1)
            : 0;


    const femalePercent =
        total
            ? ((female / total) * 100).toFixed(1)
            : 0;


    document.getElementById("totalStudents")
        .textContent = total;


    document.getElementById("maleStudents")
        .textContent = male;


    document.getElementById("femaleStudents")
        .textContent = female;


    document.getElementById("totalCourses")
        .textContent = courses;


    document.getElementById("malePercentage")
        .textContent = `${malePercent}%`;


    document.getElementById("femalePercentage")
        .textContent = `${femalePercent}%`;

}


// ================= FILTER =================

function clearFilters() {

    document.getElementById("searchInput").value = "";

    document.getElementById("courseFilter").value = "";

    document.getElementById("genderFilter").value = "";

    renderStudents();

}


// ================= SCROLL =================

function scrollToStudents() {

    document
        .getElementById("studentsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= SIDEBAR =================

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


// ================= REPORT =================

function showReport() {

    showToast(
        "Reports",
        "Reports module is ready for future expansion."
    );

}


// ================= SETTINGS =================

function showSettings() {

    showToast(
        "Settings",
        "Settings module is ready for future expansion."
    );

}


// ================= TOAST =================

let toastTimer;


function showToast(title, message) {

    const toast =
        document.getElementById("toast");


    document.getElementById("toastTitle")
        .textContent = title;


    document.getElementById("toastMessage")
        .textContent = message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(
            hideToast,
            3500
        );

}


function hideToast() {

    document
        .getElementById("toast")
        .classList.remove("show");

}


// ================= THEME =================

function toggleTheme() {

    document.body.classList.toggle("dark");

    const icon =
        document.getElementById("themeIcon");


    if (
        document.body.classList.contains("dark")
    ) {

        icon.className =
            "fa-solid fa-moon";

    }

    else {

        icon.className =
            "fa-solid fa-sun";

    }

}


// ================= MODAL OUTSIDE CLICK =================

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {
            closeModal();
        }

    }
);


viewModal.addEventListener(
    "click",
    function(event) {

        if (event.target === viewModal) {
            closeViewModal();
        }

    }
);


// ================= ESC KEY =================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeModal();

            closeViewModal();

        }

    }
);


// ================= INITIALIZE =================

setCurrentDate();

renderStudents();

updateStatistics();