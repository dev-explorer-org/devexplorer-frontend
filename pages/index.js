import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Flag from '../components/Flag'
import fs from 'fs'

export async function getStaticProps() {
  const users = listFiles()

  const data = await Promise.all(users.map(async (item) => {
    const user = await import(`../users/${item}`)
    return user.data
  }))
  
  function listFiles() {
    const files = fs.readdirSync("users")
    return files
  }

  return {
    props: { data }
  }
}

export default function Home({data}) {
  return (
    <div className={styles.page}>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <h1 className={styles.title}>🚀 <span>DEV</span>EXPLORER </h1>
      <div className={styles.cards}>
        {data.map((user, index) => (
          <Link key={index} href={`/${user.github.split("/")[3]}`}>
              <div className={styles.card}>
                <div className={styles.card_image_container} data-turma={user.turma} >
                  <Image 
                    className={styles.card_image}
                    src={`${user.github}.png`} 
                    width={80} 
                    height={80} 
                    alt={user.name} 
                  />
                  <Flag className={styles.flag} state={user.state} />
                </div>
                <h2>{user.name}</h2>
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
