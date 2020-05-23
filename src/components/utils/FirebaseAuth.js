  import firebase from "../../Firebase"

  // some functions 
  export async function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    return 1   
  }
  
  export function signOut() {
    // Sign out of Firebase.
    firebase.auth().signOut();
  }
  
  function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);    
  }
  
  // Returns the signed-in user's profile pic URL.
  export function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL || "../../images/profileThumb.png";
  }
  
  // Returns the signed-in user's display name.
  export function getUserName() {
    return firebase.auth().currentUser.displayName || "placeholder_name";
  }

  export function getUserEmail(){
    return firebase.auth().currentUser.email || "email to be soon"
  }
  
  export function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  // Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return url + '?sz=150';
  }
  return url;
}

  // Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  if (user) { // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    // var userName = getUserName();

    // Set the user's profile pic and name.
    addSizeToGoogleProfilePic(profilePicUrl);
    
       

    // // Show user's profile and sign-out button.
    // userNameElement.removeAttribute('hidden');
    // userPicElement.removeAttribute('hidden');
    // signOutButtonElement.removeAttribute('hidden');

    // // Hide sign-in button.
    // signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications.
    // saveMessagingDeviceToken();
    return user
  }
}


// // Checks that the Firebase SDK has been correctly setup and configured.
// function checkSetup() {
//   if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
//     window.alert('You have not configured and imported the Firebase SDK. ' +
//         'Make sure you go through the codelab setup instructions and make ' +
//         'sure you are running the codelab using `firebase serve`');
//   }
// }

// // Checks that Firebase has been imported.
// checkSetup();


initFirebaseAuth();