import WhatsappLogo from '../assets/whatsapp.svg'

export const FABWhatsapp = () => {
  return (
    <div className="shadow-2xl rounded-full p-2 bg-green-600 fixed bottom-6 right-6 w-12 cursor-pointer">
      <a
        href="https://wa.me/917404255034?text=Hi"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Whatsapp Bot"
      >
        <WhatsappLogo />
      </a>
    </div>
  )
}
