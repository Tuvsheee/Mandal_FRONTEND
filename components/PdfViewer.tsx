"use client"
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = ({ fileUrl }:any) => {
  const [numPages, setNumPages] = useState(null);

  // Called when PDF is loaded successfully
  const onDocumentLoadSuccess = ({ numPages }:any) => {
    setNumPages(numPages); 
  };

  return (
    <div>
      <Document
        file={fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Loading PDF..."
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={window.innerWidth} // Adjusts page width to match the window size
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;