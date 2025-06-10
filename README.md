# Medical Interface Application

A comprehensive medical application UI designed to streamline professional clinical workflows with advanced documentation tools and interactive interfaces.

## Features

- **Progress Note Documentation**: Complete medical progress note templates with structured sections
- **Medical Tabs Interface**: Tabbed navigation for different medical workflows (Progress Note, Orders, Scribe)
- **Patient Demographics**: Comprehensive patient information display with sticky notes
- **Clipboard Synchronization**: Real-time content synchronization across sessions
- **Responsive Design**: Optimized for clinical documentation workflows
- **Icon Integration**: Medical-specific icons for enhanced user experience

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom medical interface theme

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd medical-interface
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

To build the application for production:

```bash
npm run build
```

This creates a `dist` folder with the production-ready files.

## Deployment

### Netlify Deployment

This project is configured for Netlify deployment:

1. Connect your GitHub repository to Netlify
2. Set the build command to `npm run build`
3. Set the publish directory to `dist`
4. Deploy

The `netlify.toml` configuration file handles routing for the single-page application.

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your hosting provider
3. Configure your server to serve `index.html` for all routes (SPA routing)

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utilities and configurations
├── server/                 # Backend Express server
├── shared/                 # Shared types and schemas
├── attached_assets/        # Static assets and images
└── netlify.toml           # Netlify deployment configuration
```

## Key Components

- **Medical Interface**: Main application layout with patient demographics
- **Progress Note Page**: Structured medical documentation with templates
- **Medical Tabs**: Navigation interface for different medical workflows
- **Scribe Page**: Embedded scribe functionality
- **Orders Page**: Medical orders interface

## Configuration

The application uses in-memory storage by default. For production deployment with persistent data, configure a database connection in the server configuration.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details