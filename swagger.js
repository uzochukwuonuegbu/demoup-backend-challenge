module.exports = {
    basePath: "/",
    definitions: {
      InvalidResponse: {
        properties: {
          message: {
            type: "string",
          },
          statusCode: {
            type: "string",
          },
        },
        type: "object",
      },
      AssetResponse: {
        properties: {
          data: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              title: {
                type: "string",
              },
              collection_id: {
                type: "string",
              },
              url: {
                type: "string",
              },
            },
          },
        },
        type: "object",
      },
      AuthResponse: {
        properties: {
          token: {
            type: "string",
          },
          status: {
            type: "number",
          },
          message: {
            type: "string",
          },
        },
        type: "object",
      },
    },
    host: "localhost:3000",
    info: {
      description: "This houses the configuration for our swagger docs",
      title: "Asset Management API",
      version: "1.0.0",
    },
    paths: {
      "/assets": {
        post: {
          description: "Create an Asset",
          parameters: [],
          produces: ["application/json"],
          responses: {
            201: {
              description: "Asset created successfully",
              schema: {
                $ref: "#/definitions/AssetResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
        get: {
          description: "Get all Assets",
          parameters: [],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
              schema: {
                $ref: "#/definitions/AssetResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },
      "/assets/{id}": {
        get: {
          description: "Get an Asset by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              type: "string",
            },
          ],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Success",
              schema: {
                $ref: "#/definitions/AssetResponse",
              },
            },
            404: {
              description: "Asset not found",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
        delete: {
          description: "Delete an Asset by ID",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              type: "string",
            },
          ],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Asset deleted successfully",
            },
            404: {
              description: "Asset not found",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },
      "/auth/register": {
        post: {
          description: "User registration",
          parameters: [],
          produces: ["application/json"],
          responses: {
            201: {
              description: "Registration successful",
              schema: {
                $ref: "#/definitions/AuthResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },
      "/auth/login": {
        post: {
          description: "User login",
          parameters: [],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Login successful",
              schema: {
                $ref: "#/definitions/AuthResponse",
              },
            },
            400: {
              description: "Invalid request",
              schema: {
                $ref: "#/definitions/InvalidResponse",
              },
            },
          },
        },
      },
    },
    schemes: ["http"],
    swagger: "2.0",
  };