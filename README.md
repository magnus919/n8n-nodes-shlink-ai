# Shlink AI Agent for n8n

An AI-powered n8n community node that provides comprehensive Shlink URL shortener integration with structured responses optimized for AI-to-AI communication.

> ⚠️ **VIBE CODED DISCLAIMER**: This project was developed using [vibe coding](https://magnus919.com/2025/06/the-vibe-coding-paradox-when-understanding-became-optional/) - building software based on intuition and pattern matching rather than deep technical understanding. While functional, proceed with appropriate caution, testing, and code review for production use.

## 🎯 Problem Solved

Managing URL shortening operations in automated workflows requires:
- **Consistent API interactions** with Shlink instances
- **Structured data formats** that AI agents can easily consume
- **Comprehensive error handling** for reliable automation
- **Rich metadata** for workflow decision-making

This node provides a specialized AI agent that handles all common Shlink operations with responses designed for seamless integration into AI-driven workflow automation.

## ✨ Features

### Core Operations
- **Create Short URLs** - Generate shortened links with custom codes, domains, and tags
- **Retrieve URL Details** - Get comprehensive information about existing short URLs
- **List URLs** - Browse and filter short URLs with pagination support
- **Visit Analytics** - Access detailed click statistics and geographic data
- **Edit URLs** - Update properties of existing short URLs
- **Delete URLs** - Remove short URLs from your Shlink instance

### AI-Optimized Design
- **Structured Responses** - Consistent JSON format with success indicators, metadata, and actionable fields
- **Human-Readable Summaries** - Plain English descriptions of operations for logging and debugging
- **Next Actions** - Suggested follow-up operations for AI workflow planning
- **Rich Error Context** - Detailed error information with recovery suggestions
- **Input Validation** - Client-side validation prevents invalid API calls
- **Type Safety** - Full TypeScript implementation with specific interfaces

### Enterprise Ready
- **Multi-Domain Support** - Handle multiple custom domains from a single Shlink instance
- **Tag Management** - Organize and filter URLs using tags
- **Custom Validation** - Optional URL validation and duplicate detection
- **Pagination** - Handle large datasets efficiently

## 🚀 Installation

### Prerequisites
- n8n instance (self-hosted or n8n Cloud)
- Shlink server with API access
- Node.js 18.17.0 or higher

### Install from npm (Recommended)

```bash
npm install n8n-nodes-shlink-ai
```

### Install in n8n Cloud
1. Go to **Settings** → **Community Nodes**
2. Click **Install a community node**
3. Enter: `n8n-nodes-shlink-ai`
4. Click **Install**

### Manual Installation (Self-Hosted)
```bash
# Navigate to your n8n installation
cd ~/.n8n

# Install the package
npm install n8n-nodes-shlink-ai

# Restart n8n
n8n start
```

## ⚙️ Configuration

### 1. Set Up Shlink API Credentials

First, generate an API key on your Shlink server:

```bash
# SSH into your Shlink server
shlink api-key:generate --name="n8n-integration"
```

Save the generated API key - you'll need it for n8n configuration.

### 2. Configure Credentials in n8n

1. In n8n, go to **Credentials** → **Add Credential**
2. Search for "Shlink API" and select it
3. Fill in:
   - **Base URL**: Your Shlink instance URL (e.g., `https://your-shlink.example.com`)
   - **API Key**: The API key generated in step 1
4. Click **Test** to verify the connection
5. Click **Save**

## 📖 Usage

### Basic Example: Create a Short URL

1. Add the **Shlink AI Agent** node to your workflow
2. Select **Create Short URL** operation
3. Configure parameters:
   - **Long URL**: `https://example.com/very/long/marketing/campaign/url`
   - **Custom Short Code**: `campaign2024` (optional)
   - **Tags**: `marketing, social, 2024` (optional)
   - **Title**: `Marketing Campaign 2024` (optional)

The node returns a structured response:

```json
{
  "success": true,
  "operation": "create_short_url",
  "data": {
    "shortCode": "campaign2024",
    "shortUrl": "https://your-shlink.example.com/campaign2024",
    "longUrl": "https://example.com/very/long/marketing/campaign/url",
    "dateCreated": "2024-06-13T10:30:00+00:00",
    "tags": ["marketing", "social", "2024"],
    "title": "Marketing Campaign 2024"
  },
  "metadata": {
    "human_summary": "Created short URL campaign2024 for https://example.com/very/long/marketing/campaign/url",
    "actionable_fields": {
      "short_url": "https://your-shlink.example.com/campaign2024",
      "short_code": "campaign2024",
      "long_url": "https://example.com/very/long/marketing/campaign/url"
    },
    "next_possible_actions": ["get_url_details", "get_visits", "edit_url", "delete_url"]
  },
  "context": {
    "timestamp": "2024-06-13T10:30:00.000Z",
    "api_call_count": 1
  }
}
```

### Advanced Example: Analytics Dashboard

Create a workflow that:
1. **Lists all URLs** tagged with "marketing"
2. **Gets visit statistics** for each URL
3. **Sends a report** via email/Slack

```javascript
// Use the structured response in subsequent nodes
const shortUrls = $json.data.data; // Array of short URLs
const totalUrls = $json.metadata.actionable_fields.total_items;
const summary = $json.metadata.human_summary; // "Found 15 short URLs (page 1)"
```

## 🔧 Operation Reference

### Create Short URL
**Purpose**: Generate a new shortened URL
**Required**: Long URL
**Optional**: Custom slug, domain, tags, title, validation settings

### Get URL Details
**Purpose**: Retrieve information about an existing short URL
**Required**: Short code
**Optional**: Domain (for multi-domain setups)

### List Short URLs
**Purpose**: Browse and filter your short URLs
**Optional**: Pagination, search terms, tag filters, date ranges, sorting

### Get Visit Statistics
**Purpose**: Access analytics data for a short URL
**Required**: Short code
**Optional**: Domain, pagination, date ranges

### Edit Short URL
**Purpose**: Update properties of an existing short URL
**Required**: Short code
**Optional**: New long URL, tags, title, domain

### Delete Short URL
**Purpose**: Remove a short URL
**Required**: Short code
**Optional**: Domain

## 🤖 AI Integration

This node is specifically designed for AI workflow automation:

### Router Agent Pattern
Use with a router AI agent that delegates Shlink operations:

```javascript
// Router agent can easily parse responses
if (response.success) {
  const shortUrl = response.metadata.actionable_fields.short_url;
  const nextActions = response.metadata.next_possible_actions;
  // Decide what to do next based on available actions
}
```

### Error Handling
Structured error responses help AI agents handle failures gracefully:

```javascript
if (!response.success) {
  const errorSummary = response.metadata.human_summary;
  const recoveryActions = response.metadata.next_possible_actions;
  // AI can decide how to recover based on suggested actions
}
```

## 🧪 Testing

This project includes comprehensive testing to validate the vibe-coded implementation.

### Unit Tests

```bash
# Run all unit tests
npm test

# Run tests with coverage report
npm run test:coverage

# Watch mode for development
npm run test:watch
```

### Integration Testing

Test against a real Shlink instance to validate assumptions:

```bash
# Set up test environment (see TEST_DATA_SETUP.md)
docker run -d -p 8080:8080 shlinkio/shlink:stable

# Run integration tests
SHLINK_BASE_URL=http://localhost:8080 SHLINK_API_KEY=your-key npm run test:integration
```

### Manual Testing

See [TESTING.md](TESTING.md) for comprehensive manual testing procedures covering all operations and edge cases.

## 🔧 Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/magnus919/n8n-nodes-shlink-ai.git
cd n8n-nodes-shlink-ai

# Install dependencies
npm install

# Build the project
npm run build

# Link for local testing
npm link

# In your n8n directory
npm link n8n-nodes-shlink-ai

# Start n8n
n8n start
```

### Running Tests

```bash
# Lint the code
npm run lint

# Fix linting issues
npm run lintfix

# Format code
npm run format

# Run unit tests
npm test

# Run integration tests (requires Shlink instance)
SHLINK_BASE_URL=https://your-shlink.com SHLINK_API_KEY=your-key npm run test:integration
```

## 📋 Requirements

- **Shlink**: Version 3.0+ (supports REST API v3)
- **n8n**: Version 1.0+ (supports community nodes)
- **Node.js**: Version 18.17.0+

## 🤝 Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Guidelines
- Follow existing code patterns and commenting style
- Ensure all operations return the standard response format
- Add comprehensive error handling
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Shlink API Documentation](https://shlink.io/documentation/api-docs/)
- [n8n Community Nodes Guide](https://docs.n8n.io/integrations/community-nodes/)

### Issues
If you encounter any issues:
1. Check the [existing issues](https://github.com/magnus919/n8n-nodes-shlink-ai/issues)
2. For bugs: Create a new issue with our bug report template
3. For feature requests: 
   - Small features: Create a feature request issue
   - Major features: Start a discussion in the "RFCs" category first

### Questions and Ideas
- [GitHub Discussions](https://github.com/magnus919/n8n-nodes-shlink-ai/discussions) - Ideas, RFCs, and Q&A
- [n8n Community Forum](https://community.n8n.io/) - General n8n questions

## 🙏 Acknowledgments

Special thanks to:

- **[@magnus919](https://github.com/magnus919)** - Project creator and vibe coding pioneer, demonstrating that intuition and AI assistance can produce functional software
- **[Claude (Anthropic)](https://claude.ai)** - AI assistant that provided comprehensive guidance, code generation, and documentation throughout the development process
- [Shlink Project](https://shlink.io/) for the excellent URL shortening platform
- [n8n Team](https://n8n.io/) for the powerful workflow automation platform
- The open-source community for inspiration and feedback

---

Made with ❤️ by [Magnus Hedemark](https://github.com/magnus919) at [Groktopus LLC](mailto:magnus@groktop.us)# Test CI trigger
