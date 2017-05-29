import * as React from 'react';
import './Hello.css';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
    if(enthusiasmLevel <= 0){
        throw new Error('You could be little more enthusiastic');
    }


    return (
    <div className="hello">
      <div className="greeting">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
      </div>
      <div>
        <button onClick={onDecrement}>-</button>
        <button onClick={onIncrement}>+</button>
      </div>
    </div>
    )
}


function getExclamationMarks(enthusiasmLevel: number){
    return Array(enthusiasmLevel + 1).join('!');
}

export default Hello;



