import { useState } from "react";
import { useAuth, useMutation } from "@gencow/react";
import { api } from "../lib/gencow";
import { AuthForm } from "./AuthForm";
import { useLocale } from "../lib/i18n";
import type { Site } from "../lib/types";

const FEE_RATE = 0.08;

function defaultDate() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 10);
}

export function BookingCheckout({ site, onBack, onConfirmed }: { site: Site; onBack: () => void; onConfirmed: () => void }) {
  const { isAuthenticated } = useAuth();
  const { t } = useLocale();
  const { mutate: createBooking, isPending, error } = useMutation(api.bookings.create);
  const [date, setDate] = useState(defaultDate());

  if (!isAuthenticated) {
    return (
      <div className="screen-pad center-pad">
        <AuthForm />
      </div>
    );
  }

  const fee = Math.round(site.price * FEE_RATE);
  const total = site.price + fee;

  async function handleConfirm() {
    await createBooking({
      siteId: site.id,
      programName: site.programName,
      scheduledAt: new Date(`${date}T14:00:00`).toISOString(),
      amount: total,
    });
    onConfirmed();
  }

  return (
    <div className="screen-pad">
      <button className="back-link" onClick={onBack}>
        ← {site.name}
      </button>
      <div className="eyebrow">{t("booking.eyebrow")}</div>
      <h1 className="page-title">{t("booking.title")}</h1>

      <div className="card stack">
        <div className="row">
          <span className="small muted">{t("booking.siteProgram")}</span>
          <span className="small">
            {site.name} · {site.programName}
          </span>
        </div>
        <div className="row">
          <span className="small muted">{t("booking.date")}</span>
          <input className="date-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().slice(0, 10)} />
        </div>
        <hr className="rule" />
        <div className="row">
          <span className="small muted">{t("booking.amount")}</span>
          <span className="small num">₩{site.price.toLocaleString("ko-KR")}</span>
        </div>
        <div className="row">
          <span className="small muted">{t("booking.fee")}</span>
          <span className="small num">₩{fee.toLocaleString("ko-KR")}</span>
        </div>
        <div className="row">
          <b>{t("booking.total")}</b>
          <b className="num">₩{total.toLocaleString("ko-KR")}</b>
        </div>
      </div>

      {error && <p className="form-error">{error.message}</p>}
      <button className="btn btn-primary btn-block" style={{ marginTop: 16 }} onClick={handleConfirm} disabled={isPending}>
        {isPending ? t("common.processing") : t("booking.confirmCta")}
      </button>
    </div>
  );
}
