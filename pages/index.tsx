import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>λ沢.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
