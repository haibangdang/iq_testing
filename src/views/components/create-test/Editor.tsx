import React, { useState, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { TestContext } from 'src/context/TestContext'

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
})

export interface Modules {
  toolbar: Array<Array<string | { [key: string]: boolean | string | number | Array<string | number | boolean> }>>
}

export interface EditorProps {
  initialValue: string

  // onChange: (content: string) => void
  modules: Modules
  index: number
}

const Editor: React.FC<EditorProps> = ({ initialValue, modules, index }) => {
  const [value, setValue] = useState('')
  const { handleUpdateQuestionText } = useContext(TestContext)

  // const question = test[index]

  // const handleChange = (content: string) => {
  //   setValue(content)
  //   onChange(content)
  // }

  const handleEditorChange = (content: string) => {
    handleUpdateQuestionText(index, content)
    setValue(content) // Update the Editor value with the new content
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue, index])

  return <ReactQuill theme='snow' value={value} onChange={handleEditorChange} modules={modules} />
}

export default Editor
