import './App.css';
import React from "react";
import NewYear from './Components/NewYear';
import Chinese from './Components/Chinese';
import Birthday from './Components/Birthday';
import OwnInput from './Components/OwnInput';
import {useState} from 'react';

  function App() {
    const [activeCountDown, setActiveCountDown] = useState('NewYear');

    const handleCountDownClick = (counterId) => () => setActiveCountDown(counterId);

    const getActiveCountDown = () => {
        switch (activeCountDown) {
            case 'ChineseNewYear':
                return <Chinese />;
            case 'Birthday':
                return <Birthday />;
            case 'NewYear':
                return <NewYear />;
            case 'OwnInput':
                return <OwnInput />;
            default:
                return null;
        }
    };

    return (
        <div className='App'>
            {getActiveCountDown()}
            <div className="buttons">
                <button onClick={handleCountDownClick('NewYear')} className='nieuw'>
                    New Year
                </button>
                <button onClick={handleCountDownClick('ChineseNewYear')} className='chinees'>
                    Chinese New Year
                </button>
                <button onClick={handleCountDownClick('Birthday')} className='verjaardag'>
                    My Birthday
                </button>
                <button onClick={handleCountDownClick('OwnInput')} className='eigeninput'>
                    Own Input
                </button>
            </div>
        </div>
    );
}

export default App;
