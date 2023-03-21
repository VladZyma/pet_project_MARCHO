import {Routes, Route, Navigate} from 'react-router-dom';

import './App.scss';

import {MainLayout} from "./mainLayout";
import {HomePage} from "./page";

function App() {

    return (
        <div className="App">
            <Routes>
              <Route path={'/'} element={<MainLayout/>}>
                <Route index element={<Navigate to={'/home'}/>}/>
                <Route path={'/home'} element={<HomePage/>}/>
              </Route>
            </Routes>
        </div>
    );
}

export default App;
