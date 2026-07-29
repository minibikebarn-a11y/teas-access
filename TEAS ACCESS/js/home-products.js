document.addEventListener("DOMContentLoaded", loadFeaturedProduct);

async function loadFeaturedProduct() {

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .limit(1)
        .single();

    if (error) {
        console.error(error);
        return;
    }

    document.getElementById("productTitle").textContent = data.name;

    document.getElementById("productPrice").textContent =
        `$${Number(data.price).toFixed(2)}`;

    document.getElementById("productDescription").textContent =
        data.description;

    document.getElementById("productImage").src =
        data.image_url;
}