# Contributing to Shlink AI Agent for n8n

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites
- Node.js 18.17.0 or higher
- npm 9.6.7 or higher
- Git

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/n8n-nodes-shlink-ai.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run tests: `npm test`

## Development Workflow

### Making Changes
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Add tests for new functionality
4. Ensure all tests pass: `npm test`
5. Lint your code: `npm run lint`
6. Build successfully: `npm run build`

### Submitting Changes
1. Push your branch: `git push origin feature/your-feature-name`
2. Create a Pull Request on GitHub
3. Fill out the PR template completely
4. Wait for CI checks to pass
5. Address any review feedback

## Code Standards

### TypeScript
- Use TypeScript for all code
- Follow existing code style
- Add type definitions for new functions
- Avoid `any` types unless necessary for n8n compatibility

### Testing
- Write unit tests for new functions
- Update existing tests when modifying code
- Maintain test coverage
- Follow existing test patterns

### Documentation
- Update README.md for new features
- Add JSDoc comments to functions
- Update CHANGELOG.md with your changes
- Include examples where helpful

## Shlink Operations

### Adding New Operations
1. Add the operation to `tools/ShlinkTools.ts`
2. Update the node options in `nodes/Shlink/Shlink.node.ts`
3. Add appropriate UI parameters
4. Write comprehensive tests
5. Update documentation

### AI Response Format
All tool functions must return the standard response format:
```typescript
{
  success: boolean,
  operation: string,
  data: any,
  metadata: {
    human_summary: string,
    actionable_fields: object,
    next_possible_actions: string[]
  },
  context: {
    timestamp: string,
    api_call_count: number
  }
}
```

## Issue Guidelines

### Bug Reports
- Use the Bug Report template
- Include n8n and Shlink versions
- Provide reproduction steps
- Include error messages and logs

### Feature Requests
- Use the Feature Request template
- Explain the use case clearly
- Consider existing alternatives
- Describe expected behavior

### Questions
- Use GitHub Discussions Q&A category
- Search existing discussions first
- Provide context about your setup
- Be specific about what you're trying to achieve

## RFC Process

For major changes, create an RFC (Request for Comments):
1. Create a discussion in the RFCs category
2. Follow the RFC template
3. Allow time for community feedback
4. Address concerns and iterate
5. Proceed with implementation after consensus

## Code of Conduct

### Be Respectful
- Use welcoming and inclusive language
- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community

### Professional Standards
- Keep discussions technical and objective
- Provide helpful feedback in reviews
- Be patient with newcomers
- Credit others for their contributions

## Community

### Getting Help
- [Discussions Q&A](https://github.com/magnus919/n8n-nodes-shlink-ai/discussions/categories/q-a) for questions
- [Issue tracker](https://github.com/magnus919/n8n-nodes-shlink-ai/issues) for bugs
- [n8n Community](https://community.n8n.io/) for general n8n questions

### Staying Updated
- Watch the repository for notifications
- Follow discussions for new features
- Check CHANGELOG.md for updates
- Join community discussions

## Development Notes

This project uses "vibe coding" methodology - built with AI assistance and extensive testing. While the development approach is non-traditional, we maintain high quality standards through:
- Comprehensive testing
- Thorough documentation  
- Community feedback
- Continuous improvement

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
