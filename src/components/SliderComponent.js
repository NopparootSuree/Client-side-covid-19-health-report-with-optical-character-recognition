import { useState } from 'react'
const SliderComponent = ({slides}) => {
    const [ currentIndex, setCurrentUser ] = useState(0)

    const sliderStyles = {
        height: '100%',
        position: 'relative',
    }

    const slideStyles = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`
    }

    const leftArrowStyles = {
        position: 'absolute',
        top: '99%',
        tranform: 'translate(0, -50%)',
        left: '5px',
        fontSize: '60px',
        color: '#000',
        zIndex: 1,
        cursor: 'pointer'
    }

    const rightArrowStyles = {
        position: 'absolute',
        top: '99%',
        tranform: 'translate(0, -50%)',
        right: '5px',
        fontSize: '60px',
        color: '#000',
        zIndex: 1,
        cursor: 'pointer'
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentUser(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentUser(newIndex)
    }

    const dotsContainerStyles = {
        display: 'flex',
        justifyContent: 'center'
    }

    const dotsStyles = {
        margin: '0 3px',
        cursor: 'pointer',
        fontSize: '45px'
    }

    const gotoSlide = (slideIndex) => {
        setCurrentUser(slideIndex)
    }

    return (
        <div style={sliderStyles}>
            <div style={leftArrowStyles} onClick={goToPrevious}>◄</div>
            <div style={rightArrowStyles} onClick={goToNext}>►</div>
            <div style={slideStyles}></div>
            <div style={dotsContainerStyles}>
                {slides.map((slide, slideIndex) => (
                    <div key={slideIndex} style={dotsStyles} onClick={() => gotoSlide(slideIndex)}>•</div>
                ))}
            </div>
        </div>
    )
}

export default SliderComponent