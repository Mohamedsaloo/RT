import React, { useState, useEffect, useRef } from "react";
import { XMarkIcon, PhotoIcon, TagIcon, ShoppingCartIcon, ClockIcon } from "@heroicons/react/24/outline";

const ProductCard = React.memo(({ product = {}}) => {
  const price = Number(product.price) || 0;
  const discount = Number(product.discount) || 0;
  const discountedPrice = discount
    ? Number((price * (1 - discount / 100)).toFixed(2))
    : price;

  const formatter = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: product.currency || "EGP",
    maximumFractionDigits: 2,
  });

  const [zoomOpen, setZoomOpen] = useState(false);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomOpen]);

  useEffect(() => {
    if (zoomOpen && closeBtnRef.current) closeBtnRef.current.focus();
  }, [zoomOpen]);

  // Format creation date
  const creationDate = product.createdAt ? new Date(product.createdAt).toLocaleDateString("ar-EG") : null;

  return (
    <>
      <div
        role="article"
        aria-label={product.name}
        className="w-[18.75rem] p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:shadow-lg hover:bg-white/30 transition-colors"
      >
        <div className="relative h-40 w-full bg-white/10 rounded-xl mb-3 flex items-center justify-center overflow-hidden group">
          {product.tag && (
            <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-white/80 text-gray-900 rounded-full border border-white/40 shadow-sm backdrop-blur-sm">
              <TagIcon className="h-4 w-4" />
              {product.tag}
            </span>
          )}

          {discount > 0 && (
            <span className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100/90 text-red-700 border border-red-200 shadow-sm">
              خصم {discount}%
            </span>
          )}

          {product.image ? (
            <img
              src={product.image}
              alt={product.name || "صورة المنتج"}
              className="max-h-full max-w-full object-contain p-2 cursor-zoom-in group-hover:brightness-95"
              loading="lazy"
              onClick={() => setZoomOpen(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-sm text-gray-500">
              <PhotoIcon className="h-10 w-10 mb-1 opacity-60" />
              صورة المنتج
            </div>
          )}
        </div>

        <h3 className="text-base font-semibold text-gray-900 truncate" title={product.name}>
          {product.name || "اسم المنتج"}
        </h3>

        <p className="mt-1 text-sm text-gray-600 leading-5 max-h-10 overflow-hidden line-clamp-2">
          {product.description || "لا يوجد وصف متاح."}
        </p>

        {creationDate && (
          <p className="mt-1 text-xs text-gray-500 flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            {creationDate}
          </p>
        )}

        <div className="mt-2 flex items-end gap-3">
          <div className="text-lg font-bold text-gray-900">{formatter.format(discountedPrice)}</div>
          {discount > 0 && <div className="text-sm text-gray-500 line-through">{formatter.format(price)}</div>}
        </div>

        <button
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium bg-white/30 backdrop-blur-lg border border-white/40 text-gray-900 hover:bg-white/50 transition-colors"
          aria-label={`اشتري الآن! ${product.name || ""}`}
          onClick={() => {
            const phone = "201022598078";
            const message = `استفسار عن المنتج:\nالاسم: ${product.name}\nالرقم (ID): ${product.id}\nالسعر: ${product.price} ج.م`;
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
          }}                   
        >
          <ShoppingCartIcon className="h-5 w-5" />
          اشتري الآن
        </button>
      </div>

      {zoomOpen && product.image && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setZoomOpen(false);
          }}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              ref={closeBtnRef}
              onClick={() => setZoomOpen(false)}
              className="absolute -top-3 -right-3 rounded-full bg-white p-2 shadow-lg focus:outline-none"
              aria-label="إغلاق تكبير الصورة"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <img src={product.image} alt={product.name || "صورة مكبرة"} className="max-w-full max-h-[90vh] object-contain" />
          </div>
        </div>
      )}
    </>
  );
});

export default ProductCard;
