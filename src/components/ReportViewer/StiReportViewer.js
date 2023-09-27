import React, { useEffect } from 'react'
import { Stimulsoft } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer'
import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css'

const StiReportViewer = () => {
    const viewer = new Stimulsoft.Viewer.StiViewer(undefined, 'StiViewer', false)
    const report = new Stimulsoft.Report.StiReport()

    useEffect(() => {
        getReport();
    }, []);

    const getReport = async () => {
        const res = await fetch('./reports/SimpleList.mrt');
        const data = res.json();

        report.loadDocument(data);
        viewer.report = report;

        viewer.renderHtml('viewer');
    };

    return (
        <div id="viewer"></div>
    )
}

export default StiReportViewer