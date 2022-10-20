import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppShell, Navbar, Header } from '@mantine/core';
import GraphPage from './pages/GraphPage';
import DataPage from './pages/DataPage';
import { MainLinks } from './components/NavbarLinks';
import Logo from './assets/uncountable_logo.png';

function App() {

    return (
        <Router>
            <AppShell
				header={<Header height={80} p='xs'>
					<div className='header'>
						<img src={Logo} height={60}/>
					</div>
				</Header>}
				navbar={
					<Navbar width={{ base: 300 }} p='xs'>
						<Navbar.Section>
							<MainLinks />
						</Navbar.Section>
					</Navbar>
				}
			>
				<Routes>
					<Route path='/experimental-data' element={<DataPage />}/>
					<Route path='/analysis' element={<GraphPage />}/>
				</Routes>
            </AppShell>
        </Router>
    );
}

export default App;
