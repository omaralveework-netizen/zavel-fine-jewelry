import { useState } from 'react'
import Modal from './Modal'
import CrownMark from './CrownMark'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabaseClient'

// Your deployed Google Apps Script Webhook URL
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxwWn03k3rSESU-lBir3bAV3XS1SjVrpOYK0BmipPGOCn3Czmg83C2Da_gkzzWuSuw-/exec'

export default function CheckoutModal({ open, onClose }) {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState('form')
  const [shippingArea, setShippingArea] = useState('inside')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [orderNo, setOrderNo] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const shippingCost = shippingArea === 'inside' ? 80 : 130
  const grandTotal = subtotal + shippingCost

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setErrorMsg('')

    const generatedOrderNo = 'ZV-' + Date.now().toString().slice(-6)
    const formattedItems = items.map(i => `${i.name} (x${i.qty})`).join(', ')

    const orderPayload = {
      order_no: generatedOrderNo,
      customer_name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      shipping_area: shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka',
      shipping_cost: shippingCost,
      items: items.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
      total_amount: grandTotal,
      status: 'Pending'
    }

    // 1. Insert into Supabase
    const { error } = await supabase.from('orders').insert([orderPayload])

    if (error) {
      setSubmitting(false)
      setErrorMsg('Failed to place order. Please try again.')
      console.error(error)
      return
    }

    // 2. Send order payload to Google Sheets
    try {
      await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_no: generatedOrderNo,
          date: new Date().toLocaleString(),
          customer_name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          shipping_area: shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka',
          items: formattedItems,
          total_amount: `৳${grandTotal}`
        })
      })
    } catch (sheetErr) {
      console.error('Failed to sync to Google Sheet:', sheetErr)
    }

    setSubmitting(false)
    setOrderNo(generatedOrderNo)
    setStep('confirmed')
  }

  const handleClose = () => {
    if (step === 'confirmed') {
      clearCart()
      setForm({ name: '', email: '', phone: '', address: '' })
      setStep('form')
      setShippingArea('inside')
    }
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} maxWidth="max-w-lg">
      {step === 'form' ? (
        <>
          <h3 className="font-display text-2xl text-gold-100 mb-1">Complete Your Order</h3>
          <p className="font-sans text-sm text-gold-100/60 mb-6">
            Tell us where to reach you — we'll confirm availability and delivery.
          </p>

          {errorMsg && (
            <p className="mb-4 font-ui text-xs tracking-[0.1em] text-rose-300 bg-rose-950/40 border border-rose-400/30 p-3 rounded-sm">
              {errorMsg}
            </p>
          )}

          <div className="mb-6 border border-gold-400/15 rounded-sm divide-y divide-gold-400/10">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3">
                <span className="font-sans text-sm text-gold-100/80">
                  {item.name} <span className="text-gold-100/40">&times;{item.qty}</span>
                </span>
                <span className="font-display text-gold-300 text-sm">
                  ৳{(Number(item.price) * item.qty).toFixed(0)}
                </span>
              </div>
            ))}

            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="font-ui text-xs tracking-[0.14em] uppercase text-gold-100/60">
                Subtotal
              </span>
              <span className="font-display text-sm text-gold-100/80">
                ৳{subtotal.toFixed(0)}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-2.5">
              <span className="font-ui text-xs tracking-[0.14em] uppercase text-gold-100/60">
                Delivery Fee
              </span>
              <span className="font-display text-sm text-gold-300">
                ৳{shippingCost}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-emerald-950/40">
              <span className="font-ui text-xs tracking-[0.14em] uppercase text-gold-100/80 font-bold">
                Total
              </span>
              <span className="font-display text-lg text-gold-300 font-bold">
                ৳{grandTotal.toFixed(0)}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" value={form.name} onChange={update('name')} required />
              <Field
                label="Phone Number"
                value={form.phone}
                onChange={update('phone')}
                required
                type="tel"
              />
            </div>
            <Field label="Email" value={form.email} onChange={update('email')} required type="email" />

            <div className="flex flex-col gap-2">
              <span className="font-ui text-[10px] tracking-[0.16em] uppercase text-gold-100/50">
                Shipping Location
              </span>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`flex items-center justify-between p-3 rounded-sm border cursor-pointer transition-colors ${
                    shippingArea === 'inside'
                      ? 'bg-gold-400/10 border-gold-400 text-gold-100'
                      : 'bg-emerald-900 border-gold-400/25 text-gold-100/60 hover:border-gold-400/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      value="inside"
                      checked={shippingArea === 'inside'}
                      onChange={() => setShippingArea('inside')}
                      className="accent-gold-400 cursor-pointer"
                    />
                    <span className="font-sans text-xs">Inside Dhaka</span>
                  </div>
                  <span className="font-display text-xs text-gold-300">৳80</span>
                </label>

                <label
                  className={`flex items-center justify-between p-3 rounded-sm border cursor-pointer transition-colors ${
                    shippingArea === 'outside'
                      ? 'bg-gold-400/10 border-gold-400 text-gold-100'
                      : 'bg-emerald-900 border-gold-400/25 text-gold-100/60 hover:border-gold-400/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shipping"
                      value="outside"
                      checked={shippingArea === 'outside'}
                      onChange={() => setShippingArea('outside')}
                      className="accent-gold-400 cursor-pointer"
                    />
                    <span className="font-sans text-xs">Outside Dhaka</span>
                  </div>
                  <span className="font-display text-xs text-gold-300">৳130</span>
                </label>
              </div>
            </div>

            <TextArea label="Delivery Address" value={form.address} onChange={update('address')} required />

            <button
              disabled={submitting}
              type="submit"
              className="mt-2 bg-gold-400 text-emerald-950 font-ui text-xs tracking-[0.2em] uppercase py-4 rounded-sm hover:bg-gold-300 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </>
      ) : (
        <div className="text-center py-4">
          <CrownMark className="w-10 h-8 mx-auto mb-3" />
          <p className="font-ui text-[10px] tracking-[0.35em] text-gold-400 uppercase mb-1">
            Order Confirmed
          </p>
          <h3 className="font-display text-2xl text-gold-100 mb-6">Thank you, {form.name.split(' ')[0]}</h3>

          <div className="text-left border border-gold-400/20 rounded-sm p-5 mb-6">
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gold-100/50 font-ui text-xs tracking-[0.1em] uppercase">
                Order No.
              </span>
              <span className="text-gold-300 font-display">{orderNo}</span>
            </div>
            <div className="divide-y divide-gold-400/10">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-2 text-sm">
                  <span className="text-gold-100/80">
                    {item.name} &times;{item.qty}
                  </span>
                  <span className="text-gold-100/80">
                    ৳{(Number(item.price) * item.qty).toFixed(0)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-2 text-sm">
                <span className="text-gold-100/60 font-sans text-xs">
                  Delivery ({shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})
                </span>
                <span className="text-gold-100/80 font-display">
                  ৳{shippingCost}
                </span>
              </div>
            </div>
            <div className="flex justify-between pt-3 mt-1 border-t border-gold-400/15">
              <span className="font-ui text-xs tracking-[0.1em] uppercase text-gold-100/60">
                Total
              </span>
              <span className="font-display text-gold-300 text-lg">৳{grandTotal.toFixed(0)}</span>
            </div>
          </div>

          <p className="font-sans text-xs text-gold-100/50 mb-7 leading-relaxed">
            A confirmation will be sent to {form.email || 'your email'}. Our
            team will reach you at {form.phone || 'your phone number'} to
            confirm delivery details.
          </p>

          <button
            onClick={handleClose}
            className="w-full bg-gold-400 text-emerald-950 font-ui text-xs tracking-[0.2em] uppercase py-4 rounded-sm hover:bg-gold-300 transition-colors"
          >
            OK
          </button>
        </div>
      )}
    </Modal>
  )
}

function Field({ label, ...props }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-ui text-[10px] tracking-[0.16em] uppercase text-gold-100/50">
        {label}
      </span>
      <input
        {...props}
        className="bg-emerald-900 border border-gold-400/25 focus:border-gold-400 rounded-sm px-3.5 py-2.5 text-sm text-gold-100 outline-none transition-colors"
      />
    </label>
  )
}

function TextArea({ label, ...props }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-ui text-[10px] tracking-[0.16em] uppercase text-gold-100/50">
        {label}
      </span>
      <textarea
        {...props}
        rows={3}
        className="bg-emerald-900 border border-gold-400/25 focus:border-gold-400 rounded-sm px-3.5 py-2.5 text-sm text-gold-100 outline-none transition-colors resize-none"
      />
    </label>
  )
}