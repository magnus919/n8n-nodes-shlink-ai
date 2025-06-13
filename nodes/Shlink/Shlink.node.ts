// Shlink.node.ts - Main n8n Node Implementation
// This is the "bridge" between n8n's interface and our Shlink tools
// It handles the UI, user input, and calls our tool functions

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeApiError,
  NodeOperationError,
  // NodeConnectionType,
} from 'n8n-workflow';

import { shlinkTools } from '../../tools/ShlinkTools';

// Define proper types for credentials
interface ShlinkCredentials {
  apiKey: string;
  baseUrl: string;
}

// This is the main class that n8n will load and use
export class Shlink implements INodeType {
  // This giant object defines everything about how the node looks and works in n8n
  description: INodeTypeDescription = {
    displayName: 'Shlink AI Agent',              // Name users see in the node palette
    name: 'shlink',                              // Internal name for n8n
    icon: 'file:shlink.svg',                     // Icon file (you'd need to create this)
    group: ['transform'],                        // Which category in the node palette
    version: 1,                                  // Version of this node
    subtitle: '={{$parameter["operation"]}}',    // Shows the selected operation under the node
    description: 'AI-powered Shlink URL shortener operations',  // Help text for users
    defaults: {
      name: 'Shlink',                           // Default name when users add the node
    },
      inputs: ['main'],
      outputs: ['main'],
    credentials: [                              // What credentials this node needs
      {
        name: 'shlinkApi',                      // Must match the credential file name
        required: true,                         // Users must set up credentials
      },
    ],
    // This giant "properties" array defines all the form fields users see
    // Each object in this array is one field in the n8n interface
    properties: [
      // First field: Let users choose what operation they want to perform
      {
        displayName: 'Operation',                // Label users see
        name: 'operation',                       // Internal field name
        type: 'options',                         // Dropdown menu
        noDataExpression: true,                  // Don't allow expressions here
        options: [
          {
            name: 'Create Short URL',
            value: 'createShortUrl',
            description: 'Create a new short URL',
            action: 'Create a short URL',
          },
          {
            name: 'Delete Short URL',
            value: 'deleteShortUrl', 
            description: 'Delete a short URL',
            action: 'Delete short URL',
          },
          {
            name: 'Edit Short URL',
            value: 'editShortUrl',
            description: 'Update properties of an existing short URL',
            action: 'Edit short URL',
          },
          {
            name: 'Get URL Details',
            value: 'getShortUrlDetails',
            description: 'Get details of an existing short URL',
            action: 'Get URL details',
          },
          {
            name: 'Get Visit Statistics',
            value: 'getVisitStatistics',
            description: 'Get visit analytics for a short URL',
            action: 'Get visit statistics',
          },
          {
            name: 'List Short URLs',
            value: 'listShortUrls',
            description: 'List short URLs with optional filtering',
            action: 'List short ur ls',
          },
        ],
        default: 'createShortUrl',               // Which option is selected by default
      },

      // CREATE SHORT URL Parameters - these only show when "Create Short URL" is selected
      {
        displayName: 'Long URL',
        name: 'longUrl',
        type: 'string',                          // Text input field
        displayOptions: {                        // When to show this field
          show: {
            operation: ['createShortUrl'],       // Only show for "Create Short URL" operation
          },
        },
        default: '',
        placeholder: 'https://example.com/very/long/url',  // Example text in the field
        description: 'The URL to shorten',
        required: true,                          // User must fill this out
      },
      {
        displayName: 'Custom Short Code',
        name: 'customSlug',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['createShortUrl'],
          },
        },
        default: '',
        placeholder: 'my-custom-code',
        description: 'Custom short code (optional). Leave empty for auto-generation.',
      },
      {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['createShortUrl'],
          },
        },
        default: '',
        placeholder: 'short.example.com',
        description: 'Custom domain for the short URL (optional)',
      },
      {
        displayName: 'Tags',
        name: 'tags',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['createShortUrl'],
          },
        },
        default: '',
        placeholder: 'marketing, social, campaign-2024',
        description: 'Comma-separated list of tags (optional)',
      },
      {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['createShortUrl'],
          },
        },
        default: '',
        placeholder: 'My Campaign Link',
        description: 'Human-readable title for the short URL (optional)',
      },
      {
        displayName: 'Validate URL',
        name: 'validateUrl',
        type: 'boolean',
        displayOptions: {
          show: {
            operation: ['createShortUrl'],
          },
        },
        default: true,
        description: 'Whether to validate that the long URL is reachable',
      },
      {
        displayName: 'Find If Exists',
        name: 'findIfExists',
        type: 'boolean',
        displayOptions: {
          show: {
            operation: ['createShortUrl'],
          },
        },
        default: false,
        description: 'Whether to return existing short URL if the long URL was already shortened',
      },

      // GET/EDIT/DELETE Short URL Parameters
      {
        displayName: 'Short Code',
        name: 'shortCode',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['getShortUrlDetails', 'editShortUrl', 'deleteShortUrl', 'getVisitStatistics'],
          },
        },
        default: '',
        placeholder: 'abc123',
        description: 'The short code of the URL',
        required: true,
      },
      {
        displayName: 'Domain',
        name: 'domain',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['getShortUrlDetails', 'editShortUrl', 'deleteShortUrl', 'getVisitStatistics'],
          },
        },
        default: '',
        placeholder: 'short.example.com',
        description: 'Domain of the short URL (required if using custom domains)',
      },

      // EDIT Short URL Parameters
      {
        displayName: 'New Long URL',
        name: 'newLongUrl',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['editShortUrl'],
          },
        },
        default: '',
        placeholder: 'https://example.com/new-destination',
        description: 'New destination URL (leave empty to keep current)',
      },
      {
        displayName: 'New Tags',
        name: 'newTags',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['editShortUrl'],
          },
        },
        default: '',
        placeholder: 'updated, marketing, new-campaign',
        description: 'New comma-separated list of tags (leave empty to keep current)',
      },
      {
        displayName: 'New Title',
        name: 'newTitle',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['editShortUrl'],
          },
        },
        default: '',
        placeholder: 'Updated Campaign Link',
        description: 'New title for the short URL (leave empty to keep current)',
      },

      // LIST Short URLs Parameters
      {
        displayName: 'Page',
        name: 'page',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['listShortUrls'],
          },
        },
        default: 1,
        description: 'Page number for pagination',
        typeOptions: {
          minValue: 1,
        },
      },
      {
        displayName: 'Items Per Page',
        name: 'itemsPerPage',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['listShortUrls'],
          },
        },
        default: 20,
        description: 'Number of items to return per page',
        typeOptions: {
          minValue: 1,
          maxValue: 100,
        },
      },
      {
        displayName: 'Search Term',
        name: 'searchTerm',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['listShortUrls'],
          },
        },
        default: '',
        placeholder: 'campaign',
        description: 'Search term to filter URLs by',
      },
      {
        displayName: 'Filter by Tags',
        name: 'filterTags',
        type: 'string',
        displayOptions: {
          show: {
            operation: ['listShortUrls'],
          },
        },
        default: '',
        placeholder: 'marketing, social',
        description: 'Comma-separated list of tags to filter by',
      },
      {
        displayName: 'Order By',
        name: 'orderBy',
        type: 'options',
        displayOptions: {
          show: {
            operation: ['listShortUrls'],
          },
        },
        options: [
          {
            name: 'Date Created',
            value: 'dateCreated',
          },
          {
            name: 'Long URL',
            value: 'longUrl',
          },
          {
            name: 'Short Code',
            value: 'shortCode',
          },
          {
            name: 'Visits',
            value: 'visits',
          },
        ],
        default: 'dateCreated',
        description: 'Field to order results by',
      },
      {
        displayName: 'Start Date',
        name: 'startDate',
        type: 'dateTime',
        displayOptions: {
          show: {
            operation: ['listShortUrls', 'getVisitStatistics'],
          },
        },
        default: '',
        description: 'Filter URLs created after this date',
      },
      {
        displayName: 'End Date',
        name: 'endDate',
        type: 'dateTime',
        displayOptions: {
          show: {
            operation: ['listShortUrls', 'getVisitStatistics'],
          },
        },
        default: '',
        description: 'Filter URLs created before this date',
      },

      // VISIT STATISTICS Parameters
      {
        displayName: 'Visits Page',
        name: 'visitsPage',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['getVisitStatistics'],
          },
        },
        default: 1,
        description: 'Page number for visit data pagination',
        typeOptions: {
          minValue: 1,
        },
      },
      {
        displayName: 'Visits Per Page',
        name: 'visitsPerPage',
        type: 'number',
        displayOptions: {
          show: {
            operation: ['getVisitStatistics'],
          },
        },
        default: 20,
        description: 'Number of visit records to return per page',
        typeOptions: {
          minValue: 1,
          maxValue: 100,
        },
      },
    ],
  };

  // This is the main function that runs when the node executes
  // n8n calls this function and expects us to return results
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();           // Get data from previous nodes in the workflow
    const returnData: INodeExecutionData[] = []; // Array to store our results

    // Get credentials that the user configured (API key and base URL)
    // These are securely stored by n8n and passed to our tool functions
    const credentials = await this.getCredentials('shlinkApi');
    const shlinkCredentials: ShlinkCredentials = {
      apiKey: credentials.apiKey as string,
      baseUrl: credentials.baseUrl as string,
    };

    // Process each input item (n8n can handle multiple items at once)
    for (let i = 0; i < items.length; i++) {
      try {
        // Find out which operation the user selected
        const operation = this.getNodeParameter('operation', i) as string;
        let result;

        // Based on the operation, call the appropriate handler function
        switch (operation) {
          case 'createShortUrl':
            result = await shlinkTools.createShortUrl({
              longUrl: this.getNodeParameter('longUrl', i) as string,
              customSlug: this.getNodeParameter('customSlug', i, '') as string || undefined,
              domain: this.getNodeParameter('domain', i, '') as string || undefined,
              tags: (this.getNodeParameter('tags', i, '') as string).split(',').map(t => t.trim()).filter(Boolean) || undefined,
              title: this.getNodeParameter('title', i, '') as string || undefined,
              validateUrl: this.getNodeParameter('validateUrl', i, true) as boolean,
              findIfExists: this.getNodeParameter('findIfExists', i, false) as boolean,
            }, shlinkCredentials);
            break;
          case 'getShortUrlDetails':
            result = await shlinkTools.getShortUrlDetails({
              shortCode: this.getNodeParameter('shortCode', i) as string,
              domain: this.getNodeParameter('domain', i, '') as string || undefined,
            }, shlinkCredentials);
            break;
          // Add the other cases...
          default:
            throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`, {
              itemIndex: i,
            });
        }

        // Add the result to our return data
        returnData.push({
          json: result as any,                          // The actual result data
          pairedItem: { item: i },               // Links this result to the input item
        });
      } catch (error) {
        // If something went wrong, decide whether to fail or continue
        if (this.continueOnFail()) {
          // User chose "continue on fail" - return an error result instead of crashing
          returnData.push({
            json: {
              success: false,
              operation: this.getNodeParameter('operation', i),
              data: { error: (error as any)?.message || 'Unknown error' },
              metadata: {
                human_summary: `Error: ${(error as any)?.message || 'Unknown error'}`,
                actionable_fields: {},
                next_possible_actions: ['retry', 'check_parameters'],
              },
              context: {
                timestamp: new Date().toISOString(),
                api_call_count: 0,
              },
            },
            pairedItem: { item: i },
          });
        } else {
          // User didn't choose "continue on fail" - stop the workflow and show the error
          throw new NodeApiError(this.getNode(), error as any, { itemIndex: i });
        }
      }
    }

    // Return all our results (wrapped in an array because n8n expects that format)
    return [returnData];
  }
}