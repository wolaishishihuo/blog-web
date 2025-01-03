import type { DirectiveBinding } from "vue";

export const lazyload = {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.src = binding.value;
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "50px",
      }
    );
    observer.observe(el);
  },
};
