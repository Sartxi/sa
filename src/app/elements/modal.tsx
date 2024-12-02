import Image from "next/image";
import { useEffect, useState } from "react";

interface ModalProps {
  image: string;
  title: string;
}

export function useModal() {
  const [modal, setModal] = useState<ModalProps | null>(null);

  useEffect(() => {
    const modalEl = document.getElementById('Modal');
    if (modal && modalEl) {
      document.body.style.overflow = 'hidden';
      modalEl.classList.add('show');
      const close = modalEl.querySelector('.close');
      const content = modalEl.querySelector('.content');
      const image = content?.querySelector('img.modal-image');
      image?.setAttribute('src', modal.image);
      image?.setAttribute('width', 'auto');
      image?.setAttribute('height', 'auto');
      close?.addEventListener('click', () => setModal(null));
      if (modal.title) {
        image?.setAttribute('alt', modal.title);
        const titleEl = modalEl.querySelector('.title');
        if (titleEl) titleEl.innerHTML = modal.title;
      }
    } else modalEl?.classList.remove('show');
  }, [modal]);

  return { setModal };
}

export function Modal() {
  return (
    <div id="Modal">
      <div className="content">
        <div className="close">x</div>
        <div className="title"></div>
        <Image src="./file.svg" alt="" className="modal-image" width={800} height={800} />
      </div>
    </div>
  )
}
