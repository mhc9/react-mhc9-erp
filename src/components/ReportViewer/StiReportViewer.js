import React, { useEffect } from 'react'
import { StiViewer } from 'stimulsoft-reports-js/Scripts/stimulsoft.viewer'
import * as Stimulsoft from 'stimulsoft-reports-js'
import 'stimulsoft-reports-js/Css/stimulsoft.viewer.office2013.whiteblue.css'

const StiReportViewer = () => {
    const viewer = new StiViewer(undefined, 'viewer', false)
    const report = new Stimulsoft.Report.StiReport()

    useEffect(() => {
        getReport();
    }, []);

    const getReport = async () => {
        const res = await fetch('/reports/Report.mdc');
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