"use client";

export function CartPdfButton({ cartId }: { cartId: string }) {
  return (
    <a className="button" href={`/api/carts/${cartId}/pdf`}>
      Maak PDF
    </a>
  );
}
