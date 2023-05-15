import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Home, SearchFeed, Footer, NotFound, History } from './components';
export default function App() {

    return (
        <BrowserRouter>

            <Header />
        
            <Routes>
                <Route path='/' exact element={ <Home /> } />
                <Route path='/search/:id' element={ <SearchFeed /> } />
                <Route path='/history' element={ <History /> } />
                <Route path='*' element={ <NotFound /> } />
            </Routes>

            <Footer />

        </BrowserRouter>
    )
}
