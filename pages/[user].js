import Image from 'next/image';
import fs from 'fs';
import Link from 'next/link';
import styles from '../styles/User.module.css';
import Challenge from '../components/Challenge';

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
            <p>Email</p>
            <a
              href={`mailto:${user.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.email}
            </a>
          </div>
        )}

        {user.github && (
          <div className={styles.link}>
            <p>Github</p>
            <a href={user.github} target="_blank" rel="noopener noreferrer">
              {user.github}
            </a>
          </div>
        )}

        {user.linkedin_url && (
          <div className={styles.link}>
            <p>Linkedin</p>
            <a
              href={user.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.linkedin_url}
            </a>
          </div>
        )}

        {user.rocketseat_profile && (
          <div className={styles.link}>
            <p>Rocketseat</p>
            <a
              href={user.rocketseat_profile}
              target="_blank"
              rel="noopener noreferrer"
            >
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
          <Challenge
            stage={user.stage03}
            challengeName="mobile_first"
            title="Mobile First"
          />

          <Challenge
            stage={user.stage03}
            challengeName="grid_com_animacoes"
            title="Grid com Animações"
          />
        </details>

        <details>
          <summary>Stage 04</summary>
          <Challenge
            stage={user.stage04}
            challengeName="exercicio01"
            title="Exercício 01"
          />

          <Challenge
            stage={user.stage04}
            challengeName="exercicio02"
            title="Exercício 02"
          />
        </details>

        <details>
          <summary>Stage 05</summary>
          <Challenge
            stage={user.stage05}
            challengeName="focustimer"
            title="FocusTimer"
          />

          <Challenge
            stage={user.stage05}
            challengeName="focustimer_dark_mode"
            title="FocusTimer Dark Mode"
          />
        </details>

        <details>
          <summary>Stage 06</summary>
          <Challenge
            stage={user.stage06}
            challengeName="spa_universe"
            title="SPA Universe"
          />

          <Challenge
            stage={user.stage06}
            challengeName="gitfav"
            title="GitFav"
          />
        </details>

        <details>
          <summary>Stage 07</summary>
          <Challenge
            stage={user.stage07}
            challengeName="git_push"
            title="Git Push"
          />
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
