import type React from "react";
import { useState, useRef,useEffect  } from "react";

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

// 👉 Состояния для опитування
const [votes, setVotes] = useState(3566); // начальное количество голосов
const [selectedOption, setSelectedOption] = useState<string | null>(null); // выбранный вариант
const [hasVoted, setHasVoted] = useState(false); // проголосовал ли пользователь
const [policyOpen, setPolicyOpen] = useState(false);
const [warrantyOpen, setWarrantyOpen] = useState(false);
const formRef = useRef<HTMLFormElement>(null);
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [error, setError] = useState('');
const [timeLeft, setTimeLeft] = useState(() => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('timer_end_time');
    const fifteenHours = 15 * 60 * 60 * 1000;
    if (savedTime) {
      const diff = Math.floor((Number(savedTime) - Date.now()) / 1000);
      return diff > 0 ? diff : 0;
    } else {
      const endTime = Date.now() + fifteenHours;
      localStorage.setItem('timer_end_time', endTime.toString());
      return fifteenHours / 1000;
    }
  });
  



  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          const fifteenHours = 15 * 60 * 60 * 1000;
          const newEndTime = Date.now() + fifteenHours;
          localStorage.setItem('timer_end_time', newEndTime.toString());
          return fifteenHours / 1000;
        }
      });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  


const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};


const handleVote = (option: string) => {
  if (!hasVoted) {
    setSelectedOption(option);
    setVotes((prev) => prev + 1);
    setHasVoted(true); // пользователь проголосовал
  }
};


  return (
    <div className="min-h-screen bg-[#e0e0e0] flex flex-col items-center m-0">
      <main className="w-full max-w-[430px] lg:max-w-[480px] bg-white shadow-lg rounded-lg pb-6 lg:mt-8 mt-0 flex flex-col">
        
        {/* === Шапка === */}
        <div className="bg-[#e52314] w-full pt-0 pb-3">
  <h1 className="text-white text-center text-xl font-bold leading-tight">
    Антивібраційні підставки <br /> для пральної машини
  </h1>
</div>

  
   {/* === Блок картинка + цена с таймером === */}
<div className="relative w-full">
  <img
    src="/photo/top.jpeg"
    alt="Стиральная машина"
    className="w-full"
  />
  <div className="absolute bottom-0 left-0 w-full bg-[#2e2e2e] text-white p-4 text-center flex flex-col gap-2">
    <div className="flex justify-between items-center text-sm">
      <span className="opacity-80">Звичайна ціна:</span>
      <span className="line-through">398 грн</span>
    </div>
    <div className="flex justify-between items-center text-sm">
      <span className="text-red-500 font-bold">Знижка</span>
      <span className="text-red-500 font-bold">-50%</span>
    </div>
    <div className="flex justify-between items-center text-sm">
      <span className="text-green-400 font-bold">Ціна сьогодні:</span>
      <span className="text-green-400 font-bold">199 грн</span>
    </div>

    {/* Таймер */}
    <div className="mt-2 text-center text-yellow-400 text-sm font-semibold">
      Акція закінчиться через {formatTime(timeLeft)}
    </div>
  </div>
</div>

{/* === Преимущества и кнопка === */}
<div className="bg-[#2e2e2e] text-white w-full p-4 text-center flex flex-col gap-3 mt-2">
  <ul className="text-left text-sm mt-1 space-y-2">
    <li>✅ Усуває шум та вібрацію</li>
    <li>✅ Універсальні у використанні</li>
    <li>✅ Збільшує термін служби пральної машини</li>
  </ul>

  {/* Кнопка "Замовити зі знижкою" */}
  <button
    onClick={() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }}
    className="mt-6 bg-[#e52314] hover:bg-[#cf2012] text-white font-bold py-3 rounded-full w-full text-lg"
  >
    Замовити зі знижкою
  </button>
</div>

  
        {/* === Блок "Навіщо потрібні?" === */}
        <section className="bg-white w-full flex flex-col items-center px-4 py-8">
          <h2 className="text-2xl font-bold text-center mb-2">
            АНТИВІБРАЦІЙНІ ПІДСТАВКИ
          </h2>
          <h3 className="text-[#e52314] text-lg font-bold text-center mb-6">
            НАВІЩО ПОТРІБНІ?
          </h3>
  
          <img
            src="/photo/middle.gif"
            alt="Встановлення підставок"
            className="w-full rounded-md mb-6"
          />
  
          <p className="text-sm text-neutral-800 leading-relaxed text-justify">
            Найпростіший спосіб, що допомагає усунути сторонній шум і вібрацію, – це встановлення спеціальних підставок. 
            Антивібраційні підставки є невеликими ковпачками, які одягаються на кожну з опорних ніжок пральної машини. 
            Підставки для ніжок пральної машини є своєрідною «подушкою», яка поглинає вібрацію та шум, а також запобігає ковзанню за рахунок рельєфної нижньої поверхні.
          </p>
        </section>
  
{/* === Блок про антивибраційні підставки === */}
<section className="bg-white w-full flex flex-col items-center px-4 py-8">
  {/* Фото подставок */}
  <img
    src="/photo/something.jpeg" // Укажи правильный путь к своему изображению
    alt="Антивібраційні підставки"
    className="w-full rounded-md mb-6"
  />

  {/* Текст под фото */}
  <p className="text-sm text-neutral-800 leading-relaxed text-justify">
    Антивібраційні підставки для пральних машин прості в установці та підходять для будь-якого типу пральної машини та підлоги та ідеально захищають Вашу підлогу, гасячи вібрацію та переміщення пральної або сушильної машини.
  </p>
</section>


{/* === Блок "Універсальні" === */}
<section className="bg-white w-full flex flex-col items-center px-4 py-8">
  {/* Фото дивана */}
  <img
    src="/photo/universal.jpeg" // Путь к твоему изображению с диваном (замени если нужно)
    alt="Універсальні підставки"
    className="w-full rounded-md mb-6"
  />

  {/* Заголовок */}
  <h2 className="text-2xl font-bold text-center mb-4">
    УНІВЕРСАЛЬНІ
  </h2>

  {/* Текст */}
  <p className="text-sm text-neutral-800 leading-relaxed text-justify">
    Ці антивібраційні підставки можна використовувати не тільки для пральних або сушильних машин, але також як противковзкі прокладки для меблів та холодильників — їх також можна складати один на одного та використовувати як підставку для пральних машин для регулювання висоти або рівня.
    Виготовлені із міцної, твердої гуми без специфічного запаху, із пластиковою прокладкою.
  </p>
</section>

{/* === Блок холодильник + кнопка === */}
<section className="bg-white w-full flex flex-col items-center px-4 pt-8">
  {/* Фото холодильника */}
  <img
    src="/photo/fridge.jpeg" // Укажи путь к фото холодильника
    alt="Холодильник на підставках"
    className="w-full rounded-md mb-6"
  />

  {/* Кнопка заказа */}
  <div className="w-full flex justify-center mb-8">
    <button
      onClick={() => setModalOpen(true)}
      className="bg-[#e52314] hover:bg-[#cf2012] text-white font-bold py-3 px-8 rounded-full text-lg"
    >
      Замовити зі знижкою
    </button>
  </div>
</section>


{/* === Блок "Відгуки покупців" === */}
<section className="bg-white w-full flex flex-col items-center px-4 py-8">
  {/* Заголовки */}
  <h2 className="text-2xl font-bold text-center mb-2">
    ВІДГУКИ
  </h2>
  <h3 className="text-[#e52314] text-lg font-bold text-center mb-6">
    ПОКУПЦІВ
  </h3>

  {/* Отзыв 1 */}
  <div className="bg-gray-50 rounded-lg p-4 shadow-sm mb-6 w-full">
    <p className="text-sm text-neutral-800 leading-relaxed mb-4">
      Взяла собі два набори, зроблю мамі подарунок, у неї також проблема що і у мене, шум від пральної машинки, 
      а шум відбувається через вібрації по плитці, вже і килимок підлагоджували, а шум все одно залишався. 
      Замовили ваш набір, і проблема пішла сама собою. Дякую, рекомендую!
    </p>
    <div className="flex items-center gap-4">
      <img src="/photo/rev_photo1.jpg" alt="Анастасія" className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="font-semibold">Анастасія</div>
        <div className="text-sm text-gray-500">31 рік</div>
      </div>
    </div>
  </div>

  {/* Отзыв 2 */}
  <div className="bg-gray-50 rounded-lg p-4 shadow-sm mb-6 w-full">
    <p className="text-sm text-neutral-800 leading-relaxed mb-4">
      Хочу залишити свій відгук про покупку. Замовляла тиждень тому, прийшло все ціле. Думала, що зламалася машинка коли збільшилася вібрація пральної машинки, 
      а виявилося, що ніжки ковзають. Вдягла антивібраційні підставки і проблема зникла, а я вже хотіла майстра викликати. Дякую!
    </p>
    <div className="flex items-center gap-4">
      <img src="/photo/rev_photo2.jpg" alt="Наталя" className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="font-semibold">Наталя</div>
        <div className="text-sm text-gray-500">26 років</div>
      </div>
    </div>
  </div>

  {/* Отзыв 3 */}
  <div className="bg-gray-50 rounded-lg p-4 shadow-sm w-full">
    <p className="text-sm text-neutral-800 leading-relaxed mb-4">
      Це справді щось із чимось! Дружина місяць просила вирішити проблему з пригинанням машинки по всій ванній кімнаті. 
      Забрав посилку, надів силіконові накладки і проблема зникла. Ідеальне вирішення дрібної проблеми.
    </p>
    <div className="flex items-center gap-4">
      <img src="/photo/rev_photo3.jpg" alt="Михайло" className="w-12 h-12 rounded-full object-cover" />
      <div>
        <div className="font-semibold">Катерина</div>
        <div className="text-sm text-gray-500">34 роки</div>
      </div>
    </div>
  </div>
</section>


      {/* === Блок "Ви задоволені покупкою?" === */}
      <section className="bg-white w-full flex flex-col items-center px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          ВИ ЗАДОВОЛЕНІ <span className="text-[#e52314]">ПОКУПКОЮ?</span>
        </h2>

        {/* Опитування (радио-кнопки) */}
        <div className="bg-gray-100 w-full rounded-lg p-6 mt-6 flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="survey"
              value="yes"
              checked={selectedOption === "yes"}
              onChange={() => handleVote("yes")}
              className="w-4 h-4 text-green-500"
            />
            Так
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="survey"
              value="no"
              checked={selectedOption === "no"}
              onChange={() => handleVote("no")}
              className="w-4 h-4 text-red-500"
            />
            Ні
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="survey"
              value="not_buy"
              checked={selectedOption === "not_buy"}
              onChange={() => handleVote("not_buy")}
              className="w-4 h-4 text-yellow-500"
            />
            Не купував(ла), дізнатися результати
          </label>

          {/* Количество проголосовавших */}
          {hasVoted && (
            <div className="text-center mt-4 text-sm">
              Проголосувало: <span className="text-green-600 font-bold">{votes}</span>
            </div>
          )}
        </div>
      </section>


{/* === Блок "Процес замовлення" (улучшенный) === */}
<section className="bg-white w-full grid grid-cols-2 gap-2 px-4 py-8">
  {/* Карточка 1 */}
  <div className="flex flex-col items-center text-center p-4 border">
    <div className="flex items-center justify-center w-14 h-14 bg-[#e52314] rounded-md mb-2">
      <img src="/photo/pencil_icon.png" alt="Заявка" className="w-8 h-8 object-contain" />
    </div>
    <h4 className="font-bold text-sm mb-1">ЗАЯВКА</h4>
    <p className="text-xs text-gray-600">
      Залишаєте заявку на сайті
    </p>
  </div>

  {/* Карточка 2 */}
  <div className="flex flex-col items-center text-center p-4 border">
    <div className="flex items-center justify-center w-14 h-14 bg-[#e52314] rounded-md mb-2">
      <img src="/photo/phone_icon.png" alt="Дзвінок" className="w-8 h-8 object-contain" />
    </div>
    <h4 className="font-bold text-sm mb-1">ДЗВІНОК</h4>
    <p className="text-xs text-gray-600">
      Наш менеджер уточнює деталі замовлення
    </p>
  </div>

  {/* Карточка 3 */}
  <div className="flex flex-col items-center text-center p-4 border">
    <div className="flex items-center justify-center w-14 h-14 bg-[#e52314] rounded-md mb-2">
      <img src="/photo/arrive_icon.png" alt="Доставка" className="w-8 h-8 object-contain" />
    </div>
    <h4 className="font-bold text-sm mb-1">ДОСТАВКА</h4>
    <p className="text-xs text-gray-600">
      Відправляємо ваше замовлення протягом 1-2 робочих днів
    </p>
  </div>

  {/* Карточка 4 */}
  <div className="flex flex-col items-center text-center p-4 border">
    <div className="flex items-center justify-center w-14 h-14 bg-[#e52314] rounded-md mb-2">
      <img src="/photo/take_icon.png" alt="Отримання" className="w-8 h-8 object-contain" />
    </div>
    <h4 className="font-bold text-sm mb-1">ОТРИМАННЯ</h4>
    <p className="text-xs text-gray-600">
      Замовлення приїжджає на відділення пошти яке ви обрали
    </p>
  </div>
</section>

{/* === Блок "Більше = Дешевше" + Фото + Форма === */}
<section className="bg-white w-full flex flex-col items-center">

  {/* Фото стиральной машины */}
  <img
    src="/photo/top.jpeg"
    alt="Стиральная машина"
    className="w-full"
  />

  {/* Блок с ценами и формой */}
  <div className="bg-[#2e2e2e] w-full flex flex-col items-center px-4 py-8 text-white">
    {/* Заголовок */}
    <h2 className="text-lg font-bold mb-4">
      БІЛЬШЕ = <span className="text-[#e52314]">ДЕШЕВШЕ</span>
    </h2>

    {/* Таблица цен */}
    <ul className="text-center text-sm space-y-1 mb-6">
      <li>2 КОМПЛЕКТА - <span className="text-[#e52314]">378 ГРН</span> (ЗНИЖКА 5%)</li>
      <li>3 КОМПЛЕКТА - <span className="text-[#e52314]">555 ГРН</span> (ЗНИЖКА 7%)</li>
      <li>4 КОМПЛЕКТА - <span className="text-[#e52314]">716 ГРН</span> (ЗНИЖКА 10%)</li>
    </ul>

    {/* Форма */}
    <form
  ref={formRef}
  className="w-full flex flex-col gap-4"
  onSubmit={(e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Будь ласка, заповніть усі поля!');
      return;
    }
    setError('');
    setModalOpen(true);
  }}
>
  <input
    type="text"
    placeholder="Ваше ім'я"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-3 rounded-md text-black placeholder-gray-400 focus:outline-none"
  />
  <input
    type="tel"
    placeholder="Ваш номер телефону"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full p-3 rounded-md text-black placeholder-gray-400 focus:outline-none"
  />

  {/* Показать ошибку если есть */}
  {error && (
    <div className="text-center text-red-600 text-sm mb-2">{error}</div>
  )}

  <button
    type="submit"
    className="mt-2 w-full py-3 rounded-full bg-[#e52314] hover:bg-[#cf2012] text-white font-bold text-lg"
  >
    ЗАМОВИТИ ЗІ ЗНИЖКОЮ
  </button>
</form>


  </div>

</section>


{/* === Секция с кликабельным баннером === */}
<section className="w-full px-4 py-6 flex flex-col items-center">
  <a href="http://novaposhta.ua/game_aktsiya_acer" target="_blank" rel="noopener noreferrer">
    <img
      src="/photo/NP.png"
      alt="Баннер"
      className="w-full max-w-[480px] rounded-md shadow-lg hover:opacity-90 transition"
    />
  </a>

  {/* Текст под баннером */}
  <p className="text-xs text-center text-gray-600 mt-4 max-w-[480px]">
    Акція діє з 21.04 по 18.05.2025 включно на всій території України, крім тимчасово окупованих територій. 
    Деталі: <a href="http://novaposhta.ua/game_aktsiya_acer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">novaposhta.ua/game_aktsiya_acer</a>
  </p>
</section>




{/* === Футер === */}
  {/* === Футер === */}
  <footer className="bg-gray-100 w-full text-center text-sm text-gray-700 px-4 py-6 mt-4">
        <p className="mb-2">
          Інтернет магазин SuperShop - ОГРН 1234567890123
        </p>
        <p className="mb-4">
          01001, Україна, м. Київ, вулиця Хрещатик, 1
        </p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setPolicyOpen(true)}
            className="text-blue-600 hover:underline"
          >
            Політика конфіденційності
          </button>
          <button
            onClick={() => setWarrantyOpen(true)}
            className="text-blue-600 hover:underline"
          >
            Повернення та гарантія
          </button>
        </div>
      </footer>

      {/* === Модалка "Політика конфіденційності" === */}
      {policyOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setPolicyOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-[#e52314]">
              Політика конфіденційності
            </h2>
            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
              {/* Твой большой текст политики вставляешь сюда */}
              Політика щодо обробки персональних даних
              1. Загальні положення
Справжня політика обробки персональних даних складена відповідно до вимог закону «Про персональні дані» та визначає порядок обробки персональних даних та заходи щодо забезпечення безпеки персональних даних Інтернет магазин трендових товарів (далі – Оператор).
1. Оператор ставить своєю найважливішою метою та умовою здійснення своєї діяльності дотримання прав та свобод людини та громадянина при обробці його персональних даних, у тому числі захисту прав на недоторканність приватного життя, особисту та сімейну таємницю.
2. Ця політика Оператора щодо обробки персональних даних (далі – Політика) застосовується до всієї інформації, яку Оператор може отримати про відвідувачів веб-сайту.
2. Основні поняття, які використовуються в Політиці
1. Автоматизоване оброблення персональних даних – обробка персональних даних за допомогою засобів обчислювальної техніки
2. Блокування персональних даних – тимчасове припинення обробки персональних даних (за винятком випадків, якщо обробка необхідна для уточнення персональних даних);
3. Веб-сайт – це сукупність графічних та інформаційних матеріалів, а також програм для ЕОМ та баз даних, що забезпечують їх доступність в мережі інтернет за мережевою адресою
4. Інформаційна система персональних даних — сукупність персональних даних, що містяться в базах даних, і забезпечують їх обробку інформаційних технологій та технічних засобів;
5. Знеособлення персональних даних — дії, у яких неможливо визначити без використання додаткової інформації належність персональних даних конкретному Користувачеві чи іншому суб'єкту персональних данных;
6. Обробка персональних даних – будь-яка дія (операція) або сукупність дій (операцій), що здійснюються з використанням засобів автоматизації або без використання таких засобів з персональними даними, включаючи збирання, запис, систематизацію, накопичення, зберігання, уточнення (оновлення, зміну), вилучення, використання, передачу (поширення, надання, доступ), знеособлення, блокування, видалення, знищення персональних даних;
7. Оператор – державний орган, муніципальний орган, юридична або фізична особа, що самостійно або спільно з іншими особами організовують та (або) здійснюють обробку персональних даних, а також визначають цілі обробки персональних даних, склад персональних даних, що підлягають обробці, дії (операції), що здійснюються з персональними даними;
8. Персональні дані – будь-яка інформація, що стосується прямо або опосередковано певного або визначеного Користувачеві веб-сайту)
            </p>
          </div>
        </div>
      )}

      {/* === Модалка "Повернення та гарантія" === */}
      {warrantyOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setWarrantyOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center text-[#e52314]">
              Повернення та гарантія
            </h2>
            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
              {/* Сюда вставляешь текст про повернення і гарантію */}
              Повернення товару можливе протягом 14 днів після покупки за умовами законодавства України.
              Гарантія та сервіс
Гарантія поширюється на товари, які мають гарантію від виробника. Товари з механічними пошкодженнями, які були виявлені не при отриманні товару, обміну та поверненню не підлягають. Уважно оглядайте замовлений вами товар згідно з накладною, що додається до замовлення.
Обмін/повернення
Ви можете обміняти або повернути товар протягом 14 днів після покупки (з дня отримання посилки). Це право гарантує вам Закон про захист прав споживача.
Щоб скористатись цією можливістю, будь ласка, переконайтеся, що:
- товар не був у вжитку і не має слідів використання: подряпин, сколів, потертостей тощо
- товар повністю укомплектований і не порушена цілісність упаковки
- збережені всі ярлики та заводське маркування
- збережений чек від пошти про отримання замовлення
Якщо товар не працює, обмін або повернення товару проводиться тільки за умови укладання сервісного центру, авторизованого виробником, про те, що умови експлуатації не порушені.
Як оформити повернення
Надішліть електронний лист на пошту support@lp4-buy.com.ua з наступним вмістом:
-Прізвище ім'я по батькові
-Номер телефону на який оформляли замовлення
-Короткий опис проблеми та її фотографії
Продовж наступних двох робочих днів ви отримаєте відповідь з підтвердженням, або відмовою та даними для відправки та подальшими діями.
Зверніть увагу, що до повернення не приймаються товари, що втратили товарний вигляд або цілісність упаковування, а також з будь-якими слідами використання та експлуатації!
Оплата доставки повернення/обміну залежить від причин повернення. Якщо з вини інтернет-магазину, то за рахунок продавця. В інших випадках за рахунок покупця.
Винятки
Кабінетом Міністрів України затверджено перелік товарів належної якості, які не підлягають обміну або поверненню (Постанова КМУ від 19 березня 1994 р. № 172)
            </p>
          </div>
        </div>
      )}
    


      </main>
  
      {/* === Модалка === */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-xs p-6 text-center shadow-xl border">
            <div className="mb-3 font-semibold text-lg text-[#e52314]">
              Ваша заявка прийнята!
            </div>
            <div className="mb-5 text-base text-neutral-700">
              Менеджер з вами зв'яжеться найближчим часом.
            </div>
            <button
              className="w-full py-2 rounded bg-[#e52314] text-white font-bold hover:bg-[#cf2012]"
              onClick={() => setModalOpen(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default App;
