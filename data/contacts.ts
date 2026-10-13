// Source: docs/CONTENT.md, slide 10. Do not add the old +7 number from the tour poster.
export const contacts = {
  bookings: {
    label: "Bookings",
    display: "+90 543 490 62 47",
    href: "https://wa.me/905434906247",
    kind: "whatsapp" as const,
  },
  email: {
    label: "E-mail",
    display: "whitebarpattaya@gmail.com",
    href: "mailto:whitebarpattaya@gmail.com",
    kind: "email" as const,
  },
  phone: {
    label: "Phone",
    display: "+66 94 438 9777",
    href: "tel:+66944389777",
    kind: "phone" as const,
  },
};
