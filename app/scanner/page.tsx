'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import Navbar from '../components/Navbar';

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [mode, setMode] = useState<'camera' | 'file'>('camera');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    const initializeScanner = () => {
      try {
        if (typeof window !== 'undefined' && window.isSecureContext) {
          scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0,
              showTorchButtonIfSupported: true,
              rememberLastUsedCamera: true,
            },
            false
          );

          const onScanSuccess = (decodedText: string) => {
            setScanResult(decodedText);
            setIsScanning(false);
            if (scanner) {
              scanner.clear();
            }
          };

          // Suppress console errors for "not found" cases
          const originalConsoleError = console.error;
          console.error = (...args) => {
            if (!args[0]?.includes?.("NotFoundException") && !args[0]?.includes?.("No barcode")) {
              originalConsoleError.apply(console, args);
            }
          };

          scanner.render(onScanSuccess, (error) => {
            // Only set error for critical errors, not for "no QR code found" type errors
            if (!error.includes("NotFoundException") && 
                !error.includes("No barcode") && 
                !error.includes("No MultiFormat Readers")) {
              setError(error);
            }
          });

          // Restore original console.error
          setTimeout(() => {
            console.error = originalConsoleError;
          }, 100);

          setIsScanning(true);
        } else {
          setError("Scanner requires a secure connection (HTTPS) or localhost");
        }
      } catch (err) {
        console.error("Scanner initialization error:", err);
        setError("Failed to initialize camera. Please ensure camera permissions are granted and try again.");
      }
    };

    if (mode === 'camera') {
      initializeScanner();
    }

    return () => {
      if (scanner) {
        try {
          scanner.clear();
        } catch (err) {
          console.error("Error cleaning up scanner:", err);
        }
      }
    };
  }, [mode]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode("qr-reader-file");
      const result = await html5QrCode.scanFile(file, true);
      setScanResult(result);
    } catch {
      setError("Could not read QR code from image. Please try another image or use camera scanning.");
    }
  };

  const retryScanning = () => {
    setError(null);
    setScanResult(null);
    setMode('camera');
    window.location.reload();
  };

  const switchMode = () => {
    setMode(mode === 'camera' ? 'file' : 'camera');
    setError(null);
    setScanResult(null);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <h1 className="text-lg font-bold">
          Interactive Concert Program
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#2B2F3E] mb-6 text-center">
            Scan QR Code
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

          {/* Guidance Message */}
          {mode === 'camera' && !error && !scanResult && (
            <div className="mb-4 p-4 bg-[#F9ECD9] rounded-lg">
              <p className="text-[#2B2F3E] text-center">
                Hold a QR code steady in front of your camera to scan
              </p>
              <p className="text-[#2B2F3E] text-center text-sm mt-2">
                Take your time to position the code - the scanner will keep looking
              </p>
            </div>
          )}
          
          {/* Scanner/File Upload UI */}
          {mode === 'camera' ? (
            <div id="qr-reader" className="mb-4"></div>
          ) : (
            <div className="mb-4 text-center">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <div id="qr-reader-file" className="hidden"></div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#F2C3B3] text-[#2B2F3E] px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Upload QR Code Image
              </button>
            </div>
          )}
          
          {/* Error display - only for critical errors */}
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
          
          {/* Result display */}
          {scanResult && (
            <div className="mt-4 p-4 bg-[#F2C3B3] rounded-lg">
              <p className="text-[#2B2F3E] text-center">
                <strong>Scanned Result:</strong> {scanResult}
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={retryScanning}
                  className="bg-[#2B2F3E] text-[#F9ECD9] px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
                >
                  Scan Another Code
                </button>
              </div>
            </div>
          )}

          {/* Loading state */}
          {mode === 'camera' && !error && !scanResult && !isScanning && (
            <div className="mt-4 p-4 bg-[#F9ECD9] rounded-lg text-center">
              <p className="text-[#2B2F3E]">Initializing camera...</p>
            </div>
          )}
        </div>
      </div>

      <Navbar />
    </main>
  );
} 