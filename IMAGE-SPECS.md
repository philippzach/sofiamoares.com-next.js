# Content block size reference

Sources: the GraphQL query in `app/(notlanding)/work/[slug]/page.js`, the layout logic in `components/blocks/*.js`, and the block dispatcher in `components/blocks/blocks.js`.

**Design assumptions behind the "Export at" column:** the layout has no max-width container (body padding = 16 px each side), so at a 1920 CSS px viewport each row spans ~1888 px. Columns split by Tailwind grid (`md:grid-cols-2` → 50/50, `md:grid-cols-7` with 4+3 → 66/33, `md:grid-cols-4` with 2+2 → 50/50 LOCK layout, with 16 px gaps). "2× max rendered width" is rounded up to the nearest 100 and never below what imgix actually requests, so imgix has headroom instead of upsampling.

**Imgix fetch** column shows the exact params the GraphQL query sends. `fit: crop` = imgix crops to that aspect; `fm: jpg` only = natural proportions preserved. If the imgix `w:` is larger than the file you upload, imgix returns your original — so uploading smaller than the fetch target loses sharpness.

**Videos:** all video blocks use `VideoJS` with `fluid: true`, meaning the player preserves the source's intrinsic aspect ratio and scales to fill the column. There is no crop. Use **MP4 (H.264, AAC audio, yuv420p pixel format)** for broad browser support. Target ~8–12 Mbps bitrate at 1080p. The two column widths matter for how big the file plays back, listed per slot.

---

## Record-level images (every post has these)

| Record field | Fetched at | Display aspect | Crop? | Export at (2×) | Notes |
|---|---|---|---|---|---|
| `coverImage` (list/OG) | 2000 × 1000 | 2:1 | yes | **4000 × 2000** | Used on `/work` card and as OG image. Center-cropped. |
| `headerimage` (post hero, image mode) | 2500 × 1250 | 2:1 | yes | **5000 × 2500** | The big hero. If using video mode, see Mux row below. |
| `headerimage` (post hero, video mode) | Mux `muxPlaybackId` | video native | n/a | **1920 × 1080 MP4, H.264** | Uploaded to DatoCMS Mux field. `isvideo` toggle on the record selects this path. |

---

## Blocks — image & video slots

| Block (CMS menu label) | Slot (field) | Fetched at | Display aspect | Crop? | Export at (2×) |
|---|---|---|---|---|---|
| **Image** | `image` | 2500 × 1250 | 2:1 wide | yes | **5000 × 2500** |
| **Image 2x Long** | `image` | source passthrough (`fm: jpg` only) | native (intended tall) | no | **2500 wide × native height** (upload at your intended tall ratio, e.g. 2500 × 3500) |
| **Image OffCenter** | `image` | source passthrough | native | no | **2000 wide × native height** (occupies 6/9 of row ≈ 1250 CSS px) |
| **Video** | `singlevideo` + `videolink` | — | video native | — | **1920 × 1080 MP4**, H.264. Plays full row width. |
| **Video OffCenter** | `video` + `videolink` | — | video native | — | **1920 × 1080 MP4**, H.264. Plays at ~6/9 of row. |
| **Video 2x Long** | ⚠️ not found in GraphQL or `blocks.js` | — | — | — | **If this exists in the CMS menu, it's not wired into the code.** Adding content to it today will render nothing. Flag back to me if you want it enabled. |
| **Big Text** | — | — | — | — | No image. `text` + `smalltext` fields only. |
| **Small Text** | — | — | — | — | No image. `text` + `smalltext` fields only. |
| **50/50 Image/Image** | `imageone` | source passthrough | native | no | **1900 × 1900** if you want square, otherwise 1900 wide × native height |
|  | `imagetwo` | source passthrough | native | no | same as `imageone` |
| **50/50 Empty/Image** | `image` | 1000 × 1000 | 1:1 | yes | **2000 × 2000** (fills one of two columns, other half is blank) |
| **50/50 Image/Text** | `image` | 1000 × 1000 | 1:1 | yes | **2000 × 2000** — ⚠️ **but this block is commented out in `blocks.js` and will render nothing even though the CMS allows it.** |
| **50/50 Video/Image** (`ImagevideoblockRecord`) | `image` | 1200 × 1200 | 1:1 | yes | **2400 × 2400** |
|  | `video` + `videolink` | — | native | — | **1080 × 1080 MP4** (square column) |
| **50/50 Video/Video** | `videoone.videolink` | — | native | — | **1080 × 1080 MP4** |
|  | `videotwo.videolink` | — | native | — | **1080 × 1080 MP4** |
| **50/50 Carousel/Image** | `image` | 1000 × 1000 | 1:1 | yes | **2000 × 2000** |
|  | `carousel` (multi, each slide) | 1000 × 1000 | 1:1 | yes | **2000 × 2000** per slide, all same ratio |
| **50/50 Carousel/Video** | `carousel` (multi) | 1000 × 1000 | 1:1 | yes | **2000 × 2000** per slide |
|  | `video` + `videolink` | — | native | — | **1080 × 1080 MP4** |
| **66/33 2x Long/Image** (`DifferentsizeRecord`) | `longimage` | source passthrough | native | no | **2200 wide × native height** (occupies 4/7 of row ≈ 1075 CSS px) |
|  | `squareimage` | 1200 × 1200 | 1:1 | yes | **2400 × 2400** |
| **66/33 2x Long/Video** | `image` (longimage) | source passthrough | native | no | **2200 wide × native height** |
|  | `video` + `videolink` | — | native | — | **1080 × 1080 MP4** (square column) |
| **66/33 2x Long/Carousel** | `image` (longimage) | source passthrough | native | no | **2200 wide × native height** |
|  | `carousel` (multi) | 1000 × 1000 | 1:1 | yes | **2000 × 2000** per slide |
| **66/33 3x Long/Image/Image** (`Differentsize3imgRecord`) | `longimage` | 1200 × 2400 | 1:2 | yes | **2400 × 4800** |
|  | `squareimageone` | 1200 × 1200 | 1:1 | yes | **2400 × 2400** |
|  | `squareimagetwo` | 1200 × 1200 | 1:1 | yes | **2400 × 2400** |
| **66/33 3x Long/Image/Video** | `longimage` | source passthrough | native | no | **2200 wide × native height** |
|  | `squareimageone` | 1000 × 1000 | 1:1 | yes | **2000 × 2000** |
|  | `video` + `videolink` | — | native | — | **1080 × 1080 MP4** |
| **66/33 3x Long/Image/Carousel** | `longimage` | source passthrough | native | no | **2200 wide × native height** |
|  | `squareimageone` | 1000 × 1000 | 1:1 | yes | **2000 × 2000** |
|  | `carousel` (multi) | 1000 × 1000 | 1:1 | yes | **2000 × 2000** per slide |
| **66/33 3x Long/Video/Carousel** | `longimage` | source passthrough | native | no | **2200 wide × native height** |
|  | `video` + `videolink` | — | native | — | **1080 × 1080 MP4** |
|  | `carousel` (multi) | 1000 × 1000 | 1:1 | yes | **2000 × 2000** per slide |
| **66/33 LOCK Long/Image/Image** (`Differentsize3imgfixedRecord`) | `longimage` | 1000 × 2000 | 1:2 | yes | **2000 × 4000** — this is the "LOCK" variant with fixed 1:2 aspect, in a 50/50 LOCK grid (not 66/33 in the code; naming in menu may differ from layout) |
|  | `squareimageone` | 1000 × 1000 | 1:1 | yes | **2000 × 2000** |
|  | `squareimagetwo` | 1000 × 1000 | 1:1 | yes | **2000 × 2000** |

---

## Things worth flagging before you start exporting

1. **"Video 2x Long"** — you listed it in the CMS menu but neither the GraphQL query in `app/(notlanding)/work/[slug]/page.js` nor the dispatcher in `components/blocks/blocks.js` has a matching record type. If editors add one today, it renders nothing. Say the word and I'll wire it up (same pattern as `Image2xlongRecord`).

2. **"50/50 Image/Text"** (`ImagetextblockRecord`) — the case is **commented out** in `blocks.js` (lines 39–41). The CMS still offers it; selecting it will silently render nothing. Either uncomment the dispatcher branch or remove the block from the CMS model.

3. **The "LOCK" long image fetch is smaller than the non-LOCK variant** — 1000 × 2000 vs 1200 × 2400. If editors use the LOCK block with the same source as the non-LOCK and expect identical crispness, they'll see a small softness difference. Not a bug, but worth knowing.

4. **"Natural" (uncropped) slots have no safety crop.** If an editor uploads a weirdly-proportioned image into `longimage`/`imageone`/`imagetwo`/`image` on the 2x Long / Off Center variants, the layout stretches to its native aspect. Design to the column aspect (~2:3 to 1:2 for the long slot, ~1:1 for the "image" slot in Image/Image) or the row will look lopsided.

5. **All videos play at their native aspect** because of `fluid: true` in VideoJS. Use the recommended ratio per column (1:1 for square slots, 16:9 for full-width `VideoblockRecord`). If you upload a 16:9 clip into a square slot it will letterbox inside the column.
