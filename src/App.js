import React from 'react';

import createComponent from './createComponent';

const App = createComponent(
  async function getInitialState(attrs) {
    const { greeting } = attrs;
    const result = await fetch(`/settings.json`);
    const { subtitle } = await result.json();

    return {
      subtitle,
      greeting,
      name: `World`
    };
  },

  function render(state) {
    const { greeting, name, subtitle } = state;

    function onChangeName(e) {
      state.name = e.target.value;
    }

    return (
      <div>
        <h3>{greeting} {name}</h3>
        <h4>{subtitle}</h4>

        <input type="text" value={name} onChange={onChangeName} />
      </div>
    );
  }
);

export default App;
