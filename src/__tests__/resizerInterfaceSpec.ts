import path from 'path'
import imgResizerInterface from '../interfaces/imgResizerInterface'

const pathFullImage = path.resolve(__dirname, '../../img/full/okTest.jpg')
const pathThumbImage = path.resolve(
    __dirname,
    '../../img/thumb/okTest-200x400.jpg'
)

describe('Test API Resizing functionality', (): void => {
    it('Ok Buffer => OK Image', async () => {
        const imageBuffer: Buffer = await imgResizerInterface.imgResizer({
            height: 200,
            width: 400,
            pathFullImage,
            pathThumbImage,
        })
        expect(imageBuffer).toBeInstanceOf(Buffer)
    })

    it('promise rejection Test', async (): Promise<void> => {
        await expectAsync(
            imgResizerInterface.imgResizer({
                height: 100,
                width: 150,
                pathFullImage: '',
                pathThumbImage,
            })
        ).toBeRejected()
    })
})
