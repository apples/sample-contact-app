import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    useEffect(() => {
        Router.push('/login');
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Sample Contact App</title>
                <meta name="description" content="Sample Contact App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Sample Contact App!
                </h1>

                <div className={styles.card}>
                    Loading...
                </div>
            </main>
        </div>
    );
}
