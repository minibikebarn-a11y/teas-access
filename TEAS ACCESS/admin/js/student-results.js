// ========================================
// STUDENT RESULTS MANAGEMENT
// ========================================

let allStudents = [];

document.addEventListener("DOMContentLoaded", () => {

    loadStudents();

    const search = document.getElementById("searchStudents");

    if (search) {
        search.addEventListener("input", filterStudents);
    }

});

// ========================================
// LOAD STUDENTS
// ========================================

async function loadStudents() {

    const table = document.getElementById("studentsTable");

    table.innerHTML = `
        <tr>
            <td colspan="4">
                Loading student results...
            </td>
        </tr>
    `;

    const { data, error } = await supabaseClient

        .from("student_results")

        .select("*")

        .order("created_at", {
            ascending: false
        });

    if (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    Unable to load student results.
                </td>
            </tr>
        `;

        return;

    }

    allStudents = data || [];

    renderStudents(allStudents);

}

// ========================================
// RENDER TABLE
// ========================================

function renderStudents(students) {

    const table =
        document.getElementById("studentsTable");

    if (!students.length) {

        table.innerHTML = `
            <tr>
                <td colspan="4">
                    No student results found.
                </td>
            </tr>
        `;

        return;

    }

    table.innerHTML = "";

    students.forEach(student => {

        table.innerHTML += `

            <tr>

                <td>

                    ${student.student_name || "-"}

                </td>

                <td>

                    ${student.score || "-"}

                </td>

                <td>

                    ${student.school || "-"}

                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="editStudent('${student.id}')">

                        Edit

                    </button>

                    <button
                        class="view-btn"
                        style="background:#dc2626;margin-left:8px;"
                        onclick="deleteStudent('${student.id}')">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}

// ========================================
// SEARCH
// ========================================

function filterStudents() {

    const search =
        document
        .getElementById("searchStudents")
        .value
        .toLowerCase();

    const filtered = allStudents.filter(student => {

        return (

            (student.student_name || "")
                .toLowerCase()
                .includes(search)

            ||

            (student.school || "")
                .toLowerCase()
                .includes(search)

        );

    });

    renderStudents(filtered);

}

// ========================================
// EDIT
// ========================================

function editStudent(id) {

    window.location.href =
        `edit-student.html?id=${id}`;

}

// ========================================
// DELETE
// ========================================

async function deleteStudent(id) {

    const confirmed = confirm(
        "Delete this student result?"
    );

    if (!confirmed) return;

    const { error } = await supabaseClient

        .from("student_results")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to delete result.");

        return;

    }

    allStudents =
        allStudents.filter(student => student.id !== id);

    renderStudents(allStudents);

    alert("Student result deleted.");

}