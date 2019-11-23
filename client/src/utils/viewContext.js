import React from 'react';

export const ViewContext = React.createContext({
    // theme: themes.dark,
    // toggleTheme: () => {},
    updateActiveView: (view) => { console.log(`viewContext was given this view: `, view) },
});