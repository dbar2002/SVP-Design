# Gallery Images

Drop your photos here. The site references these filenames:

## Homepage Gallery (6 photos + 2 placeholder slots)
- `photo-01.jpg` — Featured/hero image (large, spans 2×2 in grid)
- `photo-02.jpg` — Standard
- `photo-03.jpg` — Standard
- `photo-04.jpg` — Wide format (spans 2 columns)
- `photo-05.jpg` — Standard
- `photo-06.jpg` — Standard

## Full Gallery Page (12 photos + 5 placeholder slots)
- `photo-07.jpg` — Tall format (spans 2 rows)
- `photo-08.jpg` — Standard
- `photo-09.jpg` — Standard
- `photo-10.jpg` — Standard
- `photo-11.jpg` — Wide format
- `photo-12.jpg` — Standard

## Recommended Sizes
- **Standard**: 800×600px (4:3) or 800×800px (1:1)
- **Wide (--wide)**: 1200×600px (2:1)
- **Tall (--tall)**: 600×800px (3:4)
- **Featured (--featured)**: 1200×800px (3:2)

All images will be cropped with `object-fit: cover`, so the center
of the photo is what shows. JPG format recommended for file size.

## Adding More Photos
1. Add the image file here
2. Open `gallery.html` (or `index.html` for the homepage section)
3. Replace a `gallery__item--placeholder` block with:

```html
<div class="gallery__item" data-animate>
  <img src="/assets/images/gallery/your-photo.jpg" alt="Description" />
  <div class="gallery__caption">
    <div class="gallery__caption-title">Title</div>
    <div class="gallery__caption-sub">Optional subtitle</div>
  </div>
</div>
```

4. Optionally add `gallery__item--wide`, `--tall`, or `--featured` class
