# Magic Transporters

Magic Transporters is a Node.js application built with Express.js, MongoDB, and JWT authentication. It provides endpoints for managing Magic Transporters system.

## Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone https://github.com/MohammadDAlil0/Magic-Transporters
   ```

2. **Install Dependencies**

   ```bash
   cd Magic-Transporters
   npm install
   ```

3. **Set Up MongoDB**

   - Make sure MongoDB is installed and running on your machine.
   - If not installed, you can download and install it from MongoDB Official Website.
   - Start MongoDB service.

4. **Environment Variables**

   - Create a .env file in the root directory.
   - Add the following environment variables to the .env file:

   - ```makefile
     NODE_ENV=development/production
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     ```

5. **Run the Application**

```bash
npm run build
npm start
```
For developers:
```bash
npm run watch
```

## API Endpoints

### Magic Movers

- **Add Magic Mover**

  - URL: /api/v1/movers/addMover
  - Method: POST
  - Request Body:

  ```json
  {
    "name": "Mohammad Saeed Dalil",
    "weightLimit": 100
  }
  ```

  - Response:

  ```json
  {
    "status": "success",
    "data": {
        "name": "Ayham",
        "weightLimit": 70,
        "questState": "resting",
        "missionsCount": 0,
        "_id": "669641c13b9c4d8ecb83affd"
    }
  }
  ```

- **Load Magic Mover With Items**

  - URL: /api/v1/movers/loadItems
  - Method: PATCH
  - Request Body:

  ```json
  {
    "moverID": "66962219fbddce87c987789d",
    "itemsID": ["66962224fbddce87c987789f", "66962224fbddce87c988789c"]
  }
  ```

  - Response:

  ```json
  {
    "status": "success",
    "message": "The magic mover is loading items..."
  }
  ```

- **Start Mission**

  - URL: /api/v1/movers/startMission
  - Method: PATCH
  - Request Body:

  ```json
  {
    "moverID": "66962219fbddce87c987789d"
  }
  ```

  - Response:

  ```json
  {
    "status": "success",
    "message": "Mession has started successfuly!"
  }
  ```

- **End Mission**

  - URL: /api/v1/movers/endMission
  - Method: PATCH
  - Request Body:

  ```json
  {
    "moverID": "66962219fbddce87c987789d"
  }
  ```

  - Response:

  ```json
  {
    "status": "success",
    "message": "Mission completed successfuly!"
  }
  ```
- **Get Top Magic Movers**

  - URL: /api/v1/movers/getTopMovers
  - Method: GET

  - Response:

  ```json
  {
    "status": "success",
    "result": 2,
    "data": [
        {
            "_id": "669645ca22697627a43f5b2b",
            "name": "Mohammad Saeed Dalil",
            "weightLimit": 100,
            "questState": "resting",
            "missionsCount": 2,
            "__v": 0
        },
        {
            "_id": "6696466d22697627a43f5b4a",
            "name": "Ayham",
            "weightLimit": 50,
            "questState": "resting",
            "missionsCount": 1,
            "__v": 0
        }
    ]
  }
  ```

### Magic Items

- **Add Magic Items**

  - URL: /api/v1/items/additem
  - Method: PATCH
  - Request Body:

  ```json
  {
    "name": "box",
    "weight": 20
  }
  ```

  - Response:

  ```json
  {
    "status": "success",
    "data": {
        "name": "box",
        "weight": 20,
        "_id": "6696467822697627a43f5b4c",
        "__v": 0
    }
  }
  ```