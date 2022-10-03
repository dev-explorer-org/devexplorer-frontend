export default function Flag({ state, ...rest }) {
  const arrayStates = [
    'AC',
    'AL',
    'AM',
    'AP',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MG',
    'MS',
    'MT',
    'PA',
    'PB',
    'PE',
    'PI',
    'PR',
    'RJ',
    'RN',
    'RO',
    'RR',
    'RS',
    'SC',
    'SP',
    'TO',
  ];

  return (
    <div>
      {arrayStates.includes(state) && (
        <img
          src={`images/flags/${state}.svg`}
          width="32px"
          {...rest}
          alt={state}
        />
      )}
    </div>
  );
}
