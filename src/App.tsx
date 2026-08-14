import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import './App.css'

type ScheduleItem = {
  title: string
  date: string
  time: string
  image: string
}

const schedule: ScheduleItem[] = [
  { title: 'गणेश स्थापना', date: '१४ सप्टेंबर', time: 'सकाळी १०:०० वा.', image: '/assets/sthapana-opt.webp' },
  { title: 'आरती व पूजन', date: 'दररोज', time: '१०:०० व ७:००', image: '/assets/aarti-opt.webp' },
  { title: 'अथर्वशीर्ष', date: 'दररोज', time: 'सायं ६:३० वा.', image: '/assets/atharvshish-opt.webp' },
  { title: 'महाप्रसाद', date: '१५ सप्टेंबर', time: 'दुपारी १२:३०', image: '/assets/mahaprasad-opt.webp' },
  { title: 'स्नेहभेट', date: 'संपूर्ण उत्सव', time: 'परिवार व मित्र', image: '/assets/snehbhet-opt.webp' },
  { title: 'विसर्जन', date: '१८ सप्टेंबर', time: 'सायं ५:०० वा.', image: '/assets/visarjan-opt.webp' },
]

const members: Array<[string, string]> = [
  ['श्री. रमेश देशपांडे', '/assets/family-1-opt.webp'],
  ['सौ. रेखा देशपांडे', '/assets/family-2-opt.webp'],
  ['कु. स्वरा देशपांडे', '/assets/family-4-opt.webp'],
  ['चि. अथर्व देशपांडे', '/assets/family-3-opt.webp'],
]

const blessings = [
  'गणरायाच्या कृपेने सर्वांच्या जीवनात सुख, समृद्धी व आनंद नांदो.',
  'गणपती बाप्पा आपल्या जीवनात सुख, समृद्धी आणि आनंद घेऊन येवो.',
  'बाप्पाचे आशीर्वाद आपल्या परिवारावर सदैव राहो.',
  'मंगलमूर्ती मोरया! आपल्या सर्व इच्छा पूर्ण होवोत.',
  'गणराय आपल्या घरात आनंद आणि शांतता घेऊन येवो.',
]

const DateIcon = () => (
  <svg className="hero__date-icon" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 9h18" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const TimeIcon = () => (
  <svg className="hero__date-icon" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

const VenueIcon = () => (
  <svg className="hero__date-icon" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [blessingIndex, setBlessingIndex] = useState(0)
  const audio = useRef<HTMLAudioElement>(null)
  const timelineRefs = useRef<Array<HTMLDivElement | null>>([])
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    if (!isOpening) return
    const timer = window.setTimeout(() => setIsOpen(true), 900)
    return () => window.clearTimeout(timer)
  }, [isOpening])

  useEffect(() => {
    if (!isOpen) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        }
      },
      { threshold: 0.2 },
    )
    for (const item of timelineRefs.current) {
      if (item) observer.observe(item)
    }
    return () => observer.disconnect()
  }, [isOpen])

  function toggleMusic() {
    if (!audio.current) return
    if (musicOn) {
      audio.current.pause()
    } else {
      void audio.current.play()
    }
    setMusicOn((current) => !current)
  }

  function openInvitation() {
    setIsOpening(true)
  }

  function nextBlessing() {
    setBlessingIndex((current) => (current + 1) % blessings.length)
  }

  function scrollToSection(id: string) {
    const target = document.getElementById(id)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page">
      <audio ref={audio} src="/assets/bgMusic.mp3" loop preload="none" />

      {!isOpen && (
        <div className={`curtain-container${isOpening ? ' curtain-opening' : ''}`}>
          <div className="curtain-panel left">
            <div className="curtain-panel-decor" />
            <div className="curtain-decor-line" />
            <div className="curtain-decor-outer" />
            <div className="curtain-corner curtain-corner--top" />
            <div className="curtain-corner curtain-corner--bottom" />
          </div>
          <div className="curtain-panel right">
            <div className="curtain-panel-decor" />
            <div className="curtain-decor-line" />
            <div className="curtain-decor-outer" />
            <div className="curtain-corner curtain-corner--top" />
            <div className="curtain-corner curtain-corner--bottom" />
          </div>
          <div className="curtain-center-content">
            <div className="curtain-seal-ring" />
            <div className="curtain-seal-ring-inner" />
            <button className="curtain-seal" type="button" onClick={openInvitation} aria-label="Open invitation">
              <div className="curtain-seal-shine" />
              <span className="curtain-seal-text-hi">गणपती नमः</span>
              <span className="curtain-seal-text-en">Tap To Open</span>
            </button>
          </div>
        </div>
      )}

      <main className={isOpen ? 'invitation-visible' : 'invitation-hidden'}>
        <section className="hero">
          <img className="hero__top-layer" src="/assets/top-layer-opt.webp" alt="" />
          <img className="hero__top-layer hero__top-layer--mirror" src="/assets/top-layer-opt.webp" alt="" />

          <button
            className={`hero__music ${musicOn ? 'is-playing' : ''}`}
            type="button"
            onClick={toggleMusic}
            aria-label={musicOn ? 'Pause background music' : 'Play background music'}
          >
            <span>{musicOn ? '♫' : '♪'}</span>
          </button>

          <div className="hero__logo" aria-hidden="true">
            <img src="/assets/logo-opt.webp" alt="" />
          </div>

          <div className="hero__content">
            <p className="hero__glyph">॥ श्री गणेशाय नमः ॥</p>
            <img className="hero__ornament" src="/assets/divider-1-opt.webp" alt="" />
            <p className="hero__family">देशपांडे परिवाराकडून</p>
            <img className="hero__title" src="/assets/hero-text-opt.webp" alt="बाप्पांचे आगमन" />
            <img className="divider" src="/assets/divider-2-opt.webp" alt="" />
            <p className="hero__message">आमच्या घरी गणरायांचे<br />आगमन होत आहे...</p>
            <p className="hero__welcome">आपले सहर्ष स्वागत !</p>
            <img className="hero__murti" src="/assets/murti-opt.webp" alt="Lord Ganesha murti" />
          </div>

          <img className="hero__flower hero__flower--left" src="/assets/flower-opt.webp" alt="" />
          <img className="hero__flower hero__flower--right" src="/assets/flower-opt.webp" alt="" />

          <div className="hero__date-strip">
            <div className="hero__date-row">
              <div className="hero__date-item">
                <DateIcon />
                <div className="hero__date-text">
                  <span className="hero__date-label">तारीख</span>
                  <span className="hero__date-value">१४–१८ सप्टेंबर</span>
                </div>
              </div>
              <div className="hero__date-item">
                <TimeIcon />
                <div className="hero__date-text">
                  <span className="hero__date-label">वेळ</span>
                  <span className="hero__date-value">सकाळी १० वा.</span>
                </div>
              </div>
              <div className="hero__date-item">
                <VenueIcon />
                <div className="hero__date-text">
                  <span className="hero__date-label">ठिकाण</span>
                  <span className="hero__date-value">देशपांडे निवास</span>
                </div>
              </div>
            </div>
          </div>

          <button className="hero__scroll" type="button" onClick={() => scrollToSection('nimantrak')} aria-label="Scroll to next section">
            <span>↓</span>
          </button>
        </section>

        <section className="nimantrak-section" id="nimantrak">
          <div className="nimantrak-header">
            <span className="section-label">INVITING FAMILY</span>
            <h2 className="nimantrak-title">निमंत्रक</h2>
            <img className="heading-ornament" src="/assets/divider-2-opt.webp" alt="" />
            <div className="family-plaque">
              <img className="plaque-flower plaque-left" src="/assets/flower-opt.webp" alt="" />
              <div className="plaque-content">
                <span className="plaque-subtitle">परिवार</span>
                <h3>देशपांडे परिवार</h3>
              </div>
              <img className="plaque-flower plaque-right" src="/assets/flower-opt.webp" alt="" />
            </div>
            <p className="nimantrak-subtitle">
              गणरायाच्या आगमनाच्या या मंगल क्षणी आपण सर्वांनी उपस्थित राहून उत्सवाची शोभा वाढवावी.
            </p>
            <img className="small-divider" src="/assets/divider-2-opt.webp" alt="" />
          </div>

          <div className="family-carousel-container">
            <Swiper
              modules={[Navigation]}
              navigation={{ prevEl: '.family-nav-prev', nextEl: '.family-nav-next' }}
              onSwiper={(swiper) => { swiperRef.current = swiper }}
              slidesPerView={1.1}
              spaceBetween={16}
              centeredSlides
              loop
              breakpoints={{
                768: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 3.2, spaceBetween: 32 },
              }}
              className="family-swiper"
            >
              {members.map(([name, image]) => (
                <SwiperSlide key={name} className="family-slide">
                  <div className="family-card">
                    <div className="card-image">
                      <img src={image} alt={name} />
                    </div>
                    <div className="card-name">{name}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="family-nav-prev"
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous family member"
            >
              ‹
            </button>
            <button
              className="family-nav-next"
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next family member"
            >
              ›
            </button>
          </div>

          <div className="invite-message">
            <p>गणरायाच्या आगमन सोहळ्यास आपली</p>
            <p>उपस्थिती आम्हांस आनंददायी ठरेल.</p>
          </div>
          <img className="bottom-ornament" src="/assets/divider-2-opt.webp" alt="" />

          <div className="custom-shape-divider-bottom-1781437587">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,321.39,56.44Z" className="shape-fill" />
            </svg>
          </div>
        </section>

        <section className="utsav-section">
          <div className="utsav-header">
            <span className="section-label">UTSAV SOHALA</span>
            <h2 className="utsav-title">आयोजन</h2>
            <img className="utsav-ornament" src="/assets/divider-2-opt.webp" alt="" />
            <p className="utsav-subtitle">भक्ती, प्रेम आणि आनंदाने भरलेला<br />गणरायाच्या आगमनाचा मंगल सोहळा</p>
          </div>

          <div className="timeline">
            <div className="wave-line" />
            {schedule.map((item, index) => (
              <div
                key={item.title}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                ref={(el) => { timelineRefs.current[index] = el }}
              >
                <div className="timeline-node" />
                <div className="event-card">
                  <img className="event-icon" src={item.image} alt="" />
                  <h3>{item.title}</h3>
                  <span className="event-date">{item.date}</span>
                  <span className="event-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="utsav-message">
            <img className="utsav-message-divider" src="/assets/divider-2-opt.webp" alt="" />
            <p>
              गणरायाच्या आगमनाने आमचे घर आनंद, भक्ती आणि मंगलमय वातावरणाने उजळून निघाले आहे. या पवित्र उत्सवात आपल्या प्रेमळ उपस्थितीने सोहळ्याची शोभा वाढवावी हीच नम्र विनंती.
            </p>
            <span>गणपती बाप्पा मोरया!</span>
          </div>
        </section>

        <section className="blessings-section">
          <div className="blessings-container">
            <span className="blessings-label">BLESSINGS</span>
            <h2 className="blessings-title">शुभेच्छा</h2>
            <img className="blessings-divider" src="/assets/divider-2-opt.webp" alt="" />
          </div>
          <div style={{ maxWidth: '650px', margin: '0 auto', padding: '0 20px' }}>
            <button className="blessing-card" type="button" onClick={nextBlessing}>
              <img className="card-flower flower-left" src="/assets/flower-opt.webp" alt="" />
              <img className="card-flower flower-right" src="/assets/flower-opt.webp" alt="" />
              <span className="quote-star">✦</span>
              <p className="blessing-text" key={blessingIndex}>{blessings[blessingIndex]}</p>
            </button>
            <p className="tap-message">✦ स्पर्श करा व नवीन आशीर्वाद वाचा ✦</p>
          </div>
        </section>

        <section className="gallery-section">
          <div className="gallery-container">
            <span className="gallery-label">PREPARATION MOMENTS</span>
            <h2 className="gallery-title">आगमनाची तयारी</h2>
            <img className="gallery-divider" src="/assets/divider-2-opt.webp" alt="" />
            <p className="gallery-subtitle">
              गणरायाच्या स्वागतासाठी<br />प्रेमाने सजवलेले काही खास क्षण
            </p>

            <div className="featured-photo">
              <img src="/assets/gallery-1-opt.webp" alt="Ganpati celebration preparation" />
            </div>

            <div className="gallery-grid">
              <div className="gallery-card tilt-left">
                <img src="/assets/gallery-2-opt.webp" alt="Ganpati celebration preparation" />
              </div>
              <div className="gallery-card tilt-right">
                <img src="/assets/gallery-3-opt.webp" alt="Ganpati celebration preparation" />
              </div>
              <div className="gallery-card tilt-right">
                <img src="/assets/gallery-4-opt.webp" alt="Ganpati celebration preparation" />
              </div>
              <div className="gallery-card tilt-left">
                <img src="/assets/gallery-5-opt.webp" alt="Ganpati celebration preparation" />
              </div>
            </div>

            <div className="gallery-message">
              <img src="/assets/divider-2-opt.webp" alt="" />
              <p>या तयारीमागील प्रत्येक क्षण गणरायाच्या<br />स्वागतासाठी भक्ती आणि प्रेमाने सजवला आहे.</p>
            </div>
          </div>
        </section>

        <section className="location-section">
          <div className="location-container">
            <span className="location-label">LOCATION</span>
            <h2 className="location-title">ठिकाण</h2>
            <img className="location-divider" src="/assets/divider-2-opt.webp" alt="" />
            <p className="location-subtitle">गणरायाच्या आगमन सोहळ्यास<br />आपले सहर्ष स्वागत आहे</p>

            <div className="location-card">
              <div className="map-container">
                <iframe
                  title="Deshpande residence map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15087.840252981321!2d72.83266058866177!3d19.021481400909252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cedb0ea0cd0f%3A0x428a465039995bd0!2sDadar%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1781515306818!5m2!1sen!2sin"
                  loading="lazy"
                />
              </div>
              <div className="location-content">
                <h3>देशपांडे निवास</h3>
                <p className="location-address">
                  फ्लॅट नं. ४०२,<br />
                  श्री गणेशा अपार्टमेंट्स, शिवाजीनगर<br />
                  पुणे - ४११००५
                </p>
                <a className="maps-button" href="https://maps.google.com" target="_blank" rel="noreferrer">
                  Open Maps <span>↗</span>
                </a>
                <p className="location-note">आपल्या सहकुटुंब उपस्थितीने<br />उत्सवाची शोभा वाढेल</p>
              </div>
            </div>
          </div>

          <div className="custom-shape-divider-bottom-1781516738">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,321.39,56.44Z" className="shape-fill" />
            </svg>
          </div>
        </section>

        <footer className="ganpati-footer">
          <div className="footer-top-fade" />
          <div className="footer-content">
            <img className="footer-flower footer-left" src="/assets/flower-opt.webp" alt="" />
            <img className="footer-flower footer-right" src="/assets/flower-opt.webp" alt="" />
            <div className="footer-om">ॐ</div>
            <img className="footer-divider" src="/assets/divider-2-opt.webp" alt="" />
            <div className="footer-blessing">
              <h2>आपली उपस्थिती हेच<br />आमच्यासाठी बाप्पांचे खरे<br />आशीर्वाद आहेत.</h2>
            </div>
            <p className="footer-family">— देशपांडे परिवार</p>
            <p className="footer-subtext">
              गणरायाच्या चरणी आपल्या सहकुटुंब स्वागताची विनंती.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App