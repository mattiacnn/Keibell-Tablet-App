import React, { useState, useEffect } from 'react';

const GuestsContext = React.createContext();

const GuestsProvider = (props) => {
    const [guests, setGuests] = useState([
        {
            firstName: 'John',
            lastName: 'doe',
            progress: 50,
            id: 1
        },
        {
            firstName: 'Feliks',
            lastName: 'Kasmi',
            progress: 100,
            id: 2
        },
        {
            firstName: 'Mattia',
            lastName: 'Cannavò',
            progress: 40,
            id: 3
        },
    ]);

    useEffect(() => {
        console.log(guests)
    }, [guests])

    const updateGuests = (guest) => {
        const arr = guests;
        arr.push(guest);
        setGuests(arr)
    }

    return (
        <GuestsContext.Provider
            value={{
                guests,
                setGuests,
            }}
        >
            {props.children}
        </GuestsContext.Provider>
    )
}

export { GuestsProvider, GuestsContext };