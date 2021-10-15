const express = require("express");
const app = express();

//-------------- Manejador de archivos --------------
const contenedor = require ('./manejo-archivos');
const newContainer = new contenedor.Contenedor;
const chat = require ('./manejo-chat');
const newChat = new chat.Chat;


//------------ require rutas ---------------
const productsRoute = require("./routes/products");

//------------- Servidor http --------------
const http = require("http");
const server = http.createServer(app)

//------------- puerto ----------------------
const port = process.env.PORT || 8090

//----------- Archivos estaticos para iniciar la aplicacione web-----------
app.use(express.static(__dirname + "/public"));
//----------- middlewares y rutas ------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/productos", productsRoute);    


//--------- Servidor de socket io -------------------
const {Server} = require("socket.io");
const io = new Server(server);

io.on("connection", (socket)=>{
    console.log("ususario conectado!");

    //-------- Chat con socket ---------------
    const chatHistory = newChat.getAll();

    const getHistory = () =>{
        chatHistory.then((items)=>{
            io.sockets.emit("message_back", items);
        });
    }
    getHistory();
    socket.on("data_client", (data)=>{
        const message = data;          
        newChat.save(message).then((data)=>{
            console.log(data)
            const newChatHistory = newChat.getAll();
            newChatHistory.then((items)=>{
                console.log(items)
                return io.sockets.emit("message_back", items);
            });   
        }); 
        
    })

    //-------- Tabla con socket ---------------

    const productsHistory = newContainer.getAll();

    const getHistoryProducts = () =>{
        productsHistory.then((items)=>{
            io.sockets.emit("products_back", items);
        });
    }
    getHistoryProducts();
    socket.on("products_client", (data)=>{
        const message = data;          
        newContainer.save(message).then((data)=>{
            console.log(data)
            const newProductsHistory = newContainer.getAll();
            newProductsHistory.then((items)=>{
                console.log(items)
                return io.sockets.emit("products_back", items);
            });   
        }); 
        
    })
});
    



server.listen(port, ()=>{
    console.log("server run on port "+ port);
});