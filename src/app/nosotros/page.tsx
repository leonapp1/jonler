'use client';

import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, Facebook, MapPin } from 'lucide-react';

export default function PageNosotros() {
    return (
        <div>
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
                <h1 className="text-4xl font-bold mb-6 text-center text-pink-600">Sobre Nosotros</h1>

                <p className="mb-4 text-lg leading-relaxed">
                    En <strong className="text-pink-700">REGALOS PERSONALIZADOS JONLER</strong>, creemos que un regalo no es solo un objeto, sino una forma de transmitir amor, gratitud y alegría. Nos especializamos en crear <span className="font-semibold">obsequios únicos y memorables</span> que llegan al corazón.
                </p>

                <p className="mb-4 text-lg leading-relaxed">
                    Desde Ayacucho para todo el Perú, trabajamos con pasión y dedicación para que cada detalle cuente. 🎁 Nuestro catálogo ofrece una gran variedad de opciones personalizables para cumpleaños, aniversarios, fechas especiales o simplemente para sorprender a quien más quieres.
                </p>

                <p className="mb-4 text-lg leading-relaxed">
                    Ya sea con nombres, frases especiales o fotos, hacemos realidad ese detalle perfecto que marcará la diferencia. ¡Haz que tu regalo sea inolvidable!
                </p>

                <div className="bg-pink-50 p-6 rounded-xl mb-8 shadow-md space-y-4">
                    <p className="flex items-center text-lg">
                        <Phone className="w-5 h-5 text-pink-600 mr-2" />
                        <strong>Celular:</strong>&nbsp;
                        <a href="tel:+51965208963" className="text-pink-700 underline">965 208 963</a>
                    </p>
                    <p className="flex items-center text-lg">
                        <Facebook className="w-5 h-5 text-pink-600 mr-2" />
                        <strong>Facebook:</strong>&nbsp;
                        <Link href="https://www.facebook.com/JONLERRegalos" target="_blank" className="text-pink-700 underline">
                            JONLER Regalos
                        </Link>
                    </p>
                    <p className="flex items-center text-lg">
                        <MapPin className="w-5 h-5 text-pink-600 mr-2" />
                        <strong>Ubicación:</strong>&nbsp;
                        <Link href="https://maps.app.goo.gl/b8KkdY4sPVCNihH48" target="_blank" className="text-pink-700 underline">
                            Ver en Google Maps
                        </Link>
                    </p>
                </div>

                <div className="rounded-xl overflow-hidden shadow-lg mb-8 border border-pink-100">
                    <iframe
                        className="w-full h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d485.59382728791235!2d-74.2065133234196!3d-13.178117625560327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x911287d097bf5223%3A0x1a0615e1d9d3644d!2sREGALOS%20PERSONALIZADOS%20JONLER!5e0!3m2!1ses!2spe!4v1748043384958!5m2!1ses!2spe"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

            </main>
            <Footer />
        </div>
    );
}
