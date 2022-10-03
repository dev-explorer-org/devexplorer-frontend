import styles from '../styles/User.module.css';

export default function Challenge({ stage, challengeName, title }) {
  const existInfos =
    stage[challengeName].codigo_url ||
    stage[challengeName].deploy_url ||
    stage[challengeName].github_frontend ||
    stage[challengeName].github_backend;

  return (
    <div>
      {existInfos && (
        <div className={styles.link}>
          {stage[challengeName].codigo_url && (
            <>
              <p>{title}</p>
              <span>Código: </span>
              <a
                href={stage[challengeName].codigo_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stage[challengeName].codigo_url}
              </a>
            </>
          )}

          {stage[challengeName].github_frontend && (
            <>
              <span>Front-end: </span>
              <a
                href={stage[challengeName].github_frontend}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stage[challengeName].github_frontend}
              </a>
            </>
          )}

          {stage[challengeName].github_backend && (
            <>
              <br />
              <span>Back-end: </span>
              <a
                href={stage[challengeName].github_backend}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stage[challengeName].github_backend}
              </a>
            </>
          )}

          {stage[challengeName].deploy_url && (
            <>
              <br />
              <span>Deploy: </span>
              <a
                href={stage[challengeName].deploy_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stage[challengeName].deploy_url}
              </a>
            </>
          )}
        </div>
      )}
    </div>
  );
}
