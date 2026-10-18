/** Sprite SVG dùng chung; dùng qua <Icon name="cart" />. */
export function Icons() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></symbol>
      <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></symbol>
      <symbol id="i-heart" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></symbol>
      <symbol id="i-cart" viewBox="0 0 24 24"><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></symbol>
      <symbol id="i-left" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></symbol>
      <symbol id="i-right" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></symbol>
      <symbol id="i-down" viewBox="0 0 24 24"><path d="M12 5v14M6 13l6 6 6-6" /></symbol>
      <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" /></symbol>
      <symbol id="i-leaf" viewBox="0 0 24 24"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19 13 11" /></symbol>
      <symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3z" /><path d="m9 12 2 2 4-4" /></symbol>
      <symbol id="i-truck" viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.6" /><circle cx="17" cy="17.5" r="1.6" /></symbol>
      <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></symbol>
      <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></symbol>
      <symbol id="i-fb" viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></symbol>
      <symbol id="i-tt" viewBox="0 0 24 24"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 3 2.5 4.5 5 4.5" /></symbol>
      <symbol id="i-msg" viewBox="0 0 24 24"><path d="M12 3C7 3 3 6.6 3 11.2c0 2.5 1.2 4.7 3 6.2V21l3-1.6c1 .3 2 .4 3 .4 5 0 9-3.6 9-8.2S17 3 12 3z" /></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" /></symbol>
      <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s-6-5.3-6-11a6 6 0 0 1 12 0c0 5.7-6 11-6 11z" /><circle cx="12" cy="10" r="2.2" /></symbol>
    </svg>
  );
}

export function Icon({ name, className, size }: { name: string; className?: string; size?: number }) {
  return (
    <svg className={className ?? "ic"} style={size ? { width: size, height: size } : undefined} aria-hidden="true">
      <use href={`#i-${name}`} />
    </svg>
  );
}
