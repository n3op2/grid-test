import React from 'react';
import { Card, Divider, Slider } from "@blueprintjs/core";
import { HuePicker } from 'react-color';

import Grid from './Grid';
import Square from './Square';
import AppContext from './AppContext';

const Container = (props) => <div style={{
        display: 'flex',
        flexDirection: props.dir || 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...props.style,
    }}>
        {props.children}
</div>

const Controls = ({ slider, setSlider }) => 

    <Container dir='row' style={{ lignItems: 'center', position: 'absolute', left: '2%', top: '10%' }}>
        <Container> 
            <h4>Y Axis</h4>
            <Slider
                min={1}
                max={Math.round((window.innerHeight - 200) / 20)}
                stepSize={1}
                labelStepSize={5}
                onRelease={() => setSlider({ ...slider, released: true })}
                onChange={(y) => setSlider({ ...slider, y, released: false })}
                value={slider.y}
                vertical={true}
            />
        </Container>
        <Divider style={{ margin: 10 }} />
        <Container>
            <h4>X Axis</h4>
            <Slider
                min={1}
                max={Math.round((window.innerWidth - 100) / 20)}
                stepSize={1}
                labelStepSize={5}
                onRelease={() => setSlider({ ...slider, released: true })}
                onChange={(x) => setSlider({ ...slider, x, released: false })}
                value={slider.x}
                vertical={true}
            />
        </Container>
    </Container>

const Game = () => {
    const [ slider, setSlider ] = React.useState({ x: 10, y: 10 });
    const { grid, update, activeVectors, color } = React.useContext(AppContext);

    const updateVectors = (vectors) => {
        activeVectors.forEach(({ focus, active, ...rest }) => {
            grid[rest.y][rest.x] = rest;
        });

        return vectors.reduce((newGrid, v) => {
            newGrid[v.y][v.x] = v.active
                ? { ...v, count: vectors.length } : v;
            return newGrid;
        }, grid);  
    }

    const step = (vectors) => update({
        activeVectors: vectors,
        grid: updateVectors(vectors),
    });

    React.useEffect(() => {
        update({ grid: Grid(slider.x, slider.y, Square) })
    }, []);

    React.useEffect(() => {
        // or listed for onRelease
        setTimeout(update({ grid: Grid(slider.x, slider.y, Square) }), 200);
    }, [ slider ]);

    if (!grid) return null;
    
    return <Container>
        <h1>It's a grid!</h1>
        <HuePicker 
            color={color}
            height={5}
            onChange={({ hex }) => update({ color: hex })}
        />
        <h4>{color}</h4>
        <Controls {...{ slider, setSlider}} />
        <Divider style={{ margin: 10 }} vertical={true} />
        <Card elevation={2}>
            <Container>
                {grid.map(rows =><Container dir='row'>
                    {rows.map(vector => 
                        <vector.el {...vector} step={step}/>
                    )}
                </Container>)}
            </Container>
        </Card>
    </Container>
};

export default Game;
