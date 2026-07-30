//=========================================
// CHECKOUT
//=========================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("checkoutForm");

    const submitBtn = document.querySelector(".checkout-btn");

    form.addEventListener("submit", submitOrder);

});

//=========================================
// GENERATE ORDER NUMBER
//=========================================

function generateOrderNumber(){

    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth()+1).padStart(2,"0");

    const day = String(date.getDate()).padStart(2,"0");

    const random = Math.floor(1000 + Math.random()*9000);

    return `TA-${year}${month}${day}-${random}`;

}

//=========================================
// SUBMIT ORDER
//=========================================

async function submitOrder(e){

    e.preventDefault();

    const submitBtn = document.querySelector(".checkout-btn");

    submitBtn.disabled = true;

    submitBtn.innerHTML = "Submitting Order...";

    try{

        const order = {

            order_number: generateOrderNumber(),

            first_name: document.getElementById("firstName").value,

            last_name: document.getElementById("lastName").value,

            email: document.getElementById("email").value,

            phone: document.getElementById("phone").value,

            payment_method: document.querySelector('input[name="payment"]:checked').value,

            notes: document.getElementById("notes") ? document.getElementById("notes").value : "",

            total:100,

            status:"Pending Payment"

        };

        const { error } = await supabaseClient

        .from("orders")

        .insert(order);

        if(error) throw error;

        try{

            await fetch("/api/send-order-email", {

                method: "POST",

                headers: { "Content-Type": "application/json" },

                body: JSON.stringify({ order })

            });

        }

        catch(emailErr){

            // Order still succeeded even if the email fails to send.
            // Log it so it can be investigated, but don't block the customer.

            console.error("Order email failed to send:", emailErr);

        }

        sessionStorage.setItem("lastOrder",JSON.stringify(order));

        window.location.href="success.html";

    }

    catch(err){

        console.error(err);

        alert("Unable to submit your order. Please try again.");

        submitBtn.disabled=false;

        submitBtn.innerHTML="Submit Order";

    }

}