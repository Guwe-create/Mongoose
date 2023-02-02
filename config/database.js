if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI:"mongodb+srv://MangoGuy123:7583N1c3day@cluster0.ol39xn6.mongodb.net/?retryWrites=true&w=majority"}
}else
{
    module.exports = {mongoURI:"mongodb://localhost:27017/gameEntries"}
}