import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"

//connection
const PORT = process.env.PORT
connectToDatabase().then(() => {
    app.listen(PORT, () => console.log("Server running and Connected to DB"));

}).catch(err => console.log(err));