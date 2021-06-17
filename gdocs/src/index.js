import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';
import {v4 as uuidV4} from 'uuid';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import '../src/style/style.css';
function App(){
    return(
        
        <BrowserRouter>
            {/* Hello there */}
            <Switch>
                <Route path="/" exact ><Redirect to={`/documents/${uuidV4()}`} />  </Route>
                <Route path="/documents/:id" > <Editor /></Route>
            </Switch>
           
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

