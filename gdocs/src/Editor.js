import React, { useCallback, useEffect, useRef } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
const Editor = () => {
    const wrapperRef = useCallback(wrapper =>{
        if(wrapper == null){
            return
        }
        wrapper.innerHTML = ""
        const workspace  = document.createElement('div')
        wrapper.append(workspace)
        new Quill(workspace,{theme:'snow'})
        
    },[])
    return (
        
        <div className="worksplace" ref={wrapperRef}>
            Text Editor
        </div>
    )
}

export default Editor;
