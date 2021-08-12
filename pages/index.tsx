import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sample Contact App</title>
        <meta name="description" content="Sample Contact App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        hi
      </main>
    </div>
  )
}
