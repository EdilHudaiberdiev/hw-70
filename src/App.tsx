import './App.css';
import {Route, Routes} from 'react-router-dom';
import Toolbar from './Components/UI/Tollbar/Toolbar';
import Home from './Containers/Home/Home';
import AddContact from './Containers/AddContact/AddContact';
import EditContact from "./Containers/EditContact/EditContact";

const App = () => {

    return (
        <>
            <header className="bg-primary ">
                <Toolbar/>
            </header>

            <main className="container pt-5">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/new-contact" element={<AddContact/>}/>
                    <Route path="/edit-contact/:id" element={<EditContact/>}/>
                    <Route path="*" element={(<h1>Not found</h1>)}/>
                </Routes>
            </main>
        </>
    );
};

export default App;
