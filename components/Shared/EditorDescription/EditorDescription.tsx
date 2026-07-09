'use client'

import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';

export type EditorDescriptionProps = {
  value?: string;
  onChange: (value: string) => void;
};

// ✅ Quill nunca se importa en el servidor
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => (
    <div className="h-24 rounded-md border bg-slate-100 animate-pulse" />
  ),
});

const EditorDescription = ({ onChange, value }: EditorDescriptionProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
    />
  );
};

export default EditorDescription;