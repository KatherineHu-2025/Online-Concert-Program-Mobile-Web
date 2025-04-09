'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { getConcertById } from '../firebase/services';
import { saveConcert } from '../utils/concertStorage';

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [mode, setMode] = useState<'camera' | 'file'>('camera');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const html5QrCode = useRef<Html5Qrcode | null>(null);
  const router = useRouter();

  const stopScanning = useCallback(async () => {
    if (html5QrCode.current && isScanning) {
      try {
        await html5QrCode.current.stop();
        setIsScanning(false);
      } catch (error) {
        console.error("Error stopping scanner:", error);
      }
    }
  }, [isScanning]);

  const handleScanSuccess = useCallback(async (decodedText: string) => {
    setScanResult(decodedText);
    await stopScanning();
    
    try {
      // The QR code should contain the full document ID from Firebase
      const concertId = decodedText;
      
      // Fetch and save the concert data
      const concertData = await getConcertById(concertId);
      if (concertData) {
        saveConcert(concertId, concertData);
        router.push(`/concert/${concertId}`);
      } else {
        setError("Concert not found");
      }
    } catch {
      setError("Invalid QR code format");
    }
  }, [router, stopScanning]);

  const startScanning = useCallback(async () => {
    if (!html5QrCode.current) return;

    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length > 0) {
        const deviceId = devices[0].id;
        await html5QrCode.current.start(
          deviceId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          (decodedText) => {
            console.log('Successfully scanned:', decodedText);
            handleScanSuccess(decodedText);
          },
          (errorMessage) => {
            // Only log critical errors
            if (!errorMessage.includes("No QR code found") && 
                !errorMessage.includes("No barcode") &&
                !errorMessage.includes("NotFoundException") &&
                !errorMessage.includes("No MultiFormat Readers")) {
              console.error('Scanning error:', errorMessage);
            }
          }
        );
        setIsScanning(true);
      } else {
        setError("No camera devices found");
      }
    } catch (error) {
      console.error('Scanner initialization error:', error);
      setError("Failed to start camera scanning. Please check camera permissions.");
    }
  }, [handleScanSuccess]);

  useEffect(() => {
    if (mode === 'camera' && !html5QrCode.current) {
      try {
        html5QrCode.current = new Html5Qrcode("qr-reader");
        startScanning();
      } catch {
        console.error("Scanner initialization error");
        setError("Failed to initialize camera. Please ensure camera permissions are granted and try again.");
      }
    }

    return () => {
      stopScanning();
    };
  }, [mode, startScanning, stopScanning]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (!html5QrCode.current) {
        html5QrCode.current = new Html5Qrcode("qr-reader");
      }

      console.log('Attempting to scan file:', file.name);
      const result = await html5QrCode.current.scanFile(file, true);
      console.log('File scan result:', result);
      handleScanSuccess(result);
    } catch (error) {
      console.error('File scanning error:', error);
      setError("Could not read QR code from image. Please try another image or use camera scanning.");
    }
  };

  const retryScanning = () => {
    setError(null);
    setScanResult(null);
    setMode('camera');
    if (html5QrCode.current) {
      startScanning();
    }
  };

  const switchMode = async () => {
    await stopScanning();
    setMode(mode === 'camera' ? 'file' : 'camera');
    setError(null);
    setScanResult(null);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <Link href="/" className="text-xl">
          ←
        </Link>
        <h1 className="text-lg font-bold">
          QR Code Scanner
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#2B2F3E] mb-6 text-center">
            Scan Concert QR Code
          </h2>

          {/* Mode Switch */}
          <div className="mb-4 flex justify-center">
            <button
              onClick={switchMode}
              className="bg-[#F2C3B3] text-[#2B2F3E] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Switch to {mode === 'camera' ? 'File Upload' : 'Camera'}
            </button>
          </div>

          {/* Scanner UI */}
          <div className="mb-4">
            <div 
              id="qr-reader" 
              className={`${mode === 'camera' ? 'block' : 'hidden'} overflow-hidden rounded-lg`}
              style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
            ></div>
            
            {mode === 'file' && (
              <div className="text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-[#F2C3B3] text-[#2B2F3E] px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Upload QR Code Image
                </button>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
              <p className="text-red-700 mb-2">{error}</p>
              <button
                onClick={retryScanning}
                className="bg-[#F2C3B3] text-[#2B2F3E] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Result Display */}
          {scanResult && (
            <div className="mt-4 p-4 bg-[#F2C3B3] rounded-lg">
              <p className="text-[#2B2F3E] text-center">
                <strong>Redirecting to concert...</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      <Navbar />
    </main>
  );
} 