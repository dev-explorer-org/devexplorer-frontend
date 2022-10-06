import Image from 'next/image';
import fs from 'fs';
import Link from 'next/link';
import Challenge from '../components/Challenge';

import styles from '../styles/User.module.css';

export async function getStaticPaths() {
  function listFiles() {
    return fs.readdirSync('users');
  }

  const files = listFiles();
  const paths = files.map((file) => ({
    params: { user: file.split('.')[0] },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { user } = context.params;
  const userInfo = await import(`../users/${user}`);

  return {
    props: { user: userInfo.data },
  };
}

export default function User({ user }) {
  return (
    <div className={styles.card}>
      <Link href="/">Home</Link>
      <div className={styles.user_info}>
        <Image
          className={styles.card_image}
          src={`${user.github}.png`}
          width={150}
          height={150}
          alt={user.name}
        />
        <h4>{`turma ${user.turma}`}</h4>
        <h2>{user.name}</h2>
        <p>{`${user.city} - ${user.state}`}</p>
      </div>

      <div className={styles.links}>
        {user.email && (
          <div className={styles.link}>
            <svg
              className={styles.icons}
              viewBox="0 0 32 28"
              fill="currentColor"
              stroke="none"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M29.428 0H2.572C1.152 0 0 0.133 0 1.3755V25.7495C0 26.992 1.152 28 2.572 28H29.428C30.848 28 32 26.992 32 25.7495V1.3755C32 0.133 30.848 0 29.428 0ZM29.428 25.76C11.516 25.7565 2.56 25.753 2.56 25.7495C2.564 10.0765 2.568 1.365 2.572 1.365C20.484 1.3685 29.44 1.372 29.44 1.3755C29.436 17.0485 29.432 25.76 29.428 25.76Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 0.4375C1.56066 0.437494 1.4234 0.4375 2.03009 0.4375L30.0301 0.372734C30.6368 0.372734 30.7979 0.437058 31.0301 0.927506C31.2623 1.41795 31.4591 1.81213 31.0301 2.18751L17.0907 14.4906C16.505 15.0031 15.5552 15.0031 14.9694 14.4906L0.469428 1.80308C0.0404306 1.42771 1.53057 0.939766 1 0.4375ZM5.15141 2.18751L16.0301 11.7064L26.9088 2.18751H5.15141Z"
              />
            </svg>
            <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer">
              {user.email}
            </a>
          </div>
        )}

        {user.github && (
          <div className={styles.link}>
            <VscGithub className={styles.icons} />
            <a href={user.github} target="_blank" rel="noopener noreferrer">
              {user.github}
            </a>
          </div>
        )}

        {user.linkedin_url && (
          <div className={styles.link}>
            <svg
              className={styles.icons}
              viewBox="0 0 32 32"
              fill="currentColor"
              stroke="none"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M29.428 0H2.572C1.152 0 0 1.152 0 2.572V29.428C0 30.848 1.152 32 2.572 32H29.428C30.848 32 32 30.848 32 29.428V2.572C32 1.152 30.848 0 29.428 0V0ZM29.428 29.44C11.516 29.436 2.56 29.432 2.56 29.428C2.564 11.516 2.568 2.56 2.572 2.56C20.484 2.564 29.44 2.568 29.44 2.572C29.436 20.484 29.432 29.44 29.428 29.44ZM4.744 11.996H9.492V27.268H4.744V11.996ZM7.12 9.908C8.636 9.908 9.872 8.676 9.872 7.156C9.872 6.7946 9.80082 6.43674 9.66252 6.10286C9.52422 5.76897 9.3215 5.46559 9.06596 5.21004C8.81041 4.9545 8.50703 4.75178 8.17314 4.61348C7.83926 4.47518 7.4814 4.404 7.12 4.404C6.7586 4.404 6.40074 4.47518 6.06686 4.61348C5.73297 4.75178 5.42959 4.9545 5.17404 5.21004C4.9185 5.46559 4.71578 5.76897 4.57748 6.10286C4.43918 6.43674 4.368 6.7946 4.368 7.156C4.364 8.676 5.596 9.908 7.12 9.908ZM17.212 19.712C17.212 17.72 17.592 15.792 20.06 15.792C22.492 15.792 22.528 18.068 22.528 19.84V27.268H27.272V18.892C27.272 14.78 26.384 11.616 21.58 11.616C19.272 11.616 17.724 12.884 17.088 14.084H17.024V11.996H12.468V27.268H17.212V19.712Z" />
            </svg>
            <a href={user.linkedin_url} target="_blank" rel="noopener noreferrer">
              {user.linkedin_url}
            </a>
          </div>
        )}

        {user.rocketseat_profile && (
          <div className={styles.link}>
            <svg
              className={styles.icons}
              viewBox="0 0 32 32"
              fill="currentColor"
              stroke="none"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M29.428 0H2.572C1.152 0 0 1.152 0 2.572V29.428C0 30.848 1.152 32 2.572 32H29.428C30.848 32 32 30.848 32 29.428V2.572C32 1.152 30.848 0 29.428 0ZM29.428 29.44C11.516 29.436 2.56 29.432 2.56 29.428C2.564 11.516 2.568 2.56 2.572 2.56C20.484 2.564 29.44 2.568 29.44 2.572C29.436 20.484 29.432 29.44 29.428 29.44Z" />
              <path d="M22.803 8.20296C22.9173 8.91873 21.4919 9.36025 22.0541 10.0272C22.7741 10.3224 22.9629 11.0624 22.3583 11.6003C21.3072 13.2072 19.9553 14.5947 18.944 16.2269C18.2675 16.57 17.7176 15.5493 16.9861 15.5851C15.9182 15.3738 14.8451 15.7193 13.8823 16.1506C12.8211 16.1657 11.8488 15.5983 10.9806 15.0396C10.4077 14.7331 9.46572 13.7529 10.3895 13.288C11.1048 13.3881 11.4042 12.8522 11.525 12.2855C12.3095 12.1577 12.974 12.8503 13.6587 13.1485C14.2221 13.5584 15.0201 13.4683 15.4274 12.884C16.3112 11.969 16.7924 10.6934 17.8581 9.95693C18.3883 9.62735 19.4996 9.94559 19.434 9.01979C19.7898 8.01168 21.0514 7.55957 22.0203 7.9229C22.2861 7.99735 22.5665 8.05442 22.803 8.20296ZM15.1946 17.9848C16.0277 18.6759 14.5556 18.3465 14.2142 18.7022C13.406 19.125 12.8133 19.8946 12.5478 20.76C11.7303 22.1694 10.3759 23.1251 9.19045 24.2015C9.49799 22.5439 9.75397 20.7905 10.7806 19.4014C11.4141 19.1803 11.6878 18.6434 11.569 17.9537C11.546 17.1875 11.4923 16.4225 11.4545 15.6568C12.7203 16.4 14.0436 17.066 15.1946 17.9848Z" />
            </svg>

            <a href={user.rocketseat_profile} target="_blank" rel="noopener noreferrer">
              {user.rocketseat_profile}
            </a>
          </div>
        )}
      </div>

      <div className={styles.challenges}>
        <h3>Desafios</h3>
        <details>
          <summary>Stage 02</summary>
          <Challenge
            stage={user.stage02}
            challengeName="fase01_corrigindo_bugs01"
            title="Corrigindo Bugs (01)"
          />
          <Challenge
            stage={user.stage02}
            challengeName="fase02_corrigindo_bugs02"
            title="Corrigindo Bugs (02)"
          />

          <Challenge
            stage={user.stage02}
            challengeName="fase02_semantica_acessibilidade"
            title="Semântica e Acessibilidade"
          />

          <Challenge
            stage={user.stage02}
            challengeName="fase02_recriando_layout"
            title="Recriando Layout"
          />
        </details>

        <details>
          <summary>Stage 03</summary>
          <Challenge
            stage={user.stage03}
            challengeName="criando_formularios"
            title="Criando Formulários"
          />

          <Challenge stage={user.stage03} challengeName="mobile_first" title="Mobile First" />

          <Challenge
            stage={user.stage03}
            challengeName="grid_com_animacoes"
            title="Grid com Animações"
          />
        </details>

        <details>
          <summary>Stage 04</summary>
          <Challenge stage={user.stage04} challengeName="exercicio01" title="Exercício 01" />

          <Challenge stage={user.stage04} challengeName="exercicio02" title="Exercício 02" />
        </details>

        <details>
          <summary>Stage 05</summary>
          <Challenge stage={user.stage05} challengeName="focustimer" title="FocusTimer" />

          <Challenge
            stage={user.stage05}
            challengeName="focustimer_dark_mode"
            title="FocusTimer Dark Mode"
          />
        </details>

        <details>
          <summary>Stage 06</summary>
          <Challenge stage={user.stage06} challengeName="spa_universe" title="SPA Universe" />

          <Challenge stage={user.stage06} challengeName="gitfav" title="GitFav" />
        </details>

        <details>
          <summary>Stage 07</summary>
          <Challenge stage={user.stage07} challengeName="git_push" title="Git Push" />
        </details>

        <details>
          <summary>Stages 08 09 10 11</summary>
          <Challenge
            stage={user.stages_08_09_10_11}
            challengeName="rocket_movies"
            title="Rocker Movies"
          />
        </details>

        <details>
          <summary>Desafio Final</summary>
          <Challenge
            stage={user.desafio_final}
            challengeName="food_explorer"
            title="Food Explorer"
          />
        </details>
      </div>
    </div>
  );
}
