# CWF Project Documentation

## Overview
CWF is a modern web application built with React and TypeScript. The application integrates with SharePoint Framework (SPFX) and SQL, providing a robust solution for managing routings, tasks, and group workflows.

## Tech Stack
- React 17.0.1 (required for SPFX compatibility)
- TypeScript
- FluentUI (Microsoft's design system)
- SQL Database
- SharePoint Framework (SPFX) Integration

## Project Structure
```
.
├── public/                 # Static files
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── FloatingActionButton.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Metrics.tsx
│   │   ├── MyTasks.tsx
│   │   ├── Navigation.tsx
│   │   ├── OverdueRoutings.tsx
│   │   └── RoutingStats.tsx
│   ├── config/           # Configuration files
│   │   └── environment.ts
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Main application pages
│   │   ├── AddEditGroup.tsx
│   │   ├── CreateRouting.tsx
│   │   ├── Dashboard.tsx
│   │   ├── GroupManagement.tsx
│   │   └── Routings.tsx
│   ├── types/           # TypeScript type definitions
│   │   ├── custom.d.ts
│   │   ├── environment.d.ts
│   │   └── global.d.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── styles.css
└── tsconfig.json
```

## Key Features

### Dashboard
- Responsive three-column layout
  - My Tasks (40% width): Displays user's current tasks and actions
  - Routing Stats & Metrics (35% width): Shows routing statistics and performance metrics
  - Overdue Routings (25% width): Highlights time-sensitive items
- Interactive charts and statistics
- Real-time task updates
- Animated card transitions

### Group Management
- Comprehensive office management interface
- Table view with advanced features:
  - Column sorting and filtering
  - Status indicators (Active/Inactive)
  - Pagination
  - Search functionality
- Add/Edit capabilities for office details
- Member management with role-based access

### Routing System
- Create and manage workflow routings
- Status tracking and updates
- Document attachment support
- Multi-step approval process
- Deadline management
- Priority indicators

## UI/UX Features
1. FluentUI Components
   - Consistent Microsoft styling
   - Responsive design patterns
   - Accessibility compliance

2. Interactive Elements
   - Context-aware floating action button
   - Smooth transitions and animations
   - Hover effects and visual feedback
   - Modern card-based layout

3. Navigation
   - Intuitive menu structure
   - Breadcrumb navigation
   - Quick action shortcuts
   - Responsive sidebar

## Development Guidelines

### Code Standards
1. Use TypeScript for type safety
2. Maintain component modularity
3. Follow FluentUI design patterns
4. Implement responsive design
5. Write clean, documented code

### Component Development
1. Use functional components with hooks
2. Implement proper type definitions
3. Maintain SPFX compatibility
4. Follow Microsoft design guidelines
5. Ensure cross-browser compatibility

### State Management
1. Use React hooks for local state
2. Implement context for global state
3. Maintain clean data flow
4. Handle async operations properly

### Performance Considerations
1. Implement lazy loading
2. Optimize component rendering
3. Manage memory usage
4. Handle large datasets efficiently

## Environment Setup
1. Node.js environment
2. React 17.0.1 (specific version required)
3. TypeScript configuration
4. SPFX development environment
5. SQL Server connection

## Future Roadmap
1. Advanced filtering and sorting
2. Performance optimization for large datasets
3. Mobile-responsive enhancements
