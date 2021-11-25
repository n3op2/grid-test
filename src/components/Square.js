import React from 'react';

import View from './View';
import AppContext from './AppContext';

const Square = ({ step, ...props }) => {
    const state = React.useContext(AppContext);
    const view = new View(state.grid, props);
    const [ count, setCount ] = React.useState(false);

    React.useEffect(() => {
        if (props.active) setCount(props.count)
        else {
            setCount(false);
        }
    }, [ props ]);

    return <div
        onMouseOver={() => step(view.findAll(props))}
        style={{
            width: 20,
            height: 20,
            ...props.focus ? {
                backgroundColor: 'yellow',
            } : {
                backgroundColor: props.val ? state.color : 'blue',
            },
            transition: 'all 0.5s',
        }}
        onClick={() => {
            step(view.findAll(props))
        }}
    >{count}</div>
}

export default Square;
