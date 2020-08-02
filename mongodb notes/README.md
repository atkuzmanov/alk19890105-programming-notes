# mongodb notes

|||mongodb

<https://mongodb.github.io/mongo-java-driver/3.4/javadoc/>

<https://mongodb.github.io/mongo-java-driver/3.4/driver/getting-started/quick-start/>

<https://www.tutorialspoint.com/mongodb/mongodb_create_database.htm>

<https://www.mkyong.com/mongodb/java-mongodb-query-document/>

---

|||mongodb shell
|||mongo shell

<https://docs.mongodb.com/manual/reference/mongo-shell/>

<https://docs.mongodb.com/manual/tutorial/query-documents/>

---

|||mongodb commands |||mongodb shell commands
|||mongo commands |||mongo shell commands

```mongodb
show dbs

use [example-db-name]

db.[example-db-name].find()

db.[example-db-name].getIndexes()
```

---

|||mongodb java 8 random

```java
Bson mongoFilter = Filters.eq("_id", exampleMongoDocId);

Document mongoDocument = exampleCollection.find(mongoFilter).first();

MongoCursor<Document> mongoCursor = exampleCollection.find(mongoFilter).iterator();

try {
 while (mongoCursor.hasNext()) {
  //Do some processing with next cursor...
     mongoCursor.next();
 }
} finally {
    cursor.close();
}

//---

import org.bson.BsonDocument;
import org.bson.BsonInt64;
import org.bson.Document;
import org.bson.conversions.Bson;

import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.client.model.Filters;

    public ExampleContentObject getItem(Integer exampleId) {
        ExampleContentObject exampleContObj = new ExampleContentObject();

        Bson filter = Filters.eq("_id", exampleId);
        //Todo: handle null
        Document exampleMongoDBDocument = mongoDao.getOne(filter);

        //Todo: convert to ExampleContentObject
        BsonDocument exampleContObjAsBsonDocument = exampleMongoDBDocument.toBsonDocument(BsonDocument.class, MongoClient.getDefaultCodecRegistry());
        BsonInt64 bsonAssetId = exampleContObjAsBsonDocument.getInt64("exampleIdFieldName");
        exampleContObj.setExampleId(bsonAssetId.intValue());

        return exampleContObj;
    }

//---

// |||mongodb filter
// |||mongodb bson filter

Bson filter = Filters.gt("exampleTimestamp", currentTimestamp.getTime());
Bson filter = Filters.where("{ \"exampleTimestamp\": { $gt: \""+ currentTimestamp +"\" } }");
```

---

|||mongodb dao pattern
|||mongodb pattern
|||mongodb drivers
|||quote

> davidnorris

"For cloud-based components:

One thing that has become apparent whilst migrating away from old versions of the Mongo Java driver is "leakage" of Mongo specifics up the stack.

One way of preventing this is to use the Topic Store pattern:

- API layer
- Service (business logic layer)
- Topic DAO
- Mongo DAO

The Mongo DOA only knows about Mongo types, i.e., BSON or Document. The layer above, Topic DAO, knows only about the Topic type and how to convert to and from the Document type. It only ever exposes the Topic type to the higher layers. This means that the service layer never has to deal with Mongo specifics and only deals with business model types.

This makes business logic easier and also minimises the work needed when changing Mongo driver for example.

Some of the other services are leaking mongo specifics up the stack and into the service layer, which is not good.

Thoughts?"

---

|||conference mongodb 2016
|||mongodb 2016
|||idempotence
|||idempotent

<https://en.wikipedia.org/wiki/Idempotence>

Idempotence is the property of certain operations in mathematics and computer science, that can be applied multiple times without changing the result beyond the initial application.

Idempotent operations are those which can be applied multiple times without changing the result beyond the initial application.

---

|||mongodb workshop 2017-08-02
|||conference
|||workshop
|||training

MongoDB Workshop 2017-08-02

```text
* MongoDB 3.4

* Automated HA: Replica set

- 5 nodes
- 2 availability zones
- 2 in each zone
- 1 arbiter outside

- Replication? - write consistency
-- write concern - fast vs. consistent - optimisation

* Scalability
- Sharding
-- ~ to 2TB of a replica set
-- Microsharding
-- zonebased sharding
-- data lifecycle
-- replica set better for our usecase

* Graph processing

- Aggregation function
-- recommendations

* Faceted navigation
- search for vivo

* Collations

- sorting different characters from diff langs locale


* Decimal128
- financial sector


* Advanced analytics

* BI connector
- sql read only layer


* Spark connector
- Machine learning


* MongoDB 3.6
- document validation - json schema support
-- if json schema changes possibly not keeping in sync?
.
.
.


* MongoDB Stich
- stich together mobile apps

* MongoDB Charts


* MongoDB CloudManager OPS Manager
- low level granular

* MongoDB Atlas
- high level - easy for ops
- crorss cloud & cross region
- pricing - credits

* MongoDB Compass
- desktop app


* Q&a

- How to handle connection errors in the application – should our apps retry?
- Best practices for adding an event store to an existing live system?
- How to handle queries that cross multiple collections?
- Tuning the write concern?
- Moving to a sharded cluster – what are the drivers?
- Mongo drivers: any recommendations for which ones we should be using?
```

|||mongodb videos
|||mongodb conferences videos
|||mongodb world presentations
|||mongodb presentations

<https://www.mongodb.com/presentations>

---

|||mongo cookbook
|||mongo db cookbook
|||mongodb cookbook

|||default-example-mongo-db-metadata.rb

```text
name        "default-example-mongo-cookbook"
description 'Basic cookbook for MongoDB Berkshelf installation.'
license     "Apache 2.0"
maintainer  "default-example-name"
version     "1.0.0"

depends 'mongodb'
```

|||default-example-mongo-db-recipe.rb

```text
include_recipe "mongodb::default"
include_recipe "mongodb::10gen_repo"
```

---
