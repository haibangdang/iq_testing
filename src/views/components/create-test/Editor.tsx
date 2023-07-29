// import React from 'react'
// import {
//   HtmlEditor,
//   Image,
//   Inject,
//   Link,
//   QuickToolbar,
//   RichTextEditorComponent,
//   Toolbar
// } from '@syncfusion/ej2-react-richtexteditor'
// import { registerLicense } from '@syncfusion/ej2-base'
// import { Box } from '@mui/material'

// registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhBYVFxWmFZfV1gcV9FYlZSR2Y/P1ZhSXxQdkJhUX5Zc3JWQ2FYVEA=')

// const Editor = () => (
//   <Box
//     sx={{
//       m: 2,
//       md: {
//         m: 10
//       },
//       p: 2,
//       backgroundColor: 'white',
//       borderRadius: '3xl'
//     }}
//   >
//     <RichTextEditorComponent>
//       <EditorData />
//       <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
//     </RichTextEditorComponent>
//   </Box>
// )

// export const EditorData = () => (
//   <div>
//     <h3>
//       Try React React has been designed from the start for gradual adoption, and you can use as little or as much React
//       as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a
//       complex React-powered app, the links in this section will help you get started. Online Playgrounds If you’re
//       interested in playing around with React, you can use an online code playground. Try a Hello World template on
//       CodePen, CodeSandbox, or Stackblitz. If you prefer to use your own text editor, you can also download this HTML
//       file, edit it, and open it from the local filesystem in your browser. It does a slow runtime code transformation,
//       so we’d only recommend using this for simple demos. Add React to a Website You can add React to an HTML page in
//       one minute. You can then either gradually expand its presence, or keep it contained to a few dynamic widgets.
//     </h3>
//   </div>
// )
// export default Editor

import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import 'react-quill/dist/quill.snow.css'

let ReactQuill: any
if (typeof window !== 'undefined') {
  ReactQuill = require('react-quill')
}

const Editor = () => {
  const [value, setValue] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['image', 'video'],
      ['clean']
    ]
  }

  return (
    <Box>
      {isClient && ReactQuill && <ReactQuill theme='snow' value={value} onChange={setValue} modules={modules} />}
    </Box>
  )
}

export default Editor
