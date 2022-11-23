import styles from '../styles/Level.module.css';
import { checkChallengesExists, checkRocketMoviesChallenges } from '../utils/checkChallenges';

function checkFinalChallenge(challenges) {
  const arrayChallenges = Object.values(challenges);
  const arrayUrlsChallenges = [];

  arrayChallenges.forEach((item) => {
    const urls = Object.values(item);
    urls.forEach((url) => arrayUrlsChallenges.push(url));
  });

  if (arrayUrlsChallenges[2].length > 0) return { existUrl: true, text: 'FINALIZOU 🏅' };
  if (arrayUrlsChallenges[1].length > 0) return { existUrl: true, text: 'FINALIZOU 🏅' };
  if (arrayUrlsChallenges[0].length > 0) return { existUrl: true, text: 'FINALIZOU 🏅' };

  return { existUrl: false };
}

function checkUserLevel({
  isStage07,
  isStage06,
  isStage05,
  isStage04,
  isStage03,
  isStage02,
  rocketMovies,
  foodExplorer,
}) {
  if (foodExplorer.existUrl) return foodExplorer.text;
  if (rocketMovies.existUrl) return rocketMovies.text;
  if (isStage07) return 'Level 7';
  if (isStage06) return 'Level 6';
  if (isStage05) return 'Level 5';
  if (isStage04) return 'Level 4';
  if (isStage03) return 'Level 3';
  if (isStage02) return 'Level 2';
  return 'Level 1';
}

export default function Level({ user }) {
  const isStage02 = checkChallengesExists(user.stage02);
  const isStage03 = checkChallengesExists(user.stage03);
  const isStage04 = checkChallengesExists(user.stage04);
  const isStage05 = checkChallengesExists(user.stage05);
  const isStage06 = checkChallengesExists(user.stage06);
  const isStage07 = checkChallengesExists(user.stage07);
  const rocketMovies = checkRocketMoviesChallenges(user.stages_08_09_10_11);
  const foodExplorer = checkFinalChallenge(user.desafio_final);

  return (
    <span className={styles.level}>
      {checkUserLevel({
        isStage02,
        isStage03,
        isStage04,
        isStage05,
        isStage06,
        isStage07,
        rocketMovies,
        foodExplorer,
      })}
    </span>
  );
}

// stage02: {
//   fase01_corrigindo_bugs01: {
//     codigo_url: '',
//     deploy_url: '',
//   },
//   fase02_corrigindo_bugs02: {
//     codigo_url: '',
//     deploy_url: '',
//   },
//   fase02_semantica_acessibilidade: {
//     codigo_url: '',
//     deploy_url: '',
//   },
//   fase02_recriando_layout: {
//     codigo_url: '',
//     deploy_url: '',
//   },
// },
