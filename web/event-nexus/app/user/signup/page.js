'use client';

import styles from './page.module.css';
import { auth } from "@/firebase";
import {useState} from "react";
import {createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";


export default function SignUpUser(){

    return <main className={styles.main}>
        <section className={styles.leftGraphic}>
            <Image src='/signup-graphic.svg'
                   alt="signup-graphic"
                   width={100}
                   height={100}
                   loading="eager"
                   quality={100}
            />

        </section>
        <section className={styles.rightForm}>
hi
        </section>
    </main>
}