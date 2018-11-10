var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var RULES_COLLECTION = "rules";
var ENTITIES_COLLECTION = "entities";
var DATABASE_COLLECTION = "database";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/dissertation", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// RULES API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/rules"
 *    GET: finds all rules
 *    POST: creates a new rule
 */

app.get("/api/rules", function(req, res) {
  db.collection(RULES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get rules.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/rules", function(req, res) {
  var newRule = req.body;
  newRule.createDate = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Lisbon'
  });

  if (!req.body.trigger || !req.body.action) {
    handleError(res, "Invalid user input", "Must provide a trigger and action.", 400);
  } else {
    delete newRule.trigger['attribute']['asAction'];
    delete newRule.trigger['attribute']['asAction'];
    delete newRule.action['attribute']['asAction'];
    // delete newRule.trigger['attribute']['fields'];
    // delete newRule.action['attribute']['fields'];
    delete newRule.trigger.operator;
    db.collection(RULES_COLLECTION).insertOne(newRule, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new rule.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.delete("/api/rules/:id", function(req, res) {
  db.collection(RULES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete rule");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});





/*  "/api/entities"
 *    GET: finds all entities
 *    POST: creates a new entity
 */

app.get("/api/entities", function(req, res) {
  db.collection(ENTITIES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get entites.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.post("/api/entities", function(req, res) {
  var newEntity = req.body;
  newEntity.createDate = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Lisbon'
  });

  if (!newEntity.name || !newEntity.attributes) {
    handleError(res, "Invalid user input", "Must provide a valid Entity.", 400);
  } else {
    db.collection(ENTITIES_COLLECTION).insertOne(newEntity, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new Entity.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

app.delete("/api/entities/:id", function(req, res) {
  db.collection(ENTITIES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete entity");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.get("/config", function(req, res) {
  db.collection(RULES_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get rules.");
    } else {
      res.attachment("config.json");
      res.type("json");
      res.send(docs);
    }
  }
)});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});


app.get("/api/database", function(req, res) {
  db.collection(DATABASE_COLLECTION).findOne({}, (function(err, docs) {
    if (err) {
      handleError(res, "Database Not Found.", "No database set.", 404);
    } else if (!docs) {
      res.status(204).json({});
    } else {
      res.status(200).json(docs);
    }
  }));
});

app.post("/api/database", function(req, res) {
  var newUrl = req.body;
  newUrl.setDate = new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Lisbon'
  });

  if (!newUrl.link) {
    handleError(res, "Invalid user input", "Must provide a valid link.", 400);
  } else {
    const operation = {
      $set: newUrl
    }
    db.collection(DATABASE_COLLECTION).updateOne({}, operation, { upsert: true }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to set a new Database Address.");
      } else {
        res.status(201).json(doc);
      }
    });
  }
});

// 404 catch 
app.all('*', (req, res) => {
  console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
  res.status(200).sendFile('index.html', { root: __dirname + "/dist/" });
});