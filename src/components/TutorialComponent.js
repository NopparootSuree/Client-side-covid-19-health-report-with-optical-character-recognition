import image0 from '../img/0.png'
import image1 from '../img/1.png'
import image2 from '../img/1.2.png'
import image3 from '../img/2.png'
import image4 from '../img/2.1.png'
import image5 from '../img/3.png'
import image6 from '../img/3.1.png'
import SliderComponent from './SliderComponent'
import './TutorialComponent.css'

const TutorialComponent = () => {
    const slides = [
        {url: image0, title: 'ขั้นตอนการใช้งาน'},
        {url: image1, title: 'เมนูที่1'},
        {url: image2, title: 'ขั้นตอนการส่งรูปภาพ'},
        {url: image3, title: 'เมนูที่2'},
        {url: image4, title: 'การกรอกแบบฟอร์มออนไลน์'},
        {url: image5, title: 'เมนูที่3'},
        {url: image6, title: 'การดาวน์โหลดแบบฟอร์มรายงานอาการ'}
    ]
    
    return (
        <div>
            <div className='containerStyles'>
                <SliderComponent slides={slides} />
            </div>
        </div>
    )
}

export default TutorialComponent