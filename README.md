# Author

Luat Huynh
[Demo video](https://drive.google.com/drive/folders/1DW4GK23ZQjZdiYbxsFD2ONY_FV0oFfuM?usp=sharing)

# 🎬 Movie App

A responsive web application to browse movies currently playing in theaters, view top-rated movies, and search for any movie. The app includes lazy-loaded images, skeleton loading, and a smooth user experience.

---

## ✅ Features Checklist

### Required Functionality

- [x] View a list of movies currently playing in theaters with asynchronous poster images.
- [x] Tab bar for switching between _Now Playing_ and _Top Rated_ movies.
- [x] Search bar to search movies by title.
- [x] View movie details by clicking on a movie card.
- [x] Loading state while waiting for API responses.
- [x] Error handling: Users see a toast message for network errors.
- [x] Responsive design for small, medium, and large screens.

### Optional Features Implemented

- [x] Segmented control to switch between **list view** and **grid view**.
- [x] All images fade in after loading.
- [x] Lazy loading of images for performance optimization.
- [x] Custom highlight and selection effect on movie cards.
- [x] Skeleton loading for both movie list and movie detail screens.
- [x] Enhanced responsive layouts for different screen sizes.

### Additional Features

- [x] Dark / Light theme toggle with smooth theme transitions.
- [x] Infinite scrolling for movie lists with loading skeletons.
- [x] Smooth hover effects for movie cards and tabs.

---

## 🛠️ Build Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

2. **Copy environment variables**

```bash
cp .env.template .env
```

3. **Install dependencies**

```bash
npm install
```

34. **npm run dev**

```bash
npm run dev
```

note: Make sure you are using Node.js v20.19.0 or later.
