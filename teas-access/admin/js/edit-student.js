// ========================================
// EDIT / ADD STUDENT RESULT
// ========================================

const params = new URLSearchParams(window.location.search);
const studentId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {

    if (studentId) {
        loadStudent();
    }

    document
        .getElementById("studentImage")
        .addEventListener("input", previewImage);

    document
        .getElementById("studentForm")
        .addEventListener("submit", saveStudent);

});

// ========================================
// LOAD STUDENT
// ========================================

async function loadStudent() {

    const { data, error } = await supabaseClient

        .from("student_results")

        .select("*")

        .eq("id", studentId)

        .single();

    if (error) {

        console.error(error);

        alert("Unable to load student result.");

        return;

    }

    document.getElementById("studentName").value =
        data.student_name || "";

    document.getElementById("studentScore").value =
        data.score || "";

    document.getElementById("studentProgram").value =
        data.program || "";

    document.getElementById("studentAttempt").value =
        data.attempt || "";

    document.getElementById("studentReview").value =
        data.review || "";

    document.getElementById("studentImage").value =
        data.image_url || "";

    document.getElementById("featured").checked =
        data.featured || false;

    document.getElementById("displayOrder").value =
        data.display_order || 0;

    previewImage();

}

// ========================================
// IMAGE PREVIEW
// ========================================

function previewImage() {

    const image =
        document.getElementById("studentImage").value;

    const preview =
        document.getElementById("imagePreview");

    if (!image) {

        preview.style.display = "none";

        return;

    }

    preview.src = image;

    preview.style.display = "block";

}

// ========================================
// SAVE STUDENT
// ========================================

async function saveStudent(e) {

    e.preventDefault();

    const button =
        document.querySelector(".login-btn");

    button.disabled = true;
    button.textContent = "Saving...";

    const student = {

        student_name:
            document.getElementById("studentName").value,

        score:
            Number(
                document.getElementById("studentScore").value
            ),

        program:
            document.getElementById("studentProgram").value,

        attempt:
            document.getElementById("studentAttempt").value,

        review:
            document.getElementById("studentReview").value,

        image_url:
            document.getElementById("studentImage").value,

        featured:
            document.getElementById("featured").checked,

        display_order:
            Number(
                document.getElementById("displayOrder").value
            )

    };

    let error;

    if (studentId) {

        ({ error } = await supabaseClient

            .from("student_results")

            .update(student)

            .eq("id", studentId));

    } else {

        ({ error } = await supabaseClient

            .from("student_results")

            .insert(student));

    }

    if (error) {

        console.error(error);

        alert(error.message);

        button.disabled = false;
        button.textContent = "Save Changes";

        return;

    }

    alert("Student result saved successfully!");

    window.location.href =
        "student-results.html";

}