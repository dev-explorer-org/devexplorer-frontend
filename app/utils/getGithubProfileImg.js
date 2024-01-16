function getGithubProfileImg(githubURL) {
  const githubURLdata = new URL(githubURL);
  return `${githubURLdata.origin}${githubURLdata.pathname}.png`;
}

export { getGithubProfileImg };
