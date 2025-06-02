// plugins/directives.ts
export default defineNuxtPlugin((nuxtApp) => {
  // Diretiva para auto-focus
  nuxtApp.vueApp.directive('focus', {
    mounted(el) {
      el.focus();
    }
  });

  // Diretiva para click outside
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el, binding) {
      el._clickOutside = (event: Event) => {
        if (!(el === event.target || el.contains(event.target as Node))) {
          binding.value(event);
        }
      };
      document.addEventListener('click', el._clickOutside);
    },
    unmounted(el) {
      document.removeEventListener('click', el._clickOutside);
    }
  });

  // Diretiva para máscara de input
  nuxtApp.vueApp.directive('mask', {
    mounted(el, binding) {
      const mask = binding.value;
      
      el.addEventListener('input', (e: Event) => {
        const target = e.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, '');
        
        if (mask === 'cpf') {
          value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (mask === 'cnpj') {
          value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        } else if (mask === 'phone') {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (mask === 'cep') {
          value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        }
        
        target.value = value;
      });
    }
  });

  // Diretiva para lazy loading de imagens
  nuxtApp.vueApp.directive('lazy', {
    mounted(el, binding) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.src = binding.value;
            el.classList.remove('opacity-0');
            el.classList.add('opacity-100', 'transition-opacity', 'duration-300');
            observer.unobserve(el);
          }
        });
      });
      
      observer.observe(el);
      el.classList.add('opacity-0');
    }
  });
});

