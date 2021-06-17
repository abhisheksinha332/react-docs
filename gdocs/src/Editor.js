import React, { useCallback, useEffect,useState } from 'react';
import Quill from 'quill';
import {io} from 'socket.io-client';
import "quill/dist/quill.snow.css";
import { useParams } from 'react-router-dom'

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
    
    const[socket, setSocket] = useState();
    const[quill, setQuill] = useState();
  //  const[documentId, setDocumentId] = useState();
    
    const {id : documentId} = useParams();
   // console.log(documentId);
    useEffect(()=>{
        const sock = io("http://localhost:3001/")
        setSocket(sock)
        return()=>{
            sock.disconnect()
        }
    },[])

    const wrapperRef = useCallback(wrapper =>{
        if(wrapper == null){
            return
        }
        wrapper.innerHTML = ""
        const workspace  = document.createElement('div')
        wrapper.append(workspace)
        const q = new Quill(workspace,{theme:'snow', modules:{toolbar: TOOL}})
        q.disable()
        q.setText("Loading...")
        setQuill(q)
    },[])

    useEffect(()=>{

        if(socket == null || quill == null) return

        const handler = (delta, oldDelta, source)=>{
            if(source !== 'user') return
            socket.emit("send-changes", delta)
        }
        quill.on('text-change', handler )
        return()=>{
            quill.off("text-change", handler)
        }
    },[socket, quill])


    useEffect(()=>{

        if(socket == null || quill == null) return

        socket.once("load-document", document=>{
            quill.setContents(document)
            quill.enable()
        })
        socket.emit('get-document', documentId)

    },[socket, quill,documentId])



    useEffect(()=>{

        if(socket == null || quill == null) return

        const handler = (delta)=>{
            // if(source !== 'user') return
            // socket.emit("send-changes", delta)
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler )
        return()=>{
            quill.off("receive-changes", handler)
        }
    },[socket, quill])
    return (
        
        <div className="worksplace" ref={wrapperRef}>
            Text Editor
        </div>
    )
}

export default Editor;
