import './index.scss';
import HotelCard from '../../../../components/UserComponents/Home/HotelCard/index.jsx';
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import image from '../../../../assets/HotelCard1.jpg';
import image2 from '../../../../assets/HotelCard2.jpg';
import image3 from '../../../../assets/HotelCard3.jpg';
import image4 from '../../../../assets/HotelCard4.jpg';
import image5 from '../../../../assets/HotelCard5.jpg';
import image6 from '../../../../assets/HotelCard6.jpg';

function HomeHotel() {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(4);
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startPos = useRef(0);
    const currentTranslate = useRef(0);
    const prevTranslate = useRef(0);

    const cards = [
        {
            name: t('homeHotel.cards.ritzCarlton.name'),
            description: t('homeHotel.cards.ritzCarlton.description'),
            imageUrl: image,
        },
        {
            name: t('homeHotel.cards.westinGrand.name'),
            description: t('homeHotel.cards.westinGrand.description'),
            imageUrl: image2,
        },
        {
            name: t('homeHotel.cards.crownePlaza.name'),
            description: t('homeHotel.cards.crownePlaza.description'),
            imageUrl: image3,
        },
        {
            name: t('homeHotel.cards.siamKempinski.name'),
            description: t('homeHotel.cards.siamKempinski.description'),
            imageUrl: image4,
        },
        {
            name: t('homeHotel.cards.raffles.name'),
            description: t('homeHotel.cards.raffles.description'),
            imageUrl: image5,
        },
        {
            name: t('homeHotel.cards.mandarinOriental.name'),
            description: t('homeHotel.cards.mandarinOriental.description'),
            imageUrl: image6,
        },
    ];
    const maxIndex = cards.length - visibleCards;

    useEffect(() => {
        const updateVisibleCards = () => {
            if (window.innerWidth <= 576) {
                setVisibleCards(2);
            } else {
                setVisibleCards(4);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    useEffect(() => {
        const newMaxIndex = cards.length - visibleCards;
        if (currentIndex > newMaxIndex) {
            setCurrentIndex(newMaxIndex);
            sliderRef.current.style.transform = `translateX(-${newMaxIndex * (100 / visibleCards)}%)`;
            currentTranslate.current = -newMaxIndex * (100 / visibleCards);
            prevTranslate.current = currentTranslate.current;
        }
    }, [visibleCards, currentIndex]);

    const handleBulletClick = (index) => {
        if (index <= maxIndex) {
            setCurrentIndex(index);
            sliderRef.current.style.transform = `translateX(-${index * (100 / visibleCards)}%)`;
            prevTranslate.current = -index * (100 / visibleCards);
        }
    };

    const getPositionX = (event) => {
        return event.type.includes('mouse')
            ? event.pageX
            : event.touches[0].clientX;
    };

    const startDragging = (event) => {
        isDragging.current = true;
        startPos.current = getPositionX(event);
        sliderRef.current.style.transition = 'none';
    };

    const stopDragging = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        sliderRef.current.style.transition = 'transform 0.3s ease-in-out';

        const movedBy = currentTranslate.current - prevTranslate.current;
        let newIndex = currentIndex;

        if (movedBy < -10 && currentIndex < maxIndex) {
            newIndex += 1;
        } else if (movedBy > 10 && currentIndex > 0) {
            newIndex -= 1;
        }

        setCurrentIndex(newIndex);
        currentTranslate.current = -newIndex * (100 / visibleCards);
        prevTranslate.current = currentTranslate.current;
        sliderRef.current.style.transform = `translateX(${currentTranslate.current}%)`;
    };

    const drag = (event) => {
        if (!isDragging.current) return;
        const currentPosition = getPositionX(event);
        const movedBy = currentPosition - startPos.current;

        const sliderWidth = sliderRef.current.offsetWidth / visibleCards;
        const movePercentage = (movedBy / sliderWidth) * (100 / visibleCards);

        currentTranslate.current = prevTranslate.current + movePercentage;
        sliderRef.current.style.transform = `translateX(${currentTranslate.current}%)`;
    };

    return (
        <div id="home-hotel">
            <div className="container">
                <div className="head">
                    <h2>{t('homeHotel.title')}</h2>
                </div>
                <div
                    className="slider-wrapper"
                    onMouseDown={startDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onMouseMove={drag}
                    onTouchStart={startDragging}
                    onTouchEnd={stopDragging}
                    onTouchMove={drag}
                >
                    <div className="slider-card row" ref={sliderRef}>
                        {cards.map((item, index) => (
                            <HotelCard
                                key={index}
                                name={item.name}
                                desc={item.description}
                                img={item.imageUrl}
                                imgAlt={t('homeHotel.cardImgAlt', { name: item.name })}
                            />
                        ))}
                    </div>
                </div>
                <div className="custom-pagination">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <span
                            key={index}
                            className={`custom-bullet ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => handleBulletClick(index)}
                            aria-label={t('homeHotel.slideAriaLabel', { slideNumber: index + 1 })}
                            role="button"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomeHotel;