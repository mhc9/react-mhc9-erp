import React, { useEffect, useRef, useState } from 'react'
import WebViewer from '@pdftron/webviewer';

const WordViewer = () => {
    // const viewer = useRef();
    // const [instance, setInstance] = useState();

    // useEffect(() => {
    //     if (!instance) {
    //         WebViewer({
    //             path: '/',
    //             initialDoc: '/reports/example.pdf'
    //         }, viewer.current)
    //         .then(ins => {
    //             const { documentViewer } = ins.Core;
    //             setInstance(ins);
    //         })
    //     }
    // }, []);

    // return (
    //     <div ref={viewer} className="h-[100vh]"></div>
    // )

    <div style={{ width: '100%', height: '800px' }}>
        <WebViewer
            enableOfficeEditing={true}
            initialDoc="/reports/example.pdf"
        />
    </div>  
}

export default WordViewer