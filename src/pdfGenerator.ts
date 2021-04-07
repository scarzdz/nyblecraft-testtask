import { jsPDF } from 'jspdf'
import sizeOf from "image-size"
import "./font/OpenSans-normal"

const MAX_SIZE = 100

const getImageSize = (image: Buffer) => {
    const dimensions = sizeOf(image)
    let sizeX = 0
    let sizeY = 0

    if (dimensions.height && dimensions.width) {
        if (dimensions.height >= dimensions.width) {
            sizeY = MAX_SIZE
            sizeX = MAX_SIZE * dimensions.width / dimensions.height
        } else {
            sizeX = MAX_SIZE
            sizeY = MAX_SIZE * dimensions.height / dimensions.width
        }
    }
    return { x: sizeX, y: sizeY }
}

const generatePDF = (firstName: string, lastName: string, image: Buffer) => {
    const doc = new jsPDF()

    doc.setFont('OpenSans', 'normal')
    const displayName = firstName + ' ' + lastName
    doc.text(displayName, 20, 30)

    const size = getImageSize(image)
    // according to jsPDF documentation, second parameter is used only 
    // if automatic type recognition fails, so it is safe to use PNG or WEBP
    doc.addImage(image, 'JPEG', 20, 40, size.x, size.y)


    return doc.output('arraybuffer')
}

export default generatePDF
