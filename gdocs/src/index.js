import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './Editor';
import '../src/style/style.css';
function App(){
    return(
        
        <div>
            {/* Hello there */}
            <Editor />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

