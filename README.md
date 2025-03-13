# Interactive Task Manager

A feature-rich, modern task management application built with React and Vite, featuring an interactive interface and advanced task organization capabilities.

## Features

### Task Management
- Create, update, and delete tasks
- Mark tasks as complete/incomplete
- Set due dates for tasks
- Assign priority levels (High, Medium, Low)
- Categorize tasks (Personal, Work, Shopping, Health)
- Task persistence using localStorage

### Interactive Interface
- Real-time search functionality
- Filter tasks by priority and category
- Sort tasks by due date
- Visual feedback and notifications
- Color-coded priority indicators
- Category tags
- Due date displays

### User Experience
- Clean and intuitive interface
- Responsive design for all devices
- Toast notifications for actions
- Empty state handling
- Visual status indicators

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React (for icons)
- shadcn/ui components

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd my-task-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
my-task-app/
├── src/
│   ├── components/
│   │   └── TaskManager.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Usage

1. Adding a Task:
   - Enter task description
   - Set due date (optional)
   - Select priority level
   - Choose category
   - Click "Add Task"

2. Managing Tasks:
   - Click checkmark to toggle completion
   - Click trash icon to delete
   - Use search bar to find specific tasks
   - Use filters to view tasks by priority or category

3. Task Organization:
   - Tasks are automatically sorted by due date
   - Tasks are color-coded by priority
   - Completed tasks are visually distinct

## Development

1. Project Setup:
```bash
npm create vite@latest my-task-app -- --template react
cd my-task-app
```

2. Install dependencies:
```bash
npm install lucide-react @radix-ui/react-icons
npm install -D tailwindcss postcss autoprefixer
```

3. Initialize Tailwind:
```bash
npx tailwindcss init -p
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

To deploy to Vercel:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Enhancements

- Task subtasks
- Due date reminders
- Dark mode toggle
- Task sharing capabilities
- Data export/import
- Task statistics and analytics
- Multiple task lists/projects
- Drag and drop reordering