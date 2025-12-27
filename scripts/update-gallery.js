import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Auto-update gallery images in config.json
 * This script scans the public/gallery directory and updates config.json
 *
 * Usage: node scripts/update-gallery.js
 */

const CONFIG_PATH = path.join(__dirname, "../public/config.json");
const GALLERY_DIR = path.join(__dirname, "../public/gallery");

function updateGalleryConfig() {
  try {
    // Read current config
    const configData = fs.readFileSync(CONFIG_PATH, "utf8");
    const config = JSON.parse(configData);

    // Check if gallery directory exists
    if (!fs.existsSync(GALLERY_DIR)) {
      console.log("📁 Gallery directory not found. Creating...");
      fs.mkdirSync(GALLERY_DIR, { recursive: true });
      config.gallery = [];
    } else {
      // Read all files from gallery directory
      const files = fs.readdirSync(GALLERY_DIR);

      // Filter for image files only
      const imageFiles = files.filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext);
      });

      // Sort files alphabetically
      imageFiles.sort();

      // Update config with gallery images
      config.gallery = imageFiles.map((file) => `/gallery/${file}`);

      console.log(`✅ Found ${imageFiles.length} images in gallery:`);
      imageFiles.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`);
      });
    }

    // Write updated config back to file
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf8");

    console.log("\n🎉 Config updated successfully!");
    console.log(`📝 Updated: ${CONFIG_PATH}`);
  } catch (error) {
    console.error("❌ Error updating config:", error.message);
    process.exit(1);
  }
}

// Run the update
updateGalleryConfig();
