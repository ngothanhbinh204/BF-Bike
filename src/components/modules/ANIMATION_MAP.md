# Animation Map — BF Bike

Tài liệu này chỉ ghi nhận **các element đã được gắn hiệu ứng**. Không cần đọc lại file PUG đầy đủ.

---

## Cơ chế hiệu ứng

| Attribute | Thư viện | Mô tả |
|---|---|---|
| `data-aos="*"` | AOS | Scroll-trigger đơn giản (fade-up, fade-left, zoom-in…) |
| `data-ripple-text` | GSAP SplitText | Tách chữ rồi bay lên stagger. Thêm `data-ripple-text-types="chars|words|lines"`, `data-ripple-text-delay="0.07"` |
| `data-stagger` + `data-stagger-item` | GSAP (`staggerReveal`) | Group cha gắn `data-stagger`, mỗi item con gắn `data-stagger-item`. Options: `data-stagger-delay`, `data-stagger-duration`, `data-stagger-dir` |
| `data-parallax` | GSAP ScrollTrigger | Wrap ảnh, con gắn `data-parallax-img`, option `data-parallax-y` |

---

## Trang Chủ (HomePage)

### HomePage-1 — Banner
| Element | Hiệu ứng |
|---|---|
| `.banner-controls` | `data-aos="fade-up" data-aos-delay="700"` |

### HomePage-2 — About
| Element | Hiệu ứng |
|---|---|
| `p.about-label` | `data-aos="fade-up"` |
| `h2.about-heading` | `data-ripple-text` types=`lines` delay=`0.08` |
| `.about-image` | `data-aos="fade-right"` duration=`900` |
| `p.about-intro` | `data-aos="fade-up" delay=100` |
| `.about-text` | `data-aos="fade-up" delay=150` |
| `.about-stats` | `data-stagger` delay=`0.14` duration=`0.65` — 4 `.stat-item` là `data-stagger-item` |
| `a.btn-primary-outline` | `data-aos="fade-up" delay=200` |
| `.about-brand-text` | `data-aos="fade-right"` duration=`1200` delay=`100` |

### HomePage-3 — Products
| Element | Hiệu ứng |
|---|---|
| `h2.section-title` | `data-ripple-text` types=`words` delay=`0.07` |
| `.swiper-wrap` | `data-aos="fade-up" delay=150` duration=`800` |
| `.section-center-cta` | `data-aos="fade-up"` |

### HomePage-4 — Video Banner
| Element | Hiệu ứng |
|---|---|
| `.container-inner` | `data-aos="zoom-in"` duration=`1000` |
| `h2.video-title` | `data-ripple-text` types=`chars` delay=`0.05` |
| `a.btn-white` | `data-aos="fade-up" delay=500` |

### HomePage-5 — Posts
| Element | Hiệu ứng |
|---|---|
| `h2.section-title` | `data-ripple-text` types=`words` delay=`0.07` |
| `nav.post-filter-nav` | `data-aos="fade-up" delay=150` |
| `.swiper-wrap` | `data-aos="fade-up" delay=250` duration=`800` |
| `.section-center-cta` | `data-aos="fade-up"` |

### HomePage-6 — Help
| Element | Hiệu ứng |
|---|---|
| `h2.section-title` | `data-ripple-text` types=`chars` delay=`0.05` |
| `.help-list` | `data-stagger` delay=`0.12` duration=`0.65` — 4 `a.help-item` là `data-stagger-item` |

---

## Trang About

### About-1 — Intro
| Element | Hiệu ứng |
|---|---|
| `p.about-label` | `data-aos="fade-up"` |
| `h2.about-title` | `data-ripple-text` types=`lines` delay=`0.08` |
| `.about-body` | `data-stagger` delay=`0.1` duration=`0.7` — 2 `.about-body__col` là `data-stagger-item` |
| `.about-image` | `data-aos="fade-left"` duration=`1000` delay=`200` |

### About-2 — Vision (Tầm nhìn)
| Element | Hiệu ứng |
|---|---|
| `.group-title` | `data-aos="fade-up"` |
| `h2.section-title` bên trong `.group-title` | `data-ripple-text` types=`words` delay=`0.07` |
| `.vision-quote` | `data-aos="fade-up"` delay=`200` duration=`900` |

### About-3 — Mission (Sứ mệnh)
| Element | Hiệu ứng |
|---|---|
| `.mission-image` | `data-aos="fade-right"` duration=`1000` |
| `h2.section-title` | `data-ripple-text` types=`words` delay=`0.07` |
| `p.mission-subtitle` | `data-aos="fade-up" delay=100` |
| `ul.mission-list` | `data-stagger` delay=`0.13` duration=`0.6` — 3 `li.mission-item` là `data-stagger-item` |

### About-4 — Core Values (Giá trị cốt lõi)
| Element | Hiệu ứng |
|---|---|
| `h2.section-title.white.left` | `data-ripple-text` types=`words` delay=`0.08` |
| `.block-grid` | `data-stagger` delay=`0.18` duration=`0.8` dir=`bottom` — 3 `.item-grid` là `data-stagger-item` |

### About-5 — Tech (Sự khác biệt công nghệ)
| Element | Hiệu ứng |
|---|---|
| `h2.section-title.left` | `data-ripple-text` types=`words` delay=`0.07` |
| `p.tech-subtitle` | `data-aos="fade-up" delay=100` |
| `.tech-box` | `data-aos="fade-up"` delay=`200` duration=`900` |
| `.tech-image` | `data-aos="fade-left"` duration=`1100` delay=`150` |

### About-6 — Service Diff (Sự khác biệt dịch vụ)
| Element | Hiệu ứng |
|---|---|
| `h2.section-title` | `data-ripple-text` types=`words` delay=`0.08` |
| `.service-list` | `data-stagger` delay=`0.14` duration=`0.7` — 3 `.service-card` là `data-stagger-item` |
