# Contributing to Kubernetes Manifest Generator

Thank you for considering contributing to the Kubernetes Manifest Generator! This document provides guidelines for contributing to the project.

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. By participating, you agree to uphold this code.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues. When creating a bug report, include:

- Clear and descriptive title
- Exact steps to reproduce the problem
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, browser)

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When suggesting a feature:

- Use a clear and descriptive title
- Provide detailed description of the feature
- Explain why this feature would be useful
- Include mockups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Add tests for new functionality
5. Ensure all tests pass (`npm test`)
6. Lint your code (`npm run lint`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to your branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/k8s-manifest-generator.git
cd k8s-manifest-generator

# Install dependencies
npm install

# Set up environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start development servers
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for functions
- Avoid `any` type

### React

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for props
- Extract reusable logic into custom hooks

### Naming Conventions

- Files: PascalCase for components, camelCase for utilities
- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

### Code Formatting

We use Prettier and ESLint:

```bash
npm run lint        # Check linting
npm run lint:fix    # Fix issues
```

## Testing

### Writing Tests

- Write tests for all new features
- Update tests when modifying existing features
- Aim for >70% code coverage
- Use descriptive test names

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

## Kubernetes Resource Support

When adding a new Kubernetes resource type:

1. **Add Schema** - Define Zod schema in `backend/src/schemas/k8sSchemas.ts`
2. **Update Generator** - Add generation logic in `backend/src/services/manifestGenerator.ts`
3. **Create Form** - Build React form component in `frontend/src/components/forms/`
4. **Add Validation** - Implement best practices warnings and suggestions
5. **Write Tests** - Add comprehensive tests for the new resource
6. **Update Documentation** - Add usage examples to README

Example structure for a new resource:

```typescript
// Schema
export const podSchema = z.object({
  metadata: metadataSchema,
  containers: z.array(containerSchema),
  // ... other fields
});

// Generator method
private generatePod(input: PodInput): any {
  return {
    apiVersion: 'v1',
    kind: 'Pod',
    // ... pod spec
  };
}

// Form component
export default function PodForm({ data, onChange }: PodFormProps) {
  // Form implementation
}
```

## Documentation

### Code Comments

- Write comments for complex logic
- Use JSDoc for public APIs
- Keep comments up-to-date

### README Updates

Update README when:
- Adding new resource types
- Changing configuration options
- Modifying deployment procedures

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): subject

body

footer
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```
feat(deployment): add support for init containers

- Add init container configuration in form
- Update schema validation
- Add tests for init containers

Closes #123
```

## Project Structure

```
k8s-manifest-generator/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── forms/    # Resource-specific forms
│   │   │   └── ui/       # Reusable UI components
│   │   └── lib/          # Utilities and API client
│   └── package.json
│
├── backend/              # Express backend
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── services/     # Business logic
│   │   ├── schemas/      # Validation schemas
│   │   └── middleware/   # Express middleware
│   └── package.json
│
└── package.json          # Workspace root
```

## Security Guidelines

- Never commit secrets or credentials
- Validate all user inputs
- Keep dependencies updated
- Follow OWASP best practices
- Run `npm audit` regularly

## Questions?

- Check the [README](./README.md)
- Browse [existing issues](https://github.com/OWNER/k8s-manifest-generator/issues)
- Ask in [GitHub Discussions](https://github.com/OWNER/k8s-manifest-generator/discussions)

Thank you for contributing!
