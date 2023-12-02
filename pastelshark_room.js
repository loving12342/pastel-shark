const firebaseConfig = {
    apiKey: "AIzaSyD7L5Li4jdalbSX5EzMyOeKoeaUivfJRe0",
    authDomain: "pastel-shark.firebaseapp.com",
    databaseURL: "https://pastel-shark-default-rtdb.firebaseio.com/",
    projectId: "pastel-shark",
    storageBucket: "pastel-shark.appspot.com",
    messagingSenderId: "1088980218453",
    appId: "1:1088980218453:web:fec1a45de9eacf434ddadc"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "bem-vindo(a) " + user_name + "!";

function addRoom() {

    room_name = document.getElementById("room_name").value;

    firebase.database().ref("/").child(room_name).update({
        purpose: "adicionar sala"
    });

    localStorage.setItem("room_name", room_name);

    window.location = "pastelshark_page.html";
}

function getData() {

    // trecho importado do Firebase
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            // para mostrar no console o valor do Room_names 
            console.log("Room Name - " + Room_names);

            // cria uma variável chamada row, e dentro dela temos
            // uma div com classe room_name, pois fornecemos propriedades CSS
            // id, porque é importante uma identificação
            //+Room_names+ => terá o nome da sala vindo do firebase
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
            // vinculamos a função ao evento de clique
            // criamos a função redirectToRoomName
            // this.id -significa, sempre que a função redirectToRoomName for chamada,passará o valor da id atual do elemento dentro da função redirectToRoomName. E,a id apropriada é antes ajustada para id="+roomNames+".

            document.getElementById("output").innerHTML += row;

        });
    });

}

getData();

function redirectToRoomName(name){
    localStorage.setItem("room_name",name);
    window.location="pastelshark_page.html";
}

function logout(){
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location="index.html";
}