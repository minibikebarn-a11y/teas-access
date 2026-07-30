document.addEventListener("DOMContentLoaded", () => {
    loadOrder();
});

const params = new URLSearchParams(window.location.search);

const orderId = params.get("id");

async function loadOrder(){

    const { data, error } = await supabaseClient

        .from("orders")

        .select("*")

        .eq("id", orderId)

        .single();

    if(error){

        console.error(error);

        return;

    }

    document.getElementById("orderNumber").textContent =
        data.order_number;

    document.getElementById("customerName").textContent =
        data.first_name + " " + data.last_name;

    document.getElementById("customerEmail").textContent =
        data.email;

    document.getElementById("customerPhone").textContent =
        data.phone;

    document.getElementById("paymentMethod").textContent =
        data.payment_method;

    document.getElementById("orderTotal").textContent =
        Number(data.total).toFixed(2);

    document.getElementById("orderNotes").textContent =
        data.notes || "No notes.";

    document.getElementById("statusSelect").value =
        data.status;

}
document
.getElementById("saveStatus")
.addEventListener("click", updateStatus);

async function updateStatus(){

    const status =
        document.getElementById("statusSelect").value;

    const { error } = await supabaseClient

        .from("orders")

        .update({

            status: status

        })

        .eq("id", orderId);

 if(error){

    alert(error.message);

    return;

}

alert("Order updated successfully!");

loadOrder();

}