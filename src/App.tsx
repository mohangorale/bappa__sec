import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './App.css'

const DATA = {
  theme: 'ivoryGold',
  meta: {
    title: 'Deshpande Ganapati Invitation',
    description: 'गणरायाच्या आगमनाचे सस्नेह आमंत्रण',
  },
  hero: {
    family: 'देशपांडे परिवाराकडून',
    title: 'बाप्पांचे आगमन',
    message: 'आमच्या घरी गणरायांचे\nआगमन होत आहे...',
    welcome: 'आपले सहर्ष स्वागत !',
  },
  family: {
    label: 'INVITING FAMILY',
    title: 'निमंत्रक',
    plaqueTitle: 'देशपांडे परिवार',
    subtitle: 'गणरायाच्या आगमनाच्या या मंगल क्षणी आपण सर्वांनी उपस्थित राहून उत्सवाची शोभा वाढवावी.',
    inviteMessage: 'गणरायाच्या आगमन सोहळ्यास आपली\nउपस्थिती आम्हांस आनंददायी ठरेल.',
    members: [
      { name: 'श्री. रमेश देशपांडे', image: 'family-1-opt.webp' },
      { name: 'सौ. रेखा देशपांडे', image: 'family-2-opt.webp' },
      { name: 'कु. स्वरा देशपांडे', image: 'family-4-opt.webp' },
      { name: 'चि. अथर्व देशपांडे', image: 'family-3-opt.webp' },
    ],
  },
  utsav: {
    label: 'UTSAV SOHALA',
    title: 'आयोजन',
    subtitle: 'भक्ती, प्रेम आणि आनंदाने भरलेला\nगणरायाच्या आगमनाचा मंगल सोहळा',
    timeline: [
      { title: 'गणेश स्थापना', date: '१४ सप्टेंबर', time: 'सकाळी १०:०० वा.', icon: 'sthapana-opt.webp' },
      { title: 'आरती व पूजन', date: 'दररोज', time: '१०:०० व ७:००', icon: 'aarti-opt.webp' },
      { title: 'अथर्वशीर्ष', date: 'दररोज', time: 'सायं ६:३० वा.', icon: 'atharvshish-opt.webp' },
      { title: 'महाप्रसाद', date: '१५ सप्टेंबर', time: 'दुपारी १२:३०', icon: 'mahaprasad-opt.webp' },
      { title: 'स्नेहभेट', date: 'संपूर्ण उत्सव', time: 'परिवार व मित्र', icon: 'snehbhet-opt.webp' },
      { title: 'विसर्जन', date: '१८ सप्टेंबर', time: 'सायं ५:०० वा.', icon: 'visarjan-opt.webp' },
    ],
    message: 'गणरायाच्या आगमनाने आमचे घर आनंद, भक्ती आणि मंगलमय वातावरणाने उजळून निघाले आहे. या पवित्र उत्सवात आपल्या प्रेमळ उपस्थितीने सोहळ्याची शोभा वाढवावी हीच नम्र विनंती.',
    chant: 'गणपती बाप्पा मोरया!',
  },
  blessings: {
    label: 'BLESSINGS',
    title: 'शुभेच्छा',
    tapMessage: '✦ स्पर्श करा व नवीन आशीर्वाद वाचा ✦',
    list: [
      'गणरायाच्या कृपेने सर्वांच्या जीवनात सुख, समृद्धी व आनंद नांदो.',
      'गणपती बाप्पा आपल्या जीवनात सुख, समृद्धी आणि आनंद घेऊन येवो.',
      'बाप्पाचे आशीर्वाद आपल्या परिवारावर सदैव राहो.',
      'मंगलमूर्ती मोरया! आपल्या सर्व इच्छा पूर्ण होवोत.',
      'गणराय आपल्या घरात आनंद आणि शांतता घेऊन येवो.',
    ],
  },
  gallery: {
    label: 'PREPARATION MOMENTS',
    title: 'आगमनाची तयारी',
    subtitle: 'गणरायाच्या स्वागतासाठी\nप्रेमाने सजवलेले काही खास क्षण',
    featuredImage: 'gallery-1-opt.webp',
    images: ['gallery-2-opt.webp', 'gallery-3-opt.webp', 'gallery-4-opt.webp', 'gallery-5-opt.webp'],
    message: 'या तयारीमागील प्रत्येक क्षण गणरायाच्या\nस्वागतासाठी भक्ती आणि प्रेमाने सजवला आहे.',
  },
  location: {
    label: 'LOCATION',
    title: 'ठिकाण',
    subtitle: 'गणरायाच्या आगमन सोहळ्यास\nआपले सहर्ष स्वागत आहे',
    placeName: 'देशपांडे निवास',
    address: 'फ्लॅट नं. ४०२,\nश्री गणेशा अपार्टमेंट्स, शिवाजीनगर\nपुणे - ४११००५',
    mapsLink: 'https://maps.google.com',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15087.840252981321!2d72.83266058866177!3d19.021481400909252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cedb0ea0cd0f%3A0x428a465039995bd0!2sDadar%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1781515306818!5m2!1sen!2sin',
    note: 'आपल्या सहकुटुंब उपस्थितीने\nउत्सवाची शोभा वाढेल',
  },
  footer: {
    blessing: 'आपली उपस्थिती हेच\nआमच्यासाठी बाप्पांचे खरे\nआशीर्वाद आहेत.',
    familySignature: '— देशपांडे परिवार',
  },
  audio: {
    path: '/assets/bgMusic.mp3',
    volume: 0.35,
    autoplayAfterInteraction: true,
  },
}

function Curtain({ onOpenStart, onComplete }: { onOpenStart?: () => void; onComplete?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRendered, setIsRendered] = useState(true)

  useEffect(() => {
    if (isRendered && !isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isRendered, isOpen])

  if (!isRendered) return null

  return (
    <div className="curtain-container" style={{ pointerEvents: isOpen ? 'none' : 'auto' }} aria-hidden="true">
      <motion.div
        className="curtain-panel left"
        initial={{ x: 0 }}
        animate={isOpen ? { x: '-100%' } : { x: 0 }}
        transition={{ delay: 0.5, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="curtain-panel-decor" />
        <div className="curtain-decor-line" />
        <div className="curtain-decor-outer" />
        <div className="curtain-corner curtain-corner--top" />
        <div className="curtain-corner curtain-corner--bottom" />
      </motion.div>

      <motion.div
        className="curtain-panel right"
        initial={{ x: 0 }}
        animate={isOpen ? { x: '100%' } : { x: 0 }}
        transition={{ delay: 0.5, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="curtain-panel-decor" />
        <div className="curtain-decor-line" />
        <div className="curtain-decor-outer" />
        <div className="curtain-corner curtain-corner--top" />
        <div className="curtain-corner curtain-corner--bottom" />
      </motion.div>

      <motion.div
        className="curtain-center-content"
        initial={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        animate={isOpen ? { opacity: 0, scale: 0.85, x: '-50%', y: '-50%' } : { opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
        transition={isOpen ? { duration: 0.5, ease: 'easeIn' } : { duration: 0 }}
      >
        <div className="curtain-seal-ring" />
        <div className="curtain-seal-ring-inner" />
        <button
          className="curtain-seal"
          type="button"
          onClick={() => {
            setIsOpen(true)
            onOpenStart?.()
            setTimeout(() => {
              setIsRendered(false)
              onComplete?.()
            }, 2500)
          }}
        >
          <span className="curtain-seal-text-hi">गणपती नमः</span>
          <span className="curtain-seal-text-en">Tap To Open</span>
          <span className="curtain-seal-shine" />
        </button>
      </motion.div>
    </div>
  )
}

function Hero({ isMusicPlaying, onToggleMusic, introStarted }: { isMusicPlaying: boolean; onToggleMusic: () => void; introStarted: boolean }) {
  const { hero } = DATA
  return (
    <section className="hero" id="hero">
      <motion.img
        className="hero__top-layer"
        src="/assets/top-layer-opt.webp"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: introStarted ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <button
        className={`hero__music ${isMusicPlaying ? 'is-playing' : ''}`}
        id="musicBtn"
        type="button"
        aria-label="Play background music"
        onClick={onToggleMusic}
      >
        <span id="musicIcon">{isMusicPlaying ? '♫' : '♪'}</span>
      </button>

      <motion.div
        className="hero__logo"
        aria-hidden="true"
        initial={{ opacity: 0, y: -10, x: '-50%' }}
        animate={introStarted ? { opacity: 1, y: 0, x: '-50%' } : { opacity: 0, y: -10, x: '-50%' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0, 0.55, 0.45, 1] }}
      >
        <img src="/assets/logo-opt.webp" alt="" />
        <p className="hero__tiny hero__tiny--ganesh" style={{ margin: 0, fontFamily: '"Tiro Devanagari Marathi", "Noto Serif Devanagari", serif', fontSize: 'clamp(0.95rem, 4vw, 1.08rem)', color: 'var(--ink)' }}>
          ॥ श्री गणेशाय नमः ॥
        </p>
      </motion.div>

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={introStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0, 0.55, 0.45, 1] }}
      >
        <img className="divider divider--thin" src="/assets/divider-1-opt.webp" alt="" aria-hidden="true" />
        <p className="hero__family">{hero.family}</p>
        <img className="hero__title" src="/assets/hero-text-opt.webp" alt={hero.title} />
        <img className="divider" src="/assets/divider-2-opt.webp" alt="" aria-hidden="true" />
        <p className="hero__message" dangerouslySetInnerHTML={{ __html: hero.message.replace(/\n/g, '<br />') }} />
        <p className="hero__welcome">{hero.welcome}</p>
        <img className="hero__murti" src="/assets/murti-opt.webp" alt="Lord Ganesha murti" />
      </motion.div>

      <img className="hero__flower hero__flower--left" src="/assets/flower-opt.webp" alt="" aria-hidden="true" />
      <img className="hero__flower hero__flower--right" src="/assets/flower-opt.webp" alt="" aria-hidden="true" />

      <div className="hero-divider">
        <img src="/assets/divider-2-opt.webp" alt="" />
      </div>

      <div className="hero-tag">
        <img src="/assets/tag-opt.webp" alt="Invitation Details" />
      </div>

      <div className="scroll-indicator">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="#C89B3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

function Nimantrak() {
  const { family } = DATA
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  let members = [...family.members]
  while (members.length < 6) {
    members = [...members, ...family.members]
  }

  return (
    <section className="nimantrak-section">
      <div className="custom-shape-divider-top-1781551738">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z" className="shape-fill" stroke="#f7f0e4" strokeWidth="2" />
        </svg>
      </div>

      <div className="nimantrak-header">
        <span className="section-label">{family.label}</span>
        <h2 className="nimantrak-title">{family.title}</h2>
        <img src="/assets/divider-2-opt.webp" alt="" className="heading-ornament" />
        <div className="family-plaque">
          <img src="/assets/flower-opt.webp" className="plaque-flower plaque-left" alt="" />
          <div className="plaque-content">
            <h3>{family.plaqueTitle}</h3>
          </div>
          <img src="/assets/flower-opt.webp" className="plaque-flower plaque-right" alt="" />
        </div>
        <p className="nimantrak-subtitle">{family.subtitle}</p>
        <img src="/assets/divider-2-opt.webp" alt="" className="heading-ornament" />
      </div>

      <div className="family-carousel-container">
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onInit={(swiper) => {
            // @ts-expect-error swiper internal
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-expect-error swiper internal
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          centeredSlides
          loop
          loopAdditionalSlides={3}
          watchSlidesProgress
          speed={600}
          spaceBetween={0}
          breakpoints={{
            0: { slidesPerView: 1.15, centeredSlides: true },
            768: { slidesPerView: 2, centeredSlides: true },
            1024: { slidesPerView: 3, centeredSlides: true },
          }}
          className="family-swiper"
        >
          {members.map((member, idx) => (
            <SwiperSlide key={idx} className="family-slide">
              <div className="family-card">
                <div className="card-image">
                  <img src={`/assets/${member.image}`} alt={member.name} />
                </div>
                <div className="card-name">{member.name}</div>
              </div>
            </SwiperSlide>
          ))}
          <div className="family-nav-prev" ref={prevRef}>‹</div>
          <div className="family-nav-next" ref={nextRef}>›</div>
        </Swiper>
      </div>

      <div className="invite-message" dangerouslySetInnerHTML={{ __html: `<p>${family.inviteMessage.replace(/\n/g, '</p><p>')}</p>` }} />

      <img src="/assets/divider-2-opt.webp" alt="" className="bottom-ornament" />

      <div className="custom-shape-divider-bottom-1781437587">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z" className="shape-fill" stroke="#f8f1e5" strokeWidth="2" />
        </svg>
      </div>
    </section>
  )
}

function Utsav() {
  const { utsav } = DATA
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.15 },
    )

    const items = timelineRef.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))

    return () => {
      items?.forEach((item) => observer.unobserve(item))
    }
  }, [])

  return (
    <section className="utsav-section">
      <div className="utsav-header">
        <span className="section-label">{utsav.label}</span>
        <h2 className="utsav-title">{utsav.title}</h2>
        <img src="/assets/divider-2-opt.webp" alt="" className="utsav-ornament" />
        <p className="utsav-subtitle" dangerouslySetInnerHTML={{ __html: utsav.subtitle.replace(/\n/g, '<br />') }} />
      </div>

      <div className="timeline" ref={timelineRef}>
        <div className="wave-line" />
        {utsav.timeline.map((item, index) => (
          <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="event-card">
              <img src={`/assets/${item.icon}`} className="event-icon" alt="" />
              <h3>{item.title}</h3>
              <span className="event-date">{item.date}</span>
              <span className="event-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="utsav-message">
        <img src="/assets/divider-2-opt.webp" alt="" className="utsav-message-divider" />
        <p>{utsav.message}</p>
        <span>{utsav.chant}</span>
      </div>
    </section>
  )
}

function Blessings() {
  const { blessings } = DATA
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleNext = () => {
    if (busy) return
    setBusy(true)
    setFading(true)
    setTimeout(() => {
      setIndex((curr) => (curr + 1) % blessings.list.length)
      setFading(false)
      setTimeout(() => {
        setBusy(false)
      }, 400)
    }, 400)
  }

  return (
    <section className="blessings-section">
      <div className="blessings-container">
        <span className="blessings-label">{blessings.label}</span>
        <h2 className="blessings-title">{blessings.title}</h2>
        <img src="/assets/divider-2-opt.webp" alt="" className="blessings-divider" />

        <div id="blessingCard" className="blessing-card" onClick={handleNext} style={{ cursor: 'pointer' }}>
          <img src="/assets/flower-opt.webp" alt="" className="card-flower flower-left" />
          <img src="/assets/flower-opt.webp" alt="" className="card-flower flower-right" />
          <div className="quote-star">✦</div>
          <p
            id="blessingText"
            className="blessing-text"
            style={{
              transition: 'opacity 0.4s ease, transform 0.4s ease',
              opacity: fading ? 0 : 1,
              transform: fading ? 'translateY(-8px)' : 'translateY(0)',
            }}
          >
            {blessings.list[index]}
          </p>
        </div>

        <div className="tap-message">{blessings.tapMessage}</div>
      </div>
    </section>
  )
}

function Gallery() {
  const { gallery } = DATA
  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <span className="gallery-label">{gallery.label}</span>
        <h2 className="gallery-title">{gallery.title}</h2>
        <img src="/assets/divider-2-opt.webp" alt="" className="gallery-divider" />
        <p className="gallery-subtitle" dangerouslySetInnerHTML={{ __html: gallery.subtitle.replace(/\n/g, '<br />') }} />

        <div className="featured-photo">
          <img src={`/assets/${gallery.featuredImage}`} alt="" />
        </div>

        <div className="gallery-grid">
          {gallery.images.map((img, i) => (
            <div key={i} className={`gallery-card ${i % 2 === 0 ? 'tilt-left' : 'tilt-right'}`}>
              <img src={`/assets/${img}`} alt="" />
            </div>
          ))}
        </div>

        <div className="gallery-message">
          <img src="/assets/divider-2-opt.webp" alt="" />
          <p dangerouslySetInnerHTML={{ __html: gallery.message.replace(/\n/g, '<br />') }} />
        </div>
      </div>
    </section>
  )
}

function Location() {
  const { location } = DATA
  return (
    <section className="location-section">
      <div className="location-container">
        <span className="location-label">{location.label}</span>
        <h2 className="location-title">{location.title}</h2>
        <img src="/assets/divider-2-opt.webp" className="location-divider" alt="" />
        <p className="location-subtitle" dangerouslySetInnerHTML={{ __html: location.subtitle.replace(/\n/g, '<br />') }} />

        <div className="location-card">
          <div className="map-container">
            <iframe
              src={location.mapEmbed}
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
          <div className="location-content">
            <h3>{location.placeName}</h3>
            <p className="location-address" dangerouslySetInnerHTML={{ __html: location.address.replace(/\n/g, '<br />') }} />
            <a href={location.mapsLink} target="_blank" rel="noreferrer" className="maps-button">
              Open Maps
            </a>
            <p className="location-note" dangerouslySetInnerHTML={{ __html: location.note.replace(/\n/g, '<br />') }} />
          </div>
        </div>
      </div>

      <div className="custom-shape-divider-bottom-1781516738">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill" />
        </svg>
      </div>
    </section>
  )
}

function Footer() {
  const { footer } = DATA
  return (
    <footer className="ganpati-footer">
      <div className="footer-top-fade" />
      <div className="footer-content">
        <img src="/assets/flower-opt.webp" className="footer-flower footer-left" alt="" />
        <img src="/assets/flower-opt.webp" className="footer-flower footer-right" alt="" />
        <div className="footer-om">ॐ</div>
        <img src="/assets/divider-2-opt.webp" alt="" className="footer-divider" />
        <div className="footer-blessing">
          <h2 dangerouslySetInnerHTML={{ __html: footer.blessing.replace(/\n/g, '<br />') }} />
        </div>
        <div className="footer-family">{footer.familySignature}</div>
      </div>
    </footer>
  )
}

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [introStarted, setIntroStarted] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    const colors = {
      ivory: '#f6efe4',
      ivory2: '#fbf6ec',
      paper: '#fff8ef',
      paper2: '#f3e7d3',
      gold: '#c69b3e',
      gold2: '#9d6f22',
      gold3: '#e2c06c',
      ink: '#6a4825',
      ink2: '#4b311a',
      orange: '#dd6a22',
      orange2: '#c95716',
      orange3: '#ef8b30',
      orangeDeep: '#9c3c0f',
      shadow: 'rgba(121, 79, 31, 0.12)',
      shadow2: 'rgba(121, 79, 31, 0.18)',
      border: 'rgba(198, 155, 62, 0.24)',
      borderSoft: 'rgba(198, 155, 62, 0.12)',
    }
    root.style.setProperty('--ivory', colors.ivory)
    root.style.setProperty('--ivory-2', colors.ivory2)
    root.style.setProperty('--paper', colors.paper)
    root.style.setProperty('--paper-2', colors.paper2)
    root.style.setProperty('--gold', colors.gold)
    root.style.setProperty('--gold-2', colors.gold2)
    root.style.setProperty('--gold-3', colors.gold3)
    root.style.setProperty('--ink', colors.ink)
    root.style.setProperty('--ink-2', colors.ink2)
    root.style.setProperty('--orange', colors.orange)
    root.style.setProperty('--orange-2', colors.orange2)
    root.style.setProperty('--orange-3', colors.orange3)
    root.style.setProperty('--orange-deep', colors.orangeDeep)
    root.style.setProperty('--shadow', colors.shadow)
    root.style.setProperty('--shadow-2', colors.shadow2)
    root.style.setProperty('--border', colors.border)
    root.style.setProperty('--border-soft', colors.borderSoft)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = DATA.audio.volume
    const handleState = () => setIsMusicPlaying(!audio.paused)
    audio.addEventListener('play', handleState)
    audio.addEventListener('pause', handleState)
    audio.addEventListener('ended', handleState)
    return () => {
      audio.removeEventListener('play', handleState)
      audio.removeEventListener('pause', handleState)
      audio.removeEventListener('ended', handleState)
    }
  }, [])

  const handleToggleMusic = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch((err) => console.warn('Audio playback error:', err))
    } else {
      audio.pause()
    }
  }, [])

  return (
    <>
      <Curtain
        onOpenStart={() => {
          if (DATA.audio.autoplayAfterInteraction && audioRef.current) {
            audioRef.current
              .play()
              .then(() => setIsMusicPlaying(true))
              .catch((e) => console.warn('Autoplay prevented:', e))
          }
          setTimeout(() => {
            requestAnimationFrame(() => setIntroStarted(true))
          }, 1400)
        }}
      />
      <audio id="bgMusic" ref={audioRef} src={DATA.audio.path} loop preload="auto" />
      <main className="page">
        <Hero isMusicPlaying={isMusicPlaying} onToggleMusic={handleToggleMusic} introStarted={introStarted} />
        <Nimantrak />
        <Utsav />
        <Location />
        <Blessings />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}

export default App