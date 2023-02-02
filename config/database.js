if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI:"mongodb+srv://Mango12345:30189He11o?!@cluster0.w21atvv.mongodb.net/?retryWrites=true&w=majority"}
}else
{
    module.exports = {mongoURI:"mongodb://localhost:27017/gameEntries"}
}