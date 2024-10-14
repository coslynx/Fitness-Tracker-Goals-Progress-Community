import { MongoClient } from 'mongodb';

// Define the MongoDB connection URL (environment variable or hardcoded). Replace with your actual URL.
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';

// This function establishes a connection to the MongoDB database. It handles the connection process and returns a promise that resolves with the connected client.
async function connectToMongoDB(): Promise<MongoClient> {
  try {
    // Attempt to connect to the MongoDB database using the specified URL.
    const client = await MongoClient.connect(mongoUrl);
    // Log a message indicating successful connection to the database.
    console.log('Connected to MongoDB successfully.');
    // Return the connected client.
    return client;
  } catch (error) {
    // Log an error message if the connection fails.
    console.error('Error connecting to MongoDB:', error);
    // Re-throw the error to be handled by the calling function.
    throw error;
  }
}

// This class represents a MongoDB data access layer. It provides methods for interacting with the database.
class MongoDAL {
  // The connected client is stored in a private property.
  private client: MongoClient | null = null;

  // This method initializes the MongoDB data access layer. It connects to the database and stores the client.
  async init(): Promise<void> {
    try {
      // Connect to the MongoDB database and store the connected client.
      this.client = await connectToMongoDB();
    } catch (error) {
      // Log an error message if the connection fails.
      console.error('Error initializing MongoDB DAL:', error);
      // Re-throw the error to be handled by the calling function.
      throw error;
    }
  }

  // This method closes the connection to the MongoDB database. It is called when the data access layer is no longer needed.
  async close(): Promise<void> {
    if (this.client) {
      // If a client is connected, close the connection.
      await this.client.close();
      // Set the client to null to indicate that the connection is closed.
      this.client = null;
    }
  }

  // This method retrieves a collection from the MongoDB database. It takes the collection name as input and returns the collection.
  getCollection(collectionName: string): any {
    // Ensure that a client is connected to the database.
    if (!this.client) {
      // If no client is connected, throw an error.
      throw new Error('MongoDB client not connected.');
    }
    // Return the collection with the specified name.
    return this.client.db().collection(collectionName);
  }

  // This method retrieves a document from the MongoDB database. It takes the collection name, query, and options as input and returns the document.
  async getDocument(collectionName: string, query: any, options?: any): Promise<any> {
    try {
      // Retrieve the collection from the database.
      const collection = this.getCollection(collectionName);
      // Find a single document matching the query and options.
      const document = await collection.findOne(query, options);
      // Return the found document.
      return document;
    } catch (error) {
      // Log an error message if the retrieval fails.
      console.error('Error getting document:', error);
      // Re-throw the error to be handled by the calling function.
      throw error;
    }
  }

  // This method inserts a new document into the MongoDB database. It takes the collection name and document as input and returns the inserted document.
  async insertDocument(collectionName: string, document: any): Promise<any> {
    try {
      // Retrieve the collection from the database.
      const collection = this.getCollection(collectionName);
      // Insert a new document into the collection.
      const result = await collection.insertOne(document);
      // Return the inserted document.
      return result.ops[0];
    } catch (error) {
      // Log an error message if the insertion fails.
      console.error('Error inserting document:', error);
      // Re-throw the error to be handled by the calling function.
      throw error;
    }
  }

  // This method updates a document in the MongoDB database. It takes the collection name, query, and update object as input and returns the updated document.
  async updateDocument(collectionName: string, query: any, update: any): Promise<void> {
    try {
      // Retrieve the collection from the database.
      const collection = this.getCollection(collectionName);
      // Update a document matching the query with the specified update object.
      await collection.updateOne(query, { $set: update });
    } catch (error) {
      // Log an error message if the update fails.
      console.error('Error updating document:', error);
      // Re-throw the error to be handled by the calling function.
      throw error;
    }
  }

  // This method deletes a document from the MongoDB database. It takes the collection name and query as input and returns the deleted document.
  async deleteDocument(collectionName: string, query: any): Promise<void> {
    try {
      // Retrieve the collection from the database.
      const collection = this.getCollection(collectionName);
      // Delete a document matching the query from the collection.
      await collection.deleteOne(query);
    } catch (error) {
      // Log an error message if the deletion fails.
      console.error('Error deleting document:', error);
      // Re-throw the error to be handled by the calling function.
      throw error;
    }
  }

  // This method retrieves a list of documents from the MongoDB database. It takes the collection name, query, and options as input and returns the list of documents.
  async getDocuments(collectionName: string, query: any, options?: any): Promise<any[]> {
    try {
      // Retrieve the collection from the database.
      const collection = this.getCollection(collectionName);
      // Find all documents matching the query and options.
      const documents = await collection.find(query, options).toArray();
      // Return the list of found documents.
      return documents;
    } catch (error) {
      // Log an error message if the retrieval fails.
      console.error('Error getting documents:', error);
      // Re-throw the error to be handled by the calling function.
      throw error;
    }
  }

  // This method aggregates documents from the MongoDB database. It takes the collection name and aggregation pipeline as input and returns the aggregated results.
  async aggregateDocuments(collectionName: string, pipeline: any[]): Promise<any[]> {
    try {
      // Retrieve the collection from the database.
      const collection = this.getCollection(collectionName);
      // Perform an aggregation operation using the specified pipeline.
      const results = await collection.aggregate(pipeline).toArray();
      // Return the aggregated results.
      return results;
    } catch (error) {
      // Log an error message if the aggregation fails.
      console.error('Error aggregating documents:', error);
      // Re-throw the error to be handled by the calling function.
      throw error;
    }
  }
}

// Initialize the MongoDB DAL singleton.
const mongoDAL = new MongoDAL();

// This function initializes the MongoDB DAL by connecting to the database.
async function initMongoDAL(): Promise<void> {
  // Initialize the MongoDB data access layer.
  await mongoDAL.init();
}

// This function closes the connection to the MongoDB database.
async function closeMongoDAL(): Promise<void> {
  // Close the connection to the database.
  await mongoDAL.close();
}

// This function retrieves a collection from the database.
function getCollection(collectionName: string): any {
  // Return the collection from the MongoDB data access layer.
  return mongoDAL.getCollection(collectionName);
}

// This function retrieves a document from the database.
async function getDocument(collectionName: string, query: any, options?: any): Promise<any> {
  // Return the document from the MongoDB data access layer.
  return mongoDAL.getDocument(collectionName, query, options);
}

// This function inserts a new document into the database.
async function insertDocument(collectionName: string, document: any): Promise<any> {
  // Return the inserted document from the MongoDB data access layer.
  return mongoDAL.insertDocument(collectionName, document);
}

// This function updates a document in the database.
async function updateDocument(collectionName: string, query: any, update: any): Promise<void> {
  // Perform the update operation using the MongoDB data access layer.
  return mongoDAL.updateDocument(collectionName, query, update);
}

// This function deletes a document from the database.
async function deleteDocument(collectionName: string, query: any): Promise<void> {
  // Perform the deletion operation using the MongoDB data access layer.
  return mongoDAL.deleteDocument(collectionName, query);
}

// This function retrieves a list of documents from the database.
async function getDocuments(collectionName: string, query: any, options?: any): Promise<any[]> {
  // Return the list of documents from the MongoDB data access layer.
  return mongoDAL.getDocuments(collectionName, query, options);
}

// This function aggregates documents from the database.
async function aggregateDocuments(collectionName: string, pipeline: any[]): Promise<any[]> {
  // Return the aggregated results from the MongoDB data access layer.
  return mongoDAL.aggregateDocuments(collectionName, pipeline);
}

// Export the MongoDB data access layer and its functions.
export {
  mongoDAL,
  initMongoDAL,
  closeMongoDAL,
  getCollection,
  getDocument,
  insertDocument,
  updateDocument,
  deleteDocument,
  getDocuments,
  aggregateDocuments,
};