export default function Flag({ state, country, ...rest }) {
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

  const countriesList = {
    Itália: 'ITA.svg',
  };

  const isBrazil = arrayStates.includes(state);

  return (
    <div>
      {isBrazil ? (
        <img src={`images/flags/${state}.svg`} width="32px" {...rest} alt={state} />
      ) : (
        <img
          src={`images/flags/countries/${countriesList[country]}`}
          width="32px"
          {...rest}
          alt={country}
        />
      )}
    </div>
  );
}
