# Image Strategy and Sources

Overview
- This project uses high-quality, royalty-free demo images referenced by URL to keep the repository light.
- Gradients remain as graceful fallbacks for performance and reliability.
- All images include alt text, responsive <picture> with WebP sources, decoding="async", and loading hints for optimal UX.

Replace with brand CDN
- Swap the URLs in IMG inside src/App.js with your brand CDN images.
- Maintain aspect ratios suitable for each section:
  - Hero: 2000x1200 or higher
  - Story/Hype/Community visuals: ~1600x900
  - Product cards: ~1200x800

Accessibility
- Provide descriptive, concise alt text.
- Hero decorative images use empty alt when they are background-only and have text overlays.
- Interactive controls include aria-label and roles where helpful.

Performance Tips
- Prefer WebP/AVIF if supported by your CDN.
- Set appropriate cache headers in production.
- Image CDNs: Imgix, Cloudinary, or your own S3+CloudFront.
- Consider srcset/sizes for further responsive tuning as you add breakpoints.

Note
- The current URLs are placeholders from Unsplash for demo purposes only.
- Ensure you have the right to use any final imagery and follow brand guidelines.
