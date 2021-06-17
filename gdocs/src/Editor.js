import React, { useCallback, useEffect, useRef } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";

const TOOL = [
    [{ header : [1,2,3,4,5,6,false]}],
    [{font : [] }],
    [{ list : "ordered"}, {list : "bullet"}],
    [{ script : "sub" },{ script : "super"}],
    [{ color : [] }, {background:[]}],
    ["bold", "italic","underline"],
    [{ align : [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],

]


const Editor = () => {
    const wrapperRef = useCallback(wrapper =>{
        if(wrapper == null){
            return
        }
        wrapper.innerHTML = ""
        const workspace  = document.createElement('div')
        wrapper.append(workspace)
        new Quill(workspace,{theme:'snow', modules:{toolbar: TOOL}})
        
    },[])
    return (
        
        <div className="worksplace" ref={wrapperRef}>
            Text Editor
        </div>
    )
}

export default Editor;
