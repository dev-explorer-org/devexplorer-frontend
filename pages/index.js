import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import styles from '../styles/Home.module.css';
import Flag from '../components/Flag';

function formatUserTitle(name) {
  const arrayNames = name.split(' ');
  if (arrayNames[1].length <= 2) {
    return name.split(' ').slice(0, 3).join(' ');
  }
  return name.split(' ').slice(0, 2).join(' ');
}

export async function getStaticProps() {
  function listFiles() {
    const files = fs.readdirSync('users');
    return files;
  }

  const users = listFiles();

  const data = await Promise.all(
    users.map(async (item) => {
      const user = await import(`../users/${item}`);
      const filename = item.split('.')[0];
      user.data.filename = filename;
      return user.data;
    })
  );

  return {
    props: { data },
  };
}

export default function Home({ data }) {
  return (
    <div className={styles.page}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <h1 className={styles.title}>
        🚀 <span>DEV</span>
        EXPLORER{' '}
      </h1>
      <div className={styles.cards}>
        {data.map((user, index) => (
          <Link key={index} href={`/${user.filename}`}>
            <div className={styles.card}>
              <div className={styles.card_image_container} data-turma={user.turma}>
                <Image
                  className={styles.card_image}
                  src={`${user.github}.png`}
                  width={80}
                  height={80}
                  alt={user.name}
                />
                <Flag className={styles.flag} state={user.state} country={user.country} />
              </div>
              <h2>{formatUserTitle(user.name)}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
