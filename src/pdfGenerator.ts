import { jsPDF } from 'jspdf'
import "./font/OpenSans-normal"

const generatePDF = (firstName: string, lastName: string, image: Buffer) => {
    const doc = new jsPDF()

    doc.setFont('OpenSans', 'normal')
    const displayName = firstName + ' ' + lastName
    doc.text(displayName, 20, 30)
    // according to jsPDF documentation, second parameter is used only 
    // if automatic type recognition fails, so it is safe to use PNG or WEBP
    doc.addImage(image, 'JPEG', 20, 40, 50, 50)

    return doc.output('arraybuffer')
}

export default generatePDF
