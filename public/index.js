const socket = io();

socket.on("message_back", (data)=>{
    console.log(data);
    render(data);
});

const render = (data)=>{
    let html = data.map( (element)=>{
        return `
        <p class="text-light"> <strong> ${element.nombre} : </strong> ${element.msn} </p>
        `
    }).join(" ")

    document.getElementById("messages").innerHTML = html;
};
document.getElementById("enviar").addEventListener("click", function(event){
    event.preventDefault()
    let objetoMensaje = {
        
        nombre : document.getElementById("nombre").value,
        msn : document.getElementById("input").value

    }

    socket.emit("data_client", objetoMensaje)

    document.getElementById("nombre").readOnly
    document.getElementById("input").value = ""
  });
const addMsn = () =>{
    
    
    let objetoMensaje = {
        
        nombre : document.getElementById("nombre").value,
        msn : document.getElementById("input").value

    }

    socket.emit("data_client", objetoMensaje)

    document.getElementById("nombre").readOnly
    document.getElementById("msn").value = ""

    return false
}