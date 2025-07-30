import React, { useContext } from 'react'
import {NoteContext} from '../Context/NoteProvider';

const Alert = () => {
    const {alert} = useContext(NoteContext);
    return (
        alert && (<div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-100" role="alert">
            <strong className="font-medium">{alert.type}!</strong> {alert.msg}
        </div>)
    )
}

export default Alert
