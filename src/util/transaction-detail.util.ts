export const repeatTransaction = () => {
  alert(
    ' TO DO. Mostrar un preview de como quedaria, permitir editar los montos, y hacer una peticion al endpoint de wpp para recrear la transaccion'
  );
};
export const downloadDetail = (transaction) => {
  try {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('Transaction Details', 20, 20);

    doc.setFontSize(12);
    doc.text(`Payment ID: ${transaction.transaction_id}`, 20, 30);
    doc.text(`Date: ${transaction.date}`, 20, 40);
    doc.text(`Sender: ${transaction.sender_whatsapp}`, 20, 50);
    doc.text(`Receiver: ${transaction.receiver_whatsapp}`, 20, 60);
    doc.text(`Amount Sent: ${transaction.amount_sent}`, 20, 70);
    doc.text(`Amount Received: ${transaction.amount_received}`, 20, 80);
    doc.text(`Exchange Rate: ${transaction.exchange_rate}`, 20, 90);
    doc.text(`Status: ${transaction.status}`, 20, 100);

    doc.save(`Transaction_${transaction.transaction_id}.pdf`);
  } catch (error) {
    alert('Hubo un error al intentar descargar el PDF. Intenta nuevamente.' + error);
  }
};
