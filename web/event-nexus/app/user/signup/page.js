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
    const [errorVisibility, setErrorVisibility] = useState("none");

    const handleError = (error) => {
        // Inside your handleError function
        setErrorVisibility("block"); // or set it to "flex", "grid", etc., based on your design
        setError(error);
        setTimeout(() => {
            setErrorVisibility("none");
        }, 5000);
    }

    const handeLoginClick= () =>{
        router.push('/user/login')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const confirmPassword = e.target[2].value;

        if (password !== confirmPassword) {
            handleError("Passwords do not match");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Signed up
            const user = userCredential.user;

            e.target[0].value = "";
            e.target[1].value = "";
            e.target[2].value = "";
            // Redirect or perform other actions as needed
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === "auth/email-already-in-use") {
                handleError("Email is already in use. Please choose a different email.");
            } else {
                handleError(`${errorCode}: ${errorMessage}`);
            }
        }
    }

    const handleGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // Redirect or perform other actions as needed
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            handleError(`${errorCode}: ${errorMessage}`);
        }
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
        <section className={`${styles.errorBox} ${outfit.className}`} style={{display:`${errorVisibility}`}}>
            <h1 className={styles.errorHeading}>
                Error
            </h1>
            <p className={styles.errorText}>
                {error}
            </p>
        </section>
    </>
}