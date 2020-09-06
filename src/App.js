import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AuthProvider } from './context/authContext';
import { UIContextProvider } from './context/uiContext';

import NavBar from './components/Header/NavBar';
import HomePage from './components/pages/HomePage';
import Footer from './components/Footer/Footer';

function App() {
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#24A810',
            },
        },
        share: {
            container: {
                maxWidth: '1050px',
                margin: '0 auto',
                height: '100%',
                padding: '0 16px',
            },
        },
    });

    return (
        <UIContextProvider>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    <BrowserRouter>
                        <CssBaseline />
                        <NavBar />
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                        </Switch>
                        <Footer />
                    </BrowserRouter>
                </ThemeProvider>
            </AuthProvider>
        </UIContextProvider>
    );
}

export default App;
