/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Hammer, 
  PaintRoller, 
  Ruler, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  MessageCircle,
  ChevronDown,
  Send,
  HardHat,
  Droplets,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'submitting' | 'success' | 'error', message: string }>({ type: 'idle', message: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus({ type: 'submitting', message: 'Enviando mensaje...' });
    
    const formData = new FormData(event.currentTarget);
    
    // Convertir a objeto JSON para evitar la redirección por defecto de Web3Forms
    const object = Object.fromEntries(formData.entries());
    object.access_key = "2ea846be-9eb7-46f7-884e-430c4d1a0347";
    object.subject = "Nuevo contacto desde la web de Reformas Villarejo de Salvanés";
    object.from_name = "Web Reformas Villarejo";
    
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus({ type: 'success', message: '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo muy pronto.' });
        (event.target as HTMLFormElement).reset();
      } else {
        setFormStatus({ type: 'error', message: data.message || 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.' });
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Error de conexión. Por favor, revisa tu internet y vuelve a intentarlo.' });
    }
  };

  return (
    <div className="font-sans text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Header / Menú Superior */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="bg-emerald-600 text-white p-2 rounded-lg group-hover:bg-emerald-700 transition-colors">
                <Hammer className="w-6 h-6" />
              </div>
              <span className="font-bold text-xl md:text-2xl text-slate-900 tracking-tight">
                Reformas <span className="text-emerald-600">Villarejo</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Servicios</a>
              <a href="#proyectos" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Proyectos</a>
              <a href="#opiniones" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">Opiniones</a>
              <a href="#faq" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">FAQ</a>
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:640839282" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">640 839 282</span>
              </a>
              <a href="#contacto" className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Pedir Presupuesto Gratis
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute top-20 left-0 w-full shadow-xl">
            <div className="flex flex-col px-4 py-6 space-y-4">
              <a href="#servicios" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-emerald-600 font-medium text-lg py-2 border-b border-slate-50">Servicios</a>
              <a href="#proyectos" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-emerald-600 font-medium text-lg py-2 border-b border-slate-50">Proyectos</a>
              <a href="#opiniones" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-emerald-600 font-medium text-lg py-2 border-b border-slate-50">Opiniones</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-slate-600 hover:text-emerald-600 font-medium text-lg py-2 border-b border-slate-50">FAQ</a>
              
              <div className="pt-4 flex flex-col gap-4">
                <a href="tel:640839282" className="flex items-center justify-center gap-2 text-slate-700 font-medium py-3 bg-slate-50 rounded-xl">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  Llamar: 640 839 282
                </a>
                <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 transition-all shadow-md">
                  Pedir Presupuesto Gratis
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://www.6mejores.com/wp-content/uploads/2026/03/empresa-de-reformas-home-page.jpg" 
              alt="Reforma de interior moderna y elegante en Villarejo de Salvanés" 
              className="w-full h-full object-cover object-right" 
              referrerPolicy="no-referrer" 
            />
            {/* Gradiente suave de izquierda a derecha para asegurar la legibilidad del texto oscuro sin usar recuadros */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/20 md:to-transparent"></div>
          </div>
          
          <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-semibold text-sm mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Especialistas en Reformas Integrales
              </div>

              <h1>
                <a href="https://www.objetivo.br/" rel="dofollow" className="text-slate-900 font-bold text-4xl md:text-6xl no-underline hover:text-slate-700 transition-colors">
                  Reformas Villarejo de Salvanés
                </a>
              </h1>
              
              <p className="mt-6 text-xl md:text-2xl text-slate-700 font-light max-w-2xl leading-relaxed">
                Especialistas en reformas integrales, cocinas y baños. Más de 20 años transformando hogares y locales comerciales en Villarejo de Salvanés con acabados premium.
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="#contacto" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/30 transform hover:-translate-y-1">
                  Obtener Presupuesto Gratuito
                </a>
                <a href="tel:640839282" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-800 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-all shadow-md hover:shadow-lg group">
                  <div className="bg-emerald-100 p-2 rounded-full mr-3 group-hover:bg-emerald-200 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-700" />
                  </div>
                  640 839 282
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm py-2 px-4 rounded-lg border border-slate-200/60">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Garantía por escrito</span>
                </div>
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm py-2 px-4 rounded-lg border border-slate-200/60">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  <span>Plazos cerrados</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introducción SEO */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Tu Empresa de Reformas en Villarejo de Salvanés de Confianza</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Si estás pensando en renovar tu vivienda, chalet o local comercial, en <strong className="font-semibold text-slate-900">Reformas Villarejo de Salvanés</strong> encontrarás al equipo de profesionales ideal. Como empresa de reformas líder en la zona, garantizamos un servicio integral que abarca desde el diseño inicial hasta la entrega de llaves, utilizando siempre materiales de construcción de primera calidad.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Realizamos todo tipo de obras: <strong className="font-medium text-slate-800">reformas integrales, renovación de cocinas, cambio de bañera por plato de ducha y rehabilitaciones de fachadas</strong>. Cumplimos rigurosamente con los plazos acordados, ofreciendo presupuestos cerrados sin sorpresas de última hora para tu total tranquilidad.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-600 rounded-3xl transform translate-x-4 translate-y-4 opacity-10"></div>
                <img 
                  src="https://www.6mejores.com/wp-content/uploads/2026/02/empresa-de-reformas-.jpg" 
                  alt="Equipo de reformas trabajando en Villarejo de Salvanés" 
                  className="relative rounded-3xl shadow-xl w-full h-64 md:h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Servicios de Reformas en Villarejo de Salvanés</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Soluciones integrales de albañilería, fontanería, electricidad y decoración para cada rincón de tu hogar o negocio en la Comarca de Las Vegas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Hammer, title: 'Reformas Integrales', desc: 'Transformación completa de viviendas y locales con gestión llave en mano.', img: 'https://www.6mejores.com/wp-content/uploads/2026/02/empresa-de-reformas-reformas-integrales.jpg' },
                { icon: PaintRoller, title: 'Suelos y Carpintería', desc: 'Instalación de tarimas, parquet y trabajos de carpintería a medida.', img: 'https://www.6mejores.com/wp-content/uploads/2026/02/reformas-carpinteria-y-suelos.jpg' },
                { icon: Droplets, title: 'Baños y Cocinas', desc: 'Renovación de espacios húmedos con materiales resistentes y diseño moderno.', img: 'https://www.6mejores.com/wp-content/uploads/2026/02/reforma-bano.jpg' },
                { icon: Ruler, title: 'Locales Comerciales', desc: 'Adecuación de negocios y oficinas para potenciar tu marca.', img: 'https://www.6mejores.com/wp-content/uploads/2026/02/reforma-integrales-locales-comerciales.jpg' },
                { icon: HardHat, title: 'Albañilería General', desc: 'Tabiquería, solados, alicatados y trabajos estructurales con máxima precisión.', img: 'https://www.6mejores.com/wp-content/uploads/2026/02/empresa-de-reformas-albalineria.jpg' },
                { icon: ShieldCheck, title: 'Rehabilitación de Fachadas', desc: 'Mantenimiento y restauración de exteriores para edificios y chalets.', img: 'https://www.6mejores.com/wp-content/uploads/2026/02/rehabilacion-fachadas-empresa-de-reformas.jpg' }
              ].map((service, idx) => (
                <article key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group overflow-hidden flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{service.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Banner CTA Intermedio */}
        <section className="py-16 bg-emerald-600 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Tienes un proyecto en mente? Hagámoslo realidad.</h2>
            <p className="text-xl text-emerald-100 mb-10 font-light">
              Cuéntanos qué necesitas y te prepararemos un presupuesto detallado, transparente y <strong className="font-semibold text-white">totalmente gratuito</strong>, sin ningún tipo de compromiso.
            </p>
            <a href="#contacto" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-emerald-900 bg-white rounded-full hover:bg-slate-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
              Solicitar mi Presupuesto Ahora <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">¿Por qué somos la empresa de reformas líder en Villarejo de Salvanés?</h2>
                <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                  Sabemos que acometer una obra en casa es una decisión importante. Como especialistas en <strong className="font-semibold text-white">reformas integrales en Villarejo de Salvanés</strong>, nos comprometemos a ofrecerte total tranquilidad, gestión de licencias y un equipo técnico altamente cualificado.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mr-4 shrink-0" />
                    <div>
                      <strong className="block text-lg font-semibold text-white mb-1">Calidad Garantizada</strong>
                      <span className="text-slate-300">Utilizamos materiales de primera línea y técnicas avanzadas para asegurar durabilidad.</span>
                    </div>
                  </li>
                  <li className="flex items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <Clock className="w-8 h-8 text-emerald-400 mr-4 shrink-0" />
                    <div>
                      <strong className="block text-lg font-semibold text-white mb-1">Plazos Cumplidos</strong>
                      <span className="text-slate-300">Tu tiempo es oro. Nos comprometemos por contrato a finalizar en la fecha acordada.</span>
                    </div>
                  </li>
                  <li className="flex items-start bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mr-4 shrink-0" />
                    <div>
                      <strong className="block text-lg font-semibold text-white mb-1">Equipo Profesional</strong>
                      <span className="text-slate-300">Albañiles, fontaneros, electricistas y diseñadores altamente cualificados en plantilla.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative lg:ml-10">
                <div className="absolute inset-0 bg-emerald-500 rounded-3xl transform rotate-3 scale-105 opacity-20"></div>
                <img 
                  src="https://www.6mejores.com/wp-content/uploads/2026/02/reformas-integrales-garantia-de-por-vida.jpg" 
                  alt="Garantía de por vida en reformas integrales" 
                  className="relative rounded-3xl shadow-2xl object-cover h-80 md:h-[500px] lg:h-[600px] w-full" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute bottom-4 left-4 md:-bottom-8 md:-left-8 bg-white text-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-100">
                  <p className="text-5xl font-black text-emerald-600 mb-1">+20</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Años de<br/>Experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Galería de Inspiración */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Inspiración y Calidad en cada Detalle</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Cuidamos cada aspecto de la obra para entregar resultados excepcionales. Explora algunos de nuestros acabados premium.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <img 
                src="https://www.6mejores.com/wp-content/uploads/2026/02/empresa-reformas-integrales-.jpg" 
                alt="Detalle de reforma integral" 
                className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://www.6mejores.com/wp-content/uploads/2026/02/reforma-cocina.jpg" 
                alt="Reforma de cocina moderna" 
                className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                referrerPolicy="no-referrer"
              />
              <img 
                src="https://www.6mejores.com/wp-content/uploads/2026/02/empresa-de-reformas-albalineria.jpg" 
                alt="Trabajos de albañilería profesional" 
                className="w-full h-64 object-cover rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Proyectos Realizados: Antes y Después */}
        <section id="proyectos" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Proyectos Realizados: Antes y Después</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Una imagen vale más que mil palabras. Descubre cómo transformamos espacios anticuados en hogares modernos, elegantes y funcionales.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Proyecto 1 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group flex flex-col">
                <div className="overflow-hidden relative">
                  <img 
                    src="https://www.6mejores.com/wp-content/uploads/2026/02/reforma-cocina-antes-y-despues.jpg" 
                    alt="Reforma de cocina antes y después en Villarejo de Salvanés" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-sm font-bold px-4 py-2 rounded-full shadow-sm">
                    Reforma de Cocina
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Modernización de Cocina</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Renovación completa optimizando el espacio, mejorando la iluminación e instalando mobiliario de alta calidad con acabados contemporáneos. Un cambio radical para el corazón del hogar.
                  </p>
                </div>
              </div>

              {/* Proyecto 2 */}
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 group flex flex-col">
                <div className="overflow-hidden relative">
                  <img 
                    src="https://www.6mejores.com/wp-content/uploads/2026/02/reforma-salon-antes-y-despues-2.jpg" 
                    alt="Reforma de salón antes y después en Villarejo de Salvanés" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-sm font-bold px-4 py-2 rounded-full shadow-sm">
                    Reforma de Salón
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Transformación de Salón Comedor</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Apertura de espacios, alisado de paredes, nueva iluminación LED y cambio de suelos para crear un ambiente cálido, amplio y acogedor. Máximo confort y diseño.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <a href="#contacto" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Quiero un resultado así para mi casa <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section id="opiniones" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Lo que dicen nuestros clientes</h2>
              <p className="text-lg text-slate-600">La satisfacción de quienes confían en nosotros es nuestra mejor garantía.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'María Gómez', text: 'Hicieron la reforma integral de mi piso y el resultado fue espectacular. Cumplieron los plazos y el presupuesto al céntimo. Muy profesionales.' },
                { name: 'Carlos Ruiz', text: 'Renovamos la cocina y los baños. El equipo fue muy limpio durante la obra y los acabados son de primera calidad. Totalmente recomendables.' },
                { name: 'Laura Martínez', text: 'Buscábamos una empresa seria para reformar nuestro local comercial y acertamos de pleno. Asesoramiento perfecto y ejecución impecable.' }
              ].map((review, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-2xl relative">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-slate-600 mb-6 italic">"{review.text}"</p>
                  <p className="font-bold text-slate-900">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SEO */}
        <section id="faq" className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              <details className="group bg-white rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-slate-900">
                  ¿Cuánto cuesta una reforma integral en Villarejo de Salvanés?
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  El precio de una reforma en Villarejo de Salvanés depende de los m2 de la vivienda, las calidades de los materiales y el alcance de la obra (fontanería, electricidad, suelos). Ofrecemos presupuestos detallados y cerrados sin compromiso para que sepas exactamente cuánto vas a invertir.
                </div>
              </details>
              
              <details className="group bg-white rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-slate-900">
                  ¿Cuánto tiempo tarda en hacerse una reforma de vivienda?
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  El tiempo estimado varía según el proyecto. Una reforma de baño o cocina puede tardar entre 1 y 2 semanas, mientras que en <strong className="font-medium text-slate-900">Reformas Villarejo de Salvanés</strong> completamos reformas integrales de pisos o chalets en un plazo de 6 a 8 semanas, garantizando la fecha de entrega por contrato.
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-slate-900">
                  ¿Necesito licencia de obras en el Ayuntamiento de Villarejo de Salvanés?
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Sí, para la mayoría de modificaciones estructurales o reformas integrales es necesario solicitar la licencia correspondiente (obra mayor u obra menor). Nuestro equipo técnico se encarga de gestionar todos los permisos y licencias en el Ayuntamiento de Villarejo de Salvanés por ti.
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-slate-900">
                  ¿Ofrecen garantía en los trabajos de albañilería y fontanería?
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Absolutamente. Como empresa de reformas de confianza, todos nuestros trabajos de albañilería, fontanería, electricidad y carpintería cuentan con garantía por escrito. Trabajamos con marcas líderes en materiales de construcción para asegurar la máxima durabilidad.
                </div>
              </details>

              <details className="group bg-white rounded-2xl shadow-sm border border-slate-100 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-lg text-slate-900">
                  ¿Realizan reformas de locales comerciales en la zona?
                  <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  Sí, somos especialistas en la adecuación y reforma de locales comerciales en Villarejo de Salvanés y la Comarca de Las Vegas. Adaptamos tu negocio a la normativa vigente, optimizando el espacio para mejorar la experiencia de tus clientes y potenciar tus ventas.
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura SEO Local */}
        <section className="py-24 bg-emerald-900 text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Empresa de Reformas en Villarejo de Salvanés y Alrededores</h2>
              <p className="text-xl text-emerald-100 max-w-3xl mx-auto font-light leading-relaxed">
                Conocemos nuestra localidad a la perfección. Ofrecemos un servicio rápido, de proximidad y sin costes de desplazamiento abusivos en todos los barrios y urbanizaciones del municipio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { name: 'Centro Histórico y Casco Antiguo', desc: 'Reformas respetando la arquitectura tradicional cerca del Castillo, la Plaza y Casa de la Tercia.' },
                { name: 'Barrio de la Virgen de la Victoria', desc: 'Actualización de viviendas, baños y cocinas en la zona del santuario y calles aledañas.' },
                { name: 'Zonas Residenciales y Ensanche', desc: 'Modernización de chalets, adosados y pisos en las áreas de expansión del municipio.' },
                { name: 'Polígono Industrial Empedrado', desc: 'Adecuación de naves, oficinas y locales comerciales para impulsar tu negocio.' },
                { name: 'Zona del Polideportivo y Colegios', desc: 'Reformas integrales pensadas para familias en las áreas más dinámicas y concurridas.' },
                { name: 'Urbanizaciones y Fincas del Término', desc: 'Trabajos de exterior, piscinas, vallados y acondicionamiento general.' }
              ].map((barrio, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-all hover:-translate-y-1 flex items-start group">
                  <div className="bg-emerald-500/20 p-3 rounded-xl mr-4 group-hover:bg-emerald-500/40 transition-colors shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-white mb-2">{barrio.name}</h3>
                    <p className="text-emerald-100/80 text-sm leading-relaxed">{barrio.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto y Mapa */}
        <section id="contacto" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Formulario */}
              <div className="bg-slate-50 p-6 md:p-12 rounded-3xl border border-slate-100 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Solicita tu Presupuesto 100% Gratuito</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  Rellena el formulario sin compromiso. Un experto de nuestro equipo evaluará tu proyecto y te ofrecerá la mejor solución al mejor precio.
                </p>
                
                <form onSubmit={onSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nombre completo</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">¿En qué podemos ayudarte?</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all bg-white resize-none"
                      placeholder="Cuéntanos brevemente sobre tu proyecto..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={formStatus.type === 'submitting'}
                    className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
                  >
                    {formStatus.type === 'submitting' ? 'Enviando...' : (
                      <>
                        Quiero mi Presupuesto Gratis <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>

                  {formStatus.message && (
                    <div className={`p-4 rounded-xl text-sm font-medium ${formStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                      {formStatus.message}
                    </div>
                  )}
                </form>
              </div>

              {/* Info y Mapa */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-8">Datos de Contacto</h2>
                  <div className="space-y-6 mb-12">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mr-4">
                        <MapPin className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">Dirección</h3>
                        <p className="text-slate-600 mt-1">C. de los Mesones, 28590<br/>Villarejo de Salvanés, Madrid</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mr-4">
                        <Phone className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">Teléfono</h3>
                        <p className="text-slate-600 mt-1">
                          <a href="tel:640839282" className="hover:text-emerald-600 transition-colors">640 839 282</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-[300px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48722.95573426532!2d-3.315024451367187!3d40.1666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42416b9d6c3c55%3A0x40340f3be4d2f80!2s28590%20Villarejo%20de%20Salvan%C3%A9s%2C%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicación en Villarejo de Salvanés"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Otras Delegaciones */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 justify-center mt-10 mb-8 px-4 max-w-7xl mx-auto">
          <a href="https://reformasusera.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Usera</a>
          <a href="https://reformasvaldemoro.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Valdemoro</a>
          <a href="https://reformasbarajas.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Barajas</a>
          <a href="https://reformastorrejondeardoz.com.es/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Torrejón de Ardoz</a>
          <a href="https://reformasalcaladehenares.com.es/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Alcalá de Henares</a>
          <a href="https://reformasvallecas.reformas.org.es/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Vallecas</a>
          <a href="https://reformascoslada.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Coslada</a>
          <a href="https://reformasaranjuez.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Aranjuez</a>
          <a href="https://reformaspinto.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Pinto</a>
          <a href="https://reformasarroyomolinos.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Arroyomolinos</a>
          <a href="https://reformassevillalanueva.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Sevilla la Nueva</a>
          <a href="https://reformas-colmenar-de-oreja.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Colmenar de Oreja</a>
          <a href="https://reformasnavalcarnero.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Navalcarnero</a>
          <a href="https://reformas-villa-del-prado.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Villa del Prado</a>
          <a href="https://reformasciempozuelos.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Ciempozuelos</a>
          <a href="https://reformashumanes.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Humanes</a>
          <a href="https://reformassanmartindelavega.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas San Martín de la Vega</a>
          <a href="https://reformasgrinon.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Griñón</a>
          <a href="https://reformaselalamo.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas El Álamo</a>
          <a href="https://reformasmadrid.nom.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Madrid</a>
          <a href="https://reformastorrejondelacalzada.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Torrejón de la Calzada</a>
          <a href="https://reformas-san-martin.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas San Martín</a>
          <a href="https://reformas-morata-de-tajuna.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Morata de Tajuña</a>
          <a href="https://reformasguadalajara.com.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Guadalajara</a>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-6 text-slate-300">
            Confía tu proyecto a los mejores. En <strong className="text-white font-semibold">Reformas Villarejo de Salvanés</strong>, estamos listos para hacer realidad la casa de tus sueños con un servicio profesional, cercano y garantizado.
          </p>
          <p className="text-sm">
            © 2026 Reformas Villarejo de Salvanés. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Botón Flotante WhatsApp */}
      <a 
        href="https://wa.me/34640839282" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] hover:scale-110 transition-all flex items-center justify-center group"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="hidden md:block absolute right-full mr-4 bg-white text-slate-900 text-sm font-semibold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          ¡Hablemos por WhatsApp!
        </span>
      </a>
    </div>
  );
}
