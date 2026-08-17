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
    title: 'पाटील परिवार गणेशोत्सव निमंत्रण',
    description: 'गणरायाच्या आगमनाचे सस्नेह आमंत्रण',
  },
  hero: {
    family: 'पाटील परिवाराकडून',
    title: 'बाप्पांचे आगमन',
    message: 'आमच्या घरी गणरायांचे\nआगमन होत आहे...',
    welcome: 'आपणास सस्नेह निमंत्रण !',
    dateStrip: [],
  },
  family: {
    label: 'INVITING FAMILY',
    title: 'निमंत्रक',
    plaqueTitle: 'पाटील परिवार',
    subtitle: 'गणरायाच्या आगमनाच्या या मंगल क्षणी आपण सर्वांनी उपस्थित राहून उत्सवाची शोभा वाढवावी.',
    inviteMessage: 'आपण व आपल्या परिवारास\nसस्नेह निमंत्रण !',
    members: [
      { name: 'श्री. श्रीकांत पाटील', image: 'family-1-opt.webp' },
      { name: 'सौ. अंजली पाटील', image: 'family-2-opt.webp' },
      { name: 'चि. ओम पाटील', image: 'family-3-opt.webp' },
      { name: 'चि. गौरी पाटील', image: 'family-4-opt.webp' },
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
    images: [
      'gallery-2-opt.webp',
      'gallery-3-opt.webp',
      'gallery-4-opt.webp',
      'gallery-5-opt.webp',
    ],
    message: 'या तयारीमागील प्रत्येक क्षण गणरायाच्या\nस्वागतासाठी भक्ती आणि प्रेमाने सजवला आहे.',
  },
  location: {
    label: 'LOCATION',
    title: 'ठिकाण',
    subtitle: 'गणरायाच्या आगमन सोहळ्यास\nआपले सहर्ष स्वागत आहे',
    placeName: 'पाटील निवास',
    address: 'फ्लॅट नं. ४०२,\nश्री गणेशा अपार्टमेंट्स, शिवाजीनगर\nपुणे - ४११००५',
    mapsLink: 'https://maps.google.com',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15087.840252981321!2d72.83266058866177!3d19.021481400909252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cedb0ea0cd0f%3A0x428a465039995bd0!2sDadar%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1781515306818!5m2!1sen!2sin',
    note: 'आपल्या सहकुटुंब उपस्थितीने\nउत्सवाची शोभा वाढेल',
  },
  footer: {
    blessing: 'आपली उपस्थिती हेच\nआमच्यासाठी बाप्पांचे खरे\nआशीर्वाद आहेत.',
    familySignature: '— पाटील परिवार',
  },
  audio: {
    path: '/assets/bgMusic.mp3',
    volume: 0.35,
    autoplayAfterInteraction: true,
  },
}

/* Framer Motion Animation Variants (Extracted directly from Reference Demo) */
const easeStandard = [0, 0.55, 0.45, 1] as const
const easeDecel = [0.16, 1, 0.3, 1] as const
const curtainEase = [0.76, 0, 0.24, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeStandard } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeDecel } },
}

const fadeFlower = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.35 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: easeStandard } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const staggerContainerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const heroStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const murtiVariant = {
  hidden: { opacity: 0, y: 20, x: '-50%' },
  visible: { opacity: 1, y: 0, x: '-50%', transition: { duration: 0.7, ease: easeStandard } },
}

const featuredPhotoVariant = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeStandard } },
}

const galleryLeftVariant = {
  hidden: { opacity: 0, y: 30, rotate: -2 },
  visible: { opacity: 1, y: 0, rotate: -2, transition: { duration: 0.7, ease: easeStandard } },
}

const galleryRightVariant = {
  hidden: { opacity: 0, y: 30, rotate: 2 },
  visible: { opacity: 1, y: 0, rotate: 2, transition: { duration: 0.7, ease: easeStandard } },
}

function SectionReveal({
  children,
  variants = fadeUp,
  className = '',
  style = {},
  amount = 0.2,
  delay = 0,
  as: Component = 'div',
}: {
  children: React.ReactNode
  variants?: any
  className?: string
  style?: React.CSSProperties
  amount?: number
  delay?: number
  as?: string
}) {
  const MotionComponent = (motion as any)[Component] || motion.div
  const finalVariants =
    delay > 0
      ? {
          ...variants,
          visible: {
            ...variants.visible,
            transition: {
              ...(variants.visible?.transition || {}),
              delay,
            },
          },
        }
      : variants

  return (
    <MotionComponent
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={finalVariants}
    >
      {children}
    </MotionComponent>
  )
}

function StaggerContainer({
  children,
  className = '',
  style = {},
  amount = 0.2,
  fast = false,
  as: Component = 'div',
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  amount?: number
  fast?: boolean
  as?: string
}) {
  const MotionComponent = (motion as any)[Component] || motion.div
  return (
    <MotionComponent
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={fast ? staggerContainerFast : staggerContainer}
    >
      {children}
    </MotionComponent>
  )
}

function Curtain({ onOpenStart, onComplete }: { onOpenStart?: () => void; onComplete?: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (isVisible && !isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible, isOpen])

  if (!isVisible) return null

  return (
    <div
      className="curtain-container"
      style={{ pointerEvents: isOpen ? 'none' : 'auto' }}
      aria-hidden="true"
    >
      <motion.div
        className="curtain-panel left"
        initial={{ x: 0 }}
        animate={isOpen ? { x: '-100%' } : { x: 0 }}
        transition={{ delay: 0.5, duration: 1.3, ease: curtainEase }}
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
        transition={{ delay: 0.5, duration: 1.3, ease: curtainEase }}
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
        animate={
          isOpen
            ? { opacity: 0, scale: 0.85, x: '-50%', y: '-50%' }
            : { opacity: 1, scale: 1, x: '-50%', y: '-50%' }
        }
        transition={isOpen ? { duration: 0.5, ease: 'easeIn' } : { duration: 0 }}
      >
        <div className="curtain-seal-ring" />
        <div className="curtain-seal-ring-inner" />
        <button
          className="curtain-seal"
          onClick={() => {
            setIsOpen(true)
            onOpenStart?.()
            setTimeout(() => {
              setIsVisible(false)
              onComplete?.()
            }, 2500)
          }}
          type="button"
          aria-label="बाप्पांचे निमंत्रण उघडा"
        >
          <span className="curtain-seal-text-hi">श्री गणेशाय नमः</span>
          <span className="curtain-seal-text-en">Tap To Open</span>
          <span className="curtain-seal-shine" />
        </button>
      </motion.div>
    </div>
  )
}

function Hero({
  isMusicPlaying,
  onToggleMusic,
  introStarted,
}: {
  isMusicPlaying: boolean
  onToggleMusic: () => void
  introStarted: boolean
}) {
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
        transition={{ duration: 1, ease: easeDecel }}
      />

      <button
        className={`hero__music ${isMusicPlaying ? 'is-playing' : ''}`}
        id="musicBtn"
        type="button"
        aria-label="Play background music"
        onClick={onToggleMusic}
      >
        <span id="musicIcon">
          <svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor">
            <path d="M256 64v225.1c-12.6-7.3-27.1-11.7-42.7-11.7-47.1 0-85.3 38.2-85.3 85.3s38.2 85.3 85.3 85.3 85.3-38.2 85.3-85.3V149.3H384V64H256z" />
          </svg>
        </span>
      </button>

      <motion.div
        className="hero__logo"
        aria-hidden="true"
        initial={{ opacity: 0, y: -10, x: '-50%' }}
        animate={introStarted ? { opacity: 1, y: 0, x: '-50%' } : { opacity: 0, y: -10, x: '-50%' }}
        transition={{ duration: 0.7, delay: 0.1, ease: easeStandard }}
      >
        <img src="/assets/logo-opt.webp" alt="" />
        <p
          className="hero__tiny hero__tiny--ganesh"
          style={{
            margin: 0,
            fontFamily: '"Tiro Devanagari Marathi", "Noto Serif Devanagari", serif',
            fontSize: 'clamp(0.95rem, 4vw, 1.08rem)',
            color: 'var(--ink)',
          }}
        >
          ॥ श्री गणेशाय नमः ॥
        </p>
      </motion.div>

      <motion.div
        className="hero__content"
        variants={heroStagger}
        initial="hidden"
        animate={introStarted ? 'visible' : 'hidden'}
      >
        <motion.img
          className="divider divider--thin"
          src="/assets/divider-1-opt.webp"
          alt=""
          aria-hidden="true"
          variants={fadeIn}
        />
        <motion.p className="hero__family" variants={fadeUp}>
          {hero.family}
        </motion.p>
        <motion.img className="hero__title" src="/assets/hero-text-opt.webp" alt={hero.title} variants={fadeUp} />
        <motion.img className="divider" src="/assets/divider-2-opt.webp" alt="" aria-hidden="true" variants={fadeIn} />
        <motion.p
          className="hero__message"
          dangerouslySetInnerHTML={{ __html: hero.message.replace(/\n/g, '<br />') }}
          variants={fadeUp}
        />
        <motion.p className="hero__welcome" variants={fadeUp}>
          {hero.welcome}
        </motion.p>
        <motion.img
          className="hero__murti"
          src="/assets/murti-opt.webp"
          loading="eager"
          decoding="async"
          alt="Lord Ganesha murti"
          variants={murtiVariant}
        />
      </motion.div>

      <motion.img
        className="hero__flower hero__flower--left"
        src="/assets/flower-opt.webp"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: introStarted ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: easeDecel }}
      />
      <motion.img
        className="hero__flower hero__flower--right"
        src="/assets/flower-opt.webp"
        alt=""
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: introStarted ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: easeDecel }}
      />

      <motion.div
        className="hero-divider"
        initial={{ opacity: 0 }}
        animate={{ opacity: introStarted ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easeDecel }}
      >
        <img src="/assets/divider-2-opt.webp" alt="" />
      </motion.div>

      <motion.div
        className="hero-tag"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={introStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.6, ease: easeStandard }}
      >
        <img src="/assets/tag-opt.webp" alt="Invitation Details" />
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: introStarted ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1, ease: easeDecel }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M6 9L12 15L18 9" stroke="#C89B3C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  )
}

function Nimantrak() {
  const { family } = DATA
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  let members = [...family.members]
  if (members.length > 0) {
    while (members.length < 6) {
      members = [...members, ...family.members]
    }
  }

  return (
    <section className="nimantrak-section">
      <div className="custom-shape-divider-top-1781551738">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className="shape-fill"
            stroke="#f7f0e4"
            strokeWidth="2"
          />
        </svg>
      </div>

      <SectionReveal className="nimantrak-header">
        <motion.span className="section-label" variants={fadeUp}>
          {family.label}
        </motion.span>
        <motion.h2 className="nimantrak-title" variants={fadeUp}>
          {family.title}
        </motion.h2>
        <motion.img src="/assets/divider-2-opt.webp" alt="" className="heading-ornament" variants={fadeIn} />
        <motion.div className="family-plaque" variants={scaleIn}>
          <img src="/assets/flower-opt.webp" className="plaque-flower plaque-left" alt="" />
          <div className="plaque-content">
            <h3>{family.plaqueTitle}</h3>
          </div>
          <img src="/assets/flower-opt.webp" className="plaque-flower plaque-right" alt="" />
        </motion.div>
        <motion.p className="nimantrak-subtitle" variants={fadeUp}>
          {family.subtitle}
        </motion.p>
        <motion.img src="/assets/divider-2-opt.webp" alt="" className="heading-ornament" variants={fadeIn} />
      </SectionReveal>

      <SectionReveal className="family-carousel-container" variants={fadeIn}>
        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onInit={(swiper) => {
            const nav = swiper.params.navigation
            if (nav && typeof nav === 'object') {
              nav.prevEl = prevRef.current
              nav.nextEl = nextRef.current
            }
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
              <motion.div
                className="family-card"
                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.3 } }}
              >
                <div className="card-image">
                  <img src={`/assets/${member.image}`} alt={member.name} />
                </div>
                <div className="card-name">{member.name}</div>
              </motion.div>
            </SwiperSlide>
          ))}
          <div className="family-nav-prev" ref={prevRef} role="button" aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </div>
          <div className="family-nav-next" ref={nextRef} role="button" aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </Swiper>
      </SectionReveal>

      <SectionReveal>
        <div
          className="invite-message"
          dangerouslySetInnerHTML={{
            __html: `<p>${family.inviteMessage.replace(/\n/g, '</p><p>')}</p>`,
          }}
        />
      </SectionReveal>

      <SectionReveal variants={fadeIn}>
        <img src="/assets/divider-2-opt.webp" alt="" className="bottom-ornament" />
      </SectionReveal>

      <div className="custom-shape-divider-bottom-1781437587">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
            className="shape-fill"
            stroke="#f8f1e5"
            strokeWidth="2"
          />
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
      <SectionReveal className="utsav-header">
        <motion.span className="section-label" variants={fadeUp}>
          {utsav.label}
        </motion.span>
        <motion.h2 className="utsav-title" variants={fadeUp}>
          {utsav.title}
        </motion.h2>
        <motion.img src="/assets/divider-2-opt.webp" alt="" className="utsav-ornament" variants={fadeIn} />
        <motion.p
          className="utsav-subtitle"
          dangerouslySetInnerHTML={{ __html: utsav.subtitle.replace(/\n/g, '<br />') }}
          variants={fadeUp}
        />
      </SectionReveal>

      <div className="timeline" ref={timelineRef}>
        <div className="wave-line" />
        {utsav.timeline.map((item, index) => (
          <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
            <div className="event-card">
              <img src={`/assets/${item.icon}`} className="event-icon" alt="" />
              <h3>{item.title}</h3>
              <span className="event-date">{item.date}</span>
              <span className="event-time">{item.time}</span>
            </div>
          </div>
        ))}
      </div>

      <SectionReveal className="utsav-message">
        <motion.img src="/assets/divider-2-opt.webp" alt="" className="utsav-message-divider" variants={fadeIn} />
        <motion.p variants={fadeUp}>{utsav.message}</motion.p>
        <motion.span variants={fadeUp}>{utsav.chant}</motion.span>
      </SectionReveal>
    </section>
  )
}

function Location() {
  const { location } = DATA

  return (
    <section className="location-section">
      <SectionReveal className="location-container">
        <motion.span className="location-label" variants={fadeUp}>
          {location.label}
        </motion.span>
        <motion.h2 className="location-title" variants={fadeUp}>
          {location.title}
        </motion.h2>
        <motion.img src="/assets/divider-2-opt.webp" className="location-divider" alt="" variants={fadeIn} />
        <motion.p
          className="location-subtitle"
          dangerouslySetInnerHTML={{ __html: location.subtitle.replace(/\n/g, '<br />') }}
          variants={fadeUp}
        />

        <SectionReveal className="location-card" delay={0.15}>
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
          <motion.div className="location-content" variants={fadeUp}>
            <h3>{location.placeName}</h3>
            <p
              className="location-address"
              dangerouslySetInnerHTML={{ __html: location.address.replace(/\n/g, '<br />') }}
            />
            <a href={location.mapsLink} target="_blank" rel="noreferrer" className="maps-button">
              Open Maps
            </a>
            <p
              className="location-note"
              dangerouslySetInnerHTML={{ __html: location.note.replace(/\n/g, '<br />') }}
            />
          </motion.div>
        </SectionReveal>
      </SectionReveal>

      <div className="custom-shape-divider-bottom-1781516738">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            className="shape-fill"
          />
        </svg>
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
      <SectionReveal className="blessings-container">
        <motion.span className="blessings-label" variants={fadeUp}>
          {blessings.label}
        </motion.span>
        <motion.h2 className="blessings-title" variants={fadeUp}>
          {blessings.title}
        </motion.h2>
        <motion.img src="/assets/divider-2-opt.webp" alt="" className="blessings-divider" variants={fadeIn} />

        <motion.div
          id="blessingCard"
          className="blessing-card"
          onClick={handleNext}
          variants={scaleIn}
          whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
          style={{ cursor: 'pointer' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleNext()
            }
          }}
          aria-label="Tap to view next blessing"
        >
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
        </motion.div>

        <SectionReveal className="tap-message" variants={fadeIn} delay={0.2}>
          {blessings.tapMessage}
        </SectionReveal>
      </SectionReveal>
    </section>
  )
}

function Gallery() {
  const { gallery } = DATA

  return (
    <section className="gallery-section">
      <SectionReveal className="gallery-container">
        <motion.span className="gallery-label" variants={fadeUp}>
          {gallery.label}
        </motion.span>
        <motion.h2 className="gallery-title" variants={fadeUp}>
          {gallery.title}
        </motion.h2>
        <motion.img src="/assets/divider-2-opt.webp" alt="" className="gallery-divider" variants={fadeIn} />
        <motion.p
          className="gallery-subtitle"
          dangerouslySetInnerHTML={{ __html: gallery.subtitle.replace(/\n/g, '<br />') }}
          variants={fadeUp}
        />

        <motion.div
          className="featured-photo"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={featuredPhotoVariant}
        >
          <img src={`/assets/${gallery.featuredImage}`} alt="" />
        </motion.div>

        <StaggerContainer className="gallery-grid" amount={0.1}>
          {gallery.images.map((img, n) => {
            const isLeft = n % 2 === 0
            return (
              <motion.div
                key={n}
                className={`gallery-card ${isLeft ? 'tilt-left' : 'tilt-right'}`}
                variants={isLeft ? galleryLeftVariant : galleryRightVariant}
                whileHover={{
                  y: -3,
                  scale: 1.02,
                  rotate: isLeft ? -2 : 2,
                  transition: { duration: 0.3 },
                }}
              >
                <img src={`/assets/${img}`} alt="" />
              </motion.div>
            )
          })}
        </StaggerContainer>

        <SectionReveal className="gallery-message">
          <motion.img src="/assets/divider-2-opt.webp" alt="" variants={fadeIn} />
          <motion.p
            dangerouslySetInnerHTML={{ __html: gallery.message.replace(/\n/g, '<br />') }}
            variants={fadeUp}
          />
        </SectionReveal>
      </SectionReveal>
    </section>
  )
}

function Footer() {
  const { footer } = DATA

  return (
    <footer className="ganpati-footer">
      <div className="footer-top-fade" />
      <SectionReveal className="footer-content" amount={0.4}>
        <motion.img src="/assets/flower-opt.webp" className="footer-flower footer-left" alt="" variants={fadeFlower} />
        <motion.img src="/assets/flower-opt.webp" className="footer-flower footer-right" alt="" variants={fadeFlower} />
        <motion.img src="/assets/divider-2-opt.webp" alt="" className="footer-divider" variants={fadeIn} />
        <motion.div className="footer-blessing" variants={fadeUp}>
          <h2 dangerouslySetInnerHTML={{ __html: footer.blessing.replace(/\n/g, '<br />') }} />
        </motion.div>
        <motion.div className="footer-family" variants={fadeIn} style={{ transitionDelay: '0.3s' }}>
          {footer.familySignature}
        </motion.div>
      </SectionReveal>
    </footer>
  )
}

function App() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [introStarted, setIntroStarted] = useState(false)
  const [curtainDone, setCurtainDone] = useState(false)

  // Configure Audio volume and playback state listeners
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
    setIsMusicPlaying((prev) => {
      const next = !prev
      const audio = audioRef.current
      if (audio) {
        if (next) {
          audio.play().catch((err) => console.warn('Audio playback error:', err))
        } else {
          audio.pause()
        }
      }
      return next
    })
  }, [])

  return (
    <>
      {!curtainDone && (
        <Curtain
          onOpenStart={() => {
            if (DATA.audio.autoplayAfterInteraction && audioRef.current) {
              audioRef.current
                .play()
                .then(() => setIsMusicPlaying(true))
                .catch((err) => console.warn('Autoplay prevented by browser:', err))
            }
            setTimeout(() => {
              requestAnimationFrame(() => {
                setIntroStarted(true)
              })
            }, 1400)
          }}
          onComplete={() => {
            setCurtainDone(true)
          }}
        />
      )}
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