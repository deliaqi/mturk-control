// To be more specific, normally we know that Collection.find() will return all documents in the collection. 
// But if this collection has been partitioned and the user is in an experiment, 
// then Collection.find() (regardless of whether it is called on the client or server) will only return the documents in the collection that also belong to the experiment.


Conversations = new Mongo.Collection('conversations');
TurkServer.partitionCollection(Conversations);
