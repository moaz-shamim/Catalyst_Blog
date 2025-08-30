import conf from "../environment_export/config";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // Your API Endpoint
      .setProject(conf.appwriteProjectId); // Your project ID
    this.storage = new Storage(this.client);
  }

  // Upload File to storage service method
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error", error);
      return false;
    }
  }
  // Delete File from storage service method
  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error", error);
      return false;
    }
  }

  // Preview File from storage service method
  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  
  }
  // View original File from storage service method without modification
  getFileView(fileId) {
    return this.storage.getFileView(conf.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
