import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDownRight, ArrowRight, ChevronDown, Info, Compass, Instagram, MapPin, Menu, MessageCircle, Mountain, Phone, Tag, Users, X, Youtube, Zap, Footprints, House, PersonStanding, type LucideIcon } from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import nikeAsset from '@/assets/Nike.jpg';

const queryClient = new QueryClient();

const navigation = [
  { href: '/', label: 'Home', icon: House },
  { href: '/shop', label: 'Shop', icon: Footprints },
  { href: '/offers', label: 'Offers', icon: Tag },
  { href: '/locations', label: 'Locations', icon: MapPin },
  { href: '/community', label: 'Community', icon: MessageCircle },
  { href: '/about', label: 'About', icon: Info },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'Move with purpose | SportLife', description: 'Performance footwear, practical guidance, and a welcoming local movement community.' },
  '/shop': { title: 'The rotation | SportLife', description: 'Explore SportLife footwear and essentials for running, training, and getting outside.' },
  '/offers': { title: 'More miles for your money | SportLife', description: 'Member-first offers, fit advice, and rewards for the people who keep moving.' },
  '/locations': { title: 'Find your people | SportLife', description: 'Visit SportLife Oxford Circus for fit advice, fresh releases, and route recommendations.' },
  '/community': { title: 'Find your next crew | SportLife', description: 'Join weekly runs, local events, and a generous movement community.' },
  '/about': { title: 'Make movement yours | SportLife', description: 'Learn why SportLife exists and how we make movement easier to start and stick with.' },
};

function usePageMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = pageMeta[location] ?? { title: 'SportLife', description: 'Good gear. Practical guidance. More reasons to move.' };
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.setAttribute('name', 'description');
      document.head.appendChild(description);
    }
    description.setAttribute('content', meta.description);
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', meta.title);
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', meta.description);
  }, [location]);
}

function Header() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setIsOpen(false), [location]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="SportLife home" data-testid="link-brand">
          <img className="brand-mark" src={nikeAsset} alt="SportLife mark" />
          <span className="brand-name">Sport<span>Life</span></span>
        </Link>
        <button className="menu-button" type="button" aria-label={isOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={isOpen} onClick={() => setIsOpen((open) => !open)} data-testid="button-menu">
          {isOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
        <nav className={`site-nav ${isOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <ul>
            {navigation.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={`nav-link ${location === href ? 'active' : ''}`} aria-current={location === href ? 'page' : undefined} title={label} data-testid={`link-nav-${label.toLowerCase()}`}>
                  <Icon aria-hidden="true" />
                  <span className="nav-label">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    setMessage('You are on the list — see you out there.');
    setEmail('');
  };
  return (
    <form className="newsletter" onSubmit={submit} aria-label="Newsletter signup">
      <div className="footer-label">Email notifications</div>
      <div className="newsletter-row">
        <label className="sr-only" htmlFor="newsletter-email">Email address</label>
        <input id="newsletter-email" className="newsletter-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email" required data-testid="input-newsletter-email" />
        <button className="button" type="submit" data-testid="button-newsletter-submit">Subscribe</button>
      </div>
      <p className="newsletter-message" role="status" data-testid="status-newsletter">{message}</p>
    </form>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div>
          <div className="eyebrow" style={{ color: 'hsl(var(--primary))' }}>SportLife / 2026</div>
          <h2 className="footer-heading">Stay in motion.</h2>
          <p className="footer-copy">New drops, local events, and ideas for your next session. No noise. Just useful things.</p>
        </div>
        <div className="footer-contact">
          <div className="footer-label">Contact</div>
          <a href="tel:+44203020378" data-testid="link-footer-phone"><Phone size={15} aria-hidden="true" /> +44 20 3020 378</a>
          <a href="mailto:hello@sportlife.run" data-testid="link-footer-email">hello@sportlife.run</a>
          <div className="social-links" aria-label="Social links">
            <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" data-testid="link-social-instagram"><Instagram size={16} aria-hidden="true" /></a>
            <a className="social-link" href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" data-testid="link-social-youtube"><Youtube size={16} aria-hidden="true" /></a>
            <a className="social-link" href="https://www.strava.com/" target="_blank" rel="noreferrer" aria-label="Strava" data-testid="link-social-strava"><Zap size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <Newsletter />
      </div>
      <div className="footer-bottom">© 2026 SportLife — Move with purpose</div>
    </footer>
  );
}

function Layout({ children }: { children: ReactNode }) {
  usePageMeta();
  return <div className="app-shell"><Header /><main>{children}</main><Footer /></div>;
}

function Ticker() {
  return <div className="ticker" aria-label="SportLife principles"><div className="ticker-track">{['Good gear', 'Useful advice', 'Local energy', 'No one left behind', 'Good gear', 'Useful advice', 'Local energy', 'No one left behind'].map((text, index) => <span className="ticker-item" key={`${text}-${index}`}>{text}</span>)}</div></div>;
}

function Home() {
  const features = [
    { icon: Compass, title: 'Find your route', text: 'Discover local stores, running routes, and new places to put your kit to work.', href: '/locations', link: 'View locations' },
    { icon: Tag, title: 'Move for less', text: 'Get first access to member offers on the gear that keeps your everyday moving.', href: '/offers', link: 'See offers' },
    { icon: Users, title: 'Take five', text: 'Meet fellow athletes, share a route, and recharge with the SportLife community.', href: '/community', link: 'Meet the community' },
    { icon: MessageCircle, title: 'Keep talking', text: 'Bring your questions, feedback, and best training stories. We are listening.', href: '/community', link: 'Join the conversation' },
  ];
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <div className="eyebrow">Performance starts here</div>
          <h1 id="hero-title"><span className="line">A dream.</span><span className="line accent">A vision.</span><span className="line">SportLife.</span></h1>
          <p className="hero-copy">Good gear is only the beginning. Find the fit, the people, and the next reason to move.</p>
          <div className="hero-actions">
            <Link href="/shop" className="button" data-testid="link-hero-shop">Explore the collection <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/community" className="button button-ghost" data-testid="link-hero-community">Find your crew <ArrowDownRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="hero-stamp" aria-hidden="true">Since<br />2026</div>
        <a className="hero-scroll" href="#highlights" data-testid="link-hero-scroll">Scroll to explore <ChevronDown size={14} aria-hidden="true" /></a>
      </section>
      <Ticker />
      <section className="section-pad feature-section" id="highlights">
        <div className="container">
          <div className="feature-heading">
            <div><div className="eyebrow">Why SportLife</div><h2 className="section-title">Built for the way you move.</h2></div>
            <Link href="/about" className="text-link" data-testid="link-home-about">Our point of view <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
          <div className="feature-grid">{features.map(({ icon: Icon, title, text, href, link }, index) => <article className="feature-card" key={title} data-testid={`card-feature-${index}`}><div className="feature-index">0{index + 1} / 04</div><div className="feature-icon"><Icon size={22} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p><Link href={href} className="text-link" data-testid={`link-feature-${index}`}>{link} <ArrowRight size={15} aria-hidden="true" /></Link></article>)}</div>
        </div>
      </section>
      <section className="split-section">
        <div className="split-image" role="img" aria-label="Close-up of a coral performance shoe mark on a dark surface" />
        <div className="split-copy"><div className="eyebrow">Designed to go further</div><h2>Bring your design alive.</h2><p>From the first mile to the final stretch, choose footwear and apparel that feels as good as it looks. SportLife brings performance, style, and people together.</p><Link href="/about" className="button" data-testid="link-home-story">Discover our story <ArrowRight size={16} aria-hidden="true" /></Link></div>
      </section>
      <section className="section-pad location-section">
        <div className="container location-layout">
          <div><div className="eyebrow">Visit us</div><h2>Find your next starting line.</h2><p className="section-intro">Drop into our Oxford Circus store for expert advice, fresh releases, and a better fit.</p><Link href="/locations" className="text-link" data-testid="link-home-locations">Get directions <ArrowRight size={16} aria-hidden="true" /></Link></div>
          <iframe className="map-frame" title="Map showing the SportLife Oxford Circus store" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.896472170869!2d-0.14479892384449286!3d51.51511531014027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b833f4c05ad%3A0xf7910c6f37f278f9!2sNike%20Oxford%20Circus!5e0!3m2!1sen!2suk" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" data-testid="iframe-home-map" />
        </div>
      </section>
    </>
  );
}

type Card = { icon: LucideIcon; title: string; text: string };
function InteriorPage({ eyebrow, title, intro, cards, highlightIndex, children }: { eyebrow: string; title: string; intro: string; cards?: Card[]; highlightIndex?: number; children?: ReactNode }) {
  return <><section className="page-hero"><div className="container"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{intro}</p></div></section>{cards ? <section className="content-section"><div className="container"><div className="card-grid">{cards.map(({ icon: Icon, title: cardTitle, text }, index) => <article className={`content-card ${highlightIndex === index ? 'highlight' : ''}`} key={cardTitle} data-testid={`card-${cardTitle.toLowerCase().replaceAll(' ', '-')}`}><div className="card-icon"><Icon size={24} aria-hidden="true" /></div><h2>{cardTitle}</h2><p>{text}</p><Link href={cardTitle === 'Explore' ? '/locations' : '/offers'} className="text-link" data-testid={`link-card-${index}`}>{cardTitle === 'Explore' ? 'Find expert advice' : `Shop ${cardTitle.toLowerCase()}`} <ArrowRight size={15} aria-hidden="true" /></Link></article>)}</div>{children}</div></section> : children}</>;
}

function Shop() {
  const cards: Card[] = [
    { icon: PersonStanding, title: 'Run', text: 'Responsive trainers and lightweight layers for road miles, park loops, and everything between.' },
    { icon: Zap, title: 'Train', text: 'Stable, durable essentials made for strength work, circuits, and showing up consistently.' },
    { icon: Mountain, title: 'Explore', text: 'Trail-ready footwear and versatile kit for weekends that do not need a plan.' },
  ];
  return <InteriorPage eyebrow="The current rotation" title="Move in your direction." intro="Performance staples, everyday comfort, and the pieces that make your next session feel possible." cards={cards} highlightIndex={1} />;
}

function Offers() {
  const cards: Card[] = [
    { icon: Zap, title: 'Member first', text: 'Join SportLife for early access to new drops and member-only pricing.' },
    { icon: Footprints, title: 'Refresh your run', text: 'Bring in your old trainers and get advice on the right next pair from our store team.' },
    { icon: Users, title: 'Bring a friend', text: 'Run, train, or explore together. Community members get a little extra when they invite someone new.' },
  ];
  return <InteriorPage eyebrow="Good gear, better value" title="More miles for your money." intro="Simple offers for people who would rather spend their budget on doing things than talking about them."><section className="content-section"><div className="container"><div className="card-grid">{cards.map(({ icon: Icon, title, text }, index) => <article className={`content-card ${index === 0 ? 'highlight' : ''}`} key={title} data-testid={`card-offer-${index}`}><div className="card-icon"><Icon size={24} aria-hidden="true" /></div><h2>{title}</h2><p>{text}</p><div className="price">{index === 0 ? '10% off' : index === 1 ? 'Free fit' : '£15 credit'}</div><Link href={index === 1 ? '/locations' : '/community'} className={`button ${index === 0 ? 'button-dark' : ''}`} data-testid={`link-offer-${index}`}>{index === 1 ? 'Book a fitting' : index === 0 ? 'Join the club' : 'See how it works'} <ArrowRight size={16} aria-hidden="true" /></Link></article>)}</div></div></section></InteriorPage>;
}

function Locations() {
  return <InteriorPage eyebrow="Come say hello" title="Find your people." intro="Visit us for a proper fit, a second opinion, or a route recommendation from someone who has tried it."><section className="content-section"><div className="container"><div className="location-list"><article className="location-card" data-testid="card-location-oxford-circus"><MapPin size={27} aria-hidden="true" /><div><h3>Oxford Circus</h3><p>238 Oxford Street<br />London W1C 1DE<br />Mon–Sat 09:00–20:00</p><a className="text-link" href="https://maps.google.com/?q=Nike+Oxford+Circus" target="_blank" rel="noreferrer" data-testid="link-location-directions">Get directions <ArrowRight size={15} aria-hidden="true" /></a></div></article><article className="location-card" data-testid="card-location-fit-advice"><PersonStanding size={27} aria-hidden="true" /><div><h3>Fit advice</h3><p>Not sure where to start? Bring the shoes you are replacing and we will help you compare the feel, fit, and function.</p><a className="text-link" href="tel:+44203020378" data-testid="link-location-call">Call the store <ArrowRight size={15} aria-hidden="true" /></a></div></article></div><iframe className="map-frame" title="Map showing the SportLife Oxford Circus store" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.896472170869!2d-0.14479892384449286!3d51.51511531014027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b833f4c05ad%3A0xf7910c6f37f278f9!2sNike%20Oxford%20Circus!5e0!3m2!1sen!2suk" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" data-testid="iframe-location-map" /></div></section></InteriorPage>;
}

function Community() {
  const cards: Card[] = [
    { icon: PersonStanding, title: 'Weekly runs', text: 'Easy-paced routes starting at Oxford Circus. All levels are welcome and nobody gets left behind.' },
    { icon: MessageCircle, title: 'After the effort', text: 'Good coffee, useful conversation, and a chance to compare notes after the miles are done.' },
    { icon: Users, title: 'Stay connected', text: 'Get event updates, new kit alerts, and practical ideas in your inbox.' },
  ];
  return <InteriorPage eyebrow="More than a product" title="Find your next crew." intro="SportLife is for the people who make movement social, generous, and a little more fun than planned." cards={cards} highlightIndex={1}><div className="page-note"><div><h3>First run?<br />Start here.</h3></div><div><p>Our weekly runs are easy-paced, welcoming, and built around the simple idea that nobody gets left behind.</p><Link href="/locations" className="text-link" data-testid="link-community-store">See the store <ArrowRight size={15} aria-hidden="true" /></Link></div></div></InteriorPage>;
}

function About() {
  return <InteriorPage eyebrow="Our point of view" title="Make movement yours." intro="SportLife started with a simple belief: the right kit can remove friction, but it is people who make movement stick."><section className="content-section"><div className="container narrow"><h2>Progress is personal.</h2><p>We are here for the first walk, the comeback, the quiet morning run, and the big goal. Our role is to make it easier to start and more enjoyable to keep going.</p><p>That means honest advice, purposeful design, and a community that celebrates consistency over perfection. Whatever your pace, you belong in the conversation.</p><Link href="/community" className="button" data-testid="link-about-community">Meet the community <ArrowRight size={16} aria-hidden="true" /></Link></div></section></InteriorPage>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Home} /><Route path="/shop" component={Shop} /><Route path="/offers" component={Offers} /><Route path="/locations" component={Locations} /><Route path="/community" component={Community} /><Route path="/about" component={About} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Layout><Router /></Layout></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;