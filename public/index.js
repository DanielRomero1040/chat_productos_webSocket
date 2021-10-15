const socket = io();



//------- chat socket client --------
socket.on("message_back", (data)=>{
    console.log(data);
    render(data);
});

const render = (data)=>{
    let html = data.map( (element)=>{
        return `
        <p class="text-light"> <strong class="text-primary"> ${element.nombre} : </strong> ${element.msn} -- <span class="text-warning"> ${element.date} </span></p>
        `
    }).join(" ")

    document.getElementById("messages").innerHTML = html;
};
document.getElementById("enviar").addEventListener("click", function(event){
    event.preventDefault()
    let objetoMensaje = {
        
        nombre : document.getElementById("nombre").value,
        msn : document.getElementById("input").value,
        date: new Date()

    }

    socket.emit("data_client", objetoMensaje)

    document.getElementById("nombre").readOnly
    document.getElementById("input").value = ""
  });



//------------- products socket client --------------

socket.on("products_back", (data)=>{
    console.log(data);
    renderProducts(data);
});

const renderProducts = (data)=>{
    let html = data.map( (element)=>{
        return `
        <tr>
            <th scope="row" class="align-middle fs-4">${element.id}</th>
            <td class="text-center align-middle fs-4">${element.title}</td>
            <td class="text-center align-middle fs-4">${element.price}</td>
            <td class="text-center align-middle fs-4">
              <img src="${element.thumbnail}" alt="" style="width: 100px" />
            </td>
        </tr>
        `
    }).join(" ")

    document.getElementById("table").innerHTML = html;
};

document.getElementById("enviarProductos").addEventListener("click", function(event){
    event.preventDefault()

    
    let objetoProducto = {
        
        title : document.getElementById("title").value,
        price : document.getElementById("price").value,
        thumbnail: document.getElementById("thumbnail").value

    }    
    socket.emit("products_client", objetoProducto)
    
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("thumbnail").value = "";
  });

