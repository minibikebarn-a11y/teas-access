// ========================================
// WEBSITE SETTINGS
// ========================================

let settingsId = null;

document.addEventListener("DOMContentLoaded", () => {

    loadSettings();

});

// ========================================
// LOAD SETTINGS
// ========================================

async function loadSettings() {

    const { data, error } = await supabaseClient

        .from("settings")

        .select("*")

        .limit(1)

        .single();

    if (error) {

        console.error(error);

        alert("Unable to load settings.");

        return;

    }

    settingsId = data.id;

    document.getElementById("website_name").value =
        data.website_name || "";

    document.getElementById("support_email").value =
        data.support_email || "";

    document.getElementById("support_phone").value =
        data.support_phone || "";

    document.getElementById("business_address").value =
        data.business_address || "";

    document.getElementById("facebook_url").value =
        data.facebook_url || "";

    document.getElementById("instagram_url").value =
        data.instagram_url || "";

    document.getElementById("tiktok_url").value =
        data.tiktok_url || "";

    document.getElementById("youtube_url").value =
        data.youtube_url || "";

    document.getElementById("logo_url").value =
        data.logo_url || "";

    document.getElementById("hero_title").value =
        data.hero_title || "";

    document.getElementById("hero_subtitle").value =
        data.hero_subtitle || "";

    document.getElementById("footer_text").value =
        data.footer_text || "";

}

// ========================================
// SAVE SETTINGS
// ========================================

async function saveSettings() {

    const updates = {

        website_name:
            document.getElementById("website_name").value,

        support_email:
            document.getElementById("support_email").value,

        support_phone:
            document.getElementById("support_phone").value,

        business_address:
            document.getElementById("business_address").value,

        facebook_url:
            document.getElementById("facebook_url").value,

        instagram_url:
            document.getElementById("instagram_url").value,

        tiktok_url:
            document.getElementById("tiktok_url").value,

        youtube_url:
            document.getElementById("youtube_url").value,

        logo_url:
            document.getElementById("logo_url").value,

        hero_title:
            document.getElementById("hero_title").value,

        hero_subtitle:
            document.getElementById("hero_subtitle").value,

        footer_text:
            document.getElementById("footer_text").value,

        updated_at:
            new Date().toISOString()

    };

    const { error } = await supabaseClient

        .from("settings")

        .update(updates)

        .eq("id", settingsId);

    if (error) {

        console.error(error);

        alert("Unable to save settings.");

        return;

    }

    alert("Settings saved successfully!");

    loadSettings();

}