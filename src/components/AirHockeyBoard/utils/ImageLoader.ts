import { 
  svgCache, 
  PATH_TO_STICK, 
  PATH_TO_BLUE_STICK,
  PATH_TO_GREEN_STICK,
  PATH_TO_YELLOW_STICK,
  PATH_TO_PUCK, 
  PATH_TO_GOAL, 
  PATH_TO_FIELD 
} from '../constants';

/**
 * Загружает все необходимые изображения для игры
 * @returns Promise, который разрешается, когда все изображения загружены
 */
export const loadImages = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      let loadedCount = 0;
      const totalImages = 7; // 4 клюшки разных цветов + 3 других изображения

      const onLoad = () => {
        loadedCount++;
        console.log(`Loaded ${loadedCount}/${totalImages} images`);
        if (loadedCount === totalImages) {
          console.log('All images loaded, cache keys:', Object.keys(svgCache));
          resolve();
        }
      };

      // Загрузка шайбы
      const puckImage = document.createElement('img');
      puckImage.src = PATH_TO_PUCK;
      puckImage.onload = () => {
        svgCache.puck = puckImage;
        console.log('Puck loaded successfully');
        onLoad();
      };
      puckImage.onerror = (e) => {
        console.error('Failed to load puck SVG:', e);
        onLoad();
      };

      // Загрузка стандартной клюшки (красная)
      const stickImage = document.createElement('img');
      stickImage.src = PATH_TO_STICK;
      stickImage.onload = () => {
        svgCache.stick = stickImage;
        console.log('Red stick loaded successfully');
        onLoad();
      };
      stickImage.onerror = (e) => {
        console.error('Failed to load red stick SVG:', e);
        onLoad();
      };
      
      // Загрузка синей клюшки
      const blueStickImage = document.createElement('img');
      blueStickImage.src = PATH_TO_BLUE_STICK;
      blueStickImage.onload = () => {
        svgCache['stick-blue'] = blueStickImage;
        console.log('Blue stick loaded successfully');
        onLoad();
      };
      blueStickImage.onerror = (e) => {
        console.error('Failed to load blue stick SVG:', e);
        onLoad();
      };
      
      // Загрузка зеленой клюшки
      const greenStickImage = document.createElement('img');
      greenStickImage.src = PATH_TO_GREEN_STICK;
      greenStickImage.onload = () => {
        svgCache['stick-green'] = greenStickImage;
        console.log('Green stick loaded successfully');
        onLoad();
      };
      greenStickImage.onerror = (e) => {
        console.error('Failed to load green stick SVG:', e);
        onLoad();
      };
      
      // Загрузка желтой клюшки
      const yellowStickImage = document.createElement('img');
      yellowStickImage.src = PATH_TO_YELLOW_STICK;
      yellowStickImage.onload = () => {
        svgCache['stick-yellow'] = yellowStickImage;
        console.log('Yellow stick loaded successfully');
        onLoad();
      };
      yellowStickImage.onerror = (e) => {
        console.error('Failed to load yellow stick SVG:', e);
        onLoad();
      };

      // Загрузка ворот
      const goalImage = document.createElement('img');
      goalImage.src = PATH_TO_GOAL;
      goalImage.onload = () => {
        svgCache.goal = goalImage;
        console.log('Goal loaded successfully');
        onLoad();
      };
      goalImage.onerror = (e) => {
        console.error('Failed to load goal SVG:', e);
        onLoad();
      };

      // Загрузка поля
      const fieldImage = document.createElement('img');
      fieldImage.src = PATH_TO_FIELD;
      fieldImage.onload = () => {
        svgCache.field = fieldImage;
        console.log('Field image loaded successfully');
        onLoad();
      };
      fieldImage.onerror = (e) => {
        console.error('Failed to load field image:', e);
        onLoad();
      };
    } catch (error) {
      console.error('Failed to load SVG images:', error);
      reject(error);
    }
  });
}; 