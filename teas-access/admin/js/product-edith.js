// ========================================
// PRODUCT EDIT / ADD
// ========================================

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

document.addEventListener("DOMContentLoaded", () => {

    if (productId) {
        loadProduct();
    }

    document
        .getElementById("productImage")
        .addEventListener("input", previewImage);

    document
        .getElementById("productForm")
        .addEventListener("submit", saveProduct);

});

// ========================================
// LOAD PRODUCT
// ========================================

async function loadProduct() {

    const { data, error } = await supabaseClient

        .from("products")

        .select("*")

        .eq("id", productId)

        .single();

    if (error) {

        console.error(error);

        alert("Unable to load product.");

        return;

    }

    document.getElementById("productName").value =
        data.name || "";

    document.getElementById("productPrice").value =
        data.price || "";

    document.getElementById("productDescription").value =
        data.description || "";

    document.getElementById("productImage").value =
        data.image_url || "";

    document.getElementById("productActive").checked =
        data.active ?? true;

    previewImage();

}

// ========================================
// IMAGE PREVIEW
// ========================================

function previewImage() {

    const input =
        document.getElementById("productImage");

    const preview =
        document.getElementById("imagePreview");

    if (!input.value.trim()) {

        preview.style.display = "none";

        return;

    }

    preview.src = input.value;

    preview.style.display = "block";

}

// ========================================
// SAVE PRODUCT
// ========================================

async function saveProduct(e) {

    e.preventDefault();

    const saveButton =
        document.querySelector(".login-btn");

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    const product = {

        name:
            document.getElementById("productName").value,

        price:
            Number(
                document.getElementById("productPrice").value
            ),

        description:
            document.getElementById("productDescription").value,

    

    };

    let error;

    if (productId) {

        ({ error } = await supabaseClient

            .from("products")

            .update(product)

            .eq("id", productId));

    } else {

        ({ error } = await supabaseClient

            .from("products")

            .insert(product));

    }

    if (error) {

        console.error(error);

        alert(error.message);

        saveButton.disabled = false;
        saveButton.textContent = "Save Changes";

        return;

    }

    alert("Product saved successfully!");

    window.location.href = "products.html";

}