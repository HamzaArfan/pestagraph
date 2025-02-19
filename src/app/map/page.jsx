"use client";
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Navbar from '@/components/Navbar';

mapboxgl.accessToken = 'pk.eyJ1IjoiaGFtemFhcmZhbiIsImEiOiJjbTc2bTd2bHAwdnV1MnBzZTFnbDllZXR1In0.BYpxj3DZ5c3xeQBSNoov9g';

const LocationMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipwhois.pro/8.8.4.4?key=kYDYksuNxrORHoZX');
        const data = await response.json();
        
        if (data.success) {
          setLocationData(data);
        } else {
          setError('Failed to fetch location data');
        }
      } catch (err) {
        setError('Error fetching location data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    if (loading || !locationData) return;
    if (map.current) return;

    // Initialize map with dark mode style
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Changed to dark style
      center: [locationData.longitude, locationData.latitude],
      zoom: 12
    });

    // Add navigation controls with dark theme
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
      showCompass: true
    });
    map.current.addControl(nav);

    // Create a dark-themed popup
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
      className: 'dark-mode-popup' // Custom class for styling
    });

    // Add marker with location details
    const popupContent = `
      <div style="color: #ffffff; background: #1f2937; padding: 8px; border-radius: 4px;">
        ${locationData.connection.org}<br>
        ${locationData.city}, ${locationData.region}<br>
        ${locationData.country}
      </div>
    `;

    new mapboxgl.Marker({
      color: '#60A5FA' 
    })
      .setLngLat([locationData.longitude, locationData.latitude])
      .setPopup(popup.setHTML(popupContent))
      .addTo(map.current);

    // Cleanup
    return () => map.current?.remove();
  }, [loading, locationData]);

  if (error) {
    return <div className="w-screen h-screen flex items-center justify-center text-red-500 bg-gray-900">{error}</div>;
  }

  if (loading) {
    return <div className="w-screen h-screen flex items-center justify-center text-white bg-gray-900">Loading map...</div>;
  }

  return (
    <div className="w-screen h-screen bg-gray-900">
  
      <div ref={mapContainer} className="w-full h-full" />
      <link 
        href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css" 
        rel="stylesheet" 
      />
      <style jsx global>{`
        .mapboxgl-popup-content {
          background: #1f2937 !important;
          color: #ffffff !important;
        }
        .mapboxgl-popup-tip {
          border-top-color: #1f2937 !important;
        }
        .mapboxgl-ctrl-group {
          background: #1f2937 !important;
        }
        .mapboxgl-ctrl button {
          background-color: #374151 !important;
        }
        .mapboxgl-ctrl button:hover {
          background-color: #4B5563 !important;
        }
        .mapboxgl-ctrl button span {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
};

export default LocationMap;