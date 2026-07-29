// ========================================
// PRODUCTS MANAGEMENT
// ========================================

let allProducts = [];

document.addEventListener("DOMContentLoaded", () => {

    loadProducts();

    const search = document.getElementById("searchProducts");

    if (search) {
        search.addEventListener("input", filterProducts);
    }

});

// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

    const table = document.getElementById("productsTable");

    table.innerHTML = `
        <tr>
            <td colspan="5">Loading products...</td>
        </tr>
    `;

    const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .order("name");

    if (error) {

        console.error(error);

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    Unable to load products.
                </td>
            </tr>
        `;

        return;

    }

    allProducts = data || [];

    renderProducts(allProducts);

}

// ========================================
// RENDER PRODUCTS
// ========================================

function renderProducts(products) {

    const table = document.getElementById("productsTable");

    if (!products.length) {

        table.innerHTML = `
            <tr>
                <td colspan="5">
                    No products found.
                </td>
            </tr>
        `;

        return;

    }

    table.innerHTML = "";

    products.forEach(product => {

        table.innerHTML += `

            <tr>

                <td>

                    <strong>${product.name}</strong>

                </td>

                <td>

                    ${product.description || "-"}

                </td>

                <td>

                    $${Number(product.price || 0).toFixed(2)}

                </td>

                <td>

                    ${
                        product.pdf_url
                        ? `<a class="view-btn"
                             href="${product.pdf_url}"
                             target="_blank">
                             View PDF
                           </a>`
                        : "-"
                    }

                </td>

                <td>

                    <button
                        class="view-btn"
                        onclick="editProduct('${product.id}')">

                        Edit

                    </button>

                    <button
                        class="view-btn"
                        style="background:#dc2626;margin-left:8px;"
                        onclick="deleteProduct('${product.id}')">

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

function filterProducts() {

    const search = document
        .getElementById("searchProducts")
        .value
        .toLowerCase();

    const filtered = allProducts.filter(product => {

        return (

            (product.name || "")
            .toLowerCase()
            .includes(search)

            ||

            (product.description || "")
            .toLowerCase()
            .includes(search)

        );

    });

    renderProducts(filtered);

}

// ========================================
// EDIT PRODUCT
// ========================================

function editProduct(id) {

    window.location.href =
        `edit-product.html?id=${id}`;

}

// ========================================
// DELETE PRODUCT
// ========================================

async function deleteProduct(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const { error } = await supabaseClient

        .from("products")

        .delete()

        .eq("id", id);

    if (error) {

        console.error(error);

        alert("Unable to delete product.");

        return;

    }

    allProducts =
        allProducts.filter(product => product.id !== id);

    renderProducts(allProducts);

    alert("Product deleted successfully.");

}