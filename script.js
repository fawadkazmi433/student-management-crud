/* =====================================================
   STUDENT MANAGEMENT SYSTEM
   CRUD + LOCAL STORAGE
===================================================== */


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let students = JSON.parse(
    localStorage.getItem("students")
) || [];

let toastTimer;


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    setCurrentDate();

    renderStudents();

    updateStatistics();

    setupEventListeners();

    updateGeneratedId();

    loadTheme();

});


/* =====================================================
   EVENT LISTENERS
===================================================== */

function setupEventListeners() {

    const form = document.getElementById("studentForm");

    const searchInput =
        document.getElementById("searchInput");

    const courseFilter =
        document.getElementById("courseFilter");

    const genderFilter =
        document.getElementById("genderFilter");


    /* FORM SUBMIT */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        saveStudent();

    });


    /* SEARCH */

    searchInput.addEventListener("input", function () {

        renderStudents();

    });


    /* COURSE FILTER */

    courseFilter.addEventListener("change", function () {

        renderStudents();

    });


    /* GENDER FILTER */

    genderFilter.addEventListener("change", function () {

        renderStudents();

    });


    /* ESCAPE KEY */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeModal();

            closeViewModal();

        }

    });


    /* CLOSE MODAL WHEN CLICKING OUTSIDE */

    document
        .getElementById("studentModal")
        .addEventListener("click", function (event) {

            if (event.target === this) {

                closeModal();

            }

        });


    document
        .getElementById("viewModal")
        .addEventListener("click", function (event) {

            if (event.target === this) {

                closeViewModal();

            }

        });

}


/* =====================================================
   DATE
===================================================== */

function setCurrentDate() {

    const dateElement =
        document.getElementById("currentDate");

    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric"
        });

}


/* =====================================================
   STUDENT ID
===================================================== */

function generateStudentId() {

    let maxNumber = 0;

    students.forEach(function (student) {

        const number = parseInt(
            student.id.replace("STU-", ""),
            10
        );

        if (!isNaN(number) && number > maxNumber) {

            maxNumber = number;

        }

    });


    const nextNumber = maxNumber + 1;


    return "STU-" +
        String(nextNumber).padStart(5, "0");

}


function updateGeneratedId() {

    const idElement =
        document.getElementById("generatedId");

    const editId =
        document.getElementById("editStudentId").value;


    if (editId) {

        idElement.textContent = editId;

    } else {

        idElement.textContent =
            generateStudentId();

    }

}


/* =====================================================
   OPEN ADD MODAL
===================================================== */

function openAddModal() {

    const modal =
        document.getElementById("studentModal");

    const title =
        document.getElementById("modalTitle");

    const buttonText =
        document.getElementById("saveButtonText");


    resetForm();

    title.textContent = "Add Student";

    buttonText.textContent = "Save Student";


    document.getElementById(
        "editStudentId"
    ).value = "";


    updateGeneratedId();


    modal.classList.add("show");


    setTimeout(function () {

        document
            .getElementById("studentName")
            .focus();

    }, 100);

}


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeModal() {

    document
        .getElementById("studentModal")
        .classList.remove("show");

}


/* =====================================================
   RESET FORM
===================================================== */

function resetForm() {

    document
        .getElementById("studentForm")
        .reset();


    document
        .getElementById("editStudentId")
        .value = "";


    document
        .getElementById("modalTitle")
        .textContent = "Add Student";


    document
        .getElementById("saveButtonText")
        .textContent = "Save Student";


    updateGeneratedId();

}


/* =====================================================
   GET FORM DATA
===================================================== */

function getFormData() {

    return {

        name:
            document
                .getElementById("studentName")
                .value
                .trim(),

        fatherName:
            document
                .getElementById("fatherName")
                .value
                .trim(),

        cnic:
            document
                .getElementById("cnic")
                .value
                .trim(),

        phone:
            document
                .getElementById("phone")
                .value
                .trim(),

        email:
            document
                .getElementById("email")
                .value
                .trim(),

        gender:
            document
                .getElementById("gender")
                .value,

        dob:
            document
                .getElementById("dob")
                .value,

        course:
            document
                .getElementById("course")
                .value,

        semester:
            document
                .getElementById("semester")
                .value,

        address:
            document
                .getElementById("address")
                .value
                .trim()

    };

}


/* =====================================================
   VALIDATION
===================================================== */

function validateStudent(data, editId = "") {

    if (!data.name) {

        showToast(
            "Error",
            "Please enter student name.",
            "error"
        );

        return false;

    }


    if (!data.fatherName) {

        showToast(
            "Error",
            "Please enter father name.",
            "error"
        );

        return false;

    }


    /* CNIC */

    const cnicPattern =
        /^\d{5}-\d{7}-\d{1}$/;

    if (!cnicPattern.test(data.cnic)) {

        showToast(
            "Error",
            "CNIC must be like 35202-1234567-1.",
            "error"
        );

        return false;

    }


    /* PHONE */

    const phonePattern =
        /^03\d{2}-\d{7}$/;

    if (!phonePattern.test(data.phone)) {

        showToast(
            "Error",
            "Phone must be like 0300-1234567.",
            "error"
        );

        return false;

    }


    /* GENDER */

    if (!data.gender) {

        showToast(
            "Error",
            "Please select gender.",
            "error"
        );

        return false;

    }


    /* COURSE */

    if (!data.course) {

        showToast(
            "Error",
            "Please select course.",
            "error"
        );

        return false;

    }


    /* DUPLICATE CNIC */

    const duplicate =
        students.find(function (student) {

            return (
                student.cnic === data.cnic &&
                student.id !== editId
            );

        });


    if (duplicate) {

        showToast(
            "Error",
            "A student with this CNIC already exists.",
            "error"
        );

        return false;

    }


    return true;

}


/* =====================================================
   SAVE STUDENT
===================================================== */

function saveStudent() {

    const data = getFormData();

    const editId =
        document
            .getElementById("editStudentId")
            .value;


    /* VALIDATE */

    if (!validateStudent(data, editId)) {

        return;

    }


    /* ============================
       EDIT EXISTING STUDENT
    ============================ */

    if (editId) {

        const index =
            students.findIndex(function (student) {

                return student.id === editId;

            });


        if (index === -1) {

            showToast(
                "Error",
                "Student not found.",
                "error"
            );

            return;

        }


        students[index] = {

            ...students[index],

            ...data,

            updatedAt:
                new Date().toISOString()

        };


        saveToStorage();

        renderStudents();

        updateStatistics();

        closeModal();


        showToast(
            "Success!",
            "Student updated successfully."
        );


        return;

    }


    /* ============================
       ADD NEW STUDENT
    ============================ */

    const newStudent = {

        id: generateStudentId(),

        ...data,

        createdAt:
            new Date().toISOString()

    };


    /* IMPORTANT:
       Add student to array
    */

    students.push(newStudent);


    /* SAVE */

    saveToStorage();


    /* UPDATE SCREEN */

    renderStudents();

    updateStatistics();


    /* CLOSE MODAL */

    closeModal();


    /* SUCCESS MESSAGE */

    showToast(
        "Success!",
        "New student added successfully."
    );


    /* SCROLL TO TABLE */

    setTimeout(function () {

        document
            .getElementById("studentsSection")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 200);

}


/* =====================================================
   LOCAL STORAGE
===================================================== */

function saveToStorage() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

}


/* =====================================================
   RENDER STUDENTS
===================================================== */

function renderStudents() {

    const tableBody =
        document.getElementById(
            "studentTableBody"
        );

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    const resultCount =
        document.getElementById(
            "resultCount"
        );


    const searchValue =
        document
            .getElementById("searchInput")
            .value
            .trim()
            .toLowerCase();


    const courseValue =
        document
            .getElementById("courseFilter")
            .value;


    const genderValue =
        document
            .getElementById("genderFilter")
            .value;


    /* FILTER STUDENTS */

    const filteredStudents =
        students.filter(function (student) {

            const searchMatch =

                !searchValue ||

                student.name
                    .toLowerCase()
                    .includes(searchValue) ||

                student.id
                    .toLowerCase()
                    .includes(searchValue) ||

                student.cnic
                    .toLowerCase()
                    .includes(searchValue) ||

                student.phone
                    .toLowerCase()
                    .includes(searchValue);


            const courseMatch =

                !courseValue ||

                student.course === courseValue;


            const genderMatch =

                !genderValue ||

                student.gender === genderValue;


            return (
                searchMatch &&
                courseMatch &&
                genderMatch
            );

        });


    /* CLEAR TABLE */

    tableBody.innerHTML = "";


    /* EMPTY */

    if (filteredStudents.length === 0) {

        emptyState.style.display = "block";

        resultCount.textContent =
            "Showing 0 students";

        return;

    }


    emptyState.style.display = "none";


    /* CREATE ROWS */

    filteredStudents.forEach(function (student) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>${escapeHTML(student.id)}</strong>
            </td>

            <td>

                <div class="student-name">
                    ${escapeHTML(student.name)}
                </div>

                ${
                    student.email
                    ?
                    `<div class="student-email">
                        ${escapeHTML(student.email)}
                    </div>`
                    :
                    ""
                }

            </td>

            <td>
                ${escapeHTML(student.fatherName)}
            </td>

            <td>

                <span class="course-badge">
                    ${escapeHTML(student.course)}
                </span>

            </td>

            <td>

                <span class="
                    gender-badge
                    ${
                        student.gender === "Male"
                        ? "gender-male"
                        : "gender-female"
                    }
                ">
                    ${escapeHTML(student.gender)}
                </span>

            </td>

            <td>
                ${escapeHTML(student.phone)}
            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-button view-button"
                        onclick="viewStudent('${student.id}')"
                        title="View"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>

                    <button
                        class="action-button edit-button"
                        onclick="editStudent('${student.id}')"
                        title="Edit"
                    >
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button
                        class="action-button delete-button"
                        onclick="deleteStudent('${student.id}')"
                        title="Delete"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    resultCount.textContent =
        `Showing ${filteredStudents.length} of ${students.length} students`;

}


/* =====================================================
   EDIT STUDENT
===================================================== */

function editStudent(id) {

    const student =
        students.find(function (student) {

            return student.id === id;

        });


    if (!student) {

        showToast(
            "Error",
            "Student not found.",
            "error"
        );

        return;

    }


    document
        .getElementById("editStudentId")
        .value = student.id;


    document
        .getElementById("studentName")
        .value = student.name;


    document
        .getElementById("fatherName")
        .value = student.fatherName;


    document
        .getElementById("cnic")
        .value = student.cnic;


    document
        .getElementById("phone")
        .value = student.phone;


    document
        .getElementById("email")
        .value = student.email || "";


    document
        .getElementById("gender")
        .value = student.gender;


    document
        .getElementById("dob")
        .value = student.dob || "";


    document
        .getElementById("course")
        .value = student.course;


    document
        .getElementById("semester")
        .value =
        student.semester || "";


    document
        .getElementById("address")
        .value =
        student.address || "";


    document
        .getElementById("modalTitle")
        .textContent = "Edit Student";


    document
        .getElementById("saveButtonText")
        .textContent = "Update Student";


    updateGeneratedId();


    document
        .getElementById("studentModal")
        .classList.add("show");

}


/* =====================================================
   DELETE STUDENT
===================================================== */

function deleteStudent(id) {

    const student =
        students.find(function (student) {

            return student.id === id;

        });


    if (!student) {

        return;

    }


    const confirmed =
        confirm(
            `Are you sure you want to delete ${student.name}?`
        );


    if (!confirmed) {

        return;

    }


    students =
        students.filter(function (student) {

            return student.id !== id;

        });


    saveToStorage();

    renderStudents();

    updateStatistics();


    showToast(
        "Deleted!",
        "Student deleted successfully."
    );

}


/* =====================================================
   VIEW STUDENT
===================================================== */

function viewStudent(id) {

    const student =
        students.find(function (student) {

            return student.id === id;

        });


    if (!student) {

        return;

    }


    const details =
        document.getElementById(
            "studentDetails"
        );


    details.innerHTML = `

        <div class="details-grid">

            <div class="detail-item">
                <small>Student ID</small>
                <strong>${escapeHTML(student.id)}</strong>
            </div>

            <div class="detail-item">
                <small>Student Name</small>
                <strong>${escapeHTML(student.name)}</strong>
            </div>

            <div class="detail-item">
                <small>Father Name</small>
                <strong>${escapeHTML(student.fatherName)}</strong>
            </div>

            <div class="detail-item">
                <small>CNIC</small>
                <strong>${escapeHTML(student.cnic)}</strong>
            </div>

            <div class="detail-item">
                <small>Phone</small>
                <strong>${escapeHTML(student.phone)}</strong>
            </div>

            <div class="detail-item">
                <small>Email</small>
                <strong>${escapeHTML(student.email || "N/A")}</strong>
            </div>

            <div class="detail-item">
                <small>Gender</small>
                <strong>${escapeHTML(student.gender)}</strong>
            </div>

            <div class="detail-item">
                <small>Date of Birth</small>
                <strong>${escapeHTML(student.dob || "N/A")}</strong>
            </div>

            <div class="detail-item">
                <small>Course</small>
                <strong>${escapeHTML(student.course)}</strong>
            </div>

            <div class="detail-item">
                <small>Semester</small>
                <strong>${escapeHTML(student.semester || "N/A")}</strong>
            </div>

            <div class="detail-item full">
                <small>Address</small>
                <strong>${escapeHTML(student.address || "N/A")}</strong>
            </div>

        </div>

    `;


    document
        .getElementById("viewModal")
        .classList.add("show");

}


/* =====================================================
   CLOSE VIEW MODAL
===================================================== */

function closeViewModal() {

    document
        .getElementById("viewModal")
        .classList.remove("show");

}


/* =====================================================
   STATISTICS
===================================================== */

function updateStatistics() {

    const total =
        students.length;


    const male =
        students.filter(function (student) {

            return student.gender === "Male";

        }).length;


    const female =
        students.filter(function (student) {

            return student.gender === "Female";

        }).length;


    const courses =
        new Set(
            students.map(function (student) {

                return student.course;

            })
        ).size;


    document
        .getElementById("totalStudents")
        .textContent = total;


    document
        .getElementById("maleStudents")
        .textContent = male;


    document
        .getElementById("femaleStudents")
        .textContent = female;


    document
        .getElementById("totalCourses")
        .textContent = courses;


    const malePercentage =
        total === 0
        ? 0
        : Math.round((male / total) * 100);


    const femalePercentage =
        total === 0
        ? 0
        : Math.round((female / total) * 100);


    document
        .getElementById("malePercentage")
        .textContent =
        `${malePercentage}% of students`;


    document
        .getElementById("femalePercentage")
        .textContent =
        `${femalePercentage}% of students`;

}


/* =====================================================
   SEARCH / FILTER
===================================================== */

function clearFilters() {

    document
        .getElementById("searchInput")
        .value = "";


    document
        .getElementById("courseFilter")
        .value = "";


    document
        .getElementById("genderFilter")
        .value = "";


    renderStudents();

}


/* =====================================================
   SCROLL TO STUDENTS
===================================================== */

function scrollToStudents() {

    document
        .getElementById("studentsSection")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   DASHBOARD
===================================================== */

function goToDashboard() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   REPORT
===================================================== */

function showReport() {

    const total = students.length;

    const male =
        students.filter(
            student => student.gender === "Male"
        ).length;

    const female =
        students.filter(
            student => student.gender === "Female"
        ).length;


    alert(
        `Student Report\n\n` +
        `Total Students: ${total}\n` +
        `Male Students: ${male}\n` +
        `Female Students: ${female}\n` +
        `Courses: ${new Set(
            students.map(student => student.course)
        ).size}`
    );

}


/* =====================================================
   SETTINGS
===================================================== */

function showSettings() {

    alert(
        "Settings\n\n" +
        "Use the moon/sun button at the top to switch between dark and light mode."
    );

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

function toggleSidebar() {

    document
        .getElementById("sidebar")
        .classList.toggle("open");

}


/* =====================================================
   DARK / LIGHT THEME
===================================================== */

function toggleTheme() {

    document
        .body
        .classList
        .toggle("dark");


    const dark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "studentMSTheme",
        dark ? "dark" : "light"
    );


    updateThemeIcon();

}


function loadTheme() {

    const theme =
        localStorage.getItem(
            "studentMSTheme"
        );


    if (theme === "dark") {

        document
            .body
            .classList
            .add("dark");

    }


    updateThemeIcon();

}


function updateThemeIcon() {

    const icon =
        document.getElementById(
            "themeIcon"
        );


    if (
        document.body.classList.contains("dark")
    ) {

        icon.className =
            "fa-solid fa-sun";

    } else {

        icon.className =
            "fa-solid fa-moon";

    }

}


/* =====================================================
   TOAST
===================================================== */

function showToast(
    title,
    message,
    type = "success"
) {

    const toast =
        document.getElementById("toast");

    const toastTitle =
        document.getElementById("toastTitle");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastIcon =
        toast.querySelector(".toast-icon i");


    toastTitle.textContent = title;

    toastMessage.textContent = message;


    if (type === "error") {

        toastIcon.className =
            "fa-solid fa-xmark";

        toast
            .querySelector(".toast-icon")
            .style.background = "#fee2e2";

        toast
            .querySelector(".toast-icon")
            .style.color = "#dc2626";

    } else {

        toastIcon.className =
            "fa-solid fa-check";

        toast
            .querySelector(".toast-icon")
            .style.background = "#d1fae5";

        toast
            .querySelector(".toast-icon")
            .style.color = "#059669";

    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(function () {

            hideToast();

        }, 3500);

}


function hideToast() {

    document
        .getElementById("toast")
        .classList.remove("show");

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}