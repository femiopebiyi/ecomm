console.log("im in from source")

import {initializeApp} from "firebase/app"
import{
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, SignOut,
    onAuthStateChanged, sendEmailVerification
} from "firebase/auth";
    
import {
    getFirestore, onSnapshot, addDoc, serverTimestamp,
    collection
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBWI9QBD-sdKXMxNkA-hXqei5gBFdXyNYk",
    authDomain: "femi-store.firebaseapp.com",
    projectId: "femi-store",
    storageBucket: "femi-store.appspot.com",
    messagingSenderId: "780697984323",
    appId: "1:780697984323:web:5ee28d310d76d2c72863f6"
};

const firstName = document.querySelector("#firstname")
const lastName = document.querySelector("#lastname")
const passworddis = document.querySelector("#password")
const emaildis = document.querySelector("#email")
const firstNameCon = document.querySelector(".first-name-container")
const lastNameCon = document.querySelector(".last-name-container")
const signInUp = document.querySelector(".submit")
const dontHave = document.querySelector(".dont")
const question = document.querySelector(".signupquestion a")
const errorMsg = document.querySelector(".error-message")

//initialize firebase

initializeApp(firebaseConfig)

// initialize services

const auth = getAuth()
const database  = getFirestore()

const colRef = collection(database, "userDetails")

onSnapshot(colRef, (snapshot)=>{
    let details =[]
    snapshot.docs.forEach(doc=>{
        details.push({...doc.data(), id: doc.id})
    })

    console.log(details)
})

const signUp = async ()=>{
    errorMsg.innerHTML = `signing up!!!!`
    const firstname = firstName.value;
    const lastname = lastName.value
    const password = passworddis.value
    const email = emaildis.value

    addDoc(colRef, {
        first_name: firstname,
        last_name: lastname,
        email: email,
        createdAt : serverTimestamp()
    }).then(()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((data)=>{
            console.log(data.user)
            sendEmailVerification(data.user)
        }).then(()=>{
            console.log('verification sent')
            errorMsg.innerHTML = `check '${email}' for verification!`
        })
    })

    
}

const monitor = async ()=>{
    try{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                console.log("user is logged in")
                console.log(user)
                firstNameCon.style.display = 'none'
                lastNameCon.style.display = 'none'
                signInUp.innerHTML = "Login"
                dontHave.innerHTML = "Dont have an account? "
                question.innerHTML = "SignUp"


            } else{
                console.log('user is not logged in')
                firstNameCon.style.display = 'flex'
                lastNameCon.style.display = 'flex'
                signInUp.innerHTML = "signUp"
                dontHave.innerHTML = "Have an account?"
                question.innerHTML = "Login"
            }
        })
    } catch(err){
        console.log(err.message)
    }
}

monitor()

signInUp.addEventListener("click", function(){
    if (this.innerHTML == "signUp"){
        signUp()
    } else{
        signIn()
    }
})


question.addEventListener("click", (e)=>{
    e.preventDefault()

    if(signInUp.innerHTML == "signUp"){
        firstNameCon.style.display = 'none'
        lastNameCon.style.display = 'none'
        signInUp.innerHTML = "Login"
                dontHave.innerHTML = "Dont have an account? "
                question.innerHTML = "SignUp"
    } else{
        firstNameCon.style.display = 'flex'
        lastNameCon.style.display = 'flex'
        signInUp.innerHTML = "signUp"
        dontHave.innerHTML = "Have an account? "
        question.innerHTML = "Login"
    }
})

const signIn = async ()=>{
    try{
        const firstname = firstName.value;
        const lastname = lastName.value
        const password = passworddis.value
        const email = emaildis.value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCred)=>{
                const user = userCred.user;
                if(user.emailVerified){
                    console.log("you are verified")
                    window.location.href = `../index.html?email=${email}`
                } else{
                    console.log("your email is not verified")
                    errorMsg.innerHTML = "your email is not verified"
                }
            }).catch((err)=>{
                if(err.message == "Firebase: Error (auth/invalid-credential)."){
                    errorMsg.innerHTML = "Invalid username or password!!!"
                }
                
            })
    }
    catch(err){
        console.log(err.message)
    }
}


// const signIn = async ()=>{
//     try{
//         const emailValue = email.value
//     const passwordValue = password.value
//     const fullnameValue = fullname.value

//     signInWithEmailAndPassword(auth, emailValue, passwordValue)
//         .then((userCred)=>{
//             const user = userCred.user
//             if(user.emailVerified){
//                 window.location.href = `../home.html?email=${emailValue}`
//             } else{
//                 console.log('kindly verify your mail')
//             }
            
//         })
    
//   } 
//   catch(err){
//     if(err.message == 'Firebase: Error (auth/invalid-credential).'){
//         const error = document.querySelector("form p")
//         error.innerHTML = "Invalid Email or Password"
//     }
//     console.log('i am', err.message)
//   }
// }   

// const signUp = async ()=>{
//     try{
//         const emailValue = email.value
//     const passwordValue = password.value
//     const fullnameValue = fullname.value

    

//     addDoc(colRef, {
//         fullname: fullnameValue,
//         email: emailValue,
//         createdAt: serverTimestamp()
//     })

//     createUserWithEmailAndPassword(auth, emailValue, passwordValue)
//         .then((cred)=>{
//             console.log("signed up")
//             sendEmailVerification(cred.user)
//             // window.location.href = `../home.html?email=${fullnameValue}`
//         }).then(()=>{
//             console.log("email verification sent")
//         })
    

    
//     }
//     catch(err){
//         console.log(err.message)
//     }

// }

// const submitBtn = document.querySelector("button")

// submitBtn.addEventListener("click", ()=>{
//     if(submitBtn.innerHTML === "SignUp"){
//         signUp()
//         console.log("yes")
//     } else if(submitBtn.innerHTML == "Login"){
        
//         signIn()
//     }
    
// })




// const signUpLink = document.querySelector(".link")
// const fullnameLabel = document.querySelector(".fullname")
// const fullnameInput = document.querySelector("#fullname")
// const signupmsg = document.querySelector(".signupmsg")

// signUpLink.addEventListener("click", (e)=>{
//     e.preventDefault()

//     if(submitBtn.innerHTML === "SignUp"){
//         fullnameLabel.style.display = "none"
//         fullnameInput.style.display = "none"
//         submitBtn.innerHTML = "Login"
//     } else{
//         fullnameLabel.style.display = "block"
//         fullnameInput.style.display = "block"
//         submitBtn.innerHTML = "SignUp"
//     }

// })




// const monitorAuth = async ()=> onAuthStateChanged(auth, user =>{
//     if(user){
        
//         console.log("im in")
//         fullnameLabel.style.display = "none"
//         fullnameInput.style.display = "none"
//         submitBtn.innerHTML = "Login"
//         signupmsg.innerHTML = "Dont have an account?"
//         signUpLink.innerHTML = 'SignUp'
//     } else{
//         console.log("im not in")
//         fullnameLabel.style.display = "block"
//         fullnameInput.style.display = "block"
//         submitBtn.innerHTML = "SignUp"
//         signupmsg.innerHTML = "Have an account?"
//         signUpLink.innerHTML = 'Login'
//     }
// })

// monitorAuth()
