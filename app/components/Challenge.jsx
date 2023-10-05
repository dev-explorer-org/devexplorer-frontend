import styles from '../styles/User.module.css';

export default function Challenge({ stage, challengeName, title }) {
  const existInfos =
    stage[challengeName].codigo_url ||
    stage[challengeName].deploy_url ||
    stage[challengeName].github_frontend ||
    stage[challengeName].github_backend;

  return (
    <div>
      {existInfos ? (
        <div className={styles.link}>
          {stage[challengeName].codigo_url && (
            <>
              <p>{title}</p>
              <div>
                <span>Código: </span>
                <a href={stage[challengeName].codigo_url} target="_blank" rel="noopener noreferrer">
                  {stage[challengeName].codigo_url}
                </a>
              </div>
            </>
          )}

          {stage[challengeName].github_frontend && (
            <div>
              <span>Front-end: </span>
              <a
                href={stage[challengeName].github_frontend}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stage[challengeName].github_frontend}
              </a>
            </div>
          )}

          {stage[challengeName].github_backend && (
            <div>
              <span>Back-end: </span>
              <a
                href={stage[challengeName].github_backend}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stage[challengeName].github_backend}
              </a>
            </div>
          )}

          {stage[challengeName].deploy_url && (
            <div>
              <span>Deploy: </span>
              <a href={stage[challengeName].deploy_url} target="_blank" rel="noopener noreferrer">
                {stage[challengeName].deploy_url}
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.link}>
          <div>
            <span>Este usuário ainda não fez o desafio... {title}</span>
          </div>
        </div>
      )}
    </div>
  );
}
