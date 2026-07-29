document.addEventListener("DOMContentLoaded", loadStudents);

async function loadStudents(){

    const { data, error } = await supabaseClient

        .from("student_results")

        .select("*")

        .eq("featured", true)

        .order("created_at", { ascending: false });

    if(error){

        console.error(error);

        return;

    }

    const gallery =
        document.getElementById("studentGallery");
        if (!gallery) {
    console.error("studentGallery element not found.");
    return;
}

    gallery.innerHTML="";

    data.forEach(student=>{

        gallery.innerHTML += `

<div class="gallery-card">

    <img
        src="${student.image_url}"
        class="gallery-image"
        alt="${student.student_name}"

        data-name="${student.student_name}"
        data-score="${student.score}%"
        data-program="${student.program || ''}"
        data-attempt="${student.attempt || ''}"
        data-review="${student.review || ''}"
    >

</div>

`;

    });

}