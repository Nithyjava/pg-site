import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  CreditCard, QrCode, Building, Wallet, ShieldCheck, CheckCircle2, 
  ArrowRight, Download, FileText, Sparkles, RefreshCw, Lock, Copy
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PaymentCheckout: React.FC = () => {
  const { pgs, activePGId, createBooking, setActiveTab, showToast, currentUser } = useApp();

  const pg = pgs.find(p => p.id === activePGId) || pgs[0];
  const room = pg.rooms[0];

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('782');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState('');

  const totalAmount = room.pricePerMonth + room.securityDeposit;

  const handlePayNow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);

      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      const newB = createBooking({
        pgId: pg.id,
        pgName: pg.name,
        pgImage: pg.images[0],
        pgAddress: pg.fullAddress,
        ownerName: pg.owner.name,
        ownerPhone: pg.owner.phone,
        userId: currentUser?.id || 'u1',
        userName: currentUser?.name || 'Aarav Sharma',
        userEmail: currentUser?.email || 'aarav@example.com',
        userPhone: currentUser?.phone || '+91 98765 43210',
        roomId: room.id,
        roomNumber: room.roomNumber,
        bedId: `${room.id}-bed1`,
        bedNumber: `${room.roomNumber}-A`,
        roomType: `${room.type} Sharing AC`,
        moveInDate: '2026-08-15',
        durationMonths: 6,
        monthlyRent: room.pricePerMonth,
        securityDeposit: room.securityDeposit,
        discountAmount: 1000,
        totalPaid: totalAmount - 1000,
        paymentMethod: paymentMethod,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        rentDueDate: '2026-09-15',
        wifiCredentials: { ssid: `${pg.name.split(' ')[0]}_5G`, pass: 'StayAtPGNest#2026' },
        gatePassCode: `GP-${Math.floor(10000 + Math.random() * 90000)}`
      });

      setCreatedBookingId(newB.id);
    }, 2000);
  };

  if (paymentCompleted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full mx-auto flex items-center justify-center font-bold shadow-xl"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>

        <div className="space-y-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-xs rounded-xl inline-block">
            PAYMENT CONFIRMED
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Booking Confirmed! Welcome Home
          </h1>
          <p className="text-xs text-slate-500">
            Booking ID: <span className="font-bold text-slate-800 dark:text-slate-200">{createdBookingId}</span> • Receipt emailed to {currentUser?.email || 'aarav@example.com'}
          </p>
        </div>

        {/* Printable Receipt Card */}
        <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md text-left space-y-4 max-w-lg mx-auto">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-white text-sm">{pg.name}</span>
            <span className="text-xs font-semibold text-emerald-600">PAID ₹{(totalAmount - 1000).toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold block">Resident</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{currentUser?.name || 'Aarav Sharma'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold block">Move-in Date</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">15th Aug 2026</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold block">Room & Bed</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Room {room.roomNumber} (Bed A)</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-bold block">Gate Pass Code</span>
              <span className="font-bold text-red-600 font-mono">GP-88392</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              showToast('Official Receipt PDF downloaded', 'success');
            }}
            className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF Receipt
          </button>
          <button
            onClick={() => setActiveTab('user_dashboard')}
            className="px-6 py-3 bg-red-600 text-white rounded-2xl text-xs font-bold shadow-md flex items-center gap-2"
          >
            Go to Resident Portal <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Checkout & Payment
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete your security deposit and first month rent payment securely
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Method selector tabs */}
          <div className="grid grid-cols-4 gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'upi' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <QrCode className="w-5 h-5" /> UPI / QR
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'card' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <CreditCard className="w-5 h-5" /> Debit / Card
            </button>
            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'netbanking' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Building className="w-5 h-5" /> Net Banking
            </button>
            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                paymentMethod === 'wallet' ? 'bg-white dark:bg-slate-700 text-red-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Wallet className="w-5 h-5" /> Wallet
            </button>
          </div>

          {/* Tab Views */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            
            {paymentMethod === 'upi' && (
              <div className="space-y-4 text-center">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl inline-block border border-slate-200 dark:border-slate-700">
                  {/* Mock QR */}
                  <div className="w-44 h-44 bg-slate-900 text-white mx-auto rounded-xl flex flex-col items-center justify-center p-2 font-mono text-[10px]">
                    <QrCode className="w-28 h-28 text-white" />
                    <span className="mt-1 font-bold text-red-400">SCAN & PAY WITH ANY UPI</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500">
                  Scan using Google Pay, PhonePe, Paytm, or BHIM UPI app
                </p>

                <div className="max-w-xs mx-auto">
                  <label className="block text-left text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Or Enter Virtual Payment Address (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="space-y-4">
                {/* Virtual Card Preview */}
                <div className="p-5 bg-gradient-to-tr from-slate-900 to-slate-800 text-white rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold tracking-widest">PGNEST RESIDENT CARD</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-lg font-mono tracking-wider font-bold">
                    {cardNumber}
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-300">
                    <div>
                      <span className="text-[9px] block text-slate-400">CARD HOLDER</span>
                      <span className="font-bold">{currentUser?.name || 'AARAV SHARMA'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] block text-slate-400">EXPIRES</span>
                      <span className="font-bold">{cardExpiry}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">CVV Code</label>
                    <input
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                {['HDFC Bank', 'ICICI Bank', 'Axis Bank', 'State Bank of India', 'Kotak Mahindra', 'Punjab National Bank'].map((b, i) => (
                  <button key={i} className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-800 dark:text-slate-200 text-left">
                    {b}
                  </button>
                ))}
              </div>
            )}

            {paymentMethod === 'wallet' && (
              <div className="grid grid-cols-2 gap-3 text-xs">
                {['Paytm Wallet', 'Amazon Pay', 'Mobikwik', 'Freecharge'].map((w, i) => (
                  <button key={i} className="p-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-800 dark:text-slate-200 text-left">
                    {w}
                  </button>
                ))}
              </div>
            )}

          </div>

          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" /> Processing Payment...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" /> Pay ₹{(totalAmount - 1000).toLocaleString()} Securely
              </>
            )}
          </button>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Order Summary</h3>

            <div className="flex gap-3">
              <img src={pg.images[0]} alt={pg.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{pg.name}</h4>
                <p className="text-slate-400">{pg.area}, {pg.city}</p>
                <p className="text-red-600 font-semibold mt-0.5">Room {room.roomNumber}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>First Month Rent</span>
                <span>₹{room.pricePerMonth.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Security Deposit</span>
                <span>₹{room.securityDeposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Welcome Discount</span>
                <span>-₹1,000</span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-slate-900 dark:text-white text-sm">
                <span>Amount Payable</span>
                <span className="text-red-600 font-extrabold">₹{(totalAmount - 1000).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
