import app from "./app.js"

export function server() {

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Connect"));

}


