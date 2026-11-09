(() => {
  'use strict';

  // Ponto único de eventos. Para ligar ao GA4/GTM, troque o corpo desta função
  // (ex.: gtag('event', name, params)) sem tocar no restante da interface.
  const track = (name, params = {}) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...params });
  };

  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (el) track(el.dataset.track, { local: el.dataset.trackLocal || '' });
  });

  const btn = document.querySelector('.menu-btn');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
  };
  btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      btn.focus();
    }
  });
  window.matchMedia('(min-width: 821px)').addEventListener('change', () => setMenu(false));

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const rules = {
    nome: (v) => v.trim().length >= 3 || 'Informe seu nome completo.',
    telefone: (v) => /^\d{10,11}$/.test(v.replace(/\D/g, '')) || 'Informe o telefone com DDD, por exemplo (91) 90000-0000.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Informe um e-mail válido, como nome@exemplo.com.',
    mensagem: (v) => v.trim().length >= 10 || 'Escreva uma mensagem com pelo menos 10 caracteres.'
  };

  const validate = (field) => {
    const result = rules[field.name](field.value);
    const err = document.getElementById(`${field.id}-erro`);
    const ok = result === true;
    field.setAttribute('aria-invalid', String(!ok));
    err.textContent = ok ? '' : result;
    return ok;
  };

  form.querySelectorAll('input, textarea').forEach((f) => {
    f.addEventListener('blur', () => { if (f.value) validate(f); });
    f.addEventListener('input', () => { if (f.getAttribute('aria-invalid') === 'true') validate(f); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.hidden = true;
    const fields = [...form.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]), textarea')];
    const invalid = fields.filter((f) => !validate(f));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }
  
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
  
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Falha no envio');
  
    track('form_submit', { form: 'contato' });
    form.reset();
    status.textContent = 'Mensagem enviada! A escola responderá assim que possível.';
  } catch (err) {
    status.textContent = 'Não foi possível enviar agora. Tente de novo ou fale com a escola pelo WhatsApp.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar mensagem';
    status.hidden = false;
  }
});

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.diffs, .classes, .people').forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }
})();
