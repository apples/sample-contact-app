import Head from 'next/head';
import styles from '../styles/layout.module.scss';
import { FormEvent, useState } from 'react';
import { useUser } from '../lib/useUser';
import { fetchApi } from '../lib/api';

export default function Login() {
    const { mutateUser } = useUser({
        redirectTo: '/dashboard',
        redirectIfFound: true,
    });

    const [errorMsg, setErrorMsg] = useState(null as string | null);

    const [formDisabled, setFormDisabled] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };

        try {
            setFormDisabled(true);

            const response = await fetchApi('/api/login', body);

            mutateUser(response);
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setErrorMsg(error.data.message);
            setFormDisabled(false);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Sample Contact App</title>
                <meta name="description" content="Sample Contact App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={`${styles.headerWelcome}`}>
                    <h1>
                        Welcome to Sample Contact App!
                    </h1>
                </div>

                <div className={styles.card}>
                    <form onSubmit={handleSubmit}>
                        <fieldset className={styles.loginFieldset} disabled={formDisabled}>
                            <div>
                                <label>Username: <input name='username' type='text'></input></label>
                            </div>
                            <div>
                                <label>Password: <input name='password' type='password'></input></label>
                            </div>
                            <div>
                                <button>Sign In</button>
                            </div>
                        </fieldset>
                    </form>
                </div>

                {errorMsg && (
                    <div className={styles.card}>
                        ERROR: {errorMsg}
                    </div>
                )}
            </main>
        </div>
    )
}
