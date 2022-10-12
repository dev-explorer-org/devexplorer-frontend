import { useEffect, useState } from 'react';
import { checkChallengesExists, checkRocketMoviesChallenges } from '../utils/checkChallenges';

export default function Skill({ tech, user }) {
  const [progress, setProgress] = useState(0);
  const [endValue, setEndValue] = useState(0);

  const isStage02 = checkChallengesExists(user.stage02);
  const isStage03 = checkChallengesExists(user.stage03);
  const isStage04 = checkChallengesExists(user.stage04);
  const isStage05 = checkChallengesExists(user.stage05);
  const isStage06 = checkChallengesExists(user.stage06);
  const isStage07 = checkChallengesExists(user.stage07);
  const rocketMovies = checkRocketMoviesChallenges(user.stages_08_09_10_11);

  useEffect(() => {
    if (isStage02 && (tech === 'html5' || tech === 'css3')) setEndValue(25);
    if (isStage03 && (tech === 'html5' || tech === 'css3')) setEndValue(50);
    if (isStage04 && tech === 'javascript') setEndValue(33);
    if (isStage05 && (tech === 'html5' || tech === 'css3')) setEndValue(75);
    if (isStage05 && tech === 'javascript') setEndValue(66);
    if (isStage06 && (tech === 'html5' || tech === 'css3')) setEndValue(100);
    if (isStage06 && tech === 'javascript') setEndValue(100);
    if (isStage07 && tech === 'git') setEndValue(100);
    if (rocketMovies.text === 'Level 8' && tech === 'reactjs') setEndValue(50);
    if (rocketMovies.text === 'Level 9' && (tech === 'reactjs' || tech === 'nodejs'))
      setEndValue(50);
    if (rocketMovies.text === 'Level 10' && (tech === 'reactjs' || tech === 'nodejs'))
      setEndValue(100);

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === endValue) {
          clearInterval(progressTimer);
          return prevProgress;
        }
        return prevProgress + 1;
      });
    }, 25);
    return () => clearInterval(progressTimer);
  }, [endValue]);

  const techs = {
    html5: {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      color: '#E44D26',
    },
    css3: {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      color: '#1572B6',
    },
    javascript: {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      color: '#F0DB4F',
    },
    git: {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      color: '#F34F29',
    },
    nodejs: {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: '#83CD29',
    },
    reactjs: {
      img: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: '#61DAFB',
    },
  };

  return (
    <>
      <div className="circular_progress">
        <img src={techs[tech].img} alt={tech} />
      </div>

      <style jsx>{`
        .circular_progress {
          position: relative;
          padding: 12px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: conic-gradient(
            ${techs[tech].color} ${progress * 3.6}deg,
            hsla(0, 0%, 0%, 0.2) 0deg
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .circular_progress::before {
          content: '';
          position: absolute;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          background-color: #013458;
        }

        .circular_progress img {
          width: 100%;
          filter: grayscale(0);
        }
      `}</style>
    </>
  );
}
