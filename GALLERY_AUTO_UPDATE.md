# Gallery Auto-Update Guide

## 🎯 Overview

Your gallery images are now automatically managed! The system scans the `public/gallery` directory and updates `config.json` automatically.

## ✅ What's Set Up

### 1. **Config File Updated**

- `public/config.json` now contains all 11 images from your gallery
- Images are automatically listed in the gallery array

### 2. **Auto-Update Script**

- Location: `scripts/update-gallery.js`
- Automatically scans `public/gallery` directory
- Updates `config.json` with all image files

### 3. **NPM Script Command**

- Added `update-gallery` command to package.json
- Easy to run anytime you add new images

## 📸 Current Gallery Images

Your config now includes these 11 images:

1. IMG-20241207-WA0006.jpg
2. IMG-20250713-WA0024(1).jpg
3. IMG-20250713-WA0024.jpg
4. IMG-20250713-WA0025.jpg
5. IMG-20250713-WA0026.jpg
6. IMG-20250713-WA0027.jpg
7. IMG-20250713-WA0028.jpg
8. IMG-20250713-WA0029.jpg
9. IMG-20250713-WA0030.jpg
10. IMG-20250713-WA0031.jpg
11. IMG-20250713-WA0032.jpg

## 🚀 How to Add New Images

### Method 1: Automatic (Recommended)

1. **Add images** to `public/gallery/` folder

   ```
   public/
   └── gallery/
       ├── new-project1.jpg
       ├── new-project2.jpg
       └── ...
   ```

2. **Run the update script**

   ```bash
   npm run update-gallery
   ```

3. **Refresh browser** - Your gallery is updated!

### Method 2: Manual

1. Add images to `public/gallery/`
2. Manually edit `public/config.json`:
   ```json
   "gallery": [
     "/gallery/new-image.jpg",
     ...
   ]
   ```

## 🎨 Using Gallery in Components

The Gallery component automatically uses images from config:

```jsx
import useConfig from "../hooks/useConfig";

function Gallery() {
  const { config, loading } = useConfig();

  if (loading) return <div>Loading...</div>;

  return (
    <div className="gallery-grid">
      {config?.gallery?.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt={`Project ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
```

## 🔧 Script Details

### What the script does:

1. ✅ Scans `public/gallery` directory
2. ✅ Filters for image files (.jpg, .jpeg, .png, .webp, .gif)
3. ✅ Sorts files alphabetically
4. ✅ Updates `config.json` automatically
5. ✅ Shows summary of found images

### Supported image formats:

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

## 📝 Example Output

When you run `npm run update-gallery`:

```
✅ Found 11 images in gallery:
   1. IMG-20241207-WA0006.jpg
   2. IMG-20250713-WA0024(1).jpg
   3. IMG-20250713-WA0024.jpg
   ...

🎉 Config updated successfully!
📝 Updated: /path/to/public/config.json
```

## 🎯 Benefits

✅ **No Manual Editing** - Just drop images and run script
✅ **No Typos** - Automatic file name detection
✅ **Sorted** - Images are alphabetically sorted
✅ **Fast** - Updates in seconds
✅ **Safe** - Preserves other config settings

## 🔄 Workflow

```
Add Image → Run Script → Refresh Browser
    ↓           ↓              ↓
  Drop in    npm run      See new
  /gallery   update-      images!
             gallery
```

## ⚡ Quick Commands

```bash
# Update gallery config
npm run update-gallery

# Start dev server
npm run dev

# Build for production
npm run build
```

## 🎨 Image Recommendations

For best results:

- **Format**: WebP or JPEG
- **Size**: Max 2MB per image
- **Dimensions**: 1920x1080 or similar
- **Naming**: Use descriptive names (project-name-2024.jpg)

## 🐛 Troubleshooting

### Script not working?

```bash
# Check if gallery directory exists
ls public/gallery

# Run script directly
node scripts/update-gallery.js
```

### Images not showing?

1. Check file paths in config.json
2. Ensure images are in `public/gallery/`
3. Clear browser cache
4. Check browser console for errors

## 📚 Related Files

- `public/config.json` - Configuration file
- `scripts/update-gallery.js` - Auto-update script
- `src/hooks/useConfig.js` - React hook to use config
- `DYNAMIC_CONFIG_GUIDE.md` - Full configuration guide

## 🎉 That's It!

You now have a fully automated gallery system. Just drop images in the folder and run the script!

---

**Need help?** Check the DYNAMIC_CONFIG_GUIDE.md for more details.
