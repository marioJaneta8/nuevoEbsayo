'use client'

import { useEffect, useState } from "react"
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';



//react-quill-new
export type EditorDescriptionProps = {
    value?: string
    onChange: (value: string) => void   
}

const EditorDescription = ({onChange, value}: EditorDescriptionProps) => {
   
    // es necesario usar useEffect para que se monte el componente despues de renderizar para evitar el error de que esta usando un hook en un server component
   const [isMounted, setIsMounted] = useState(false)
// se usa useEffect para que se monte el componente despues de renderizar para evitar el error de que esta usando un hook en un server component
   useEffect(() => {
      setIsMounted(true)
   }, [])   
   
    return (
    <div>   
        {isMounted && (
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
            />
        )}
    </div>
  )
}

export default EditorDescription