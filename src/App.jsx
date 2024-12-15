import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Button } from '@/components/ui/button.jsx';
import SplitDiv from "@/components/common/SplitDiv.jsx";

function App() {
    const [divs, setDivs] = useState([]);

    const addDiv = (parentId, orientation) => {
        const newDivs = [...divs];

        const newDiv = {
            id: Date.now(),
            orientation,
            parentId,
        };

        newDivs.push(newDiv);
        setDivs(newDivs);
    };

    const removeDiv = (id) => {
        setDivs(divs.filter((div) => div.id !== id));
    };

    const hasChildren = (id) => {
        return divs.some((div) => div.parentId === id);
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <SplitDiv/>
        </div>
    );
}

export default App;
