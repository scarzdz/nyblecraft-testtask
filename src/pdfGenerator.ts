import { jsPDF } from 'jspdf'
import font from './font/OpenSans-normal'

const callAddFont = function (this: any) {
    this.addFileToVFS('OpenSans-normal.ttf', font)
    this.addFont('OpenSans-normal.ttf', 'OpenSans', 'normal')
}
jsPDF.API.events.push(['addFonts', callAddFont])

const binaryToDataURL = (imageData: Buffer) => {
    return 'data:image/jpeg;base64,' + imageData.toString('base64')
}

const generatePDF = (firstName: string, lastName: string, imageData: Buffer) => {
    const image = binaryToDataURL(imageData)
    const doc = new jsPDF()

    doc.setFont('OpenSans', 'normal')
    const displayName = firstName + ' ' + lastName
    doc.text(displayName, 20, 30)

    doc.addImage(image, 'JPEG', 20, 40, 50, 50)

    return doc.output('arraybuffer')
}

export default generatePDF
