import React, { useEffect, useRef } from 'react'
import { DxReportViewer } from 'devexpress-reporting/dx-webdocumentviewer'
import * as ko from 'knockout'

const ReportViewer = () => {
    const viewerRef = useRef();
    const reportUrl = ko.observable("TestReport");
    const requestOptions = {
        host: 'http://localhost:5000',
        invokeAction: 'DXXRDV'
    };

    useEffect(() => {
        const viewer = new DxReportViewer(viewerRef.current, { 
            reportUrl, 
            requestOptions,
            callbacks: {
                CustomizeExportOptions: function(s, e) {
                    e.HideFormat(ExportFormatID.XLS);
                }
            }
        });

        viewer.render(); 

        return () => viewer.dispose();
    });

    return (
        <div style={{ width: "100%", height: "1000px" }}>
            <div ref={viewerRef}></div>
        </div>
    )
}

export default ReportViewer