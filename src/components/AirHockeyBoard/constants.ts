// Размеры канваса - точно соответствуют размерам изображения поля
export const CANVAS_WIDTH = 554; // Точный размер изображения поля
export const CANVAS_HEIGHT = 1024; // Точный размер изображения поля

// Пути к SVG файлам
export const PATH_TO_STICK = '/styles/icons/хокеист.svg'; // Стандартный (красный)
export const PATH_TO_BLUE_STICK = '/styles/icons/хокеист-синий.svg';
export const PATH_TO_GREEN_STICK = '/styles/icons/хокеист-зеленый.svg';
export const PATH_TO_YELLOW_STICK = '/styles/icons/хокеист-желтый.svg';
export const PATH_TO_PUCK = '/styles/icons/шайба.svg';
export const PATH_TO_GOAL = '/styles/icons/ворота.svg';
export const PATH_TO_FIELD = '/поле.png';

// Маппинг идентификаторов команд к SVG изображениям
export const TEAM_TO_STICK_MAP: Record<string, string> = {
  'team1': 'stick', // Красный (стандартный)
  'team2': 'stick-blue',
  'team3': 'stick-green',
  'team4': 'stick-yellow'
};

// Для отладки: показываем какой цвет с каким ID
console.log('Team mappings:', TEAM_TO_STICK_MAP);

// Определяем активную зону клюшки для отбивания шайбы
// Размеры и смещения в процентах от радиуса малетки
export const ACTIVE_ZONE = {
  width: 1.6, // Ширина активной зоны
  height: 0.6, // Высота активной зоны
  offsetX: 0.0, // Смещение по X от центра (центрировано по X)
  offsetY: 1.4, // Смещение по Y от центра (в нижней части клюшки)
};

// SVG cache для хранения загруженных изображений
export const svgCache: { [key: string]: HTMLImageElement } = {}; 