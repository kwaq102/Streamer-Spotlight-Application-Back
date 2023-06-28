import { MongoClient } from "mongodb";

export const client = new MongoClient("mongodb://localhost:27017");
client.connect();

export const db = client.db("project_streaming");

export const streamers = db.collection("streamers");
