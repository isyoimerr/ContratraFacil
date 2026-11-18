import { FormEvent, useEffect, useState } from 'react'
import { CustomerPortal, AdminPanel, initialRequests, serviceCatalog, type RequestDraft, type DemoRequest, type ServiceId } from './prototype'

type IconName = 'file' | 'check' | 'arrow' | 'shield' | 'menu' | 'close' | 'clock' | 'document' | 'user' | 'delivery'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
    const paths: Record<IconName, React.ReactNode> = {
        file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 13h8M8 17h6" /></>,
        check: <path d="m5 12 4 4L19 6" />,
        arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
        shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>,
        menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
        close: <><path d="m6 6 12 12M18 6 6 18" /></>,
        clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
        document: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></>,
        user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
        delivery: <><rect x="3" y="7" width="13" height="10" rx="2" /><path d="M16 10h3l2 3v4h-5zM7 20h.01M19 20h.01" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></>,
    }
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function LegalTechIllustration() {
    return (
        <svg className="legal-tech-illustration" viewBox="0 0 620 560" role="img" aria-label="Panel de gestión documental y revisión profesional">
            <defs>
                <linearGradient id="panelBlue" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#1d4f7a" /><stop offset="1" stopColor="#13263d" /></linearGradient>
                <linearGradient id="paperWhite" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ffffff" /><stop offset="1" stopColor="#edf3f5" /></linearGradient>
                <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="18" floodColor="#0b1f35" floodOpacity=".18" /></filter>
            </defs>
            <circle cx="310" cy="280" r="238" fill="none" stroke="#b9cbd7" strokeWidth="1" strokeDasharray="7 11" opacity=".7" />
            <circle cx="310" cy="280" r="190" fill="#dce9ef" opacity=".42" />
            <path d="M88 132h444" stroke="#c8d6de" strokeWidth="1" /><path d="M88 432h444" stroke="#c8d6de" strokeWidth="1" />
            <g className="float-card float-card-one" filter="url(#softShadow)">
                <rect x="78" y="104" width="138" height="82" rx="14" fill="#ffffff" stroke="#d4e0e6" />
                <circle cx="108" cy="135" r="16" fill="#dfeaf0" /><path d="M108 126v18M99 135h18" stroke="#23658f" strokeWidth="3" strokeLinecap="round" />
                <rect x="134" y="128" width="58" height="7" rx="3.5" fill="#1d3552" /><rect x="134" y="142" width="42" height="5" rx="2.5" fill="#9eafb9" /><rect x="98" y="164" width="94" height="6" rx="3" fill="#d8e3e8" />
            </g>
            <g filter="url(#softShadow)">
                <rect x="142" y="148" width="356" height="314" rx="22" fill="url(#panelBlue)" />
                <rect x="142" y="148" width="356" height="48" rx="22" fill="#183957" /><path d="M142 196h356" stroke="#31536f" />
                <circle cx="169" cy="172" r="5" fill="#91a9ba" /><circle cx="188" cy="172" r="5" fill="#91a9ba" /><circle cx="207" cy="172" r="5" fill="#91a9ba" /><rect x="392" y="163" width="80" height="18" rx="9" fill="#244965" /><text x="432" y="176" fill="#bcd0dc" fontSize="8" textAnchor="middle" fontFamily="Arial">EXPEDIENTE 01</text>
                <rect x="163" y="216" width="72" height="224" rx="12" fill="#1a415f" /><circle cx="199" cy="248" r="21" fill="#e8f1f4" /><path d="M199 238v20M189 248h20" stroke="#23658f" strokeWidth="3" strokeLinecap="round" /><rect x="178" y="282" width="42" height="5" rx="2.5" fill="#7290a5" /><rect x="183" y="300" width="32" height="5" rx="2.5" fill="#557894" /><rect x="183" y="318" width="32" height="5" rx="2.5" fill="#557894" /><circle cx="199" cy="410" r="18" fill="#315d7b" /><text x="199" y="414" fill="#fff" fontSize="9" textAnchor="middle" fontFamily="Arial">CF</text>
                <rect x="254" y="216" width="224" height="224" rx="12" fill="url(#paperWhite)" />
                <rect x="276" y="236" width="94" height="8" rx="4" fill="#173756" /><rect x="276" y="255" width="148" height="5" rx="2.5" fill="#abb9c2" /><rect x="276" y="267" width="128" height="5" rx="2.5" fill="#c7d1d6" />
                <text x="276" y="299" fill="#69798a" fontSize="9" fontFamily="Arial">ALCANCE DOCUMENTAL</text>
                <rect x="276" y="313" width="180" height="34" rx="8" fill="#edf3f5" /><circle cx="292" cy="330" r="8" fill="#39a36d" /><path d="M288 330l3 3 5-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><rect x="308" y="323" width="76" height="6" rx="3" fill="#52677a" /><rect x="308" y="336" width="118" height="5" rx="2.5" fill="#abb8c1" />
                <rect x="276" y="356" width="180" height="34" rx="8" fill="#edf3f5" /><circle cx="292" cy="373" r="8" fill="#39a36d" /><path d="M288 373l3 3 5-6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><rect x="308" y="366" width="66" height="6" rx="3" fill="#52677a" /><rect x="308" y="379" width="100" height="5" rx="2.5" fill="#abb8c1" />
                <rect x="276" y="405" width="180" height="18" rx="9" fill="#dfe9ed" /><rect x="276" y="405" width="126" height="18" rx="9" fill="#3276a1" />
            </g>
            <g className="float-card float-card-two" filter="url(#softShadow)">
                <rect x="410" y="365" width="150" height="96" rx="14" fill="#ffffff" stroke="#d4e0e6" />
                <circle cx="438" cy="394" r="17" fill="#dff0e7" /><path d="M430 394l5 5 10-12" fill="none" stroke="#2f9b67" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <text x="464" y="389" fill="#173756" fontSize="10" fontWeight="700" fontFamily="Arial">Revisión</text><text x="464" y="405" fill="#7d8e9b" fontSize="8" fontFamily="Arial">Verificada</text>
                <rect x="431" y="430" width="106" height="6" rx="3" fill="#dde7ea" /><rect x="431" y="430" width="78" height="6" rx="3" fill="#71a1bb" />
            </g>
            <g className="float-card float-card-three" filter="url(#softShadow)">
                <rect x="62" y="388" width="134" height="74" rx="14" fill="#ffffff" stroke="#d4e0e6" />
                <circle cx="89" cy="415" r="14" fill="#173756" /><path d="M89 406v18M83 415h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /><text x="112" y="410" fill="#173756" fontSize="9" fontWeight="700" fontFamily="Arial">Entrega digital</text><text x="112" y="425" fill="#7d8e9b" fontSize="8" fontFamily="Arial">Formato acordado</text>
                <rect x="112" y="438" width="62" height="5" rx="2.5" fill="#dce6ea" />
            </g>
            <path d="M118 232c-28 0-44 18-44 42" fill="none" stroke="#80a8bd" strokeWidth="1.5" strokeDasharray="4 5" /><circle cx="74" cy="278" r="5" fill="#80a8bd" /><path d="M502 238c28 0 44 18 44 42" fill="none" stroke="#80a8bd" strokeWidth="1.5" strokeDasharray="4 5" /><circle cx="546" cy="284" r="5" fill="#80a8bd" />
        </svg>
    )
}

const services = (['plantilla', 'personalizado', 'tutela'] as const).map((id) => ({ id, ...serviceCatalog[id] }))
const serviceFeatures = {
    plantilla: ['Modelo editable', 'Guía de uso', 'Producto estandarizado'],
    personalizado: ['Adaptación de alcance', 'Condiciones por confirmar', 'Revisión profesional si aplica'],
    tutela: ['Borrador estructurado', 'Sujeto a revisión profesional', 'Sin garantía de admisión'],
}

const faqs = [
    ['¿Qué diferencia hay entre una plantilla y un documento personalizado?', 'La plantilla es un modelo estandarizado editable. Un documento personalizado se adapta a la información suministrada y requiere confirmación del alcance antes de iniciar.'],
    ['¿Los precios son definitivos?', 'No. Los valores mostrados son precios de referencia del proyecto académico y están sujetos a validación antes de cualquier operación real.'],
    ['¿La página genera o envía documentos automáticamente?', 'No. Esta primera versión es una demostración académica: no genera documentos ni transmite solicitudes.'],
    ['¿Se garantiza el resultado de una tutela?', 'No. Un borrador puede estar sujeto a revisión profesional, pero no se garantiza admisión, aprobación ni resultado judicial.'],
    ['¿Qué ocurre después de consultar un servicio?', 'En una implementación real se confirmaría el alcance, precio, plazo y condiciones. En este prototipo, la consulta solo muestra un resumen local.'],
]

function getRoute() {
    switch (window.location.hash) {
        case '#/panel': return 'panel'
        case '#/solicitud': return 'cliente'
        case '#/seguimiento': return 'seguimiento'
        default: return 'landing'
    }
}

function App() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [selected, setSelected] = useState<ServiceId>('plantilla')
    const [deadline, setDeadline] = useState('Sin urgencia')
    const [description, setDescription] = useState('')
    const [openFaq, setOpenFaq] = useState<number | null>(0)
    const [requests, setRequests] = useState<DemoRequest[]>(initialRequests)
    const [panelRequestId, setPanelRequestId] = useState('')
    const [route, setRoute] = useState(getRoute)
    const [draft, setDraft] = useState<RequestDraft>({ serviceId: 'plantilla', deadline: 'Sin urgencia', summary: '' })

    useEffect(() => {
        if (!menuOpen) return
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpen(false)
                document.querySelector<HTMLButtonElement>('.menu-button')?.focus()
            }
        }
        window.addEventListener('keydown', closeOnEscape)
        return () => window.removeEventListener('keydown', closeOnEscape)
    }, [menuOpen])

    useEffect(() => {
        if (route !== 'landing' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const elements = document.querySelectorAll('.section, .value-strip, .final-cta')
        elements.forEach((element) => element.classList.add('reveal'))
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                    observer.unobserve(entry.target)
                }
            })
        }, { threshold: 0.12 })
        elements.forEach((element) => observer.observe(element))
        return () => observer.disconnect()
    }, [route])

    const chooseService = (id: ServiceId) => {
        setSelected(id)
        openCustomerFlow({ serviceId: id, deadline: 'Sin urgencia', summary: '' })
    }

    const submitDemo = (event: FormEvent) => {
        event.preventDefault()
        openCustomerFlow({ serviceId: selected, deadline, summary: description })
    }

    const selectedName = serviceCatalog[selected].name

    useEffect(() => {
        const syncRoute = () => {
            setMenuOpen(false)
            setRoute(getRoute())
        }
        window.addEventListener('hashchange', syncRoute)
        return () => window.removeEventListener('hashchange', syncRoute)
    }, [])

    useEffect(() => {
        const frame = window.requestAnimationFrame(() => {
            if (route === 'landing') {
                document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' })
            }
        })
        return () => window.cancelAnimationFrame(frame)
    }, [route])

    const openCustomerFlow = (nextDraft: RequestDraft = { serviceId: 'plantilla', deadline: 'Sin urgencia', summary: '' }) => {
        setDraft(nextDraft)
        window.location.hash = '/solicitud'
    }

    const openAdminPanel = (id = '') => {
        setPanelRequestId(id)
        window.location.hash = '/panel'
    }

    const createRequest = (request: DemoRequest) => setRequests((current) => [request, ...current])

    return (
        <>
            {route === 'panel' ? <AdminPanel requests={requests} setRequests={setRequests} initialRequestId={panelRequestId} onExit={() => { window.location.hash = 'inicio' }} /> : route !== 'landing' ? (
                <div className="cf-client-page">
                    <header className="cf-admin-header cf-client-header">
                        <div><a className="cf-brand-button" href="#inicio"><span>CF</span><b>Contrata Fácil</b></a><small>Solicitud demostrativa</small></div>
                        <nav className="cf-header-actions" aria-label="Navegación de solicitudes">
                            <a className="text-link" href={route === 'seguimiento' ? '#/solicitud' : '#/seguimiento'}>{route === 'seguimiento' ? 'Nueva solicitud' : 'Seguimiento'}</a>
                            <a className="text-link" href="#/panel" onClick={() => setPanelRequestId('')}>Panel de atención</a>
                            <a className="button button-secondary" href="#inicio">Volver al inicio</a>
                        </nav>
                    </header>
                    <main className="container cf-client-container">
                        <CustomerPortal key={route} draft={draft} trackingOnly={route === 'seguimiento'} requests={requests} onCreate={createRequest} onNavigatePanel={openAdminPanel} />
                    </main>
                </div>
            ) : (
                <>
                    <header className="header">
                        <div className="container nav-wrap">
                            <a className="brand" href="#inicio" aria-label="Contrata Fácil, inicio"><span className="brand-mark">CF</span><span>Contrata Fácil</span></a>
                            <nav className="desktop-nav" aria-label="Navegación principal">
                                <a href="#inicio">Inicio</a><a href="#servicios">Servicios</a><a href="#como-funciona">Cómo funciona</a><a href="#faq">Preguntas frecuentes</a><a href="#contacto">Contacto</a>
                            </nav>
                            <button className="text-link cf-landing-admin" type="button" onClick={() => openAdminPanel()}>Panel de atención</button>
                            <a className="button button-small desktop-cta" href="#consulta">Consultar servicio</a>
                            <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen((open) => !open)}>
                                <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
                            </button>
                        </div>
                        {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Navegación móvil">
                            {[['Inicio', 'inicio'], ['Servicios', 'servicios'], ['Cómo funciona', 'como-funciona'], ['Preguntas frecuentes', 'faq'], ['Contacto', 'contacto']].map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
                            <button type="button" className="mobile-panel-link" onClick={() => { setMenuOpen(false); openAdminPanel() }}>Panel de atención</button>
                            <a className="button" href="#consulta" onClick={() => setMenuOpen(false)}>Consultar servicio</a>
                        </nav>}
                    </header>

                    <main>
                        <section className="hero" id="inicio">
                            <div className="container hero-grid">
                                <div className="hero-copy">
                                    <p className="eyebrow"><span></span> Servicios documentales claros</p>
                                    <h1>Tus documentos, <span>con claridad</span> desde el inicio.</h1>
                                    <p className="hero-lead">Conoce opciones de plantillas y personalización documental, revisa qué incluye cada servicio y descubre cómo funciona el proceso antes de solicitar atención.</p>
                                    <div className="hero-actions"><a className="button" href="#servicios">Ver servicios <Icon name="arrow" /></a><a className="button button-secondary" href="#como-funciona">Cómo funciona</a></div>
                                </div>
                                <div className="hero-visual" aria-label="Experiencia de gestión documental">
                                    <LegalTechIllustration />
                                </div>
                            </div>
                        </section>

                        <section className="value-strip" aria-label="Propuesta de valor">
                            <div className="container value-grid">
                                <div><span>01</span><p><b>Explicados con claridad</b><small>Sin lenguaje confuso ni letras pequeñas.</small></p></div>
                                <div><span>02</span><p><b>Precios visibles</b><small>Valores de referencia transparentes.</small></p></div>
                                <div><span>03</span><p><b>Proceso organizado</b><small>Un recorrido entendido paso a paso.</small></p></div>
                            </div>
                        </section>

                        <section className="section" id="servicios">
                            <div className="container">
                                <div className="section-heading"><div><p className="eyebrow">Servicios</p><h2>Elige el punto de partida adecuado.</h2></div><p>Cada opción tiene un alcance distinto. Confirma las condiciones antes de iniciar cualquier servicio real.</p></div>
                                <div className="service-grid">
                                    {services.map((service, index) => <article className={`service-card ${index === 1 ? 'featured' : ''}`} key={service.id}>
                                        <div className="card-top"><span className="service-icon"><Icon name={index === 2 ? 'shield' : 'document'} /></span>{index === 1 && <em>Personalizado</em>}</div>
                                        <h3>{service.name}</h3><p className="description">{service.description}</p>
                                        <div className="price"><span>$</span>{service.price}<small>COP · referencia</small></div>
                                        <ul>{serviceFeatures[service.id].map((feature) => <li key={feature}><Icon name="check" size={16} />{feature}</li>)}</ul>
                                        <button className="button button-card" type="button" onClick={() => chooseService(service.id)}>Consultar este servicio <Icon name="arrow" size={17} /></button>
                                    </article>)}
                                </div>
                                <p className="price-note"><Icon name="shield" size={18} /><span><b>Nota:</b> Precios de referencia del proyecto académico, sujetos a validación. Los servicios que impliquen asesoría o revisión jurídica deben contar con intervención profesional habilitada, según corresponda.</span></p>
                            </div>
                        </section>

                        <section className="section process-section" id="como-funciona">
                            <div className="container">
                                <div className="section-heading"><div><p className="eyebrow">Cómo funciona</p><h2>Un proceso claro, de principio a entrega.</h2></div></div>
                                <ol className="process-list">
                                    {[['Consulta', 'La persona identifica qué necesita.'], ['Solicitud inicial', 'Comparte una descripción general y el tipo de documento.'], ['Clasificación', 'Se identifica si corresponde a una plantilla o solicitud personalizada.'], ['Cotización', 'Se explican alcance, precio, plazo y condiciones.'], ['Elaboración y revisión', 'Se prepara el documento y se deriva a revisión profesional si aplica.'], ['Entrega digital', 'Se entrega en el formato acordado y se indica el canal de consultas.']].map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
                                </ol>
                            </div>
                        </section>

                        <section className="section quote-section">
                            <div className="container quote-grid">
                                {[['01', 'Alcance', 'Qué documento se preparará y qué queda por fuera.'], ['02', 'Condiciones', 'Precio total, plazo y revisiones confirmados antes de iniciar.'], ['03', 'Aceptación', 'La persona conoce y acepta las condiciones antes de contratar.']].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
                            </div>
                        </section>

                        <section className="section delivery-section">
                            <div className="container delivery-grid">
                                <div><p className="eyebrow">Entrega y límites</p><h2>Qué incluye el proceso propuesto.</h2><p className="delivery-lead">La entrega debe dejar claras las decisiones, el formato acordado y los límites del servicio.</p></div>
                                <div className="delivery-card"><h3>La entrega puede representar</h3><ul>{['Documento final en el formato acordado.', 'Guía de uso o notas pertinentes, cuando aplique.', 'Un canal para dudas relacionadas con el alcance.', 'Registro de entrega y cierre del proceso.'].map((item) => <li key={item}><Icon name="check" size={16} />{item}</li>)}</ul></div>
                                <div className="limits-card"><h3>Siempre con límites</h3><ul>{['No se garantiza que una tutela sea admitida o ganada.', 'Una plantilla no reemplaza asesoría jurídica.', 'La revisión jurídica corresponde a una persona habilitada.', 'Los datos reales deben manejarse con privacidad adecuada.'].map((item) => <li key={item}><span></span>{item}</li>)}</ul></div>
                            </div>
                        </section>

                        <section className="section consultation-section" id="consulta">
                            <div className="container consultation-grid">
                                <div className="consultation-copy"><p className="eyebrow">Solicitud inicial</p><h2>Cuéntanos qué necesitas, sin compartir datos sensibles.</h2><p>Usa un caso ficticio para revisar el alcance y la cotización de referencia.</p><div className="privacy-note"><Icon name="shield" /><span><b>Privacidad por diseño</b><small>No solicitamos datos personales ni documentos.</small></span></div><a className="text-link" href="#/seguimiento">Consultar seguimiento</a></div>
                                <form className="demo-form" onSubmit={submitDemo}>
                                    <div className="field"><label htmlFor="service">Tipo de servicio</label><select id="service" value={selected} onChange={(event) => setSelected(event.target.value as ServiceId)}>{services.map((service) => <option key={service.id} value={service.id}>{service.name}</option>)}</select></div>
                                    <div className="field"><label htmlFor="deadline">Plazo estimado</label><select id="deadline" value={deadline} onChange={(event) => setDeadline(event.target.value)}><option>Sin urgencia</option><option>En los próximos días</option><option>Necesito orientación sobre el plazo</option></select></div>
                                    <div className="field"><label htmlFor="description">Descripción general</label><textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe brevemente tu necesidad..." aria-describedby="description-help" /><small id="description-help">No incluyas nombres, números de identificación, datos privados ni documentos sensibles.</small></div>
                                    <div className="summary"><span>Resumen de selección</span><div><b>{selectedName}</b><small>{deadline}</small></div></div>
                                    <button className="button form-button" type="submit">Revisar solicitud <Icon name="arrow" size={17} /></button>
                                </form>
                            </div>
                        </section>

                        <section className="section faq-section" id="faq">
                            <div className="container faq-grid"><div><p className="eyebrow">Preguntas frecuentes</p><h2>Respuestas antes de empezar.</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><b>{openFaq === index ? '−' : '+'}</b></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div>
                        </section>

                        <section className="final-cta" id="contacto">
                            <div className="container final-cta-inner"><div><p className="eyebrow">Contacto</p><h2>Revisa el servicio que mejor se ajusta a tu necesidad.</h2></div><div><a className="button button-light" href="#servicios">Ver servicios <Icon name="arrow" /></a><button className="text-link cf-final-flow" type="button" onClick={() => openCustomerFlow()}>Probar solicitud demostrativa</button></div></div>
                        </section>
                    </main>

                    <footer className="footer"><div className="container footer-grid"><div><a className="brand brand-footer" href="#inicio"><span className="brand-mark">CF</span><span>Contrata Fácil</span></a><p>Proyecto académico · Prototipo demostrativo</p></div><nav aria-label="Navegación del pie"><a href="#servicios">Servicios</a><a href="#como-funciona">Proceso</a><a href="#faq">Preguntas frecuentes</a><a href="#consulta">Solicitud</a></nav><p className="footer-privacy">No se procesan pagos, solicitudes, datos personales ni documentos. Los servicios jurídicos requieren intervención profesional habilitada cuando corresponda.</p></div></footer>
                </>
            )}
        </>
    )
}

export default App
