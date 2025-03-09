/**
 * Утилита для определения типа устройства
 */

/**
 * Проверяет, является ли устройство мобильным
 * @returns true, если устройство мобильное, иначе false
 */
export const isMobileDevice = (): boolean => {
  // Проверка через User Agent
  const userAgent = typeof window !== 'undefined' 
    ? navigator.userAgent || navigator.vendor || (window as any).opera
    : '';

  if (!userAgent) return false;
  
  // Регулярное выражение для определения популярных мобильных устройств
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet|ipad|playbook/i;
  
  // Проверка на наличие сенсорного экрана
  const hasTouchScreen = typeof window !== 'undefined' && (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
  
  // Проверка на ориентацию экрана (мобильные устройства часто имеют больше ширину, чем высоту)
  const isPortrait = typeof window !== 'undefined' && window.innerHeight > window.innerWidth;
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;

  // Если устройство определено как мобильное ИЛИ имеет сенсорный экран И маленький дисплей
  return mobileRegex.test(userAgent) || (hasTouchScreen && (isPortrait || isSmallScreen));
};

/**
 * Проверяет, является ли устройство iOS-устройством (iPhone/iPad)
 * @returns true, если устройство iOS, иначе false
 */
export const isIOSDevice = (): boolean => {
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
  return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
};

/**
 * Проверяет, является ли устройство Android-устройством
 * @returns true, если устройство Android, иначе false
 */
export const isAndroidDevice = (): boolean => {
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : '';
  return /Android/.test(userAgent);
};

/**
 * Добавляет обработчики событий для предотвращения масштабирования на мобильных устройствах
 */
export const preventZoomOnMobile = (): void => {
  if (typeof document === 'undefined') return;

  // Добавляем мета-тег viewport с нужными параметрами
  const viewportMetaTag = document.createElement('meta');
  viewportMetaTag.name = 'viewport';
  viewportMetaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  
  // Проверяем, есть ли уже такой мета-тег
  const existingMetaTag = document.querySelector('meta[name="viewport"]');
  if (existingMetaTag) {
    existingMetaTag.setAttribute('content', viewportMetaTag.content);
  } else {
    document.head.appendChild(viewportMetaTag);
  }

  // Блокируем события, которые могут вызвать масштабирование
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
  }, { passive: false });
};

/**
 * Применяет все оптимизации для мобильных устройств
 */
export const applyMobileOptimizations = (): void => {
  if (isMobileDevice()) {
    preventZoomOnMobile();
    
    // Блокируем прокрутку страницы
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.touchAction = 'none';
    
    // Удаляем подсветку при нажатии на элементы
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
      }
    `;
    document.head.appendChild(style);
  }
}; 