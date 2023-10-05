export function checkChallengesExists(challenges) {
  const arrayChallenges = Object.values(challenges);
  const arrayUrlsChallenges = [];

  arrayChallenges.forEach((item) => {
    const urls = Object.values(item);
    urls.forEach((url) => arrayUrlsChallenges.push(url.length));
  });

  const allChallengesIsEmpty = arrayUrlsChallenges.every((item) => item === 0);

  if (allChallengesIsEmpty) return false;

  return true;
}

export function checkRocketMoviesChallenges(challenges) {
  const arrayChallenges = Object.values(challenges);
  const arrayUrlsChallenges = [];

  arrayChallenges.forEach((item) => {
    const urls = Object.values(item);
    urls.forEach((url) => arrayUrlsChallenges.push(url.length));
  });

  if (arrayUrlsChallenges[2]) return { existUrl: true, text: 'Level 10' };
  if (arrayUrlsChallenges[1]) return { existUrl: true, text: 'Level 9' };
  if (arrayUrlsChallenges[0]) return { existUrl: true, text: 'Level 8' };

  return { existUrl: false };
}
