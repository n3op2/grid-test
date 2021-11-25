import ReactDOM from 'react-dom';
import React from 'react';

import AppContext from './components/AppContext';
import Game from './components/Game';

const initialState = {
        width: 10,
        color: '#00faff',
        height: 10,
        grid: false,
        selected: null,
        activeVectors: [],
};

const App = () => {
    // global'ish state avoiding external libs
    const [state, setState] = React.useState({
        ...initialState,
        update: (updates) => setState((prevState) => ({
            ...prevState,
            ...updates,
        })),
    });

    return (
        <AppContext.Provider value={state}>
            <Game />
        </AppContext.Provider>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
