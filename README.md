# WatchTube 📚

A modern, responsive video learning platform built with Next.js 14, React, and TypeScript. WatchTube allows users to curate their own collection of educational videos with a beautiful, accessible interface.

## ✨ Features

### 🎥 Video Management

- **Add Videos**: Easily add YouTube videos with automatic URL validation and embed generation
- **Video Collection**: Organize your learning videos in a clean, searchable interface
- **Persistent Storage**: Videos are automatically saved to localStorage and persist across browser sessions
- **Smart URL Processing**: Automatically converts YouTube watch URLs to embed format

### 🎨 User Experience

- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Smooth Animations**: Hover effects and smooth transitions throughout the interface
- **Toast Notifications**: Real-time feedback for user actions (add/delete videos)
- **Empty State**: Helpful messaging when no videos are available

### ♿ Accessibility

- **WCAG Compliant**: Proper ARIA labels, semantic HTML, and keyboard navigation
- **Screen Reader Support**: Comprehensive labeling for assistive technologies
- **Focus Management**: Clear focus indicators and logical tab order
- **Error Handling**: Accessible error messages with proper ARIA attributes

### 🔧 Technical Features

- **TypeScript**: Full type safety throughout the application
- **Form Validation**: Client-side validation with user-friendly error messages
- **State Management**: Efficient React state management with hooks
- **Modern CSS**: Tailwind CSS for consistent, maintainable styling

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd vid-learn
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 📖 Usage

### Adding Videos

1. **Fill out the form** in the "Add New Video" section:

   - **Video Name**: Enter a descriptive title for your video
   - **Description**: Add an optional description (supports markdown-style formatting)
   - **YouTube URL**: Paste any valid YouTube URL (watch, embed, or share format)

2. **Submit the form** - The video will be automatically added to your collection and saved locally

3. **Receive confirmation** - A success toast will appear confirming the video was added

### Managing Videos

- **Watch Videos**: Click the "Watch" button to load the video in the main player
- **Delete Videos**: Click the "Delete" button to remove videos from your collection
- **Persistent Storage**: All videos are automatically saved and will be available when you return

### Dark Mode

- **Toggle**: Use the dark mode toggle in the top navigation
- **System Preference**: The app automatically detects your system's dark mode preference
- **Persistence**: Your theme choice is saved and remembered across sessions

## 🏗️ Project Structure

```
vid-learn/
├── app/
│   ├── components/
│   │   ├── DarkModeToggle.tsx    # Dark mode toggle component
│   │   ├── Toast.tsx             # Toast notification component
│   │   ├── VideoForm.tsx         # Video addition form
│   │   └── VideoList.tsx         # Video collection display
│   ├── hooks/
│   │   └── useToast.ts           # Custom hook for toast notifications
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main application page
├── public/                       # Static assets
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies and scripts
```

## 🛠️ Technologies Used

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with hooks and modern features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Heroicons](https://heroicons.com/)** - Beautiful hand-crafted SVG icons

## 🎯 Key Components

### VideoForm

Handles video addition with:

- Form validation and error handling
- YouTube URL processing and validation
- Accessible form controls with ARIA attributes
- Loading states and user feedback

### VideoList

Displays the video collection with:

- Responsive grid layout
- Interactive hover effects
- Accessible navigation and controls
- Empty state messaging

### Toast System

Provides user feedback with:

- Success, error, and info message types
- Auto-dismissal and manual close options
- Smooth animations and transitions
- Accessible announcements

### Dark Mode Toggle

Offers theme switching with:

- System preference detection
- Smooth theme transitions
- Persistent user preferences
- Accessible toggle controls

## 🔮 Future Enhancements

- **Video Categories**: Organize videos into custom categories
- **Search & Filter**: Search videos by title, description, or tags
- **Playlist Support**: Create and manage video playlists
- **Export/Import**: Backup and restore video collections
- **Video Notes**: Add personal notes to videos
- **Progress Tracking**: Track video watch progress
- **Social Features**: Share collections with others

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using Next.js and modern web technologies**
