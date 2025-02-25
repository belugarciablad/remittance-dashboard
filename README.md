# Remittance Dashboard

A web application designed to allow users to track their remittance transactions processed via WhatsApp. Built with modern web technologies, this dashboard provides a user-friendly interface to monitor and manage money transfer transactions initiated through WhatsApp messaging.

## Technologies Used

- [Svelte](https://svelte.dev/) - Frontend framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Build tool and development server
- [Vitest](https://vitest.dev/) - Unit testing framework
- [ESLint](https://eslint.org/) - Code linting
- [i18n](https://www.i18next.com/) - Internationalization
- [MockAPI](https://mockapi.io/) - Mock REST API service

## API Integration

This application consumes a mocked REST API hosted on MockAPI:

- Base URL: `https://mockapi.io/projects/67b8f03b51192bd378dc42b1`
- The API provides mock transaction data for development and testing purposes
- No authentication is required for development environment

## Initial Setup

1. Clone the repository:

```bash
git clone https://github.com/belugarciablad/remittance-dashboard.git
cd remittance-dashboard
```

2. Install dependencies:

```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

To build for production:

```bash
npm run build
```

## Linting

To run the linter:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

## Testing

To run the test suite:

```bash
npm run test
```

## Future Features

The following features are planned for future releases:

### Navigation & Routing

- **Contacts Page**: A dedicated section to manage and view frequent remittance contacts
- **Metrics Dashboard**: Analytics and visualization of transaction patterns and history

### User Experience

- **Dark Mode**: System-wide dark theme support for better visibility in low-light conditions
- **Onboarding Flow**: Guided introduction for new users to learn the platform's features
  - Interactive tutorials
  - Feature highlights
  - Getting started guide

### Product Enhancement & User Engagement

- **Transaction Repeat**: Integration with live API for quick transaction repetition
- **Promotional Banner System**:
  - Showcase new features and products
  - Display seasonal promotions
  - Highlight special exchange rates
- **Referral Program Integration**: Reward users for inviting new customers
- **Smart Notifications**: Alert users about favorable exchange rates and promotions

## Project Structure

- `src/` - Source code
  - `components/` - Reusable Svelte components
  - `config/` - Configuration files including localization
  - `util/` - Utility functions
- `tests/` - Test files

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Copyright (c) 2025 Remittance Dashboard
