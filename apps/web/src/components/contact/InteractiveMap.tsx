"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

interface InteractiveMapProps {
  address?: string;
  className?: string;
}

export const InteractiveMap = ({
  address = "Cocody Angré Terminus 81/82 Djibi 2 V.74, Abidjan",
  className = "",
}: InteractiveMapProps) => {
  // Encoded address for Google Maps
  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyDummy"}&q=${encodedAddress}`;
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className={`bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 ${className}`}
    >
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-1 to-[#E55A2B] rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-primary">Nous trouver</h3>
        </div>
        <motion.a
          href={googleMapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-accent-1 hover:text-accent-2 transition-colors text-sm font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Ouvrir dans Google Maps</span>
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </motion.div>

      {/* Map Container */}
      <div className="relative h-64 rounded-xl overflow-hidden border-2 border-gray-200">
        {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
          <iframe
            src={googleMapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 font-medium mb-1">{address}</p>
              <motion.a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-1 hover:text-accent-2 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <span>Ouvrir dans Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        )}

        {/* Overlay gradient for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
};

