//File that contains the exported function for generating the excel document
const XLSX = require('xlsx');
const { saveAs } = require('file-saver');


export async function ExcelGenerationQueue() 
{
   console.log("Excel Generator Clicked");

   function adjustColumnWidth(ws, columnIndex, width) {
        const colWidths = ws['!cols'] || [];
        colWidths[columnIndex] = { width };
        ws['!cols'] = colWidths;
    }

    function setCellStyle(ws, cell, style) {
        ws[cell].s = style;
    }

     // Create a new workbook
     const wb = XLSX.utils.book_new();
     var ws = XLSX.utils.aoa_to_sheet('');
     const wsData = [];

   

    let numClusters = 0;
     //Put the cluster names and click rates into the excel sheet 
    try 
    {
        const dbResponse = await fetch('http://localhost:3001/excel-clusters');
        if(!dbResponse.ok) {
            throw new Error('Error fetching clusters');
        }
        const data = await dbResponse.json();
        //console.log(data)

        //Create the headers
        wsData.push(['Cluster Name', 'Click Count'])

        //Create rows for each cluster and corresponding click rate
        data.forEach(row => {
            wsData.push([row.clusterName, row.clickCount]);
            numClusters++;
        });

       
    }  catch (error) 
    {
        console.error('Error: ', error);
    }

    /*  NOT WORKING AS INTENDED??
    //Put some padding space between the columns
    wsData.forEach(row => {
        row.push('', '');
    });
    */
    
    //temporary padding
    wsData.push('', '')


/*
    //Set the colors of the column headers to chamber colors
    const lightBlue = { fill: { bgColor: { rgb: '59bab6' } } };
    setCellStyle(ws, 'A1', lightBlue);
    setCellStyle(ws, 'B1', lightBlue);

    numClusters += 2;
    let newCellA = 'A' + numClusters;
    let newCellB = ' ' + numClusters;
    //setCellColor(ws, newCellA, lightBlue);
    //setCellColor(ws, newCellB, lightBlue);
    */

    console.log(wsData);
    //Now we get the subcluster information and their corresponding click rates. 
    try 
    {
        const dbResponse = await fetch('http://localhost:3001/gen-subclusters');
        if(!dbResponse.ok) {
            throw new Error('Error fetching clusters');
        }
        const data = await dbResponse.json();

        //Push the column headers
        wsData.push(['SubCluster Name', 'Click Count'])

        //Push the subcluster name and corresponding click count
        data.forEach(row => {
            wsData.push([row.subclusterName, row.clickCount]);
        });

    }   catch (error) 
    {
        console.error('Error: ', error);
    }


   
    ws = XLSX.utils.aoa_to_sheet(wsData);

    adjustColumnWidth(ws, 0, 50);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert the workbook to a binary Excel file
    const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });

    // Convert the binary data to a Blob
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    // Save the Blob as a file
    saveAs(blob, 'MickeyExcelReport.xlsx');

    function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }

   
}