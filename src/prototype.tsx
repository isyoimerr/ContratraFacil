import { FormEvent, useEffect, useRef, useState } from 'react'

export type ServiceId = 'plantilla' | 'personalizado' | 'tutela'
export type RequestStatus = 'Solicitud recibida' | 'Clasificación' | 'En preparación' | 'Revisión profesional' | 'Entregado'
export type AdviceStatus = 'No solicitada' | 'Pendiente de cotización' | 'Cotización confirmada' | 'Atención agendada' | 'Atendida'
export type AdviceMode = 'Llamada telefónica' | 'Videollamada' | 'Atención presencial con cita previa' | ''
export type RequestDraft = { serviceId: ServiceId; deadline: string; summary: string }

export type DemoRequest = {
    id: string
    serviceId: ServiceId
    serviceName: string
    price: string
    status: RequestStatus
    adviceRequested: boolean
    adviceStatus: AdviceStatus
    adviceMode: AdviceMode
    adviceAvailability: string
    adviceLocation: string
    advicePrice: string | null
    deadline: string
    summary: string
    fields: Record<string, string>
    createdAt: string
    delivered: boolean
}

export const serviceCatalog = {
    plantilla: { name: 'Plantilla de contrato', price: '29.000', description: 'Modelo editable y guía de uso.', classification: 'Modelo estandarizado', scope: 'Entrega de una plantilla editable y una guía breve de uso.' },
    personalizado: { name: 'Contrato personalizado', price: '120.000', description: 'Adaptación documental según la información suministrada.', classification: 'Adaptación documental', scope: 'Adaptación del documento a la información resumida proporcionada, sujeta a validación de alcance.' },
    tutela: { name: 'Borrador de tutela', price: '160.000', description: 'Borrador sujeto a revisión profesional.', classification: 'Requiere revisión profesional', scope: 'Estructuración de un borrador demostrativo sujeto a revisión profesional y sin garantía de admisión.' },
}

export const initialRequests: DemoRequest[] = [
    { id: 'CF-1048', serviceId: 'personalizado', serviceName: 'Contrato personalizado', price: '120.000', status: 'En preparación', adviceRequested: true, adviceStatus: 'Pendiente de cotización', adviceMode: 'Videollamada', adviceAvailability: 'Mañanas del martes y jueves', adviceLocation: '', advicePrice: null, deadline: 'En los próximos días', summary: 'Contrato para confirmar un acuerdo de prestación de servicios y asesoría sobre alcance.', fields: { 'Tipo documental': 'Contrato de servicios', 'Contexto': 'Acuerdo demostrativo entre dos partes', 'Condiciones': 'Plazos y alcance por confirmar' }, createdAt: '17 nov 2026', delivered: false },
    { id: 'CF-1049', serviceId: 'plantilla', serviceName: 'Plantilla de contrato', price: '29.000', status: 'Entregado', adviceRequested: false, adviceStatus: 'No solicitada', adviceMode: '', adviceAvailability: '', adviceLocation: '', advicePrice: null, deadline: 'Sin urgencia', summary: 'Modelo editable para arrendamiento demostrativo.', fields: { 'Tipo documental': 'Contrato de arrendamiento', 'Uso': 'Uso académico' }, createdAt: '16 nov 2026', delivered: true },
    { id: 'CF-1050', serviceId: 'tutela', serviceName: 'Borrador de tutela', price: '160.000', status: 'Revisión profesional', adviceRequested: false, adviceStatus: 'No solicitada', adviceMode: '', adviceAvailability: '', adviceLocation: '', advicePrice: null, deadline: 'Necesito orientación sobre el plazo', summary: 'Borrador demostrativo relacionado con vulneración de derechos.', fields: { 'Hecho principal': 'Resumen académico sin datos reales', 'Derecho asociado': 'Derecho por definir', 'Urgencia': 'Revisión general' }, createdAt: '15 nov 2026', delivered: false },
    { id: 'CF-1051', serviceId: 'personalizado', serviceName: 'Contrato personalizado', price: '120.000', status: 'En preparación', adviceRequested: true, adviceStatus: 'Pendiente de cotización', adviceMode: 'Videollamada', adviceAvailability: 'Lunes a viernes 9-11am', adviceLocation: 'Bogotá', advicePrice: null, deadline: 'En los próximos días', summary: 'Contrato para confirmar un acuerdo de prestación de servicios con asesoría.', fields: { 'Tipo documental': 'Contrato de servicios', 'Contexto': 'Acuerdo demostrativo entre dos partes', 'Condiciones': 'Plazos y alcance por confirmar' }, createdAt: '17 nov 2026', delivered: false },
    { id: 'CF-1052', serviceId: 'plantilla', serviceName: 'Plantilla de contrato', price: '29.000', status: 'Entregado', adviceRequested: true, adviceStatus: 'Pendiente de cotización', adviceMode: 'Atención presencial con cita previa', adviceAvailability: 'Martes y jueves 3-5pm', adviceLocation: 'Medellín', advicePrice: null, deadline: 'Sin urgencia', summary: 'Modelo editable para arrendamiento demostrativo con asesoría.', fields: { 'Tipo documental': 'Contrato de arrendamiento', 'Uso': 'Uso académico' }, createdAt: '16 nov 2026', delivered: true },
    { id: 'CF-1053', serviceId: 'tutela', serviceName: 'Borrador de tutela', price: '160.000', status: 'Revisión profesional', adviceRequested: true, adviceStatus: 'Pendiente de cotización', adviceMode: 'Llamada telefónica', adviceAvailability: 'Miércoles y viernes 10am-12pm', adviceLocation: '', advicePrice: null, deadline: 'Necesito orientación sobre el plazo', summary: 'Borrador demostrativo relacionado con vulneración de derechos con asesoría.', fields: { 'Hecho principal': 'Resumen académico sin datos reales', 'Derecho asociado': 'Derecho por definir', 'Urgencia': 'Revisión general' }, createdAt: '15 nov 2026', delivered: false },
]

const statusSteps: RequestStatus[] = ['Solicitud recibida', 'Clasificación', 'En preparación', 'Revisión profesional', 'Entregado']

function Progress({ status }: { status: RequestStatus }) {
    const active = statusSteps.indexOf(status)
    return <ol className="cf-progress" aria-label="Estado del documento">{statusSteps.map((step, index) => <li className={index <= active ? 'active' : ''} aria-current={index === active ? 'step' : undefined} key={step}><span>{index + 1}</span><small>{step}</small></li>)}</ol>
}

export function CustomerPortal({ draft, trackingOnly, requests, onCreate, onNavigatePanel }: { draft: RequestDraft; trackingOnly: boolean; requests: DemoRequest[]; onCreate: (request: DemoRequest) => void; onNavigatePanel: (id: string) => void }) {
    const [step, setStep] = useState(trackingOnly ? 7 : 1)
    const [serviceId, setServiceId] = useState(draft.serviceId)
    const [deadline, setDeadline] = useState(draft.deadline)
    const [summary, setSummary] = useState(draft.summary)
    const [fields, setFields] = useState<Record<string, string>>({})
    const [error, setError] = useState('')
    const [createdId, setCreatedId] = useState('')
    const [trackingCode, setTrackingCode] = useState('')
    const [searchedCode, setSearchedCode] = useState('')
    const [adviceRequested, setAdviceRequested] = useState(false)
    const [adviceMode, setAdviceMode] = useState<AdviceMode>('')
    const [adviceAvailability, setAdviceAvailability] = useState('')
    const [adviceLocation, setAdviceLocation] = useState('')
    const headingRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        headingRef.current?.querySelector<HTMLElement>('.cf-flow-step')?.focus()
    }, [step])

    const service = serviceCatalog[serviceId]
    const created = requests.find((item) => item.id === createdId)
    const trackingResult = requests.find((item) => item.id.toLowerCase() === searchedCode.toLowerCase())

    const choose = (id: ServiceId) => {
        if (id === serviceId) return
        setServiceId(id)
        setFields({})
        setError('')
    }

    const continueForm = (event: FormEvent) => {
        event.preventDefault()
        if (summary.trim().length < 10) {
            setError('Describe brevemente la necesidad con al menos 10 caracteres.')
            return
        }
        const required = serviceId === 'plantilla'
            ? ['Tipo documental', 'Uso principal']
            : serviceId === 'personalizado'
                ? ['Tipo documental', 'Contexto del acuerdo']
                : ['Hecho principal', 'Derecho asociado']
        const missing = required.find((key) => !fields[key]?.trim())
        if (missing) {
            setError(`Completa el campo: ${missing}.`)
            return
        }
        if (adviceRequested && !adviceMode) {
            setError('Selecciona una modalidad de atención para la asesoría.')
            return
        }
        if (adviceRequested && !adviceAvailability.trim()) {
            setError('Indica una disponibilidad horaria general para la asesoría.')
            return
        }
        if (adviceRequested && adviceMode === 'Atención presencial con cita previa' && !adviceLocation.trim()) {
            setError('Indica una ciudad o sector general para la atención presencial.')
            return
        }
        setError('')
        setStep(3)
    }

    const confirmRequest = (event: FormEvent) => {
        event.preventDefault()
        const lastNumber = requests.reduce((highest, item) => Math.max(highest, Number(item.id.slice(3)) || 0), 1047)
        const id = `CF-${String(lastNumber + 1).padStart(4, '0')}`
        const request: DemoRequest = {
            id,
            serviceId,
            serviceName: service.name,
            price: service.price,
            status: 'Solicitud recibida',
            adviceRequested,
            adviceStatus: adviceRequested ? 'Pendiente de cotización' : 'No solicitada',
            adviceMode,
            adviceAvailability: adviceAvailability.trim(),
            adviceLocation: adviceLocation.trim(),
            advicePrice: null,
            deadline,
            summary: summary.trim(),
            fields: { ...fields },
            createdAt: 'Hoy',
            delivered: false,
        }
        setCreatedId(id)
        onCreate(request)
        setStep(6)
    }

    const track = (event: FormEvent) => {
        event.preventDefault()
        setSearchedCode(trackingCode.trim())
    }

    const resetRequest = () => {
        setStep(1)
        setCreatedId('')
        setDeadline('Sin urgencia')
        setSummary('')
        setFields({})
        setError('')
        setAdviceRequested(false)
        setAdviceMode('')
        setAdviceAvailability('')
        setAdviceLocation('')
        setTrackingCode('')
        setSearchedCode('')
    }

    return <div className="cf-client-flow" ref={headingRef}>
        {step <= 5 && <ol className="cf-steps" aria-label="Progreso de la solicitud">
            {['Servicio', 'Detalles', 'Clasificación', 'Cotización', 'Confirmar'].map((label, index) => <li className={step >= index + 1 ? 'active' : ''} aria-current={step === index + 1 ? 'step' : undefined} key={label}><span>{index + 1}</span><small>{label}</small></li>)}
        </ol>}

        {step === 1 && <div className="cf-flow-step" tabIndex={-1}>
            <div className="cf-step-heading"><p className="eyebrow">Nueva solicitud</p><h2>¿Qué necesitas resolver?</h2><p>Selecciona el tipo de servicio para continuar. No se solicitarán datos personales ni documentos reales.</p></div>
            <div className="cf-service-choice">
                {(Object.keys(serviceCatalog) as ServiceId[]).map((id) => {
                    const item = serviceCatalog[id]
                    return <button type="button" aria-pressed={serviceId === id} className={serviceId === id ? 'selected' : ''} key={id} onClick={() => choose(id)}><span aria-hidden="true">0{Object.keys(serviceCatalog).indexOf(id) + 1}</span><div><b>{item.name}</b><small>{item.description}</small></div><strong>${item.price}</strong></button>
                })}
            </div>
            <button className="button cf-next" type="button" onClick={() => setStep(2)}>Continuar con {service.name}</button>
        </div>}

        {step === 2 && <form className="cf-flow-step" tabIndex={-1} onSubmit={continueForm}>
            <div className="cf-step-heading"><p className="eyebrow">Detalles generales</p><h2>Cuéntanos el alcance</h2><p>Usa un ejemplo general. No incluyas nombres, identificaciones ni documentos reales.</p></div>
            <div className="cf-form-grid">
                {serviceId === 'plantilla' && <>
                    <label>Tipo documental<select value={fields['Tipo documental'] ?? ''} onChange={(event) => setFields({ ...fields, 'Tipo documental': event.target.value })}><option value="">Selecciona una opción</option><option>Contrato de servicios</option><option>Contrato de arrendamiento</option><option>Contrato laboral</option></select></label>
                    <label>Uso principal<select value={fields['Uso principal'] ?? ''} onChange={(event) => setFields({ ...fields, 'Uso principal': event.target.value })}><option value="">Selecciona una opción</option><option>Uso académico</option><option>Ejemplo personal</option><option>Orientación empresarial</option></select></label>
                </>}
                {serviceId === 'personalizado' && <>
                    <label>Tipo documental<select value={fields['Tipo documental'] ?? ''} onChange={(event) => setFields({ ...fields, 'Tipo documental': event.target.value })}><option value="">Selecciona una opción</option><option>Contrato de servicios</option><option>Contrato de arrendamiento</option><option>Acuerdo de confidencialidad</option></select></label>
                    <label>Contexto del acuerdo<textarea rows={3} value={fields['Contexto del acuerdo'] ?? ''} onChange={(event) => setFields({ ...fields, 'Contexto del acuerdo': event.target.value })} placeholder="Describe una situación general y sin datos privados..." /></label>
                </>}
                {serviceId === 'tutela' && <>
                    <label>Hecho principal<textarea rows={3} value={fields['Hecho principal'] ?? ''} onChange={(event) => setFields({ ...fields, 'Hecho principal': event.target.value })} placeholder="Describe el problema de forma general..." /></label>
                    <label>Derecho asociado<select value={fields['Derecho asociado'] ?? ''} onChange={(event) => setFields({ ...fields, 'Derecho asociado': event.target.value })}><option value="">Selecciona una opción</option><option>Salud</option><option>Educación</option><option>Seguridad social</option><option>Por definir con revisión profesional</option></select></label>
                </>}
                <label>Plazo estimado<select value={deadline} onChange={(event) => setDeadline(event.target.value)}><option>Sin urgencia</option><option>En los próximos días</option><option>Necesito orientación sobre el plazo</option></select></label>
                <label>Resumen general<textarea rows={4} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Añade contexto breve, sin datos sensibles..." /></label>
            </div>
            <div className="cf-advice-section">
                <div className="cf-advice-heading"><div><p className="eyebrow">Servicio adicional opcional</p><h3>Asesoría jurídica personalizada</h3></div><p>Es independiente del documento y solo será atendida por una abogada o profesional habilitada, o mediante un consultorio jurídico dentro de sus competencias y supervisión.</p></div>
                <div className="cf-advice-options">
                    <button type="button" aria-pressed={!adviceRequested} className={!adviceRequested ? 'selected' : ''} onClick={() => { setAdviceRequested(false); setAdviceMode(''); setAdviceAvailability(''); setAdviceLocation('') }}><span>Documento solamente</span><small>Solo necesito el producto documental.</small></button>
                    <button type="button" aria-pressed={adviceRequested} className={adviceRequested ? 'selected' : ''} onClick={() => setAdviceRequested(true)}><span>Quiero asesoría jurídica personalizada</span><small>Solicito una cotización independiente.</small></button>
                </div>
                {adviceRequested && <div className="cf-advice-details">
                    <label>Modalidad de atención<select value={adviceMode} onChange={(event) => { setAdviceMode(event.target.value as AdviceMode); setAdviceLocation('') }}><option value="">Selecciona una modalidad</option><option>Llamada telefónica</option><option>Videollamada</option><option>Atención presencial con cita previa</option></select></label>
                    {adviceMode && <label>Disponibilidad horaria<textarea rows={2} value={adviceAvailability} onChange={(event) => setAdviceAvailability(event.target.value)} placeholder="Ej.: mañanas de lunes a miércoles" /></label>}
                    {adviceMode === 'Atención presencial con cita previa' && <label>Ubicación preferida<input value={adviceLocation} onChange={(event) => setAdviceLocation(event.target.value)} placeholder="Ciudad o sector general" /></label>}
                    <p className="cf-advice-note">La asesoría no tiene tarifa incorporada. El costo se cotizará según el servicio, duración y disponibilidad. No se suma ningún valor hasta confirmarse.</p>
                </div>}
            </div>
            {error && <p className="cf-error" role="alert">{error}</p>}
            <div className="cf-actions"><button className="button button-secondary" type="button" onClick={() => setStep(1)}>Atrás</button><button className="button" type="submit">Clasificar solicitud</button></div>
        </form>}

        {step === 3 && <div className="cf-flow-step" tabIndex={-1}>
            <div className="cf-step-heading"><p className="eyebrow">Clasificación completada</p><h2>{service.classification}</h2></div>
            <div className="cf-classification"><span>✓</span><div><b>La solicitud corresponde a:</b><strong>{service.name}</strong><p>{service.description}</p></div></div>
            {serviceId === 'tutela' && <p className="cf-warning"><b>Aviso profesional:</b> este tipo de solicitud requiere revisión jurídica habilitada antes de cualquier uso real. Esta demostración no genera un documento válido.</p>}
            <div className="cf-actions"><button className="button button-secondary" type="button" onClick={() => setStep(2)}>Modificar detalles</button><button className="button" type="button" onClick={() => setStep(4)}>Ver cotización</button></div>
        </div>}

        {step === 4 && <div className="cf-flow-step" tabIndex={-1}>
            <div className="cf-step-heading"><p className="eyebrow">Cotización demostrativa</p><h2>Revisa el alcance</h2></div>
            <div className="cf-quote"><div className="cf-quote-main"><small>Documento seleccionado</small><h3>{service.name}</h3><p>{service.scope}</p></div><div className="cf-price"><small>Precio del documento</small><strong>${service.price}</strong><span>COP</span></div></div>
            <div className="cf-advice-quote"><div><small>Asesoría jurídica adicional</small><b>{adviceRequested ? 'Solicitada' : 'No solicitada'}</b></div><div><small>Modalidad</small><b>{adviceRequested ? adviceMode : 'No aplica'}</b></div><div><small>Costo de asesoría</small><b>{adviceRequested ? 'Pendiente de cotización' : 'No aplica'}</b></div></div>
            <div className="cf-quote-conditions"><b>Condiciones</b><ul><li>Plazo: {deadline}</li><li>Confirmación previa del alcance</li><li>Sin cobros ni procesamiento de pagos</li>{serviceId === 'tutela' && <li>Revisión profesional requerida; no garantiza admisión ni resultado</li>}</ul></div>
            <div className="cf-actions"><button className="button button-secondary" type="button" onClick={() => setStep(3)}>Atrás</button><button className="button" type="button" onClick={() => setStep(5)}>Continuar a confirmación</button></div>
        </div>}

        {step === 5 && <form className="cf-flow-step" tabIndex={-1} onSubmit={confirmRequest}>
            <div className="cf-step-heading"><p className="eyebrow">Último paso</p><h2>Confirma tu solicitud de demostración</h2></div>
            <div className="cf-confirm-summary"><div><span>Documento</span><b>{service.name}</b></div><div><span>Precio del documento</span><b>${service.price} COP</b></div><div><span>Asesoría adicional</span><b>{adviceRequested ? `${adviceMode} · Pendiente de cotización` : 'No solicitada'}</b></div></div>
            <label className="cf-consent"><input type="checkbox" required /><span>Entiendo que esta es una demostración local y que debo usar información ficticia.</span></label>
            {serviceId === 'tutela' && <p className="cf-warning">Se requiere revisión profesional; el borrador no tiene validez jurídica ni garantiza admisión.</p>}
            <div className="cf-actions"><button className="button button-secondary" type="button" onClick={() => setStep(4)}>Atrás</button><button className="button" type="submit">Confirmar solicitud</button></div>
        </form>}

        {step === 6 && created && <div className="cf-flow-step cf-confirmed" tabIndex={-1}>
            <span className="cf-confirm-icon">✓</span><p className="eyebrow">Solicitud registrada</p><h2>Tu demostración está lista</h2><p>Esta solicitud existe únicamente en la memoria de esta sesión.</p>
            <div className="cf-code"><small>Código de seguimiento</small><strong>{created.id}</strong></div>
            <Progress status={created.status} />
            <div className="cf-actions cf-actions-center"><button className="button" type="button" onClick={() => { setTrackingCode(created.id); setSearchedCode(created.id); setStep(7) }}>Consultar seguimiento</button><button className="button button-secondary" type="button" onClick={resetRequest}>Nueva solicitud</button></div>
        </div>}

        {step === 7 && <div className="cf-flow-step" tabIndex={-1}>
            <div className="cf-step-heading"><p className="eyebrow">Seguimiento</p><h2>Consulta el estado del servicio</h2></div>
            <form className="cf-track-form" onSubmit={track}><label htmlFor="tracking-code">Código de solicitud</label><div><input id="tracking-code" required value={trackingCode} onChange={(event) => { setTrackingCode(event.target.value); setSearchedCode('') }} placeholder="Ej: CF-1051" /><button className="button" type="submit">Consultar</button></div></form>
            <div aria-live="polite">
                {trackingResult ? <div className="cf-track-result">
                    <div className="cf-track-title"><div><small>Código</small><b>{trackingResult.id}</b></div><span>{trackingResult.status}</span></div>
                    <Progress status={trackingResult.status} />
                    <div className="cf-confirm-summary">
                        <div><span>Servicio</span><b>{trackingResult.serviceName}</b></div><div><span>Precio</span><b>${trackingResult.price} COP</b></div><div><span>Plazo</span><b>{trackingResult.deadline}</b></div>
                        {trackingResult.adviceRequested && <div><span>Asesoría adicional</span><b>{trackingResult.adviceStatus}{trackingResult.advicePrice && ` · ${trackingResult.advicePrice}`}</b></div>}
                    </div>
                    {trackingResult.delivered && <button className="button" type="button" onClick={() => onNavigatePanel(trackingResult.id)}>Abrir panel para ver entrega demostrativa</button>}
                </div> : searchedCode && <p className="cf-error">No encontramos ese código en esta sesión.</p>}
            </div>
            {!trackingOnly && <button className="text-link cf-back-link" type="button" onClick={() => setStep(6)}>Volver</button>}
        </div>}
    </div>
}

export function AdminPanel({ requests, setRequests, initialRequestId, onExit }: { requests: DemoRequest[]; setRequests: React.Dispatch<React.SetStateAction<DemoRequest[]>>; initialRequestId: string; onExit: () => void }) {
    const [search, setSearch] = useState('')
    const [selectedId, setSelectedId] = useState(initialRequestId || requests[0]?.id || '')
    const detailRef = useRef<HTMLElement>(null)
    const selected = requests.find((item) => item.id === selectedId) ?? requests[0]
    const filtered = requests.filter((item) => `${item.id} ${item.serviceName} ${item.summary}`.toLowerCase().includes(search.trim().toLowerCase()))

    const selectRequest = (id: string) => {
        setSelectedId(id)
        if (window.matchMedia('(max-width: 640px)').matches) detailRef.current?.focus()
    }

    const updateStatus = (status: RequestStatus) => {
        if (!selected) return
        setRequests((current) => current.map((item) => item.id === selected.id ? { ...item, status, delivered: status === 'Entregado' } : item))
    }

    const downloadSample = () => {
        if (!selected?.delivered) return
        const content = `CONTRATA FÁCIL\nDOCUMENTO DEMOSTRATIVO — NO VÁLIDO\n\nSolicitud: ${selected.id}\nServicio: ${selected.serviceName}\nEstado: Entregado de muestra\n\nEste archivo simula una entrega digital. No constituye documento jurídico ni reemplaza asesoría profesional.`
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = `${selected.id}-documento-de-muestra.txt`
        anchor.click()
        window.setTimeout(() => URL.revokeObjectURL(url), 0)
    }

    const updateAdviceStatus = (adviceStatus: AdviceStatus) => {
        if (!selected) return
        setRequests((current) => current.map((item) => item.id === selected.id ? { ...item, adviceStatus, advicePrice: adviceStatus === 'Pendiente de cotización' ? null : item.advicePrice } : item))
    }

    const confirmAdvicePrice = () => {
        if (!selected) return
        const confirmedPrice = advicePriceInput.trim()
        if (!confirmedPrice) return
        setRequests((current) => current.map((item) => item.id === selected.id ? { ...item, adviceStatus: 'Cotización confirmada', advicePrice: confirmedPrice } : item))
    }

    const [advicePriceInput, setAdvicePriceInput] = useState(selected?.advicePrice ?? '')

    useEffect(() => {
        setAdvicePriceInput(selected?.advicePrice ?? '')
    }, [selected?.id, selected?.advicePrice])

    return <main className="cf-admin">
        <header className="cf-admin-header"><div><button className="cf-brand-button" type="button" onClick={onExit}><span>CF</span><b>Contrata Fácil</b></button><small>Panel de atención</small></div><button className="button button-secondary" type="button" onClick={onExit}>Volver a la landing</button></header>
        <div className="cf-admin-shell">
            <aside className="cf-admin-list">
                <div className="cf-admin-list-head"><div><p>Solicitudes</p><b>{requests.length}</b></div><input type="search" aria-label="Buscar solicitud" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar solicitud" /></div>
                <div className="cf-request-list">
                    {filtered.length ? filtered.map((item) => <button type="button" aria-pressed={selected?.id === item.id} className={selected?.id === item.id ? 'selected' : ''} key={item.id} onClick={() => selectRequest(item.id)}><div><b>{item.id}</b><span>{item.status}</span></div><strong>{item.serviceName}</strong><small>${item.price} COP</small></button>) : <p role="status">No hay solicitudes que coincidan.</p>}
                </div>
            </aside>
            {selected ? <section className="cf-admin-detail" ref={detailRef} tabIndex={-1}><div className="cf-detail-head"><div><p>Detalle de solicitud</p><h1>{selected.id}</h1></div><span className={`cf-status status-${selected.status.replaceAll(' ', '-').toLowerCase()}`}>{selected.status}</span></div>
                <div className="cf-detail-grid"><article><small>Documento solicitado</small><h2>{selected.serviceName}</h2><p>{selected.summary}</p></article><article><small>Precio del documento</small><h2>${selected.price} COP</h2><p>Valor independiente; no incluye asesoría jurídica.</p></article></div>
                <div className="cf-detail-section"><div className="cf-detail-title"><h3>Estado del documento</h3><label>Estado<select value={selected.status} onChange={(event) => updateStatus(event.target.value as RequestStatus)}>{statusSteps.map((status) => <option key={status}>{status}</option>)}</select></label></div><Progress status={selected.status} /></div>
                {selected.delivered && <div className="cf-delivery"><div><h3>Entrega de muestra</h3><p>Archivo de texto generado con datos ficticios.</p></div><button className="button button-secondary" type="button" onClick={downloadSample}>Descargar muestra</button></div>}
                <div className="cf-detail-section cf-advice-admin"><div className="cf-detail-title"><h3>Asesoría jurídica adicional</h3>{selected.adviceRequested ? <span className="cf-status">Solicitada</span> : <span className="cf-status">No solicitada</span>}</div>{selected.adviceRequested ? <><dl><div><dt>Modalidad</dt><dd>{selected.adviceMode}</dd></div><div><dt>Disponibilidad</dt><dd>{selected.adviceAvailability || 'No indicada'}</dd></div>{selected.adviceMode === 'Atención presencial con cita previa' && <div><dt>Ubicación preferida</dt><dd>{selected.adviceLocation || 'No indicada'}</dd></div>}<div><dt>Costo de asesoría</dt><dd>{selected.advicePrice ?? 'Pendiente de cotización'}</dd></div></dl><div className="cf-advice-admin-actions"><label>Estado de asesoría<select value={selected.adviceStatus} onChange={(event) => updateAdviceStatus(event.target.value as AdviceStatus)}>{(['Pendiente de cotización', 'Cotización confirmada', 'Atención agendada', 'Atendida'] as AdviceStatus[]).map((status) => <option key={status}>{status}</option>)}</select></label><label>Valor confirmado por el profesional<input value={advicePriceInput} onChange={(event) => setAdvicePriceInput(event.target.value)} placeholder="Ej.: Cotización de la profesional" /></label><button className="button button-secondary" type="button" onClick={confirmAdvicePrice}>Confirmar cotización profesional</button></div></> : <p className="cf-no-advice">Esta solicitud corresponde únicamente al producto documental.</p>}</div>
            </section> : <section className="cf-admin-detail"><p>No hay solicitudes disponibles.</p></section>}
        </div>
    </main>
}
