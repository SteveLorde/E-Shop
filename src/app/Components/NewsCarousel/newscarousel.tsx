import { useState } from "react";
import styles from '@/app/Components/NewsCarousel/style.module.css'


export function NewsCarousel() {

    const slides = [
        "Slide 1 Content",
        "Slide 2 Content",
        "Slide 3 Content",
    ]
    const totalslides = slides.length

    function goToNextSlide() {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalslides)
      }
    
      function goToPrevSlide() {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalslides) % totalslides)
      }


    const [currentSlide, setCurrentSlide] = useState(0)

    return <>
        <div className={styles.carousel}>
            <div className={styles.slideContainer}>
                {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${styles.slide} ${index === currentSlide && styles.activeSlide}`}
                >
                    {slide}
                </div>
                ))}
            </div>
            <button onClick={goToPrevSlide}>Previous</button>
            <button onClick={goToNextSlide}>Next</button>
        </div>
    </>



}