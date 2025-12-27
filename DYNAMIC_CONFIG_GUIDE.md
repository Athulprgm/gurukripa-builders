# Dynamic Configuration Guide

## Overview

This project uses a `config.json` file to manage images and content dynamically without hardcoding in components or using a backend.

## How It Works

### 1. Configuration File Location

- **File**: `public/config.json`
- **Access**: Available at `/config.json` when app is running
- **Benefits**:
  - Change images without rebuilding
  - Update content easily
  - No backend needed
  - Version control friendly

### 2. Using the Config Hook

#### Basic Usage

```jsx
import useConfig from "../hooks/useConfig";

function MyComponent() {
  const { config, loading, error } = useConfig();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading config</div>;

  return (
    <div>
      <img src={config?.images?.hero} alt="Hero" />
      <h1>{config?.company?.name}</h1>
    </div>
  );
}
```

#### Example: Hero Component with Dynamic Background

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useConfig from "../hooks/useConfig";

const Hero = () => {
  const { config } = useConfig();
  const ref = useRef(null);

  // Dynamic background style
  const heroStyle = {
    backgroundImage: config?.images?.hero
      ? `url(${config.images.hero})`
      : "url(/hero-new.png)",
  };

  return (
    <section id="home" className="hero" ref={ref} style={heroStyle}>
      <div className="container">
        <h1>{config?.company?.tagline || "Building Visions"}</h1>
        <p>{config?.company?.description}</p>
      </div>
    </section>
  );
};
```

#### Example: Gallery with Dynamic Images

```jsx
import useConfig from "../hooks/useConfig";

const Gallery = () => {
  const { config, loading } = useConfig();

  if (loading) return <div>Loading gallery...</div>;

  return (
    <div className="gallery-grid">
      {config?.gallery?.map((image, index) => (
        <div key={index} className="gallery-item">
          <img src={image} alt={`Gallery ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};
```

### 3. Config File Structure

```json
{
  "images": {
    "hero": "/hero-new.png",
    "about": "/about-new.png",
    "logo": "/logo.png"
  },
  "gallery": ["/gallery/project1.jpg", "/gallery/project2.jpg"],
  "company": {
    "name": "Gurukripa Builders",
    "tagline": "Building Visions, Constructing Reality"
  },
  "contact": {
    "phone": "+91 7558988689",
    "email": "gurukripa9070@gmail.com"
  }
}
```

### 4. How to Update Images

#### Option 1: Update config.json

1. Open `public/config.json`
2. Change the image path:
   ```json
   "hero": "/new-hero-image.png"
   ```
3. Place new image in `public/` folder
4. Refresh browser (no rebuild needed!)

#### Option 2: CSS Background (Current Method)

The hero background is set in CSS:

```css
.hero {
  background: var(--gradient-hero), url("/hero-new.png");
}
```

To make it dynamic, you can:

1. Use inline styles with config
2. Or use CSS variables set via JavaScript

### 5. Advanced: Dynamic CSS Variables

```jsx
import { useEffect } from "react";
import useConfig from "../hooks/useConfig";

function App() {
  const { config } = useConfig();

  useEffect(() => {
    if (config?.images?.hero) {
      document.documentElement.style.setProperty(
        "--hero-bg-image",
        `url(${config.images.hero})`
      );
    }
  }, [config]);

  return <div>...</div>;
}
```

Then in CSS:

```css
.hero {
  background: var(--gradient-hero), var(--hero-bg-image, url("/hero-new.png"));
}
```

### 6. Benefits of This Approach

✅ **No Backend Required**: Config served as static file
✅ **Easy Updates**: Just edit JSON and replace images
✅ **Type Safety**: Can add TypeScript types for config
✅ **Caching**: Browser caches config.json
✅ **Version Control**: Track config changes in Git
✅ **Environment Specific**: Different configs for dev/prod

### 7. Best Practices

1. **Fallback Values**: Always provide defaults

   ```jsx
   const heroImage = config?.images?.hero || "/default-hero.png";
   ```

2. **Loading States**: Show loading while fetching

   ```jsx
   if (loading) return <Skeleton />;
   ```

3. **Error Handling**: Handle fetch errors gracefully

   ```jsx
   if (error) return <DefaultContent />;
   ```

4. **Image Optimization**:
   - Use WebP format for better compression
   - Provide multiple sizes for responsive images
   - Consider lazy loading

### 8. Alternative: Environment Variables

For build-time configuration:

```env
# .env
VITE_HERO_IMAGE=/hero-new.png
VITE_COMPANY_NAME=Gurukripa Builders
```

```jsx
const heroImage = import.meta.env.VITE_HERO_IMAGE;
```

**Note**: Requires rebuild when changed.

### 9. Comparison

| Method                | Runtime Update | No Rebuild | Easy for Non-Devs |
| --------------------- | -------------- | ---------- | ----------------- |
| config.json           | ✅             | ✅         | ✅                |
| Environment Variables | ❌             | ❌         | ❌                |
| Hardcoded             | ❌             | ❌         | ❌                |
| Backend API           | ✅             | ✅         | ⚠️                |

### 10. Production Deployment

When deploying:

1. Ensure `public/config.json` is included
2. Update image paths if using CDN
3. Consider adding cache headers for config.json
4. Test config loading in production environment

## Conclusion

The `config.json` approach is perfect for your use case:

- ✨ No backend needed
- ✨ Easy to update images
- ✨ Non-developers can make changes
- ✨ Fast and efficient
