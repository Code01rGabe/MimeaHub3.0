// ==========================================================================
// PDF EXPORT
// ==========================================================================

function exportPDFReport() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const pageWidth = doc.internal.pageSize.getWidth();
        let yPos = 20;
        
        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(22);
        doc.setTextColor(63, 185, 80); // Green
        doc.text('MimeaHub', pageWidth / 2, yPos, { align: 'center' });
        
        yPos += 10;
        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text('Plant Disease Diagnostic Report', pageWidth / 2, yPos, { align: 'center' });
        
        // Divider line
        yPos += 8;
        doc.setDrawColor(63, 185, 80);
        doc.setLineWidth(0.5);
        doc.line(20, yPos, pageWidth - 20, yPos);
        
        // Report Info
        yPos += 12;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text('Report Details', 20, yPos);
        
        yPos += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        
        const reportDate = new Date().toLocaleString();
        doc.text(`Date: ${reportDate}`, 20, yPos);
        yPos += 6;
        doc.text(`Location: ${currentGPS}`, 20, yPos);
        yPos += 6;
        doc.text(`Language: ${currentLanguage === 'en' ? 'English' : 'Kiswahili'}`, 20, yPos);
        
        // Diagnosis
        yPos += 12;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text('Diagnosis Results', 20, yPos);
        
        yPos += 8;
        const diseaseName = document.getElementById('disease-name')?.innerText || 'No diagnosis';
        const confidence = document.getElementById('confidence-level')?.innerText || '0%';
        
        // Disease box
        doc.setFillColor(240, 240, 240);
        doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.text(`Disease: ${diseaseName}`, 25, yPos + 8);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(63, 185, 80);
        doc.text(`Confidence: ${confidence}`, pageWidth - 25, yPos + 8, { align: 'right' });
        
        // Treatments
        yPos += 30;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(60, 60, 60);
        doc.text('Treatment Recommendations', 20, yPos);
        
        yPos += 10;
        
        // Organic Treatment
        const organicText = document.getElementById('treatment-organic')?.innerText || 'N/A';
        doc.setFillColor(240, 255, 240);
        doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F');
        doc.setDrawColor(63, 185, 80);
        doc.setLineWidth(0.3);
        doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'S');
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(63, 185, 80);
        doc.text('ORGANIC TREATMENT', 25, yPos + 8);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(truncateText(organicText, 80), 25, yPos + 16);
        doc.text(truncateText(organicText, 80, 80), 25, yPos + 22);
        
        yPos += 38;
        
        // Chemical Treatment
        const chemicalText = document.getElementById('treatment-chemical')?.innerText || 'N/A';
        doc.setFillColor(240, 245, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F');
        doc.setDrawColor(88, 166, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'S');
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(88, 166, 255);
        doc.text('CHEMICAL TREATMENT', 25, yPos + 8);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(truncateText(chemicalText, 80), 25, yPos + 16);
        doc.text(truncateText(chemicalText, 80, 80), 25, yPos + 22);
        
        yPos += 38;
        
        // Prevention
        const preventionText = document.getElementById('treatment-prevention')?.innerText || 'N/A';
        doc.setFillColor(245, 240, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F');
        doc.setDrawColor(188, 140, 255);
        doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'S');
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(188, 140, 255);
        doc.text('PREVENTION METHODS', 25, yPos + 8);
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(80, 80, 80);
        doc.text(truncateText(preventionText, 80), 25, yPos + 16);
        doc.text(truncateText(preventionText, 80, 80), 25, yPos + 22);
        
        // Footer
        yPos = doc.internal.pageSize.getHeight() - 30;
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.3);
        doc.line(20, yPos, pageWidth - 20, yPos);
        
        yPos += 8;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Generated by MimeaHub - Offline Plant Disease Detection App', pageWidth / 2, yPos, { align: 'center' });
        yPos += 4;
        doc.text('This report was generated completely offline on your device.', pageWidth / 2, yPos, { align: 'center' });
        
        // Save PDF
        const filename = `MimeaHub_Report_${diseaseName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        doc.save(filename);
        
        // Show success toast
        if (typeof showToast === 'function') {
            showToast('PDF report downloaded!', 'success');
        }
        
    } catch (error) {
        console.error('PDF export error:', error);
        if (typeof showToast === 'function') {
            showToast('Failed to generate PDF. Please try again.', 'error');
        }
    }
}

function truncateText(text, maxLength, startIndex = 0) {
    if (!text) return '';
    const part = text.substring(startIndex, startIndex + maxLength);
    return part.length < text.substring(startIndex).length ? part + '...' : part;
}

// Make function globally available
window.exportPDFReport = exportPDFReport;