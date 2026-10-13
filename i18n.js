/*
 * GGSNAKE translations. The language is picked automatically from the
 * player's Telegram language (or the browser language outside Telegram).
 * Missing keys fall back to English.
 */
(function (root) {
    "use strict";

    var LANGS = ["uk", "en", "ru", "es", "pt", "de", "pl", "tr"];

    var D = {
        uk: {
            splash_top: "REWIND TO 2000",
            splash_s1: "Пам'ятаєш свій", splash_s2: "перший рекорд?",
            splash_note: "Тоді — на перерві. Тепер — за приз.",
            play: "Грати", loading: "Завантаження",
            tab_game: "Гра", tab_top: "Рейтинг", tab_profile: "Профіль",
            mode_ranked: "РЕЙТИНГ", mode_training: "ТРЕНУВАННЯ", mode_offline: "ОФЛАЙН",
            hint_idle: "OK — старт", hint_running: "грай!", hint_paused: "OK — далі", hint_over: "OK — ще раз",
            ctl_reset: "СКИНУТИ", ctl_start: "СТАРТ", ctl_pause: "ПАУЗА", ctl_resume: "ДАЛІ",
            cv_press: "натисни OK", cv_pause: "ПАУЗА", cv_over: "GAME OVER", cv_win: "ПЕРЕМОГА!",
            cv_score: "рахунок {n}", cv_saving: "зберігаємо...", cv_record: "РЕКОРД! місце #{n}",
            cv_place: "твоє місце #{n}", cv_contest_over: "конкурс завершено", cv_rejected: "не зараховано",
            toast_offline: "Немає зв'язку з сервером — гра не йде в рейтинг",
            toast_record: "Новий рекорд — {s}! Ти #{r} у рейтингу",
            err_too_fast: "Гра не пройшла перевірку часу", err_invalid: "Гра не пройшла перевірку",
            err_daily: "Ліміт ігор на сьогодні", err_banned: "Акаунт заблоковано", err_save: "Не вдалося зберегти результат",
            copied: "Посилання скопійовано", copy_fail: "Не вдалося скопіювати",
            contest: "Розіграш", cd_d: "дні", cd_h: "год", cd_m: "хв", cd_s: "сек", finish: "фініш",
            contest_ended: "Конкурс завершено. Переможців оголосимо в боті.",
            records: "Рекорди", friends: "Друзі", places: "топ-{n} · 1 місце {p}", rules: "Правила",
            hint_score: "Найкращий результат за конкурс", hint_ref: "Друзі, які реально зіграли",
            in_board: "{n} у рейтингу", board_soon: "Рейтинг гравців з'явиться після запуску сервера.",
            board_error: "Не вдалося завантажити рейтинг.<br>Спробуй пізніше.",
            board_empty_score: "Ще немає результатів.<br>Зіграй першим!",
            board_empty_ref: "Поки ніхто не запросив друзів.<br>Стань першим!", you: "ти",
            invite_title: "Запроси друзів", inv_counted: "зараховано", inv_clicked: "перейшли за посиланням", inv_place: "місце",
            open_in_tg: "Відкрий гру в Telegram", loading_dots: "Завантаження...",
            invite: "Запросити", copy: "Копіювати",
            ref_note: "Друг зараховується, коли зіграє {g} гри і набере {s}+ очок у рейтинговому режимі.",
            share_text: "Граю в GGSNAKE — та сама змійка, тепер у Telegram.{pool} Заходь 🐍", share_pool: " Розіграш {p}!",
            player: "Гравець", stats: "Статистика", st_best: "Рекорд", st_rank: "Місце", st_games: "Ігор",
            st_avg: "Середній", st_food: "З'їдено", st_time: "Хв у грі", settings: "Налаштування",
            set_mode: "Режим", set_mode_hint: "Тренування — без стін, не в рейтинг", mode_rank: "Рейтинг", mode_train: "Тренування",
            set_controls: "Керування", set_controls_hint: "Свайпи — більший екран", ctl_buttons: "Кнопки", ctl_swipes: "Свайпи",
            set_theme: "Тема екрана", set_haptic: "Вібрація", rules_full: "Правила розіграшу", privacy: "Конфіденційність",
            offline_tg: "Відкрий гру в Telegram, щоб твої результати потрапили в рейтинг.",
            offline_server: "Рейтинг запрацює після запуску сервера. Зараз результати зберігаються тільки на цьому пристрої."
        },
        en: {
            splash_top: "REWIND TO 2000",
            splash_s1: "Remember your", splash_s2: "first high score?",
            splash_note: "Back then for fun. Now for a prize.",
            play: "Play", loading: "Loading",
            tab_game: "Game", tab_top: "Leaderboard", tab_profile: "Profile",
            mode_ranked: "RANKED", mode_training: "PRACTICE", mode_offline: "OFFLINE",
            hint_idle: "OK — start", hint_running: "go!", hint_paused: "OK — resume", hint_over: "OK — again",
            ctl_reset: "RESET", ctl_start: "START", ctl_pause: "PAUSE", ctl_resume: "RESUME",
            cv_press: "press OK", cv_pause: "PAUSED", cv_over: "GAME OVER", cv_win: "YOU WIN!",
            cv_score: "score {n}", cv_saving: "saving...", cv_record: "RECORD! rank #{n}",
            cv_place: "your rank #{n}", cv_contest_over: "contest is over", cv_rejected: "not counted",
            toast_offline: "No connection to the server — this game won't be ranked",
            toast_record: "New record — {s}! You're #{r} on the leaderboard",
            err_too_fast: "The game failed the timing check", err_invalid: "The game failed verification",
            err_daily: "Daily game limit reached", err_banned: "Account blocked", err_save: "Couldn't save the result",
            copied: "Link copied", copy_fail: "Couldn't copy",
            contest: "Giveaway", cd_d: "days", cd_h: "hrs", cd_m: "min", cd_s: "sec", finish: "finished",
            contest_ended: "The contest is over. Winners will be announced in the bot.",
            records: "High scores", friends: "Friends", places: "top {n} · 1st place {p}", rules: "Rules",
            hint_score: "Best score during the contest", hint_ref: "Friends who actually played",
            in_board: "{n} ranked", board_soon: "The leaderboard will appear once the server is live.",
            board_error: "Couldn't load the leaderboard.<br>Try again later.",
            board_empty_score: "No scores yet.<br>Be the first!",
            board_empty_ref: "Nobody has invited friends yet.<br>Be the first!", you: "you",
            invite_title: "Invite friends", inv_counted: "counted", inv_clicked: "joined via link", inv_place: "rank",
            open_in_tg: "Open the game in Telegram", loading_dots: "Loading...",
            invite: "Invite", copy: "Copy",
            ref_note: "A friend counts after playing {g} ranked games and scoring {s}+ points.",
            share_text: "I'm playing GGSNAKE — the classic snake, now in Telegram.{pool} Join me 🐍", share_pool: " {p} giveaway!",
            player: "Player", stats: "Stats", st_best: "Best", st_rank: "Rank", st_games: "Games",
            st_avg: "Average", st_food: "Eaten", st_time: "Minutes played", settings: "Settings",
            set_mode: "Mode", set_mode_hint: "Practice — no walls, not ranked", mode_rank: "Ranked", mode_train: "Practice",
            set_controls: "Controls", set_controls_hint: "Swipes — bigger screen", ctl_buttons: "Buttons", ctl_swipes: "Swipes",
            set_theme: "Screen theme", set_haptic: "Vibration", rules_full: "Giveaway rules", privacy: "Privacy",
            offline_tg: "Open the game in Telegram to get on the leaderboard.",
            offline_server: "The leaderboard will work once the server is live. For now results are saved on this device only."
        },
        ru: {
            splash_top: "REWIND TO 2000",
            splash_s1: "Помнишь свой", splash_s2: "первый рекорд?",
            splash_note: "Тогда — на перемене. Теперь — за приз.",
            play: "Играть", loading: "Загрузка",
            tab_game: "Игра", tab_top: "Рейтинг", tab_profile: "Профиль",
            mode_ranked: "РЕЙТИНГ", mode_training: "ТРЕНИРОВКА", mode_offline: "ОФЛАЙН",
            hint_idle: "OK — старт", hint_running: "играй!", hint_paused: "OK — дальше", hint_over: "OK — ещё раз",
            ctl_reset: "СБРОС", ctl_start: "СТАРТ", ctl_pause: "ПАУЗА", ctl_resume: "ДАЛЬШЕ",
            cv_press: "нажми OK", cv_pause: "ПАУЗА", cv_over: "GAME OVER", cv_win: "ПОБЕДА!",
            cv_score: "счёт {n}", cv_saving: "сохраняем...", cv_record: "РЕКОРД! место #{n}",
            cv_place: "твоё место #{n}", cv_contest_over: "конкурс завершён", cv_rejected: "не засчитано",
            toast_offline: "Нет связи с сервером — игра не идёт в рейтинг",
            toast_record: "Новый рекорд — {s}! Ты #{r} в рейтинге",
            err_too_fast: "Игра не прошла проверку времени", err_invalid: "Игра не прошла проверку",
            err_daily: "Лимит игр на сегодня", err_banned: "Аккаунт заблокирован", err_save: "Не удалось сохранить результат",
            copied: "Ссылка скопирована", copy_fail: "Не удалось скопировать",
            contest: "Розыгрыш", cd_d: "дни", cd_h: "час", cd_m: "мин", cd_s: "сек", finish: "финиш",
            contest_ended: "Конкурс завершён. Победителей объявим в боте.",
            records: "Рекорды", friends: "Друзья", places: "топ-{n} · 1 место {p}", rules: "Правила",
            hint_score: "Лучший результат за конкурс", hint_ref: "Друзья, которые реально сыграли",
            in_board: "{n} в рейтинге", board_soon: "Рейтинг игроков появится после запуска сервера.",
            board_error: "Не удалось загрузить рейтинг.<br>Попробуй позже.",
            board_empty_score: "Пока нет результатов.<br>Сыграй первым!",
            board_empty_ref: "Пока никто не пригласил друзей.<br>Стань первым!", you: "ты",
            invite_title: "Пригласи друзей", inv_counted: "засчитано", inv_clicked: "перешли по ссылке", inv_place: "место",
            open_in_tg: "Открой игру в Telegram", loading_dots: "Загрузка...",
            invite: "Пригласить", copy: "Копировать",
            ref_note: "Друг засчитывается, когда сыграет {g} игры и наберёт {s}+ очков в рейтинговом режиме.",
            share_text: "Играю в GGSNAKE — та самая змейка, теперь в Telegram.{pool} Заходи 🐍", share_pool: " Розыгрыш {p}!",
            player: "Игрок", stats: "Статистика", st_best: "Рекорд", st_rank: "Место", st_games: "Игр",
            st_avg: "Средний", st_food: "Съедено", st_time: "Мин в игре", settings: "Настройки",
            set_mode: "Режим", set_mode_hint: "Тренировка — без стен, не в рейтинг", mode_rank: "Рейтинг", mode_train: "Тренировка",
            set_controls: "Управление", set_controls_hint: "Свайпы — больше экран", ctl_buttons: "Кнопки", ctl_swipes: "Свайпы",
            set_theme: "Тема экрана", set_haptic: "Вибрация", rules_full: "Правила розыгрыша", privacy: "Конфиденциальность",
            offline_tg: "Открой игру в Telegram, чтобы попасть в рейтинг.",
            offline_server: "Рейтинг заработает после запуска сервера. Сейчас результаты сохраняются только на этом устройстве."
        },
        es: {
            splash_top: "REWIND TO 2000",
            splash_s1: "¿Recuerdas tu", splash_s2: "primer récord?",
            splash_note: "Antes por diversión. Ahora por un premio.",
            play: "Jugar", loading: "Cargando",
            tab_game: "Juego", tab_top: "Ranking", tab_profile: "Perfil",
            mode_ranked: "RANKING", mode_training: "PRÁCTICA", mode_offline: "SIN CONEXIÓN",
            hint_idle: "OK — empezar", hint_running: "¡juega!", hint_paused: "OK — seguir", hint_over: "OK — otra vez",
            ctl_reset: "REINICIAR", ctl_start: "EMPEZAR", ctl_pause: "PAUSA", ctl_resume: "SEGUIR",
            cv_press: "pulsa OK", cv_pause: "PAUSA", cv_over: "GAME OVER", cv_win: "¡GANASTE!",
            cv_score: "puntos {n}", cv_saving: "guardando...", cv_record: "¡RÉCORD! puesto #{n}",
            cv_place: "tu puesto #{n}", cv_contest_over: "concurso terminado", cv_rejected: "no válido",
            toast_offline: "Sin conexión al servidor — esta partida no cuenta para el ranking",
            toast_record: "¡Nuevo récord: {s}! Estás en el puesto #{r}",
            err_too_fast: "La partida no pasó el control de tiempo", err_invalid: "La partida no pasó la verificación",
            err_daily: "Límite diario de partidas", err_banned: "Cuenta bloqueada", err_save: "No se pudo guardar el resultado",
            copied: "Enlace copiado", copy_fail: "No se pudo copiar",
            contest: "Sorteo", cd_d: "días", cd_h: "h", cd_m: "min", cd_s: "seg", finish: "fin",
            contest_ended: "El concurso ha terminado. Anunciaremos a los ganadores en el bot.",
            records: "Récords", friends: "Amigos", places: "top {n} · 1.er puesto {p}", rules: "Reglas",
            hint_score: "Mejor resultado del concurso", hint_ref: "Amigos que realmente jugaron",
            in_board: "{n} en el ranking", board_soon: "El ranking aparecerá cuando el servidor esté activo.",
            board_error: "No se pudo cargar el ranking.<br>Inténtalo más tarde.",
            board_empty_score: "Aún no hay resultados.<br>¡Sé el primero!",
            board_empty_ref: "Nadie ha invitado amigos todavía.<br>¡Sé el primero!", you: "tú",
            invite_title: "Invita a amigos", inv_counted: "válidos", inv_clicked: "entraron con tu enlace", inv_place: "puesto",
            open_in_tg: "Abre el juego en Telegram", loading_dots: "Cargando...",
            invite: "Invitar", copy: "Copiar",
            ref_note: "Un amigo cuenta cuando juega {g} partidas de ranking y consigue {s}+ puntos.",
            share_text: "Juego a GGSNAKE — la serpiente clásica, ahora en Telegram.{pool} Únete 🐍", share_pool: " ¡Sorteo de {p}!",
            player: "Jugador", stats: "Estadísticas", st_best: "Récord", st_rank: "Puesto", st_games: "Partidas",
            st_avg: "Media", st_food: "Comidos", st_time: "Min jugados", settings: "Ajustes",
            set_mode: "Modo", set_mode_hint: "Práctica — sin paredes, no cuenta", mode_rank: "Ranking", mode_train: "Práctica",
            set_controls: "Controles", set_controls_hint: "Deslizar — pantalla más grande", ctl_buttons: "Botones", ctl_swipes: "Deslizar",
            set_theme: "Tema de pantalla", set_haptic: "Vibración", rules_full: "Reglas del sorteo", privacy: "Privacidad",
            offline_tg: "Abre el juego en Telegram para entrar en el ranking.",
            offline_server: "El ranking funcionará cuando el servidor esté activo. Por ahora los resultados se guardan solo en este dispositivo."
        },
        pt: {
            splash_top: "REWIND TO 2000",
            splash_s1: "Lembra do seu", splash_s2: "primeiro recorde?",
            splash_note: "Antes por diversão. Agora por prêmio.",
            play: "Jogar", loading: "Carregando",
            tab_game: "Jogo", tab_top: "Ranking", tab_profile: "Perfil",
            mode_ranked: "RANKING", mode_training: "TREINO", mode_offline: "OFFLINE",
            hint_idle: "OK — começar", hint_running: "jogue!", hint_paused: "OK — continuar", hint_over: "OK — de novo",
            ctl_reset: "REINICIAR", ctl_start: "INICIAR", ctl_pause: "PAUSA", ctl_resume: "CONTINUAR",
            cv_press: "aperte OK", cv_pause: "PAUSA", cv_over: "GAME OVER", cv_win: "VITÓRIA!",
            cv_score: "pontos {n}", cv_saving: "salvando...", cv_record: "RECORDE! posição #{n}",
            cv_place: "sua posição #{n}", cv_contest_over: "concurso encerrado", cv_rejected: "não contou",
            toast_offline: "Sem conexão com o servidor — esta partida não conta no ranking",
            toast_record: "Novo recorde: {s}! Você está em #{r}",
            err_too_fast: "A partida falhou na verificação de tempo", err_invalid: "A partida falhou na verificação",
            err_daily: "Limite diário de partidas", err_banned: "Conta bloqueada", err_save: "Não foi possível salvar o resultado",
            copied: "Link copiado", copy_fail: "Não foi possível copiar",
            contest: "Sorteio", cd_d: "dias", cd_h: "h", cd_m: "min", cd_s: "seg", finish: "fim",
            contest_ended: "O concurso terminou. Anunciaremos os vencedores no bot.",
            records: "Recordes", friends: "Amigos", places: "top {n} · 1º lugar {p}", rules: "Regras",
            hint_score: "Melhor resultado do concurso", hint_ref: "Amigos que realmente jogaram",
            in_board: "{n} no ranking", board_soon: "O ranking aparecerá quando o servidor estiver no ar.",
            board_error: "Não foi possível carregar o ranking.<br>Tente mais tarde.",
            board_empty_score: "Ainda sem resultados.<br>Seja o primeiro!",
            board_empty_ref: "Ninguém convidou amigos ainda.<br>Seja o primeiro!", you: "você",
            invite_title: "Convide amigos", inv_counted: "válidos", inv_clicked: "entraram pelo link", inv_place: "posição",
            open_in_tg: "Abra o jogo no Telegram", loading_dots: "Carregando...",
            invite: "Convidar", copy: "Copiar",
            ref_note: "Um amigo conta depois de jogar {g} partidas de ranking e fazer {s}+ pontos.",
            share_text: "Estou jogando GGSNAKE — a cobrinha clássica, agora no Telegram.{pool} Vem 🐍", share_pool: " Sorteio de {p}!",
            player: "Jogador", stats: "Estatísticas", st_best: "Recorde", st_rank: "Posição", st_games: "Partidas",
            st_avg: "Média", st_food: "Comidos", st_time: "Min jogados", settings: "Configurações",
            set_mode: "Modo", set_mode_hint: "Treino — sem paredes, não conta", mode_rank: "Ranking", mode_train: "Treino",
            set_controls: "Controles", set_controls_hint: "Deslizar — tela maior", ctl_buttons: "Botões", ctl_swipes: "Deslizar",
            set_theme: "Tema da tela", set_haptic: "Vibração", rules_full: "Regras do sorteio", privacy: "Privacidade",
            offline_tg: "Abra o jogo no Telegram para entrar no ranking.",
            offline_server: "O ranking vai funcionar quando o servidor estiver no ar. Por enquanto os resultados ficam só neste aparelho."
        },
        de: {
            splash_top: "REWIND TO 2000",
            splash_s1: "Weißt du noch?", splash_s2: "Dein erster Highscore",
            splash_note: "Damals zum Spaß. Jetzt um Preise.",
            play: "Spielen", loading: "Laden",
            tab_game: "Spiel", tab_top: "Rangliste", tab_profile: "Profil",
            mode_ranked: "RANGLISTE", mode_training: "TRAINING", mode_offline: "OFFLINE",
            hint_idle: "OK — Start", hint_running: "los!", hint_paused: "OK — weiter", hint_over: "OK — nochmal",
            ctl_reset: "NEU", ctl_start: "START", ctl_pause: "PAUSE", ctl_resume: "WEITER",
            cv_press: "drück OK", cv_pause: "PAUSE", cv_over: "GAME OVER", cv_win: "GEWONNEN!",
            cv_score: "Punkte {n}", cv_saving: "speichern...", cv_record: "REKORD! Platz #{n}",
            cv_place: "dein Platz #{n}", cv_contest_over: "Wettbewerb beendet", cv_rejected: "nicht gewertet",
            toast_offline: "Keine Verbindung zum Server — dieses Spiel wird nicht gewertet",
            toast_record: "Neuer Rekord: {s}! Du bist #{r}",
            err_too_fast: "Das Spiel hat die Zeitprüfung nicht bestanden", err_invalid: "Das Spiel hat die Prüfung nicht bestanden",
            err_daily: "Tageslimit erreicht", err_banned: "Konto gesperrt", err_save: "Ergebnis konnte nicht gespeichert werden",
            copied: "Link kopiert", copy_fail: "Kopieren fehlgeschlagen",
            contest: "Gewinnspiel", cd_d: "Tage", cd_h: "Std", cd_m: "Min", cd_s: "Sek", finish: "Ende",
            contest_ended: "Der Wettbewerb ist vorbei. Die Gewinner verkünden wir im Bot.",
            records: "Highscores", friends: "Freunde", places: "Top {n} · Platz 1 {p}", rules: "Regeln",
            hint_score: "Bestes Ergebnis im Wettbewerb", hint_ref: "Freunde, die wirklich gespielt haben",
            in_board: "{n} in der Rangliste", board_soon: "Die Rangliste erscheint, sobald der Server läuft.",
            board_error: "Rangliste konnte nicht geladen werden.<br>Versuch es später.",
            board_empty_score: "Noch keine Ergebnisse.<br>Sei der Erste!",
            board_empty_ref: "Noch niemand hat Freunde eingeladen.<br>Sei der Erste!", you: "du",
            invite_title: "Freunde einladen", inv_counted: "gewertet", inv_clicked: "über deinen Link", inv_place: "Platz",
            open_in_tg: "Öffne das Spiel in Telegram", loading_dots: "Laden...",
            invite: "Einladen", copy: "Kopieren",
            ref_note: "Ein Freund zählt, sobald er {g} Ranglistenspiele gespielt und {s}+ Punkte erreicht hat.",
            share_text: "Ich spiele GGSNAKE — die klassische Schlange, jetzt in Telegram.{pool} Mach mit 🐍", share_pool: " {p} zu gewinnen!",
            player: "Spieler", stats: "Statistik", st_best: "Rekord", st_rank: "Platz", st_games: "Spiele",
            st_avg: "Schnitt", st_food: "Gefressen", st_time: "Min gespielt", settings: "Einstellungen",
            set_mode: "Modus", set_mode_hint: "Training — ohne Wände, ohne Wertung", mode_rank: "Rangliste", mode_train: "Training",
            set_controls: "Steuerung", set_controls_hint: "Wischen — größerer Bildschirm", ctl_buttons: "Tasten", ctl_swipes: "Wischen",
            set_theme: "Bildschirm-Thema", set_haptic: "Vibration", rules_full: "Gewinnspiel-Regeln", privacy: "Datenschutz",
            offline_tg: "Öffne das Spiel in Telegram, um in die Rangliste zu kommen.",
            offline_server: "Die Rangliste funktioniert, sobald der Server läuft. Bis dahin werden Ergebnisse nur auf diesem Gerät gespeichert."
        },
        pl: {
            splash_top: "REWIND TO 2000",
            splash_s1: "Pamiętasz swój", splash_s2: "pierwszy rekord?",
            splash_note: "Kiedyś dla zabawy. Teraz o nagrody.",
            play: "Graj", loading: "Ładowanie",
            tab_game: "Gra", tab_top: "Ranking", tab_profile: "Profil",
            mode_ranked: "RANKING", mode_training: "TRENING", mode_offline: "OFFLINE",
            hint_idle: "OK — start", hint_running: "graj!", hint_paused: "OK — dalej", hint_over: "OK — jeszcze raz",
            ctl_reset: "RESET", ctl_start: "START", ctl_pause: "PAUZA", ctl_resume: "DALEJ",
            cv_press: "naciśnij OK", cv_pause: "PAUZA", cv_over: "GAME OVER", cv_win: "WYGRANA!",
            cv_score: "wynik {n}", cv_saving: "zapisywanie...", cv_record: "REKORD! miejsce #{n}",
            cv_place: "twoje miejsce #{n}", cv_contest_over: "konkurs zakończony", cv_rejected: "nie zaliczono",
            toast_offline: "Brak połączenia z serwerem — ta gra nie trafi do rankingu",
            toast_record: "Nowy rekord: {s}! Jesteś #{r} w rankingu",
            err_too_fast: "Gra nie przeszła kontroli czasu", err_invalid: "Gra nie przeszła weryfikacji",
            err_daily: "Dzienny limit gier", err_banned: "Konto zablokowane", err_save: "Nie udało się zapisać wyniku",
            copied: "Link skopiowany", copy_fail: "Nie udało się skopiować",
            contest: "Konkurs", cd_d: "dni", cd_h: "godz", cd_m: "min", cd_s: "sek", finish: "koniec",
            contest_ended: "Konkurs zakończony. Zwycięzców ogłosimy w bocie.",
            records: "Rekordy", friends: "Znajomi", places: "top {n} · 1. miejsce {p}", rules: "Zasady",
            hint_score: "Najlepszy wynik w konkursie", hint_ref: "Znajomi, którzy naprawdę zagrali",
            in_board: "{n} w rankingu", board_soon: "Ranking pojawi się po uruchomieniu serwera.",
            board_error: "Nie udało się wczytać rankingu.<br>Spróbuj później.",
            board_empty_score: "Jeszcze brak wyników.<br>Zagraj pierwszy!",
            board_empty_ref: "Nikt jeszcze nie zaprosił znajomych.<br>Bądź pierwszy!", you: "ty",
            invite_title: "Zaproś znajomych", inv_counted: "zaliczonych", inv_clicked: "weszło z linku", inv_place: "miejsce",
            open_in_tg: "Otwórz grę w Telegramie", loading_dots: "Ładowanie...",
            invite: "Zaproś", copy: "Kopiuj",
            ref_note: "Znajomy się liczy, gdy zagra {g} gry rankingowe i zdobędzie {s}+ punktów.",
            share_text: "Gram w GGSNAKE — klasyczny wąż, teraz w Telegramie.{pool} Dołącz 🐍", share_pool: " Do wygrania {p}!",
            player: "Gracz", stats: "Statystyki", st_best: "Rekord", st_rank: "Miejsce", st_games: "Gier",
            st_avg: "Średnia", st_food: "Zjedzone", st_time: "Min w grze", settings: "Ustawienia",
            set_mode: "Tryb", set_mode_hint: "Trening — bez ścian, poza rankingiem", mode_rank: "Ranking", mode_train: "Trening",
            set_controls: "Sterowanie", set_controls_hint: "Przesunięcia — większy ekran", ctl_buttons: "Przyciski", ctl_swipes: "Przesunięcia",
            set_theme: "Motyw ekranu", set_haptic: "Wibracje", rules_full: "Zasady konkursu", privacy: "Prywatność",
            offline_tg: "Otwórz grę w Telegramie, aby trafić do rankingu.",
            offline_server: "Ranking zadziała po uruchomieniu serwera. Na razie wyniki zapisują się tylko na tym urządzeniu."
        },
        tr: {
            splash_top: "REWIND TO 2000",
            splash_s1: "İlk rekorunu", splash_s2: "hatırlıyor musun?",
            splash_note: "Eskiden eğlence için. Şimdi ödül için.",
            play: "Oyna", loading: "Yükleniyor",
            tab_game: "Oyun", tab_top: "Sıralama", tab_profile: "Profil",
            mode_ranked: "SIRALAMA", mode_training: "ANTRENMAN", mode_offline: "ÇEVRİMDIŞI",
            hint_idle: "OK — başla", hint_running: "oyna!", hint_paused: "OK — devam", hint_over: "OK — tekrar",
            ctl_reset: "SIFIRLA", ctl_start: "BAŞLA", ctl_pause: "DURAKLAT", ctl_resume: "DEVAM",
            cv_press: "OK'a bas", cv_pause: "DURAKLATILDI", cv_over: "GAME OVER", cv_win: "KAZANDIN!",
            cv_score: "puan {n}", cv_saving: "kaydediliyor...", cv_record: "REKOR! sıra #{n}",
            cv_place: "sıran #{n}", cv_contest_over: "yarışma bitti", cv_rejected: "sayılmadı",
            toast_offline: "Sunucuya bağlantı yok — bu oyun sıralamaya girmez",
            toast_record: "Yeni rekor: {s}! Sıralamada #{r} oldun",
            err_too_fast: "Oyun süre kontrolünden geçemedi", err_invalid: "Oyun doğrulamadan geçemedi",
            err_daily: "Günlük oyun sınırı", err_banned: "Hesap engellendi", err_save: "Sonuç kaydedilemedi",
            copied: "Bağlantı kopyalandı", copy_fail: "Kopyalanamadı",
            contest: "Çekiliş", cd_d: "gün", cd_h: "sa", cd_m: "dk", cd_s: "sn", finish: "bitti",
            contest_ended: "Yarışma bitti. Kazananları botta duyuracağız.",
            records: "Rekorlar", friends: "Arkadaşlar", places: "ilk {n} · 1.lik {p}", rules: "Kurallar",
            hint_score: "Yarışmadaki en iyi skor", hint_ref: "Gerçekten oynayan arkadaşlar",
            in_board: "{n} sıralamada", board_soon: "Sıralama sunucu açılınca görünecek.",
            board_error: "Sıralama yüklenemedi.<br>Daha sonra tekrar dene.",
            board_empty_score: "Henüz skor yok.<br>İlk sen ol!",
            board_empty_ref: "Henüz kimse arkadaş davet etmedi.<br>İlk sen ol!", you: "sen",
            invite_title: "Arkadaşlarını davet et", inv_counted: "sayıldı", inv_clicked: "bağlantıyla geldi", inv_place: "sıra",
            open_in_tg: "Oyunu Telegram'da aç", loading_dots: "Yükleniyor...",
            invite: "Davet et", copy: "Kopyala",
            ref_note: "Bir arkadaş {g} sıralama oyunu oynayıp {s}+ puan yapınca sayılır.",
            share_text: "GGSNAKE oynuyorum — klasik yılan oyunu artık Telegram'da.{pool} Gel 🐍", share_pool: " {p} çekiliş!",
            player: "Oyuncu", stats: "İstatistikler", st_best: "Rekor", st_rank: "Sıra", st_games: "Oyun",
            st_avg: "Ortalama", st_food: "Yenen", st_time: "Oynanan dk", settings: "Ayarlar",
            set_mode: "Mod", set_mode_hint: "Antrenman — duvarsız, sıralamaya girmez", mode_rank: "Sıralama", mode_train: "Antrenman",
            set_controls: "Kontroller", set_controls_hint: "Kaydırma — daha büyük ekran", ctl_buttons: "Tuşlar", ctl_swipes: "Kaydırma",
            set_theme: "Ekran teması", set_haptic: "Titreşim", rules_full: "Çekiliş kuralları", privacy: "Gizlilik",
            offline_tg: "Sıralamaya girmek için oyunu Telegram'da aç.",
            offline_server: "Sıralama sunucu açılınca çalışacak. Şimdilik sonuçlar sadece bu cihazda kayıtlı."
        }
    };

    /* Long legal texts: Ukrainian, English and Russian; other languages show English. */
    function rulesHtml(lang, a) {
        var L = a.list;
        if (lang === "uk") return "" +
            "<h4>1. Організатор</h4><p>Розіграш проводить команда GGSNAKE (бот @ggsnake_game_bot). Зв'язок: " + a.contact + ". Telegram не є організатором, спонсором чи партнером цього розіграшу.</p>" +
            "<h4>2. Строки</h4><p>Розіграш триває до " + a.ends + " (час вашого пристрою). Результати після цього моменту не враховуються.</p>" +
            "<h4>3. Хто може брати участь</h4><ul><li>Повнолітні користувачі Telegram.</li><li>Один гравець — один акаунт. Мультиакаунти дискваліфікуються.</li></ul>" +
            "<h4>4. Призовий фонд — " + a.pool + "</h4><p><b>Рекорди</b> — найвищий результат у рейтинговому режимі:</p><ul>" + L(a.prizesScore, "місце") + "</ul>" +
            "<p><b>Друзі</b> — найбільше зарахованих друзів:</p><ul>" + L(a.prizesRef, "місце") + "</ul>" +
            "<p>Друг зараховується, якщо він новий гравець, перейшов за вашим посиланням, зіграв щонайменше " + a.g + " рейтингові гри і набрав " + a.s + "+ очок. При однаковому результаті вище той, хто досяг його раніше.</p>" +
            "<h4>5. Чесна гра</h4><ul><li>Кожна рейтингова гра перевіряється на сервері: сервер повністю перепроходить її і сам рахує очки.</li><li>Заборонено: боти, скрипти, автоклікери, зміна коду гри, накрутка фейкових друзів.</li><li>Перед виплатою організатор переглядає записи ігор і запрошених друзів переможців і може дискваліфікувати за порушення.</li></ul>" +
            "<h4>6. Виплата</h4><p>Переможців оголосимо в боті протягом 3 днів після завершення. Переможець має відповісти протягом 72 годин і надати адресу гаманця USDT або TON. Виплата — протягом 7 днів після підтвердження. Якщо переможець не відповів, приз переходить до наступного місця.</p>" +
            "<h4>7. Інше</h4><ul><li>Податки та обов'язки за законами своєї країни переможець сплачує самостійно.</li><li>Участь безкоштовна, покупки не потрібні.</li><li>Організатор може змінити правила, повідомивши про це в боті.</li></ul>";
        if (lang === "ru") return "" +
            "<h4>1. Организатор</h4><p>Розыгрыш проводит команда GGSNAKE (бот @ggsnake_game_bot). Связь: " + a.contact + ". Telegram не является организатором, спонсором или партнёром этого розыгрыша.</p>" +
            "<h4>2. Сроки</h4><p>Розыгрыш длится до " + a.ends + " (время вашего устройства). Результаты после этого момента не учитываются.</p>" +
            "<h4>3. Кто может участвовать</h4><ul><li>Совершеннолетние пользователи Telegram.</li><li>Один игрок — один аккаунт. Мультиаккаунты дисквалифицируются.</li></ul>" +
            "<h4>4. Призовой фонд — " + a.pool + "</h4><p><b>Рекорды</b> — лучший результат в рейтинговом режиме:</p><ul>" + L(a.prizesScore, "место") + "</ul>" +
            "<p><b>Друзья</b> — больше всего засчитанных друзей:</p><ul>" + L(a.prizesRef, "место") + "</ul>" +
            "<p>Друг засчитывается, если он новый игрок, перешёл по вашей ссылке, сыграл минимум " + a.g + " рейтинговые игры и набрал " + a.s + "+ очков. При равном результате выше тот, кто достиг его раньше.</p>" +
            "<h4>5. Честная игра</h4><ul><li>Каждая рейтинговая игра проверяется на сервере: сервер полностью переигрывает её и сам считает очки.</li><li>Запрещено: боты, скрипты, автокликеры, изменение кода игры, накрутка фейковых друзей.</li><li>Перед выплатой организатор проверяет записи игр и приглашённых друзей победителей и может дисквалифицировать за нарушения.</li></ul>" +
            "<h4>6. Выплата</h4><p>Победителей объявим в боте в течение 3 дней после завершения. Победитель должен ответить в течение 72 часов и указать адрес кошелька USDT или TON. Выплата — в течение 7 дней после подтверждения. Если победитель не ответил, приз переходит следующему месту.</p>" +
            "<h4>7. Прочее</h4><ul><li>Налоги и обязанности по законам своей страны победитель оплачивает самостоятельно.</li><li>Участие бесплатное, покупки не нужны.</li><li>Организатор может изменить правила, сообщив об этом в боте.</li></ul>";
        return "" +
            "<h4>1. Organizer</h4><p>The giveaway is run by the GGSNAKE team (bot @ggsnake_game_bot). Contact: " + a.contact + ". Telegram is not an organizer, sponsor or partner of this giveaway.</p>" +
            "<h4>2. Dates</h4><p>The giveaway runs until " + a.ends + " (your device's time). Results after that moment don't count.</p>" +
            "<h4>3. Who can take part</h4><ul><li>Telegram users of legal age.</li><li>One player — one account. Multiple accounts are disqualified.</li></ul>" +
            "<h4>4. Prize pool — " + a.pool + "</h4><p><b>High scores</b> — best result in ranked mode:</p><ul>" + L(a.prizesScore, "place") + "</ul>" +
            "<p><b>Friends</b> — most counted friends:</p><ul>" + L(a.prizesRef, "place") + "</ul>" +
            "<p>A friend counts if they are a new player, joined via your link, played at least " + a.g + " ranked games and scored " + a.s + "+ points. On a tie, whoever reached the result first ranks higher.</p>" +
            "<h4>5. Fair play</h4><ul><li>Every ranked game is verified on the server: the server replays it in full and calculates the score itself.</li><li>Not allowed: bots, scripts, auto-clickers, modifying the game, fake referrals.</li><li>Before paying out, the organizer reviews the winners' game records and invited friends and may disqualify for violations.</li></ul>" +
            "<h4>6. Payout</h4><p>Winners are announced in the bot within 3 days after the end. A winner must reply within 72 hours with a USDT or TON wallet address. Payout within 7 days after confirmation. If a winner doesn't reply, the prize goes to the next place.</p>" +
            "<h4>7. Other</h4><ul><li>Winners are responsible for any taxes and obligations under the laws of their country.</li><li>Participation is free, no purchase necessary.</li><li>The organizer may change the rules with notice in the bot.</li></ul>";
    }

    function privacyHtml(lang, a) {
        if (lang === "uk") return "<h4>Що ми зберігаємо</h4><ul><li>Telegram ID, ім'я, username, мову.</li><li>Результати ігор, записи рекордних ігор (для перевірки чесності), хто кого запросив.</li></ul><h4>Що бачать інші</h4><p>У рейтингу показується тільки ваше ім'я з Telegram і результат. ID та username не показуються.</p><h4>Навіщо</h4><p>Тільки для роботи гри, рейтингу, захисту від накруток і виплати призів. Ми не продаємо і не передаємо дані третім особам.</p><h4>Видалення</h4><p>Напишіть " + a.contact + " — ми видалимо ваші дані.</p>";
        if (lang === "ru") return "<h4>Что мы храним</h4><ul><li>Telegram ID, имя, username, язык.</li><li>Результаты игр, записи рекордных игр (для проверки честности), кто кого пригласил.</li></ul><h4>Что видят другие</h4><p>В рейтинге показывается только ваше имя из Telegram и результат. ID и username не показываются.</p><h4>Зачем</h4><p>Только для работы игры, рейтинга, защиты от накруток и выплаты призов. Мы не продаём и не передаём данные третьим лицам.</p><h4>Удаление</h4><p>Напишите " + a.contact + " — мы удалим ваши данные.</p>";
        return "<h4>What we store</h4><ul><li>Telegram ID, name, username, language.</li><li>Game results, records of best games (to verify fair play), who invited whom.</li></ul><h4>What others see</h4><p>The leaderboard shows only your Telegram first name and score. IDs and usernames are not shown.</p><h4>Why</h4><p>Only to run the game, the leaderboard, anti-cheat and prize payouts. We don't sell or share data with third parties.</p><h4>Deletion</h4><p>Message " + a.contact + " and we'll delete your data.</p>";
    }

    function detect(tgUser) {
        var code = (tgUser && tgUser.language_code) || (root.navigator && root.navigator.language) || "en";
        code = String(code).slice(0, 2).toLowerCase();
        if (code === "be") code = "ru";
        return LANGS.indexOf(code) >= 0 ? code : "en";
    }

    root.GGI18N = { LANGS: LANGS, dict: D, detect: detect, rulesHtml: rulesHtml, privacyHtml: privacyHtml };
})(typeof globalThis !== "undefined" ? globalThis : this);
