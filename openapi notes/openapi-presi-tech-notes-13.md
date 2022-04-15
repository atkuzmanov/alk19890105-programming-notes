# Open API presentation tech notes 1

--------------------------------

`docker compose -p pets1 up`

--------------------------------
[backend]

```sh
openapi-generator generate -i openapi_openapitools-github_3.0.0.yaml -g spring -o spring-petstore/
```

```sh
http://localhost:8080
```

--------------------------------
[backend]

```sh
mvn clean install

mvn spring-boot:run
```

--------------------------------
[frontend]

```sh
ng new angular-petstore
```

```sh
╰─$ ng new angular-petstore
? Do you want to enforce stricter type checking and stricter bundle budgets in the workspace?
  This setting helps improve maintainability and catch bugs ahead of time.
  For more information, see https://angular.io/strict Yes
? Would you like to add Angular routing? Yes
? Which stylesheet format would you like to use? CSS
```

```sh
### This command does not generate services.
# openapi-generator generate -i openapi_openapitools-github_3.0.0.yaml -g typescript-angular -o angular-petstore/src/app/api
```

```sh
### This command generates services.
ng-openapi-gen --input openapi_openapitools-github_3.0.0.yaml --output angular-petstore/src/app/api
```

```sh
cd angular-petstore
```

```sh

npm install --legacy-peer-deps --force

# npm install --force

# npm install --legacy-peer-deps

### Possible fixes for random problems:

# npm install --save @angular/material --force
# npm install --save @angular/material --legacy-peer-deps
# ng add @angular/material

# npm install -D tslib @types/node

# npm i uri-js -g
```

```sh
npm run build

ng build
```

```sh
ng serve
```

---

```sh
ng generate component petstore
```

---
[frontend-testing]

```sh
npm run test_mocha
```

```sh
ng test
```

```sh
ng test --include src/spec/openapivalidation.spec.ts
```
---

```sh
ng test --include src/app/petstore/petstore.component.spec.ts
```

```sh
ng test --main src/spec/openapivalidation.spec.ts
```

---

```sh
npm install --save mocha

npm install --save supertest

npm install --save chai

npm install --save express-openapi-validate
```

```sh
npm run test_mocha
```

--------------------------------

`docker compose -p pets1 up`

`docker compose -p pets1 up src/main/resources/docker/docker-compose.yml`

`docker compose -p pets1 up`

```yml
    networks:
      - my-network-1

networks:
  my-network-1:
    name: my-network-1
```

--------------------------------
[json-schema]

```json
{ 
    "_id" : NumberLong(0), 
    "category" : {
        "_id" : NumberLong(0), 
        "name" : "string"
    }, 
    "name" : "doggie", 
    "photoUrls" : [
        "string"
    ], 
    "tags" : [
        {
            "_id" : NumberLong(0), 
            "name" : "string"
        }
    ], 
    "status" : "AVAILABLE", 
    "_class" : "org.openapitools.model.Pet"
}
```

```json
{
  "category": {
    "id": 0,
    "name": "string"
  },
  "id": 0,
  "name": "Test doggie",
  "photoUrls": [
    "string"
  ],
  "status": "pending",
  "tags": [
    {
      "id": 0,
      "name": "string"
    }
  ]
}
```

---
[dummy data]

```json
{
  "category": {
    "id": 1,
    "name": "indoor-pet"
  },
  "id": 0,
  "name": "Test Dodge",
  "photoUrls": [
    "../../assets/images/dog.png"
  ],
  "status": "available",
  "tags": [
    {
      "id": 1,
      "name": "dog"
    }
  ]
}
```

```json
{
  "category": {
    "id": 1,
    "name": "indoor-pet"
  },
  "id": 1,
  "name": "Dodge",
  "photoUrls": [
    "../../assets/images/dog.png"
  ],
  "status": "available",
  "tags": [
    {
      "id": 1,
      "name": "dog"
    }
  ]
}
```

```json
{
  "category": {
    "id": 1,
    "name": "indoor-pet"
  },
  "id": 2,
  "name": "Tabby",
  "photoUrls": [
    "../../assets/images/cat.png"
  ],
  "status": "available",
  "tags": [
		{
      "id": 2,
      "name": "cat"
    }
  ]
}
```


```json
{
  "category": {
    "id": 2,
    "name": "outdoor-pet"
  },
  "id": 3,
  "name": "Wolfy",
  "photoUrls": [
    "../../assets/images/wolf.png"
  ],
  "status": "available",
  "tags": [
    {
      "id": 3,
      "name": "wolf"
    }
  ]
}
```

---
[wolf-for-manual-mongodb-insert]

```json
{ 
    "_id" : NumberLong(99), 
    "category" : {
        "_id" : NumberLong(99), 
        "name" : "string"
    }, 
    "name" : "Wolfy", 
    "photoUrls" : [
        "string"
    ], 
    "tags" : [
        {
            "_id" : NumberLong(99), 
            "name" : "string"
        }
    ], 
    "status" : "AVAILABLE", 
    "_class" : "org.openapitools.model.Pet"
}
```

--------------------------------

--------------------------------
--------------------------------
--------------------------------
