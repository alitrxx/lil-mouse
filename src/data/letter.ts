/**
 * Letter content — Persian message for the Girls' Day gift.
 *
 * IMPORTANT: This text must be displayed EXACTLY as written.
 * Do not translate, rewrite, shorten, or omit any part.
 *
 * Each item in `paragraphs` is one paragraph of the letter, rendered
 * sequentially with a small reveal animation.
 */

export interface LetterParagraph {
  /** The exact Persian text of the paragraph. */
  text: string;
  /** Optional emphasis — used for the final greeting line. */
  emphasize?: boolean;
}

export interface LetterContent {
  /** Short heading shown at the top of the letter (handwritten feel). */
  heading: string;
  /** Sequential paragraphs of the message. */
  paragraphs: LetterParagraph[];
  /** Small signature line shown below the body. */
  signature?: string;
}

export const letter: LetterContent = {
  heading: "سلاممم :)",
  paragraphs: [
    {
      text: "خب، از اونجایی که می‌دونم کادوهای دست‌ساز رو خیلی دوست داری، ولی خب چون از هم دوریممم و نمی‌تونستم چیزی بهت بدم، فکر کردم شاید این بتونه یه جایگزین کوچیک و قشنگ باشه.",
    },
    {
      text: "می‌دونی، چندتا چیز هست که واقعاً تو رو خاص می‌کنه؛ از سلیقه‌ی موسیقیت و طرز فکرت گرفته تا اینکه چقدر باهوش، درس‌خون و مهربونی. تازه اسکیت هم بلدییی! :))",
    },
    {
      text: "خلاصه که کلی چیز خوب برای گفتن در موردت هست.",
    },
    {
      text: "و یه چیز دیگه؛ ممنون که باهام دوست شدی. شاید چیز خیلی بزرگی به نظر نیاد، ولی من واقعاً از اینکه باهات آشنا شدم خوشحالم. 💙",
    },
    {
      text: "روز دختر مبارککک! 🦋",
      emphasize: true,
    },
  ],
};

/**
 * The small Persian hint shown near the bottom of the initial scene.
 */
export const primaryHint = "یه چیز کوچیک برای تو 💙";
export const secondaryHint = "روی نامه کلیک کن";
