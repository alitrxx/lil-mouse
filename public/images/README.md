# عکس‌های یادگاری / Photo Stickers

این پوشه جایی است که عکس‌های واقعی خودت رو می‌ذاری تا روی نامه نمایش داده بشن.

---

## چطور عکس‌ها رو عوض کنم؟ / How to replace photos

1. عکس خودت رو (با فرمت `.jpg`، `.png` یا `.webp`) توی همین پوشه کپی کن.
   - سعی کن حجم هر عکس زیر ۲۵۰ کیلوبایت باشه تا سایت سریع لود بشه.
2. فایل `src/data/stickers.ts` رو باز کن.
3. برای هر استیکر، مقدار `src` رو به مسیر عکس جدیدت تغییر بده. مثلاً:
   ```ts
   {
     id: "sticker-1",
     src: "/images/my-photo.jpg",   // ← اینجا رو عوض کن
     alt: "توضیح عکس برای screen reader",
     ...
   }
   ```
4. `alt` رو هم یه توضیح کوتاه از عکس بذار تا سایت برای همه قابل‌دسترس باشه.

## چطور یه استیکر رو حذف کنم؟ / How to remove a sticker

- توی `stickers.ts`، اون آبجکت رو از آرایه پاک کن.
- یا `enabled: false` بذار تا مخفی بشه ولی کد بمونه.

## چطور استیکر اضافه کنم؟ / How to add a new sticker

- یه آبجکت جدید توی آرایه `stickers` کپی کن، `id` رو عوض کن،
  و `src` رو به عکس جدیدت بذار.

## فایل‌های پیش‌فرض / Placeholder files

اگه هنوز عکس واقعی نذاشتی، سایت از فایل‌های SVG دست‌ساز استفاده می‌کنه.
این فایل‌ها عکس واقعی نیستن — فقط یه جا برای عکس‌های واقعی تو هستن.

| فایل                       | توضیح                          |
|----------------------------|--------------------------------|
| `placeholder-flower.svg`   | گل دست‌ساز                     |
| `placeholder-moon.svg`     | ماه دست‌ساز                    |
| `placeholder-butterfly.svg`| پروانه دست‌ساز                 |
| `placeholder-star.svg`     | ستاره دست‌ساز                  |
| `placeholder-leaf.svg`     | برگ دست‌ساز                    |
| `placeholder-cloud.svg`   | ابر دست‌ساز                    |

وقتی عکس واقعی گذاشتی، می‌تونی این فایل‌ها رو پاک کنی یا نگه‌داری.

---

## How to replace photos (English summary)

1. Copy your photos (`.jpg` / `.png` / `.webp`, ideally under 250 KB each) into this folder.
2. Open `src/data/stickers.ts` and change the `src` field of each sticker
   to point to the new file (e.g. `"/images/my-photo.jpg"`).
3. Update `alt` with a short description of the photo for screen readers.
4. Adjust `caption`, `size`, `rotation`, `position`, and `shape` to taste.
5. To hide a sticker without deleting the code, set `enabled: false`.
