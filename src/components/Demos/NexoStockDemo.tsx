import React, { useState, useMemo } from 'react';
import {
  ShoppingCart, Barcode, Printer, CheckCircle, Plus, Trash2,
  DollarSign, UserCheck, Search, LogIn, LogOut, CreditCard,
  Banknote, Smartphone, Gift, Package, Scale, Clock, Lock
} from 'lucide-react';

interface Product {
  id: string;
  code: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  isWeighed?: boolean;
  promotion?: { type: '2x1' | 'percentage' | 'fixed'; value: number; label: string };
}

interface CartItem {
  product: Product;
  quantity: number;
}

const PRODUCTS: Product[] = [
  { id: '1', code: '7790001001', name: 'Pan Francés 1kg', price: 1800, category: 'Panadería', stock: 24 },
  { id: '2', code: '7790002002', name: 'Leche Entera Larga Vida 1L', price: 1450, category: 'Lácteos', stock: 45 },
  { id: '3', code: '7790003003', name: 'Aceite de Girasol 900ml', price: 2300, category: 'Almacén', stock: 18, promotion: { type: 'percentage', value: 10, label: '10% OFF' } },
  { id: '4', code: '7790004004', name: 'Arroz Largo Fino 1kg', price: 1600, category: 'Almacén', stock: 30 },
  { id: '5', code: '7790005005', name: 'Café Molido 250g', price: 3400, category: 'Almacén', stock: 12 },
  { id: '6', code: '7790006006', name: 'Queso Cremoso 500g', price: 3900, category: 'Fiambrería', stock: 15, promotion: { type: '2x1', value: 0, label: '2x1' } },
  { id: '7', code: '7790007007', name: 'Gaseosa Cola 2.25L', price: 2800, category: 'Bebidas', stock: 20 },
  { id: '8', code: '7790008008', name: 'Galletitas Pack x3', price: 1200, category: 'Snacks', stock: 35, promotion: { type: 'fixed', value: 200, label: '$200 OFF' } },
  { id: '9', code: 'SCALE_001', name: 'Banana x Kg', price: 900, category: 'Frutas', stock: 999, isWeighed: true },
  { id: '10', code: 'SCALE_002', name: 'Carne Picada x Kg', price: 8500, category: 'Carnicería', stock: 999, isWeighed: true },
];

const CASH_BOXES = [
  { id: 1, name: 'Caja #01', status: 'free' as const },
  { id: 2, name: 'Caja #02', status: 'free' as const },
  { id: 3, name: 'Caja #03', status: 'occupied' as const, cashier: 'Pedro G.' },
];

export const NexoStockDemo: React.FC = () => {
  const [step, setStep] = useState<'login' | 'select-cashbox' | 'pos'>('login');
  const [cashierName, setCashierName] = useState('');
  const [selectedCashBox, setSelectedCashBox] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer'>('cash');
  const [cashGiven, setCashGiven] = useState('10000');
  const [receipt, setReceipt] = useState<any>(null);

  const filteredProducts = useMemo(() => {
    if (!searchInput) return products;
    const q = searchInput.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(q) || p.code.includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [products, searchInput]);

  const addToCart = (product: Product) => {
    const qty = 1;
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { product, quantity: qty }];
    });

    if (!product.isWeighed) {
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
    }
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    if (!item.product.isWeighed && item) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: p.stock + item.quantity } : p));
    }
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const getPromotionDiscount = (item: CartItem): number => {
    if (!item.product.promotion) return 0;
    const basePrice = item.product.price * item.quantity;
    switch (item.product.promotion.type) {
      case 'percentage': return basePrice * (item.product.promotion.value / 100);
      case 'fixed': return item.product.promotion.value;
      case '2x1': return Math.floor(item.quantity / 2) * item.product.price;
      default: return 0;
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + getPromotionDiscount(item), 0);
  const total = subtotal - totalDiscount;
  const cashNum = parseFloat(cashGiven) || 0;
  const change = Math.max(0, cashNum - total);

  const handleCheckout = () => {
    if (cart.length === 0 || (paymentMethod === 'cash' && cashNum < total)) return;

    setReceipt({
      items: cart.map(i => ({
        name: i.product.name,
        qty: i.quantity,
        price: i.product.price,
        total: i.product.price * i.quantity,
        discount: getPromotionDiscount(i),
        isWeighed: i.product.isWeighed
      })),
      subtotal,
      totalDiscount,
      total,
      paymentMethod,
      cash: paymentMethod === 'cash' ? cashNum : total,
      change: paymentMethod === 'cash' ? change : 0,
      date: new Date().toLocaleTimeString('es-AR'),
      receiptNo: `TK-${Math.floor(100000 + Math.random() * 900000)}`,
      cashier: cashierName,
      cashBox: selectedCashBox
    });
    setCart([]);
  };

  const handleLogout = () => {
    setStep('login');
    setCashierName('');
    setSelectedCashBox(null);
    setCart([]);
    setReceipt(null);
    setProducts(PRODUCTS);
  };

  if (step === 'login') {
    return (
      <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-2xl">
        <div className="max-w-sm mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-black text-white">NexoStock POS</h3>
            <p className="text-xs text-slate-400">Ingresá tu nombre para iniciar turno</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-2">Nombre del Cajero</label>
            <input
              type="text"
              value={cashierName}
              onChange={(e) => setCashierName(e.target.value)}
              placeholder="Ej: Marcos B."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <button
            onClick={() => { if (cashierName.trim()) setStep('select-cashbox'); }}
            disabled={!cashierName.trim()}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <LogIn className="w-4 h-4" /> Ingresar al Sistema
          </button>
        </div>
      </div>
    );
  }

  if (step === 'select-cashbox') {
    return (
      <div className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-800 shadow-2xl">
        <div className="max-w-md mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-bold">{cashierName}</span>
            </div>
            <button onClick={handleLogout} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" /> Salir
            </button>
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black text-white">Seleccionar Caja</h3>
            <p className="text-xs text-slate-400">Elegí una caja libre para comenzar</p>
          </div>
          <div className="grid gap-3">
            {CASH_BOXES.map(box => (
              <button
                key={box.id}
                onClick={() => { if (box.status === 'free') { setSelectedCashBox(box.id); setStep('pos'); } }}
                disabled={box.status === 'occupied'}
                className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                  box.status === 'occupied'
                    ? 'bg-slate-950/50 border-slate-800 opacity-50 cursor-not-allowed'
                    : 'bg-slate-800/80 border-slate-700 hover:border-emerald-500 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    box.status === 'occupied' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {box.status === 'occupied' ? <Lock className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{box.name}</p>
                    <p className="text-[10px] text-slate-400">{box.status === 'occupied' ? `Ocupada por ${box.cashier}` : 'Disponible'}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${
                  box.status === 'occupied' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {box.status === 'occupied' ? 'Ocupada' : 'Libre'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-4 md:p-6 border border-slate-800 shadow-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">NexoStock POS — Caja #{selectedCashBox}</h3>
            <p className="text-[10px] text-slate-400 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-400" /> {cashierName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" /> {new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button onClick={handleLogout} className="text-xs px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-md flex items-center gap-1">
            <LogOut className="w-3 h-3" /> Salir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-7 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Escanear código o buscar producto..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {['Todos', 'Panadería', 'Lácteos', 'Almacén', 'Bebidas', 'Frutas', 'Carnicería'].map(cat => (
              <button
                key={cat}
                onClick={() => setSearchInput(cat === 'Todos' ? '' : cat)}
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold whitespace-nowrap transition-colors ${
                  (cat === 'Todos' && !searchInput) || searchInput === cat
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[280px] overflow-y-auto pr-1">
            {filteredProducts.map(p => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                disabled={!p.isWeighed && p.stock <= 0}
                className={`text-left p-2.5 rounded-lg border transition-all text-xs ${
                  !p.isWeighed && p.stock <= 0
                    ? 'bg-slate-950/50 border-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-emerald-500/50 text-slate-200'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-[11px] text-slate-100 leading-tight">{p.name}</span>
                  {p.promotion && (
                    <span className="text-[8px] px-1 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold shrink-0 ml-1">
                      {p.promotion.label}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-emerald-400 text-[11px]">
                    ${p.price.toLocaleString('es-AR')}{p.isWeighed && '/kg'}
                  </span>
                  <span className={`text-[9px] px-1 py-0.5 rounded ${p.stock < 5 && !p.isWeighed ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-700 text-slate-400'}`}>
                    {p.isWeighed ? <Scale className="w-2.5 h-2.5 inline" /> : `Stk: ${p.stock}`}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Carrito ({cart.reduce((a, b) => a + b.quantity, 0)} items)
            </span>
            {cart.length > 0 && (
              <button onClick={() => { setCart([]); setProducts(PRODUCTS); }} className="text-[10px] text-rose-400 hover:underline">
                Vaciar
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
              <div className="text-center space-y-2">
                <Package className="w-8 h-8 mx-auto opacity-30" />
                <p>Carrito vacío</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-2 overflow-y-auto max-h-[180px] pr-1">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between items-center p-2 bg-slate-900 rounded border border-slate-800 text-xs">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-200 truncate text-[11px]">{item.product.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {item.product.isWeighed ? `${item.quantity}kg` : `${item.quantity} x`} ${item.product.price.toLocaleString('es-AR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-emerald-400 text-[11px]">
                      ${Math.round(item.product.price * item.quantity).toLocaleString('es-AR')}
                    </span>
                    {item.product.promotion && (
                      <span className="text-[8px] text-amber-400">-{Math.round(getPromotionDiscount(item)).toLocaleString('es-AR')}</span>
                    )}
                    <button onClick={() => removeFromCart(item.product.id)} className="text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="border-t border-slate-800 pt-3 mt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-slate-200">${subtotal.toLocaleString('es-AR')}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-amber-400 flex items-center gap-1"><Gift className="w-3 h-3" /> Promociones</span>
                  <span className="text-amber-400">-${Math.round(totalDiscount).toLocaleString('es-AR')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black">
                <span className="text-white">TOTAL</span>
                <span className="text-emerald-400">${Math.round(total).toLocaleString('es-AR')}</span>
              </div>

              <div className="flex gap-1.5">
                {[
                  { id: 'cash' as const, icon: <Banknote className="w-3.5 h-3.5" />, label: 'Efectivo' },
                  { id: 'card' as const, icon: <CreditCard className="w-3.5 h-3.5" />, label: 'Tarjeta' },
                  { id: 'transfer' as const, icon: <Smartphone className="w-3.5 h-3.5" />, label: 'Transferencia' }
                ].map(pm => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`flex-1 py-1.5 rounded-md text-[10px] font-bold flex items-center justify-center gap-1 transition-colors ${
                      paymentMethod === pm.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {pm.icon} {pm.label}
                  </button>
                ))}
              </div>

              {paymentMethod === 'cash' && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Recibido ($)</label>
                    <input
                      type="number"
                      value={cashGiven}
                      onChange={(e) => setCashGiven(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Vuelto</label>
                    <div className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs font-bold font-mono text-emerald-300">
                      ${Math.round(change).toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0 || (paymentMethod === 'cash' && cashNum < total)}
                className="w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white"
              >
                <Printer className="w-4 h-4" /> Cobrar & Imprimir Ticket
              </button>
            </div>
          )}
        </div>
      </div>

      {receipt && (
        <div className="bg-amber-50/95 text-slate-900 rounded-lg p-5 border border-amber-200 font-mono text-xs max-w-sm mx-auto shadow-2xl">
          <div className="text-center border-b border-dashed border-slate-400 pb-3 mb-3 space-y-1">
            <h4 className="font-bold text-sm tracking-widest uppercase">NexoStock POS</h4>
            <p className="text-[10px] text-slate-600">Caja #{receipt.cashBox} — Cajero: {receipt.cashier}</p>
            <div className="flex justify-between text-[10px] text-slate-500 pt-1">
              <span>{receipt.receiptNo}</span>
              <span>{receipt.date}</span>
            </div>
          </div>

          <div className="space-y-1 border-b border-dashed border-slate-400 pb-3 mb-3">
            {receipt.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between">
                <span>{item.isWeighed ? `${item.qty}kg` : `${item.qty}x`} {item.name.substring(0, 18)}</span>
                <span className="font-bold">${Math.round(item.total).toLocaleString('es-AR')}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1 text-xs mb-3">
            {receipt.totalDiscount > 0 && (
              <div className="flex justify-between text-amber-600">
                <span>DESCUENTOS:</span>
                <span>-${Math.round(receipt.totalDiscount).toLocaleString('es-AR')}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm">
              <span>TOTAL:</span>
              <span>${Math.round(receipt.total).toLocaleString('es-AR')}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[10px]">
              <span>Pago: {receipt.paymentMethod === 'cash' ? 'Efectivo' : receipt.paymentMethod === 'card' ? 'Tarjeta' : 'Transferencia'}</span>
              <span>${Math.round(receipt.cash).toLocaleString('es-AR')}</span>
            </div>
            {receipt.change > 0 && (
              <div className="flex justify-between text-slate-600 text-[10px]">
                <span>VUELTO:</span>
                <span>${Math.round(receipt.change).toLocaleString('es-AR')}</span>
              </div>
            )}
          </div>

          <div className="text-center pt-2 border-t border-dashed border-slate-400 text-[10px] text-slate-600">
            <p className="font-bold">*** GRACIAS POR SU COMPRA ***</p>
          </div>

          <button
            onClick={() => setReceipt(null)}
            className="mt-3 w-full py-1.5 bg-slate-900 text-white rounded text-center text-xs font-sans font-medium hover:bg-slate-800"
          >
            Cerrar Ticket
          </button>
        </div>
      )}
    </div>
  );
};
