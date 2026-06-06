/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
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
    object.from_name = "Web Reformas Villarejo de Salvanés";
    
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
        <section className="relative min-h-[100vh] flex items-center pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="https://www.6mejores.com/wp-content/uploads/2026/03/empresa-de-reformas-home-page.jpg" 
              alt="Reforma de interior moderna y elegante en Villarejo de Salvanés" 
              className="w-full h-full object-cover object-right" 
              referrerPolicy="no-referrer" 
            />
            {/* Gradiente sofisticado para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 px-4 max-w-7xl mx-auto w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/5 border border-slate-900/10 backdrop-blur-md text-emerald-800 font-semibold text-sm mb-8 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="tracking-wide uppercase text-xs font-bold">Especialistas en Reformas Integrales</span>
              </div>

              <h1>
                <a href="https://www.objetivo.br/" rel="dofollow" className="text-slate-900 font-extrabold text-5xl md:text-7xl leading-tight md:leading-tight tracking-tight no-underline hover:text-emerald-700 transition-colors">
                  Reformas <br className="hidden md:block" /> Villarejo de Salvanés
                </a>
              </h1>
              
              <p className="mt-8 text-xl md:text-2xl text-slate-700 font-light max-w-xl leading-relaxed">
                Transformando espacios con acabados premium. Más de <strong className="font-semibold">20 años</strong> de experiencia en diseño, obras y reformas llave en mano.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-5">
                <a href="#contacto" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-slate-900 rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-xl hover:shadow-emerald-600/20 transform hover:-translate-y-1">
                  Obtener Presupuesto Gratuito
                </a>
                <a href="tel:640839282" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-800 bg-white/80 backdrop-blur border border-slate-200 rounded-full hover:bg-white transition-all shadow-md group">
                  <div className="bg-slate-100 p-2 rounded-full mr-3 group-hover:bg-emerald-50 transition-colors">
                    <Phone className="w-4 h-4 text-slate-700 group-hover:text-emerald-600" />
                  </div>
                  640 839 282
                </a>
              </div>

              <div className="mt-16 flex flex-wrap items-center gap-8 text-sm font-medium text-slate-700">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <span className="text-base tracking-tight">Garantía por escrito</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-emerald-600" />
                  <span className="text-base tracking-tight">Plazos cerrados</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Introducción Bento Grid SEO */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
              >
                Tu Empresa de Reformas en Villarejo de Salvanés de Confianza
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 font-light leading-relaxed"
              >
                Si estás pensando en renovar tu vivienda, chalet o local comercial, en <strong className="font-semibold text-slate-900">Reformas Villarejo de Salvanés</strong> encontrarás al equipo de profesionales ideal. Garantizamos un servicio integral desde el diseño hasta la entrega de llaves.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-6xl mx-auto">
              {/* Main Feature */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-8 group relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[400px] bg-slate-900"
              >
                <img 
                  src="https://www.6mejores.com/wp-content/uploads/2026/02/empresa-de-reformas-.jpg" 
                  alt="Equipo de reformas trabajando en Villarejo de Salvanés" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                  <div className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full inline-block mb-4">Especialidad</div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">Reformas Integrales</h3>
                  <p className="text-slate-200 text-lg leading-relaxed max-w-xl font-light">Transformamos viviendas completas con diseño moderno, materiales de primera calidad y ejecución impecable cumpliendo los plazos acordados.</p>
                </div>
              </motion.div>

              {/* Secondary Feature 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="md:col-span-4 bg-slate-50 rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Presupuesto Cerrado</h3>
                  <p className="text-slate-600 font-light leading-relaxed">
                    Evaluamos tu proyecto al detalle para ofrecerte un precio final sin sorpresas de última hora. Total transparencia.
                  </p>
                </div>
              </motion.div>

              {/* Secondary Feature 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="md:col-span-5 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                  <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <Hammer className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Baños y Cocinas</h3>
                  <p className="text-slate-600 font-light leading-relaxed mb-6">
                    Renovamos los espacios más importantes de tu hogar. Sustitución de bañera por plato de ducha y diseños de cocinas modernas.
                  </p>
                  <a href="#servicios" className="text-emerald-600 font-semibold flex items-center hover:text-emerald-700 transition-colors">
                    Ver todos los servicios <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
              </motion.div>

              {/* Feature with subtle image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="md:col-span-7 group relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-slate-900 min-h-[300px]"
              >
                <img 
                  src="https://www.6mejores.com/wp-content/uploads/2026/02/rehabilacion-fachadas-empresa-de-reformas.jpg" 
                  alt="Rehabilitación y exteriores" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                 <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-transparent"></div>
                 <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Rehabilitación de Fachadas</h3>
                    <p className="text-slate-200 text-lg leading-relaxed max-w-md font-light">
                      Mejoramos la eficiencia energética y la estética de tu edificio o chalet con técnicas avanzadas de aislamiento y revestimiento.
                    </p>
                 </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-32 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
              >
                Servicios de Reformas en Villarejo de Salvanés
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 font-light max-w-2xl mx-auto"
              >
                Soluciones integrales de albañilería, fontanería, electricidad y decoración para cada rincón de tu hogar o negocio en Villarejo de Salvanés y comarca.
              </motion.p>
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
                <motion.article 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group overflow-hidden flex flex-col"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-5 left-5 w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-emerald-600 transition-colors duration-300">
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="p-8 flex-grow">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-slate-600 leading-relaxed font-light">{service.desc}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Banner CTA Intermedio */}
        <section className="py-24 bg-slate-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">¿Tienes un proyecto en mente?</h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Cuéntanos qué necesitas y te prepararemos un presupuesto detallado y transparente, <strong className="font-semibold text-white">totalmente gratuito</strong>.
            </p>
            <a href="#contacto" className="inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-slate-900 bg-white rounded-full hover:bg-emerald-50 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transform hover:-translate-y-1">
              Solicitar mi Presupuesto Ahora <ArrowRight className="ml-3 w-6 h-6" />
            </a>
          </motion.div>
        </section>

        {/* Por qué elegirnos */}
        <section className="py-32 bg-white text-slate-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative lg:order-2"
              >
                <div className="absolute inset-0 bg-slate-100 rounded-[2.5rem] transform -rotate-3 scale-105"></div>
                <img 
                  src="https://www.6mejores.com/wp-content/uploads/2026/02/reformas-integrales-garantia-de-por-vida.jpg" 
                  alt="Garantía de por vida en reformas integrales" 
                  className="relative rounded-[2rem] shadow-2xl object-cover h-80 md:h-[500px] lg:h-[600px] w-full" 
                  referrerPolicy="no-referrer" 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-4 left-4 md:-bottom-10 md:-left-10 bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-md"
                >
                  <p className="text-6xl font-black text-emerald-400 mb-2">+20</p>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-300">Años de<br/>Experiencia</p>
                </motion.div>
              </motion.div>

              <div className="relative z-10 lg:order-1">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-extrabold mb-10 leading-tight tracking-tight text-slate-900"
                >
                  ¿Por qué somos la empresa de reformas líder en Villarejo de Salvanés?
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-slate-600 mb-12 leading-relaxed font-light"
                >
                  Sabemos que acometer una obra en casa es una decisión importante. Nos comprometemos a ofrecerte total tranquilidad, gestión de licencias y un equipo técnico altamente cualificado.
                </motion.p>
                <ul className="space-y-8">
                  {[
                    { icon: ShieldCheck, title: 'Calidad Garantizada', desc: 'Utilizamos materiales de primera línea y técnicas avanzadas para asegurar durabilidad.' },
                    { icon: Clock, title: 'Plazos Cumplidos', desc: 'Tu tiempo es oro. Nos comprometemos por contrato a finalizar en la fecha acordada.' },
                    { icon: CheckCircle2, title: 'Equipo Profesional', desc: 'Albañiles, fontaneros, electricistas y diseñadores altamente cualificados en plantilla.' }
                  ].map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + (idx * 0.1) }}
                      className="flex items-start group"
                    >
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mr-6 shrink-0 group-hover:bg-emerald-100 transition-colors">
                        <feature.icon className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div>
                        <strong className="block text-xl font-bold text-slate-900 mb-2">{feature.title}</strong>
                        <span className="text-slate-600 font-light leading-relaxed">{feature.desc}</span>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Galería de Inspiración */}
        <section className="py-32 bg-slate-50/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
              >
                Inspiración y Calidad en cada Detalle
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 font-light max-w-2xl mx-auto"
              >
                Cuidamos cada aspecto de la obra para entregar resultados excepcionales. Explora algunos de nuestros acabados premium.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: 'https://www.6mejores.com/wp-content/uploads/2026/02/empresa-reformas-integrales-.jpg', alt: 'Detalle de reforma integral' },
                { img: 'https://www.6mejores.com/wp-content/uploads/2026/02/reforma-cocina.jpg', alt: 'Reforma de cocina moderna' },
                { img: 'https://www.6mejores.com/wp-content/uploads/2026/02/empresa-de-reformas-albalineria.jpg', alt: 'Trabajos de albañilería profesional' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-shadow"
                >
                  <img 
                    src={item.img} 
                    alt={item.alt} 
                    className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Proyectos Realizados: Antes y Después */}
        <section id="proyectos" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
              >
                Proyectos Realizados: Antes y Después
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 font-light max-w-2xl mx-auto"
              >
                Una imagen vale más que mil palabras. Descubre cómo transformamos espacios anticuados en hogares modernos, elegantes y funcionales.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Proyecto 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 group flex flex-col"
              >
                <div className="overflow-hidden relative">
                  <img 
                    src="https://www.6mejores.com/wp-content/uploads/2026/02/reforma-cocina-antes-y-despues.jpg" 
                    alt="Reforma de cocina antes y después en Villarejo de Salvanés" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur text-slate-900 text-sm font-extrabold px-5 py-2.5 rounded-full shadow-lg tracking-wide uppercase">
                    Reforma de Cocina
                  </div>
                </div>
                <div className="p-10 flex-grow">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Modernización de Cocina</h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    Renovación completa optimizando el espacio, mejorando la iluminación e instalando mobiliario de alta calidad con acabados contemporáneos. Un cambio radical para el corazón del hogar.
                  </p>
                </div>
              </motion.div>

              {/* Proyecto 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-50 rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 group flex flex-col"
              >
                <div className="overflow-hidden relative">
                  <img 
                    src="https://www.6mejores.com/wp-content/uploads/2026/02/reforma-salon-antes-y-despues-2.jpg" 
                    alt="Reforma de salón antes y después en Villarejo de Salvanés" 
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur text-slate-900 text-sm font-extrabold px-5 py-2.5 rounded-full shadow-lg tracking-wide uppercase">
                    Reforma de Salón
                  </div>
                </div>
                <div className="p-10 flex-grow">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Transformación de Salón Comedor</h3>
                  <p className="text-lg text-slate-600 leading-relaxed font-light">
                    Apertura de espacios, alisado de paredes, nueva iluminación LED y cambio de suelos para crear un ambiente cálido, amplio y acogedor. Máximo confort y diseño.
                  </p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-20 text-center"
            >
              <a href="#contacto" className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-slate-900 rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Quiero un resultado así para mi casa <ArrowRight className="ml-3 w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Reviews */}
        <section id="opiniones" className="py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
              >
                Lo que dicen nuestros clientes
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-slate-600 font-light"
              >
                La satisfacción de quienes confían en nosotros es nuestra mejor garantía.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { name: 'María Gómez', text: 'Hicieron la reforma integral de mi piso y el resultado fue espectacular. Cumplieron los plazos y el presupuesto al céntimo. Muy profesionales.' },
                { name: 'Carlos Ruiz', text: 'Renovamos la cocina y los baños. El equipo fue muy limpio durante la obra y los acabados son de primera calidad. Totalmente recomendables.' },
                { name: 'Laura Martínez', text: 'Buscábamos una empresa seria para reformar nuestro local comercial y acertamos de pleno. Asesoramiento perfecto y ejecución impecable.' }
              ].map((review, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-shadow border border-slate-100 relative"
                >
                  <div className="flex text-amber-400 mb-6">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                  <p className="text-lg text-slate-600 mb-8 font-light leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-lg">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{review.name}</p>
                      <p className="text-sm text-slate-500">Cliente Verificado</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SEO */}
        <section id="faq" className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 text-center mb-16 tracking-tight"
            >
              Preguntas Frecuentes
            </motion.h2>
            <div className="space-y-6">
              {[
                { 
                  q: '¿Cuánto cuesta una reforma integral en Villarejo de Salvanés?', 
                  a: 'El precio de una reforma en Villarejo de Salvanés depende de los m2 de la vivienda, las calidades de los materiales y el alcance de la obra (fontanería, electricidad, suelos). Ofrecemos presupuestos detallados y cerrados sin compromiso para que sepas exactamente cuánto vas a invertir.'
                },
                { 
                  q: '¿Cuánto tiempo tarda en hacerse una reforma de vivienda?', 
                  a: 'El tiempo estimado varía según el proyecto. Una reforma de baño o cocina puede tardar entre 1 y 2 semanas, mientras que en Reformas Villarejo de Salvanés completamos reformas integrales de pisos o chalets en un plazo de 6 a 8 semanas, garantizando la fecha de entrega por contrato.'
                },
                { 
                  q: '¿Necesito licencia de obras en el Ayuntamiento de Villarejo de Salvanés?', 
                  a: 'Sí, para la mayoría de modificaciones estructurales o reformas integrales es necesario solicitar la licencia correspondiente (obra mayor u obra menor). Nuestro equipo técnico se encarga de gestionar todos los permisos y licencias en el Ayuntamiento de Villarejo de Salvanés por ti.'
                },
                { 
                  q: '¿Ofrecen garantía en los trabajos de albañilería y fontanería?', 
                  a: 'Absolutamente. Como empresa de reformas de confianza, todos nuestros trabajos de albañilería, fontanería, electricidad y carpintería cuentan con garantía por escrito. Trabajamos con marcas líderes en materiales de construcción para asegurar la máxima durabilidad.'
                },
                { 
                  q: '¿Realizan reformas de locales comerciales en la zona?', 
                  a: 'Sí, somos especialistas en la adecuación y reforma de locales comerciales en Villarejo de Salvanés y alrededores. Adaptamos tu negocio a la normativa vigente, optimizando el espacio para mejorar la experiencia de tus clientes y potenciar tus ventas.'
                }
              ].map((faq, idx) => (
                <motion.details 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-slate-50 rounded-3xl border border-slate-100 [&_summary::-webkit-details-marker]:hidden overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-8 cursor-pointer font-bold text-xl text-slate-900 transition-colors group-hover:text-emerald-700">
                    {faq.q}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 ml-4 group-open:bg-emerald-600 group-open:text-white transition-colors border border-slate-100">
                      <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                    </div>
                  </summary>
                  <div className="px-8 pb-8 text-slate-600 leading-relaxed font-light text-lg border-t border-slate-200 pt-6 mx-8">
                    {faq.a}
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* Zonas de Cobertura SEO Local */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-emerald-600 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-emerald-900 rounded-full blur-[100px]"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white"
              >
                Empresa de Reformas en Villarejo de Salvanés y Alrededores
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-emerald-100/80 max-w-3xl mx-auto font-light leading-relaxed"
              >
                Conocemos nuestra localidad a la perfección. Ofrecemos un servicio rápido, de proximidad y sin costes de desplazamiento abusivos.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { name: 'Centro Histórico y Casco Antiguo', desc: 'Reformas respetando la arquitectura tradicional en el centro del municipio.' },
                { name: 'Barrio de la Virgen de la Victoria', desc: 'Actualización de viviendas, baños y cocinas en uno de los barrios más emblemáticos.' },
                { name: 'Zonas Residenciales y Ensanche', desc: 'Modernización de chalets, adosados y pisos en zonas residenciales.' },
                { name: 'Polígono Ind. Empedrado', desc: 'Adecuación de naves, oficinas y locales comerciales para impulsar tu negocio.' },
                { name: 'Zona del Polideportivo', desc: 'Reformas integrales pensadas para un entorno dinámico y familiar.' },
                { name: 'Urbanizaciones y Fincas', desc: 'Trabajos de exterior, piscinas, vallados y acondicionamiento general.' }
              ].map((barrio, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all hover:-translate-y-2 flex items-start group"
                >
                  <div className="bg-emerald-500/20 p-4 rounded-2xl mr-5 group-hover:bg-emerald-500/40 transition-colors shrink-0 border border-emerald-500/20">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white mb-2 tracking-tight">{barrio.name}</h3>
                    <p className="text-emerald-100/60 font-light leading-relaxed">{barrio.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto y Mapa */}
        <section id="contacto" className="py-32 bg-white relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              {/* Formulario */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 md:p-14 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Solicita tu Presupuesto 100% Gratuito</h2>
                <p className="text-slate-600 mb-10 leading-relaxed font-light text-lg">
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
              </motion.div>

              {/* Info y Mapa */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-10 tracking-tight">Datos de Contacto</h2>
                  <div className="space-y-8 mb-12">
                    <div className="flex items-start group">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 mr-6 border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                        <MapPin className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xl tracking-tight">Dirección</h3>
                        <p className="text-slate-600 mt-2 font-light leading-relaxed">C. de los Mesones, 28590<br/>Villarejo de Salvanés, Madrid</p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 mr-6 border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                        <Phone className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xl tracking-tight">Teléfono</h3>
                        <p className="text-slate-600 mt-2 font-light text-lg">
                          <a href="tel:640839282" className="hover:text-emerald-600 transition-colors">640 839 282</a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start group">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 mr-6 border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                        <MessageCircle className="w-7 h-7 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-xl tracking-tight">Email</h3>
                        <p className="text-slate-600 mt-2 break-all font-light">
                          <a href="mailto:info@reformasvillarejodesalvanes.reformas.org.es" className="hover:text-emerald-600 transition-colors">info@reformasvillarejodesalvanes.reformas.org.es</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-[350px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 relative group">
                  <div className="absolute inset-0 bg-slate-900/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48722.95573426532!2d-3.315024451367187!3d40.1666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42416b9d6c3c55%3A0x40340f3be4d2f80!2s28590%20Villarejo%20de%20Salvan%C3%A9s%2C%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicación en Villarejo de Salvanés"
                    className="grayscale-[30%] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  ></iframe>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Otras Delegaciones */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 justify-center mt-10 mb-8 px-4 max-w-7xl mx-auto">
          <a href="https://arquitectostalaveradelareina.com.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors hidden">Arquitectos Talavera de la Reina</a>
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
          <a href="https://reformasnavalcarnero.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Navalcarnero</a>
          <a href="https://reformasciempozuelos.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Ciempozuelos</a>
          <a href="https://reformashumanes.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Humanes</a>
          <a href="https://reformassanmartindelavega.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas San Martín de la Vega</a>
          <a href="https://reformasgrinon.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Griñón</a>
          <a href="https://reformaselalamo.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas El Álamo</a>
          <a href="https://reformastorrejondelacalzada.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Torrejón de la Calzada</a>
          <a href="https://reformasmadrid.nom.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Madrid</a>
          <a href="https://reformasguadalajara.com.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Reformas Guadalajara</a>
          <a href="https://instalacioneselectricasmostoles.reformas.org.es" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Instalaciones Eléctricas Móstoles</a>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-8 opacity-80">
            <div className="bg-emerald-600 text-white p-2.5 rounded-xl">
              <Hammer className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">
              Reformas <span className="text-emerald-500">Villarejo</span>
            </span>
          </div>
          <p className="mb-8 text-slate-300 font-light text-lg leading-relaxed">
            Confía tu proyecto a los mejores. En <strong className="text-white font-semibold">Reformas Villarejo de Salvanés</strong>, estamos listos para hacer realidad la casa de tus sueños con un servicio profesional, cercano y garantizado.
          </p>
          <div className="h-px w-24 bg-slate-800 mx-auto mb-8"></div>
          <p className="text-sm font-light">
            © {new Date().getFullYear()} Reformas Villarejo de Salvanés. Todos los derechos reservados.
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
