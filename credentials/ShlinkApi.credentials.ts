// ShlinkApi.credentials.ts - This file creates the "form" that users see in n8n
// When users want to connect to their Shlink server, this defines what info n8n asks for

import {
  IAuthenticateGeneric,
  ICredentialType,
  INodeProperties,
  ICredentialTestRequest,
} from 'n8n-workflow';

export class ShlinkApi implements ICredentialType {
  name = 'shlinkApi';                           // Internal name for n8n
  displayName = 'Shlink API';                   // What users see in the n8n interface
  documentationUrl = 'https://shlink.io/documentation/api-docs/';  // Help link for users
  
  // This defines the form fields that users fill out
  properties: INodeProperties[] = [
    {
      displayName: 'Base URL',                  // Label users see
      name: 'baseUrl',                          // Internal field name
      type: 'string',                           // Text input field
      default: '',
      placeholder: 'https://your-shlink-instance.com',  // Example text in the field
      description: 'The base URL of your Shlink instance (without /rest/v3)',  // Help text
      required: true,                           // User must fill this out
    },
    {
      displayName: 'API Key',                   // Label users see
      name: 'apiKey',                           // Internal field name
      type: 'string',                           // Text input field
      typeOptions: {
        password: true,                         // Hide the text as they type (like ••••••)
      },
      default: '',
      description: 'API key generated from Shlink CLI using: shlink api-key:generate',
      required: true,
    },
  ];

  // This tells n8n HOW to use the credentials when making API calls
  authenticate: IAuthenticateGeneric = {
    type: 'generic',                            // Basic authentication approach
    properties: {
      headers: {                                // Add these headers to every API request
        'X-Api-Key': '={{$credentials.apiKey}}',   // Use the API key from the form
        Accept: 'application/json',           // Tell Shlink we want JSON responses
      },
    },
  };

  // FIXED: Use the correct n8n interface for credential testing
  test: ICredentialTestRequest = {
    request: {
      method: 'GET' as const,                   // FIXED: Use 'as const' for exact type
      url: '/rest/health',                      // Shlink's health check endpoint
    },
  };
}