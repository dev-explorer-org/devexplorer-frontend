// import Head from 'next/head';
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import styles from "./page.module.css";
import Flag from "./components/Flag";
// import Level from "./components/Level";
// import styles from '../styles/Home.module.css';

function formatUserTitle(name) {
  const arrayNames = name.split(" ");
  if (arrayNames.length > 1 && arrayNames[1].length <= 2) {
    return name.split(" ").slice(0, 3).join(" ");
  }
  return name.split(" ").slice(0, 2).join(" ");
}

function listFiles() {
  const files = fs.readdirSync("app/users");
  return files;
}

const users = listFiles();

const data = await Promise.all(
  users.map(async (item) => {
    const user = await import(`./users/${item}`);
    const filename = item.split(".")[0];
    user.data.filename = filename;
    return user.data;
  }),
);

// console.log(data)

export default function Home() {
  return (
    <div className={styles.page}>
      {/* <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head> */}
      <h1 className={styles.title}>Welcome to DevExplorer ✌</h1>
      <p className={styles.subtitle}>
        Junte-se a mais de 🚀 <span>100.000</span> estudantes e profissionais cadastrados em nossa
        plataforma.{" "}
      </p>

      <div className={styles.cards}>
        {data.map((user, index) => (
          <Link key={index} href={`/${user.filename}`}>
            <div className={styles.card}>
              {/* <Level user={user} /> */}
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
