// ========================================
// HOME SETTINGS
// ========================================

document.addEventListener("DOMContentLoaded", loadWebsiteSettings);

async function loadWebsiteSettings() {

    const { data, error } = await supabaseClient
        .from("settings")
        .select("*")
        .limit(1)
        .single();

    if (error) {
        console.error("Settings:", error);
        return;
    }

    // Logo
    const siteLogo = document.getElementById("siteLogo");
    const footerLogo = document.getElementById("footerLogo");

    if (siteLogo) siteLogo.textContent = data.website_name || "TEAS ACCESS";
    if (footerLogo) footerLogo.textContent = data.website_name || "TEAS ACCESS";

    // Hero
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");

    if (heroTitle)
        heroTitle.innerHTML = data.hero_title || heroTitle.innerHTML;

    if (heroSubtitle)
        heroSubtitle.textContent = data.hero_subtitle || "";

    // Footer
    const footerDescription = document.getElementById("footerDescription");

    if (footerDescription)
        footerDescription.textContent = data.footer_text || "";

    // Support Email
    const supportEmail = document.getElementById("supportEmail");

    if (supportEmail)
        supportEmail.textContent = data.support_email || "";

    // Social Links
    const facebook = document.getElementById("facebookLink");
    const instagram = document.getElementById("instagramLink");
    const tiktok = document.getElementById("tiktokLink");

    if (facebook) facebook.href = data.facebook_url || "#";
    if (instagram) instagram.href = data.instagram_url || "#";
    if (tiktok) tiktok.href = data.tiktok_url || "#";
}