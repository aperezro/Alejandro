export function navigateToSection(event, id, reducedMotion) {
  event.preventDefault();
  const section = document.getElementById(id);
  if (!section) return;
  const heading = section.matches('h2, h3') ? section : section.querySelector('h2, h3');
  heading?.focus({ preventScroll: true });
  const offset = parseFloat(getComputedStyle(section).scrollMarginTop) || 110;
  window.scrollTo({ top: Math.max(0, window.scrollY + section.getBoundingClientRect().top - offset), behavior: reducedMotion ? 'instant' : 'smooth' });
}
