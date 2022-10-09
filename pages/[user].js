import Image from 'next/image';
import fs from 'fs';
import Link from 'next/link';
import Challenge from '../components/Challenge';
import Stage from '../components/Stage';
import Level from '../components/Level';

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
        <Level user={user} />
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
              <path d="M20.9599 30.9985H20.8217C20.7724 31.0013 20.7231 30.9993 20.6745 30.9927H11.7557C11.7226 30.9949 11.6894 30.9949 11.6561 30.9927H11.7557C11.8264 30.9881 11.8963 30.9735 11.9631 30.9494C12.0611 30.914 12.1504 30.8587 12.2252 30.7871C12.2999 30.7156 12.3584 30.6294 12.3968 30.5343C12.4352 30.4391 12.4527 30.3371 12.4481 30.2348V27.6993C12.1925 27.7488 11.9384 27.791 11.6829 27.8317C11.4259 27.8608 11.1659 27.8753 10.9073 27.8753C10.1422 27.8943 9.38741 27.7182 8.71437 27.3648C8.07253 26.972 7.57629 26.3887 7.29697 25.6991C7.17662 25.4446 7.06222 25.2206 6.95376 25.0256C6.86016 24.8292 6.74427 24.6445 6.61055 24.4714C6.48129 24.2954 6.33123 24.1339 6.16483 23.9914C5.98505 23.8182 5.79487 23.6568 5.59727 23.5069L5.5527 23.4764C5.46058 23.4182 5.34618 23.3353 5.208 23.2276C5.14913 23.1874 5.09999 23.1351 5.06404 23.0743C5.0281 23.0134 5.00624 22.9456 5 22.8756C5.00042 22.8458 5.00889 22.8167 5.02454 22.7911C5.0402 22.7656 5.06249 22.7445 5.08914 22.7301C5.14777 22.6901 5.21316 22.6606 5.28229 22.6429C5.36095 22.6233 5.44182 22.6135 5.52298 22.6138C5.58241 22.6065 5.64184 22.6007 5.70127 22.5992C5.94729 22.5994 6.19061 22.6494 6.41592 22.7461C6.64492 22.8337 6.86081 22.9512 7.05776 23.0953C7.25758 23.2442 7.44263 23.4113 7.61046 23.5942C7.76955 23.7682 7.9146 23.954 8.0443 24.1499C8.33411 24.6164 8.71353 25.0235 9.16158 25.3486C9.62862 25.6542 10.1826 25.807 10.7439 25.785C11.3483 25.7819 11.9445 25.6478 12.4897 25.3922C12.5406 25.0204 12.6405 24.6566 12.7868 24.3099C12.9406 23.9594 13.1696 23.6453 13.4584 23.3891C12.4243 23.2931 11.408 23.0604 10.4378 22.6967C9.61919 22.3854 8.87631 21.9082 8.25973 21.2944C7.66394 20.6601 7.21525 19.9081 6.94633 19.0891C6.6381 18.0896 6.49171 17.049 6.51249 16.0052C6.50826 15.2721 6.64068 14.5445 6.90324 13.858C7.16699 13.1657 7.56676 12.5306 8.07995 11.9888C7.97001 11.7153 7.89126 11.4316 7.84223 11.1422C7.79172 10.8512 7.76646 10.5574 7.76646 10.2635C7.76795 9.88532 7.80658 9.50855 7.88681 9.13907C7.97479 8.76191 8.08896 8.39107 8.22853 8.02914C8.28056 8.00916 8.33607 7.99928 8.39196 8.00005H8.55539C8.88975 8.00437 9.22145 8.05882 9.53896 8.16152C9.89828 8.25936 10.2486 8.38635 10.5864 8.54119C10.9295 8.68644 11.263 8.8526 11.5848 9.03869C11.8726 9.20725 12.1559 9.38283 12.4347 9.56529C14.9341 8.88323 17.5764 8.88323 20.0759 9.56529C20.3255 9.40091 20.6078 9.22344 20.9272 9.03869C21.2446 8.85414 21.5725 8.68755 21.9093 8.53974C22.248 8.38987 22.597 8.26348 22.9538 8.16152C23.2777 8.05824 23.6134 8.00296 23.9552 8.00005H24.1186C24.175 7.9992 24.231 8.00908 24.2835 8.02914C24.4211 8.39057 24.5309 8.76158 24.6119 9.13907C24.701 9.5071 24.7456 9.88532 24.7456 10.2635C24.7456 10.5574 24.7203 10.8512 24.6713 11.1422C24.6224 11.432 24.5417 11.7159 24.4306 11.9888C24.9451 12.5299 25.3464 13.1645 25.6118 13.8566C25.8729 14.5433 26.0039 15.2709 25.9981 16.0037C26.0191 17.0532 25.8686 18.0992 25.5523 19.1022C25.2923 19.9212 24.8422 20.6718 24.2375 21.2929C23.6248 21.9105 22.8813 22.3892 22.0594 22.6952C21.0849 23.0522 20.067 23.2825 19.0314 23.3804C19.4185 23.7206 19.698 24.1623 19.8367 24.6532C19.9831 25.1389 20.0586 25.6423 20.061 26.1486C20.061 26.8411 20.0551 27.5291 20.0462 28.2085V30.2537C20.0423 30.353 20.0587 30.4519 20.0945 30.5448C20.1302 30.6378 20.1845 30.7228 20.2542 30.7949C20.3296 30.8649 20.4188 30.9191 20.5164 30.9542C20.5677 30.9726 20.6207 30.9855 20.6745 30.9927H20.9599V30.9985Z" />
            </svg>

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
          <Stage title="Stage 02" subtitle="Introdução ao HTML e CSS" />
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
          <Stage title="Stage 03" subtitle="Avançando no HTML e CSS" />
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
          <Stage title="Stage 04" subtitle="Introdução ao JavaScript" />
          <Challenge stage={user.stage04} challengeName="exercicio01" title="Exercício 01" />

          <Challenge stage={user.stage04} challengeName="exercicio02" title="Exercício 02" />
        </details>

        <details>
          <Stage title="Stage 05" subtitle="Avançando no JavaScript" />
          <Challenge stage={user.stage05} challengeName="focustimer" title="FocusTimer" />

          <Challenge
            stage={user.stage05}
            challengeName="focustimer_dark_mode"
            title="FocusTimer Dark Mode"
          />
        </details>

        <details>
          <Stage title="Stage 06" subtitle="JavaScript antes do framework" />
          <Challenge stage={user.stage06} challengeName="spa_universe" title="SPA Universe" />

          <Challenge stage={user.stage06} challengeName="gitfav" title="GitFav" />
        </details>

        <details>
          <Stage title="Stage 07" subtitle="Git e Github" />
          <Challenge stage={user.stage07} challengeName="git_push" title="Git Push" />
        </details>

        <details>
          <Stage
            title="Stages 08 09 10"
            subtitle="RocketMovies: Backend, Frontend, API Restful, Deploy, Testes"
          />
          <Challenge
            stage={user.stages_08_09_10_11}
            challengeName="rocket_movies"
            title="Rocket Movies"
          />
        </details>

        <details>
          <Stage title="Desafio final" subtitle="Food Explorer" />
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
