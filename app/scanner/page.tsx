'use client';

import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';

// Create a client-side only component
const Scanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'camera' | 'file'>('camera');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<any>(null);

  const cleanupScanner = async () => {
    try {
      // First try to clear the scanner instance
      if (scannerRef.current) {
        await scannerRef.current.clear();
        await scannerRef.current.stop();
        scannerRef.current = null;
      }

      // Remove all elements created by the scanner
      const elements = document.getElementsByClassName('html5-qrcode-element');
      while (elements.length > 0) {
        elements[0].remove();
      }

      // Clean up the container
      const container = document.getElementById('qr-reader');
      if (container) {
        container.innerHTML = '';
        container.remove();
      }

      // Wait a bit to ensure cleanup is complete
      await new Promise(resolve => setTimeout(resolve, 100));

      // Recreate the container
      const parent = document.getElementById('scanner-container');
      if (parent) {
        parent.innerHTML = '<div id="qr-reader" class="mb-4 rounded-2xl overflow-hidden"></div>';
      }
    } catch (err) {
      console.error('Cleanup error:', err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeScanner = async () => {
      if (!mounted) return;
      
      await cleanupScanner();

      if (mode === 'camera' && mounted) {
        try {
          const { Html5QrcodeScanner } = await import('html5-qrcode');
          
          // Wait a bit after cleanup before creating new instance
          await new Promise(resolve => setTimeout(resolve, 100));

          // Add styles for rounded corners
          const style = document.createElement('style');
          style.textContent = `
            #qr-reader video {
              border-radius: 1rem !important;
            }
            #qr-reader__scan_region {
              border-radius: 1rem !important;
            }
            #qr-reader__dashboard {
              border-radius: 1rem !important;
            }
          `;
          document.head.appendChild(style);
          
          const html5QrcodeScanner = new Html5QrcodeScanner(
            "qr-reader",
            { 
              fps: 10, 
              qrbox: { width: 250, height: 250 },
              experimentalFeatures: {
                useBarCodeDetectorIfSupported: true
              },
              rememberLastUsedCamera: true,
              showTorchButtonIfSupported: true
            },
            /* verbose= */ false
          );

          if (!mounted) {
            html5QrcodeScanner.clear();
            return;
          }

          scannerRef.current = html5QrcodeScanner;

          html5QrcodeScanner.render(
            async (decodedText: string) => {
              if (!mounted) return;
              setScanResult(decodedText);
              await cleanupScanner();
            },
            (error: string) => {
              if (!mounted) return;
              if (error.includes('HTTPS') || error.includes('secure')) {
                setError('Camera access requires a secure connection (HTTPS) or localhost. Please try using the file upload option instead.');
              } else if (
                !error.includes('NotFoundException') && 
                !error.includes('No barcode or QR code detected') &&
                !error.includes('No MultiFormat Readers') &&
                !error.includes('No barcode found')
              ) {
                setError(error);
              }
            }
          );
        } catch (err) {
          console.error('Scanner initialization error:', err);
          if (mounted) {
            setError('Failed to initialize camera. Please try again or use file upload.');
          }
        }
      }
    };

    initializeScanner();

    return () => {
      mounted = false;
      cleanupScanner();
    };
  }, [mode]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const { Html5Qrcode } = await import('html5-qrcode');
      const html5QrCode = new Html5Qrcode(
        "qr-reader-file",
        { 
          verbose: false,
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          }
        }
      );
      const result = await html5QrCode.scanFile(file, true);
      await html5QrCode.clear();
      setScanResult(result);
    } catch (err) {
      console.error('QR Code scanning error:', err);
      setError("Could not read QR code from image. Please try another image or use camera scanning.");
    }
  };

  const retryScanning = async () => {
    await cleanupScanner();
    setError(null);
    setScanResult(null);
    setMode('camera');
  };

  const switchMode = async () => {
    await cleanupScanner();
    setMode(mode === 'camera' ? 'file' : 'camera');
    setError(null);
    setScanResult(null);
  };

  return (
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

      {/* HTTPS Warning */}
      {mode === 'camera' && (
        <div className="mb-4 p-3 bg-[#F9ECD9] rounded-lg">
          <p className="text-[#2B2F3E] text-center text-sm">
            Note: Camera access requires a secure connection (HTTPS) or localhost
          </p>
          <p className="text-[#2B2F3E] text-center text-xs mt-1">
            If you're having issues, try the file upload option instead
          </p>
        </div>
      )}

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
        <div id="scanner-container">
          <div id="qr-reader" className="mb-4 rounded-2xl overflow-hidden"></div>
        </div>
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
    </div>
  );
};

export default function ScannerPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FEFBF4]">
      <div className="bg-[#2D2F3D] text-white py-5 px-4 flex items-center gap-4">
        <h1 className="text-lg font-bold">
          Interactive Concert Program
        </h1>
      </div>

      <div className="flex-1 flex flex-col items-center p-6 pb-24">
        <Scanner />
      </div>

      <Navbar />
    </main>
  );
} 