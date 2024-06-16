import { MongoClient } from "mongodb";

const dbUrl = "localhost:27017";
const dbName = "fsd56we-tamil";

// username & password will be required on connecting to cloud DB
const dbPassword = "lqDTRKl5ciQflD0C";
const dbUsr = "sanjaysaravanan00007";
const dbCluster = "cluster0.yxr2hty.mongodb.net";

// Creating a client instance
const localUrl = `mongodb://${dbUrl}`;

const cloudUrl = `mongodb+srv://${dbUsr}:${dbPassword}@${dbCluster}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(cloudUrl);

// Selecting a particular DB-Name
const db = client.db(dbName);

// Connecting to the asynchronously
const connectToDb = async () => {
  try {
    await client.connect();
    console.log("DB Connected Successfully");
  } catch (e) {
    console.log("Error connecting to database", e);
    process.exit(1);
  }
};

export { db, client };

export default connectToDb;
