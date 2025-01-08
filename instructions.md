# CWF (Client Workflow Framework)

## Project Structure
```
.
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Footer.tsx        # Bottom navigation bar
│   │   ├── Header.tsx        # Top application bar
│   │   ├── Metrics.tsx       # Line chart component
│   │   ├── Navigation.tsx    # Main navigation tabs
│   │   └── RoutingStats.tsx  # Bar chart for routing statistics
│   ├── config/
│   │   ├── env.ts           # Environment configuration
│   │   └── environment.ts   # Environment variables
│   ├── pages/
│   │   ├── Dashboard.tsx    # Main dashboard layout
│   │   └── Routings.tsx     # Routings page
│   ├── types/
│   │   └── custom.d.ts      # TypeScript custom declarations
│   ├── App.tsx              # Root application component
│   ├── index.tsx           # Application entry point
│   ├── process.env.ts      # Process environment handling
│   └── styles.css          # Global styles and animations
├── package.json           # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Component Hierarchy
```
App
├── Header                # Top bar with application title
├── Navigation           # Dashboard/Routings/Tasks tabs
├── Dashboard            # Main content layout
│   ├── MyTasks         # Left panel with task list
│   ├── RoutingStats    # Center panel with bar chart
│   │   └── Metrics     # Line chart below bar chart
│   └── OverDueRoutings # Right panel with overdue items
└── Footer              # Bottom links
```

## Key Components

### CreateRouting.tsx
- Implements two-section layout with Tasks and Files
- Manages form state and validation
- Handles file uploads
- Implements delete confirmations
- Uses Fluent UI components
- Responsive design

### Dashboard.tsx
- Implements three-column layout using Fluent UI Stack
- Manages spacing with childrenGap
- Handles responsive behavior with grow properties
- Uses card-animation class for consistent styling

### RoutingStats.tsx
- Displays bar chart for routing statistics
- Shows counts for different routing statuses
- Uses Fluent UI theming and colors
- Includes toggle for active/inactive state
- Responsive bar heights based on values

### Environment Configuration
- Type-safe environment variables
- Proper process.env handling in browser
- TypeScript type definitions
- Fallback values for development

## Recent Changes

### Layout Updates
- Added CreateRouting page with proper form layout
- Implemented two-section layout for routing creation
- Enhanced form validation and user feedback
- Improved responsive behavior

### Component Improvements
- Added file upload capabilities
- Enhanced form field validation
- Improved type safety across components
- Added proper error handling

### Styling
- Consistent use of Fluent UI components
- Proper spacing between elements
- Responsive design patterns
- Animation for better UX

## Development Guidelines

### TypeScript
- Use TypeScript for all components
- Define interfaces for props
- Maintain type safety
- Use proper type declarations

### Component Structure
- Keep components focused
- Use functional components
- Implement proper prop typing
- Follow Fluent UI patterns

### State Management
- Use React hooks
- Keep state close to usage
- Implement proper prop drilling
- Use context where needed

### Performance
- Optimize re-renders
- Use proper memoization
- Implement lazy loading
- Monitor bundle size

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Notes
- Compatible with React 17.0.1
- Uses Fluent UI components
- Integrates with SPFX and SQL
- Maintains clean architecture
