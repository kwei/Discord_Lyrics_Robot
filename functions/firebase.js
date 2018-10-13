function setData_to_Firebase(firebase, table, nowTime){

  const db = firebase.database().ref().child(table.userName + nowTime);
  const dbRef = db.child(table.testId);
  dbRef.set({
    left_imgType: table.picLeft,
    right_imgType: table.picRight,
    chosen: table.chosen
  });
  return "successful";
}
export {setData_to_Firebase}

// function getData_from_Firebase(){
//
// }
// export {getData_from_Firebase}

var TOKEN = "";

// make sure to allow messaging block in your browser
function Permission_FCM(firebase){

  const messaging = firebase.messaging();
  messaging.requestPermission()
  .then(() => {
    console.log("Have permission!");
    return messaging.getToken();
  })
  .then((token) => {
    console.log(token);
    firebase.database().ref('/tokens').push({
      token: token
    });
    TOKEN = token;
  })
  .catch((error) => {
    console.log("Error occured!");
    console.log(error);
  });
}
export {Permission_FCM}


function SingIn(firebase){
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  console.log("Login!");
}
export {SingIn}

function SingOut(firebase){
  firebase.auth().signOut();
  console.log("Logout!");
}
export {SingOut}

// function setNotification(firebase){
//   const notificationMessage = "這是我們為您推薦的商品";
//
//   firebase.database().ref('/notifications').push({
//     token: TOKEN,
//     icons: "https://github.com/kwei/NodeServer/blob/master/%E9%80%9A%E7%9F%A5%E5%9C%96%E7%A4%BA.png",
//     title: "您有來自顧客分析系統的通知",
//     message: notificationMessage,
//   }).then(() => {
//     console.log("set notification!");
//   });
// }
// export {setNotification}
