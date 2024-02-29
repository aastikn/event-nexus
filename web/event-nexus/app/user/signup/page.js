'use client';
import {useState} from "react";

import styles from './page.module.css';
import Image from "next/image";
import {Outfit} from "next/font/google"
import { useRouter } from 'next/navigation'

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword  } from "firebase/auth";
import firebaseConfig from "@/firebaseConfig";
const provider = new GoogleAuthProvider();

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "700"],
});

export default function SignUpUser(){
    const router = useRouter();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();

    const [error, setError] = useState("");

    const handleError = (error) => {
        setError(error);
    }

    const handeLoginClick= () =>{
        router.push('/user/login')
    }

    const handleSubmit = (e) => {
        console.log('Form Submitted');
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const confirmPassword = e.target[2].value;
        if(password !== confirmPassword){
            handleError("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(` ${errorCode} : ${errorMessage} `);
            });

        console.log(email, password, confirmPassword);
    }

    const handleGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(` ${errorCode} : ${errorMessage} `);
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

        console.log('Google Sign Up')
    }

    return <>
        <main className={styles.main}>
            <section className={styles.leftGraphic}>
                <Image src='/signup-graphic.svg'
                       alt="signup-graphic"
                       width={400}
                       height={400}
                       loading="eager"
                       quality={100}
                />
            </section>
            <section className={styles.rightForm}>
                <div className={`${styles.activeMode} ${outfit.className}`}>

                    <label onClick={handeLoginClick}>
                        LOGIN
                    </label>
                    <label>
                        SIGNUP
                    </label>
                </div>
                <h1 className={`${styles.heading} ${outfit.className}`}>
                    Get Started!
                </h1>
                <form className={`${styles.signupForm} ${outfit.className}`} onSubmit={handleSubmit}>
                    <input type="email" placeholder="Enter Email" required className={outfit.className}/>
                    <input type="password" placeholder="Password" required className={outfit.className}/>
                    <input type="password" placeholder="Confirm Password" className={outfit.className}/>
                    <button type="submit" className={`${styles.signupButton} ${outfit.className}`}>
                        Sign Up
                    </button>
                    <hr className={styles.divider}/>
                    <button type="button" className={styles.googleButton} onClick={handleGoogle}>
                        <Image src='/google-logo.svg' alt="google-icon" width={20} height={20} loading="lazy"
                               quality={100} className={styles.googleImage}/>
                        <h1 className={outfit.className}>Sign Up with Google</h1>
                    </button>
                </form>
            </section>
        </main>
        <section className={`${styles.errorBox} ${outfit.className}`} style={{display:"none"}}>
            <h1 className={styles.errorHeading}>
                Error
            </h1>
            <p className={styles.errorText}>
                {error}
            </p>
        </section>
    </>
}