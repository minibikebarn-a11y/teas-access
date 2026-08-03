//=========================================
// CHECKOUT
//=========================================

//=========================================
// PLAN TIERS
// Keep this in sync with the pricing cards on
// index.html and product.html
//=========================================

const TIERS = {

    "50": {
        name: "ATI TEAS Essentials",
        price: 50,
        features: [
            "Active Recall Study Guide",
            "1,500 ATI TEAS-Style Practice Questions",
            "14-Day Study Plan",
            "Weakness Reports",
            "Instant PDF Delivery",
            "Lifetime Access"
        ]
    },

    "100": {
        name: "ATI TEAS 7 Ultimate Success System",
        price: 100,
        features: [
            "Active Recall Study Guide",
            "3,500 ATI TEAS-Style Practice Questions",
            "Detailed Answer Rationales",
            "14-Day & 30-Day Study Plans",
            "High-Yield Review Notes & Formula Sheets",
            "Progress Tracker",
            "Weakness Reports",
            "Cheat Sheets",
            "Instant PDF Delivery",
            "Lifetime Access"
        ]
    },

    "150": {
        name: "ATI TEAS All-Access VIP",
        price: 150,
        features: [
            "Everything in the Ultimate Success System",
            "Priority WhatsApp Study Support",
            "Bonus High-Yield Flashcard Deck",
            "Early Access to New Study Resources",
            "Lifetime Free Updates"
        ]
    }

};

let selectedTier = TIERS["100"];

document.addEventListener("DOMContentLoaded", () => {

    loadSelectedTier();

    const form = document.getElementById("checkoutForm");

    const submitBtn = document.querySelector(".checkout-btn");

    form.addEventListener("submit", submitOrder);

});

//=========================================
// READ TIER FROM URL & POPULATE SUMMARY
//=========================================

function loadSelectedTier(){

    const params = new URLSearchParams(window.location.search);

    const tierKey = params.get("tier");

    selectedTier = TIERS[tierKey] || TIERS["100"];

    const titleEl = document.getElementById("orderProductTitle");

    const listEl = document.getElementById("orderIncludedList");

    const subtotalEl = document.getElementById("orderSubtotal");

    const totalEl = document.getElementById("orderTotal");

    if(titleEl) titleEl.textContent = selectedTier.name;

    if(listEl){

        listEl.innerHTML = selectedTier.features

            .map(feature => `<li>✓ ${feature}</li>`)

            .join("");

    }

    if(subtotalEl) subtotalEl.textContent = `$${selectedTier.price}`;

    if(totalEl) totalEl.textContent = `$${selectedTier.price}`;

}

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

            plan: selectedTier.name,

            total: selectedTier.price,

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