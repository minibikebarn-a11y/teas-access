document.addEventListener("DOMContentLoaded", loadStudents);

async function loadStudents(){

    const { data, error } = await supabaseClient
        .from("student_results")
        .select("*")
        .order("created_at", { ascending:false });

    if(error){

        console.error(error);

        return;

    }

    renderStudents(data);

}

function renderStudents(results){

    const table=document.getElementById("studentsTable");

    table.innerHTML="";

    if(results.length===0){

        table.innerHTML=`
        <tr>
            <td colspan="5">No student results found.</td>
        </tr>
        `;

        return;

    }

    results.forEach(student=>{

        table.innerHTML+=`

<tr>

<td>${student.student_name}</td>

<td>${student.score}%</td>

<td>${student.program}</td>

<td>

${student.featured ? "⭐ Yes" : "No"}

</td>

<td>

<a
class="view-btn"
href="student-edit.html?id=${student.id}">

Edit

</a>

</td>

</tr>

`;

    });

}