import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ipersona } from './../../interfaces/ipersona';
import { doc, docData, getDoc, setDoc, updateDoc, DocumentReference } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Observable, finalize, from, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-chelib',
  templateUrl: './chelib.component.html',
  styleUrls: ['./chelib.component.css']
})

export class chelibComponent implements OnInit {
  todos$!: Observable<Ipersona[]>;
  // db = getFirestore(app);
  ref!: DocumentReference<Document>;
  email:string = "hernancanestraro@gmail.com";
  password:string = "12121212";

  // public readonly persistenceEnabled$: Observable<boolean>;
  // public readonly testDocValue$: Observable<any>;

  constructor(firestore: AngularFirestore, auth: Auth) {
    const doc = firestore.doc('persona');
    // this.testDocValue$ = firestore.doc('test/1').valueChanges().pipe(trace('firestore'), );
    // this.persistenceEnabled$ = firestore.persistenceEnabled$;
  }

  ngOnInit(): void {
    // this.todos$ = this.todoService.get();
    function chesignInWithEmailPassword() {
      var email = "hernancanestraro@gmail.com";
      var password = "12121212";
      // [START auth_signin_password]
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      // [END auth_signin_password]
    }
    
    function signUpWithEmailPassword() {
      var email = "hernancanestraro@gmail.com";
      var password = "12121212";
      // [START auth_signup_password]
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
      // [END auth_signup_password]
    }

    function makeEmailCredential( email: string, password: string) {
      // [START auth_make_email_credential]
      var credential = firebase.auth.EmailAuthProvider.credential(email, password);
      // [END auth_make_email_credential]
    }
    makeEmailCredential(this.email, this.password);
    function signOut() {
      // [START auth_sign_out]
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      // [END auth_sign_out]
    }
     
    function authStateListener() {
      														// [START auth_state_listener]
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          													// User is signed in, see docs for a list of available properties
          													// https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
      // [END auth_state_listener]
    }
    
    function currentUser() {
      // [START auth_current_user]
      const user = firebase.auth().currentUser;
    
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
      } else {
        // No user is signed in.
      }
      // [END auth_current_user]
    }
    
    
    function observador() {
      // [START auth_state_listener]
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log("Existe usuario activo");
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          var uid = user.uid;
          console.log(uid);
          var displayName = user.displayName;
          console.log(displayName);
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          // User is signed out
          // ...
          console.log("No existe usuario activo");
        }
      });
      // [END auth_state_listener]
    }
    observador();
    
    function aparece() {
      var contenido = document.getElementById('contenido');
      contenido!.innerHTML = "Solo lo ve usuario activo";
    }  
  }
}
  /*   function registrar()
  {
      console.log("Diste un click");
      console.log("HELLO");
      var email = document.getElementById('email').value;
      var contraseña = document.getElementById('contraseña').value;
      console.log("Email: ",email);
      console.log("contraseña: ",contraseña);
      firebase.auth().createUserWithEmailAndPassword(email, contraseña).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("ERROR:",errorCode, errorMessage);
      });
  } */

/*   function ingreso()
  {
      console.log("Diste un click a ingreso");
      var email2 = document.getElementById('email2').value;
      var contraseña2 = document.getElementById('contraseña2').value;
      console.log("Email2: ",email2);
      console.log("contraseña2: ",contraseña2);
      firebase.auth().signInWithEmailAndPassword(email2, contraseña2).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
      })
  } */
  
  



/*    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  }); */
/*   gg() {
    const querySnapshot = await getDocs(collection("CHE","users"));
    const ref = getFirestore( "CHE");
    const cc = docData(this.ref);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }
 */
// delete (id: string): void {
  // this.todoService.delete(id);
// }





/* 
Welcome to Google Cloud Shell, a tool for managing resources hosted on Google Cloud Platform!
The machine comes pre-installed with the Google Cloud SDK and other popular developer tools.

Your 5GB home directory will persist across sessions, but the VM is ephemeral and will be reset
approximately 20 minutes after your session ends. No system-wide change will persist beyond that.

Type "gcloud help" to get help on using Cloud SDK. For more examples, visit
https://cloud.google.com/shell/docs/quickstart and https://cloud.google.com/shell/docs/examples

Type "cloudshell help" to get help on using the "cloudshell" utility.  Common functionality is
aliased to short commands in your shell, for example, you can type "dl <filename>" at Bash prompt to
download a file. Type "cloudshell aliases" to see these commands.

Type "help" to see this message any time. Type "builtin help" to see Bash interpreter help.

 */
