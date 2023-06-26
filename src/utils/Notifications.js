//Function to check if notification and push service is available or not .
const isNotificationServiceAvailable = () => {
  if (
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  ) {
    return true;
  } else {
    return false;
  }
};

//Function to convert Base64 url to Uint8Array
const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

//Function where public key is already defined and return application server key.
function getPublicKeyAndReturnURL() {
  const publicKey =
    "BEyjBD8bR-ZsO9F0vFyoBKfgKNg1SdX8fr_rfVhmhwXZYzc-B9KJepeyICjLdPkk9EUCRBLvHawNve3OZ1MWFhw";
  const applicationServerKey = urlB64ToUint8Array(publicKey);
  return applicationServerKey;
}

//Function to unsubscribe user from push notifications . Also sends a req to server to delete the endpoint.
export async function unSubscribeNotifications() {
  let reg = null;
  let endpoint = null;
  try {
    const applicationServerKey = getPublicKeyAndReturnURL();
    reg = await navigator.serviceWorker.ready;
    const options = { applicationServerKey, userVisibleOnly: true };
    endpoint = await reg.pushManager.subscribe(options);
  } catch (error) {
    return true;
  }
  try {
    const resp = await fetch(
      "https://weatherapp-api1251.herokuapp.com/send/deleteendpoint",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endpoint),
      }
    );

    const respjson = await resp.json();
    if (respjson.msg === "OK" && resp.status === 200) {
      try {
        const subscription = await reg.pushManager.getSubscription();
        await subscription.unsubscribe();
        return false;
      } catch (error) {
        return true;
      }
    } else {
      return true;
    }
  } catch (error) {
    return true;
  }
}

//Function to send notifications... generate endpoint and takes location as parameter to send a stringified json object to the server and register the push endpoint in the database.
export async function sendNotif(userLocation) {
  let endpoint = null;
  let body = null;


 
  if (isNotificationServiceAvailable()) {
    try {
      if (window.localStorage.getItem("notif") === "denied") {
        return false;
      } else {

        const reg = await navigator.serviceWorker.ready;
       
        const applicationServerKey = getPublicKeyAndReturnURL();
        const options = { applicationServerKey, userVisibleOnly: true };
        try {
          endpoint = await reg.pushManager.subscribe(options);
        } catch (error) {
          return false;
        }
        body = { location: userLocation, endpoint: endpoint };
        const resp = await fetch(
          "https://weatherapp-api1251.herokuapp.com/send/endpoint",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        const respj = await resp.json();
        if (respj.msg === "sent" || respj.msg === "Endpoint exists") {
          return true;
        } else {
          const isunSubscribed = await unSubscribeNotifications();
          return isunSubscribed;
        }
      }
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}
