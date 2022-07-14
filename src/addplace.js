import { useState } from 'react';
import style from './addplace.css';

export function Addplace(prop){
    const [latlng, setLatlng] = useState({});
    setLatlng(prop);
    console.log(prop);
    return(
        <div className='addplace'>
        </div>
    )
}