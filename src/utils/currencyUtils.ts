/**
 * Утилиты для работы с валютой
 */

/**
 * Конвертировать копейки в рубли
 */
export function kopeksToRubles(kopeks: number): number {
  return Math.round(kopeks / 100);
}

/**
 * Конвертировать рубли в копейки
 */
export function rublesToKopeks(rubles: number): number {
  return Math.round(rubles * 100);
}

/**
 * Форматировать сумму в рублях с символом валюты
 */
export function formatRubles(amount: number): string {
  return `${amount} ₽`;
}

/**
 * Форматировать сумму в копейках как рубли с символом валюты
 */
export function formatKopeksAsRubles(kopeks: number): string {
  const rubles = kopeksToRubles(kopeks);
  return formatRubles(rubles);
}

/**
 * Форматировать диапазон сумм (например, "100 ₽ из 500 ₽")
 */
export function formatRange(current: number, target: number): string {
  return `${formatRubles(current)} из ${formatRubles(target)}`;
}

/**
 * Форматировать диапазон сумм из копеек
 */
export function formatRangeFromKopeks(currentKopeks: number, targetKopeks: number): string {
  const currentRubles = kopeksToRubles(currentKopeks);
  const targetRubles = kopeksToRubles(targetKopeks);
  return formatRange(currentRubles, targetRubles);
}

/**
 * Получить процент прогресса
 */
export function getProgressPercent(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(Math.round((current / target) * 100), 100);
}

/**
 * Получить процент прогресса из копеек
 */
export function getProgressPercentFromKopeks(currentKopeks: number, targetKopeks: number): number {
  return getProgressPercent(currentKopeks, targetKopeks);
} 