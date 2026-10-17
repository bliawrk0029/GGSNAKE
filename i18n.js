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


    var EXTRA = {
        uk: { hint_next: "ще {n} до LV{m}", cv_level: "РІВЕНЬ {n}", cv_newmap: "нова карта", set_sound: "Звуки 8-біт", set_sound_hint: "Як на старому телефоні" },
        en: { hint_next: "{n} to LV{m}", cv_level: "LEVEL {n}", cv_newmap: "new maze", set_sound: "8-bit sounds", set_sound_hint: "Just like the old phone" },
        ru: { hint_next: "ещё {n} до LV{m}", cv_level: "УРОВЕНЬ {n}", cv_newmap: "новая карта", set_sound: "Звуки 8-бит", set_sound_hint: "Как на старом телефоне" },
        es: { hint_next: "{n} para LV{m}", cv_level: "NIVEL {n}", cv_newmap: "nuevo mapa", set_sound: "Sonidos 8 bits", set_sound_hint: "Como en el móvil de antes" },
        pt: { hint_next: "{n} p/ LV{m}", cv_level: "NÍVEL {n}", cv_newmap: "novo mapa", set_sound: "Sons 8 bits", set_sound_hint: "Como no celular antigo" },
        de: { hint_next: "{n} bis LV{m}", cv_level: "LEVEL {n}", cv_newmap: "neues Labyrinth", set_sound: "8-Bit-Sounds", set_sound_hint: "Wie auf dem alten Handy" },
        pl: { hint_next: "{n} do LV{m}", cv_level: "POZIOM {n}", cv_newmap: "nowa mapa", set_sound: "Dźwięki 8-bit", set_sound_hint: "Jak w starym telefonie" },
        tr: { hint_next: "LV{m}: {n}", cv_level: "SEVİYE {n}", cv_newmap: "yeni harita", set_sound: "8-bit sesler", set_sound_hint: "Eski telefondaki gibi" }
    };
    for (var lg in EXTRA) for (var k in EXTRA[lg]) D[lg][k] = EXTRA[lg][k];

    var TABS2 = {
        uk: {
            season_label: "СЕЗОН 1 · РОЗІГРАШ", top5: "топ-5", per_day: "Сьогодні", per_week: "Тиждень", per_season: "Сезон",
            hint_score: "Найкраща гра за сезон · топ-5 отримують USDT", hint_score_day: "Сьогодні до 00:00 UTC · найкраща гра", hint_score_week: "Тиждень пн–нд · найкраща гра",
            hint_ref_pts: "Друг грає = 1 бал · вірний +1 · друг друга +0.5",
            board_local: "Рейтинг відкриється зі стартом сезону.<br>Твій рекорд на цьому пристрої — {n}.",
            pin_no_rank: "Зіграй рейтингову гру, щоб потрапити в таблицю", pin_no_rank_ref: "Запроси друга — бали за тих, хто грає",
            pin_season_soon: "Сезон скоро стартує", pin_in_prize: "Ти в призовій зоні — тримай місце!", pin_goal: "До призу ({n} місце) ще {d}", you_cap: "Ти",
            lcd_soon: "СКОРО СТАРТ", lcd_d: "Д",
            rk_0: "Черв'як", rk_1: "Вуж", rk_2: "Удав", rk_3: "Кобра", rk_4: "Анаконда",
            rank_next: "До «{r}» ще {n} очок рекорду · звання видно в рейтингу", rank_max: "Найвище звання. Легенда!",
            streak_days: "{n} дн.", place_season: "#{n} у сезоні", no_place: "без місця",
            lcd_record: "РЕКОРД", lcd_last: "ОСТАННІ 12 ІГОР", lcd_games: "ІГОР", lcd_avg: "СЕР.", lcd_lv: "РІВ.", lcd_h: "Г", lcd_min: "ХВ",
            ach_title: "Досягнення", ach_first: "Перша гра", ach_1000: "1000 очок", ach_lv10: "Рівень 10", ach_7d: "7 днів", ach_ref3: "Заклинач", ach_wrap: "Без стін",
            tasks_title: "Завдання дня", tasks_left: "ще {t}", task_games: "Зіграй 3 гри", task_score: "Набери 300 за гру", task_share: "Поділись грою з другом",
            friends_card: "Мої друзі · бали", friends_card_none: "Запроси друзів — бали за тих, хто грає", friends_card_rank: "#{r} серед запрошувачів",
            fr_title: "Мої друзі", fr_points: "БАЛІВ", fr_rank: "#{n} серед запрошувачів", fr_norank: "Поки без балів",
            fr_prize_line: "Призи топ-{n}, до {p}", fr_how: "Як рахуються бали",
            fr_s1: "Зіграв {g} ігор за {d} різні дні", fr_s2: "Повернувся на {n}-й день", fr_s3: "Його друг теж зарахований",
            fr_note: "Просто перехід за посиланням — 0 балів. Бали з'являються через {h} год після перевірки. Боти й фейки знімаються.",
            fr_offline: "Список друзів з'явиться зі стартом сезону. Посилання можна надсилати вже зараз.",
            fr_empty: "Поки нікого. Надішли посилання друзям!", fr_list: "Друзі", fr_joined: "перейшли {n}", fr_ladder: "Значки за друзів",
            st_joined: "Перейшов", st_playing: "{g}/{m} ігор", st_counted: "Зараховано", st_loyal: "Вірний", st_review: "Перевірка", st_revoked: "Знято",
            sub_joined: "ще не грав — нагадай", sub_playing: "ще {n} гри, днів: {d}", sub_counted: "день {n} з {m}", sub_loyal: "рекорд {b}", sub_pending: "+{p} після перевірки",
            l2_line: "Друзі твоїх друзів: {n}", lad_1: "Перший друг", lad_3: "Заклинач", lad_5: "Зграя", lad_10: "Вожак", lad_25: "Легенда",
            invite_btn: "Запросити друга"
        },
        en: {
            season_label: "SEASON 1 · GIVEAWAY", top5: "top 5", per_day: "Today", per_week: "Week", per_season: "Season",
            hint_score: "Best game this season · top 5 win USDT", hint_score_day: "Today until 00:00 UTC · best game", hint_score_week: "Week Mon–Sun · best game",
            hint_ref_pts: "Friend plays = 1 pt · loyal +1 · friend of friend +0.5",
            board_local: "The leaderboard opens when the season starts.<br>Your best on this device: {n}.",
            pin_no_rank: "Play a ranked game to get on the board", pin_no_rank_ref: "Invite a friend — points for those who play",
            pin_season_soon: "The season starts soon", pin_in_prize: "You're in the prizes — hold on!", pin_goal: "{d} more to a prize (place {n})", you_cap: "You",
            lcd_soon: "STARTS SOON", lcd_d: "D",
            rk_0: "Worm", rk_1: "Grass snake", rk_2: "Boa", rk_3: "Cobra", rk_4: "Anaconda",
            rank_next: "{n} more best-score points to «{r}» · shown on the leaderboard", rank_max: "Top rank. Legend!",
            streak_days: "{n} d", place_season: "#{n} this season", no_place: "no rank",
            lcd_record: "BEST", lcd_last: "LAST 12 GAMES", lcd_games: "GAMES", lcd_avg: "AVG", lcd_lv: "LV", lcd_h: "H", lcd_min: "M",
            ach_title: "Achievements", ach_first: "First game", ach_1000: "1000 points", ach_lv10: "Level 10", ach_7d: "7 days", ach_ref3: "Charmer", ach_wrap: "No walls",
            tasks_title: "Daily tasks", tasks_left: "{t} left", task_games: "Play 3 games", task_score: "Score 300 in a game", task_share: "Share the game with a friend",
            friends_card: "My friends · points", friends_card_none: "Invite friends — points for those who play", friends_card_rank: "#{r} among inviters",
            fr_title: "My friends", fr_points: "POINTS", fr_rank: "#{n} among inviters", fr_norank: "No points yet",
            fr_prize_line: "Prizes for top {n}, up to {p}", fr_how: "How points work",
            fr_s1: "Played {g} games on {d} different days", fr_s2: "Came back on day {n}", fr_s3: "Their friend counted too",
            fr_note: "Just opening the link gives 0 points. Points appear {h} h after a check. Bots and fakes are removed.",
            fr_offline: "Your friends list appears when the season starts. You can already send your link.",
            fr_empty: "No one yet. Send your link to friends!", fr_list: "Friends", fr_joined: "{n} joined", fr_ladder: "Badges for friends",
            st_joined: "Joined", st_playing: "{g}/{m} games", st_counted: "Counted", st_loyal: "Loyal", st_review: "Review", st_revoked: "Removed",
            sub_joined: "hasn't played — nudge them", sub_playing: "{n} games, {d} days to go", sub_counted: "day {n} of {m}", sub_loyal: "best {b}", sub_pending: "+{p} after check",
            l2_line: "Friends of your friends: {n}", lad_1: "First friend", lad_3: "Charmer", lad_5: "Pack", lad_10: "Leader", lad_25: "Legend",
            invite_btn: "Invite a friend"
        },
        ru: {
            season_label: "СЕЗОН 1 · РОЗЫГРЫШ", top5: "топ-5", per_day: "Сегодня", per_week: "Неделя", per_season: "Сезон",
            hint_score: "Лучшая игра за сезон · топ-5 получают USDT", hint_score_day: "Сегодня до 00:00 UTC · лучшая игра", hint_score_week: "Неделя пн–вс · лучшая игра",
            hint_ref_pts: "Друг играет = 1 балл · верный +1 · друг друга +0.5",
            board_local: "Рейтинг откроется со стартом сезона.<br>Твой рекорд на этом устройстве — {n}.",
            pin_no_rank: "Сыграй рейтинговую игру, чтобы попасть в таблицу", pin_no_rank_ref: "Пригласи друга — баллы за тех, кто играет",
            pin_season_soon: "Сезон скоро стартует", pin_in_prize: "Ты в призах — держи место!", pin_goal: "До приза ({n} место) ещё {d}", you_cap: "Ты",
            lcd_soon: "СКОРО СТАРТ", lcd_d: "Д",
            rk_0: "Червяк", rk_1: "Уж", rk_2: "Удав", rk_3: "Кобра", rk_4: "Анаконда",
            rank_next: "До «{r}» ещё {n} очков рекорда · звание видно в рейтинге", rank_max: "Высшее звание. Легенда!",
            streak_days: "{n} дн.", place_season: "#{n} в сезоне", no_place: "без места",
            lcd_record: "РЕКОРД", lcd_last: "ПОСЛЕДНИЕ 12 ИГР", lcd_games: "ИГР", lcd_avg: "СР.", lcd_lv: "УР.", lcd_h: "Ч", lcd_min: "М",
            ach_title: "Достижения", ach_first: "Первая игра", ach_1000: "1000 очков", ach_lv10: "Уровень 10", ach_7d: "7 дней", ach_ref3: "Заклинатель", ach_wrap: "Без стен",
            tasks_title: "Задания дня", tasks_left: "ещё {t}", task_games: "Сыграй 3 игры", task_score: "Набери 300 за игру", task_share: "Поделись игрой с другом",
            friends_card: "Мои друзья · баллы", friends_card_none: "Пригласи друзей — баллы за тех, кто играет", friends_card_rank: "#{r} среди приглашающих",
            fr_title: "Мои друзья", fr_points: "БАЛЛОВ", fr_rank: "#{n} среди приглашающих", fr_norank: "Пока без баллов",
            fr_prize_line: "Призы топ-{n}, до {p}", fr_how: "Как считаются баллы",
            fr_s1: "Сыграл {g} игр за {d} разных дня", fr_s2: "Вернулся на {n}-й день", fr_s3: "Его друг тоже засчитан",
            fr_note: "Просто переход по ссылке — 0 баллов. Баллы появляются через {h} ч после проверки. Боты и фейки снимаются.",
            fr_offline: "Список друзей появится со стартом сезона. Ссылку можно отправлять уже сейчас.",
            fr_empty: "Пока никого. Отправь ссылку друзьям!", fr_list: "Друзья", fr_joined: "перешли {n}", fr_ladder: "Значки за друзей",
            st_joined: "Перешёл", st_playing: "{g}/{m} игр", st_counted: "Засчитан", st_loyal: "Верный", st_review: "Проверка", st_revoked: "Снят",
            sub_joined: "ещё не играл — напомни", sub_playing: "ещё {n} игры, дней: {d}", sub_counted: "день {n} из {m}", sub_loyal: "рекорд {b}", sub_pending: "+{p} после проверки",
            l2_line: "Друзья твоих друзей: {n}", lad_1: "Первый друг", lad_3: "Заклинатель", lad_5: "Стая", lad_10: "Вожак", lad_25: "Легенда",
            invite_btn: "Пригласить друга"
        },
        es: {
            season_label: "TEMPORADA 1 · SORTEO", top5: "top 5", per_day: "Hoy", per_week: "Semana", per_season: "Temporada",
            hint_score: "Mejor partida de la temporada · el top 5 gana USDT", hint_score_day: "Hoy hasta las 00:00 UTC · mejor partida", hint_score_week: "Semana lun–dom · mejor partida",
            hint_ref_pts: "Amigo que juega = 1 pt · fiel +1 · amigo de amigo +0.5",
            board_local: "El ranking abre al empezar la temporada.<br>Tu récord en este dispositivo: {n}.",
            pin_no_rank: "Juega una partida de ranking para entrar", pin_no_rank_ref: "Invita a un amigo — puntos por los que juegan",
            pin_season_soon: "La temporada empieza pronto", pin_in_prize: "¡Estás en premios, aguanta!", pin_goal: "Faltan {d} para premio (puesto {n})", you_cap: "Tú",
            lcd_soon: "PRONTO", lcd_d: "D",
            rk_0: "Gusano", rk_1: "Culebra", rk_2: "Boa", rk_3: "Cobra", rk_4: "Anaconda",
            rank_next: "Faltan {n} puntos de récord para «{r}»", rank_max: "Rango máximo. ¡Leyenda!",
            streak_days: "{n} d", place_season: "#{n} en temporada", no_place: "sin puesto",
            lcd_record: "RÉCORD", lcd_last: "ÚLTIMAS 12", lcd_games: "PART.", lcd_avg: "MED.", lcd_lv: "NIV.", lcd_h: "H", lcd_min: "M",
            ach_title: "Logros", ach_first: "Primera", ach_1000: "1000 pts", ach_lv10: "Nivel 10", ach_7d: "7 días", ach_ref3: "Encantador", ach_wrap: "Sin muros",
            tasks_title: "Tareas del día", tasks_left: "quedan {t}", task_games: "Juega 3 partidas", task_score: "Consigue 300 en una", task_share: "Comparte el juego",
            friends_card: "Mis amigos · puntos", friends_card_none: "Invita amigos — puntos por los que juegan", friends_card_rank: "#{r} entre invitadores",
            fr_title: "Mis amigos", fr_points: "PUNTOS", fr_rank: "#{n} entre invitadores", fr_norank: "Aún sin puntos",
            fr_prize_line: "Premios top {n}, hasta {p}", fr_how: "Cómo se cuentan",
            fr_s1: "Jugó {g} partidas en {d} días distintos", fr_s2: "Volvió el día {n}", fr_s3: "Su amigo también contó",
            fr_note: "Solo abrir el enlace = 0 puntos. Los puntos aparecen {h} h después de revisarlos. Bots y falsos se eliminan.",
            fr_offline: "La lista aparecerá al empezar la temporada. Ya puedes enviar tu enlace.",
            fr_empty: "Aún nadie. ¡Envía tu enlace!", fr_list: "Amigos", fr_joined: "{n} entraron", fr_ladder: "Insignias por amigos",
            st_joined: "Entró", st_playing: "{g}/{m} part.", st_counted: "Cuenta", st_loyal: "Fiel", st_review: "Revisión", st_revoked: "Quitado",
            sub_joined: "no ha jugado — avísale", sub_playing: "faltan {n} part., días: {d}", sub_counted: "día {n} de {m}", sub_loyal: "récord {b}", sub_pending: "+{p} tras revisión",
            l2_line: "Amigos de tus amigos: {n}", lad_1: "Primer amigo", lad_3: "Encantador", lad_5: "Manada", lad_10: "Líder", lad_25: "Leyenda",
            invite_btn: "Invitar amigo"
        },
        pt: {
            season_label: "TEMPORADA 1 · SORTEIO", top5: "top 5", per_day: "Hoje", per_week: "Semana", per_season: "Temporada",
            hint_score: "Melhor partida da temporada · top 5 ganha USDT", hint_score_day: "Hoje até 00:00 UTC · melhor partida", hint_score_week: "Semana seg–dom · melhor partida",
            hint_ref_pts: "Amigo que joga = 1 pt · fiel +1 · amigo de amigo +0.5",
            board_local: "O ranking abre no início da temporada.<br>Seu recorde neste aparelho: {n}.",
            pin_no_rank: "Jogue uma partida de ranking para entrar", pin_no_rank_ref: "Convide um amigo — pontos por quem joga",
            pin_season_soon: "A temporada começa em breve", pin_in_prize: "Você está nos prêmios — segure!", pin_goal: "Faltam {d} para prêmio ({n}º)", you_cap: "Você",
            lcd_soon: "EM BREVE", lcd_d: "D",
            rk_0: "Minhoca", rk_1: "Cobra-d'água", rk_2: "Jiboia", rk_3: "Naja", rk_4: "Sucuri",
            rank_next: "Faltam {n} pontos de recorde para «{r}»", rank_max: "Nível máximo. Lenda!",
            streak_days: "{n} d", place_season: "#{n} na temporada", no_place: "sem posição",
            lcd_record: "RECORDE", lcd_last: "ÚLTIMAS 12", lcd_games: "PART.", lcd_avg: "MÉD.", lcd_lv: "NÍV.", lcd_h: "H", lcd_min: "M",
            ach_title: "Conquistas", ach_first: "Primeira", ach_1000: "1000 pts", ach_lv10: "Nível 10", ach_7d: "7 dias", ach_ref3: "Encantador", ach_wrap: "Sem muros",
            tasks_title: "Tarefas do dia", tasks_left: "faltam {t}", task_games: "Jogue 3 partidas", task_score: "Faça 300 numa partida", task_share: "Compartilhe o jogo",
            friends_card: "Meus amigos · pontos", friends_card_none: "Convide amigos — pontos por quem joga", friends_card_rank: "#{r} entre convidadores",
            fr_title: "Meus amigos", fr_points: "PONTOS", fr_rank: "#{n} entre convidadores", fr_norank: "Ainda sem pontos",
            fr_prize_line: "Prêmios top {n}, até {p}", fr_how: "Como contam os pontos",
            fr_s1: "Jogou {g} partidas em {d} dias diferentes", fr_s2: "Voltou no dia {n}", fr_s3: "O amigo dele também contou",
            fr_note: "Só abrir o link = 0 pontos. Os pontos aparecem {h} h após a verificação. Bots e falsos são removidos.",
            fr_offline: "A lista aparece no início da temporada. Já pode enviar seu link.",
            fr_empty: "Ninguém ainda. Envie seu link!", fr_list: "Amigos", fr_joined: "{n} entraram", fr_ladder: "Emblemas por amigos",
            st_joined: "Entrou", st_playing: "{g}/{m} part.", st_counted: "Conta", st_loyal: "Fiel", st_review: "Revisão", st_revoked: "Removido",
            sub_joined: "não jogou — lembre", sub_playing: "faltam {n} part., dias: {d}", sub_counted: "dia {n} de {m}", sub_loyal: "recorde {b}", sub_pending: "+{p} após verificação",
            l2_line: "Amigos dos seus amigos: {n}", lad_1: "1º amigo", lad_3: "Encantador", lad_5: "Bando", lad_10: "Líder", lad_25: "Lenda",
            invite_btn: "Convidar amigo"
        },
        de: {
            season_label: "SAISON 1 · GEWINNSPIEL", top5: "Top 5", per_day: "Heute", per_week: "Woche", per_season: "Saison",
            hint_score: "Bestes Spiel der Saison · Top 5 gewinnen USDT", hint_score_day: "Heute bis 00:00 UTC · bestes Spiel", hint_score_week: "Woche Mo–So · bestes Spiel",
            hint_ref_pts: "Freund spielt = 1 Pkt · treu +1 · Freund vom Freund +0.5",
            board_local: "Die Rangliste öffnet mit dem Saisonstart.<br>Dein Rekord auf diesem Gerät: {n}.",
            pin_no_rank: "Spiel ein Ranglistenspiel, um reinzukommen", pin_no_rank_ref: "Lade Freunde ein — Punkte für alle, die spielen",
            pin_season_soon: "Die Saison startet bald", pin_in_prize: "Du bist in den Preisrängen!", pin_goal: "Noch {d} bis zum Preis (Platz {n})", you_cap: "Du",
            lcd_soon: "BALD", lcd_d: "T",
            rk_0: "Wurm", rk_1: "Natter", rk_2: "Boa", rk_3: "Kobra", rk_4: "Anakonda",
            rank_next: "Noch {n} Rekordpunkte bis «{r}»", rank_max: "Höchster Rang. Legende!",
            streak_days: "{n} T", place_season: "#{n} in der Saison", no_place: "kein Platz",
            lcd_record: "REKORD", lcd_last: "LETZTE 12", lcd_games: "SPIELE", lcd_avg: "SCHN.", lcd_lv: "LV", lcd_h: "H", lcd_min: "M",
            ach_title: "Erfolge", ach_first: "Erstes Spiel", ach_1000: "1000 Pkt", ach_lv10: "Level 10", ach_7d: "7 Tage", ach_ref3: "Beschwörer", ach_wrap: "Ohne Wände",
            tasks_title: "Tagesaufgaben", tasks_left: "noch {t}", task_games: "Spiel 3 Runden", task_score: "Hol 300 in einem Spiel", task_share: "Teile das Spiel",
            friends_card: "Meine Freunde · Punkte", friends_card_none: "Lade Freunde ein — Punkte für alle, die spielen", friends_card_rank: "#{r} unter Einladenden",
            fr_title: "Meine Freunde", fr_points: "PUNKTE", fr_rank: "#{n} unter Einladenden", fr_norank: "Noch keine Punkte",
            fr_prize_line: "Preise für Top {n}, bis {p}", fr_how: "So zählen Punkte",
            fr_s1: "{g} Spiele an {d} verschiedenen Tagen", fr_s2: "Am Tag {n} zurückgekommen", fr_s3: "Sein Freund zählt auch",
            fr_note: "Nur den Link öffnen = 0 Punkte. Punkte erscheinen {h} Std. nach Prüfung. Bots und Fakes werden entfernt.",
            fr_offline: "Die Liste erscheint mit dem Saisonstart. Du kannst deinen Link schon senden.",
            fr_empty: "Noch niemand. Schick deinen Link!", fr_list: "Freunde", fr_joined: "{n} beigetreten", fr_ladder: "Abzeichen für Freunde",
            st_joined: "Beigetreten", st_playing: "{g}/{m} Spiele", st_counted: "Zählt", st_loyal: "Treu", st_review: "Prüfung", st_revoked: "Entfernt",
            sub_joined: "hat nicht gespielt — erinnern", sub_playing: "noch {n} Spiele, Tage: {d}", sub_counted: "Tag {n} von {m}", sub_loyal: "Rekord {b}", sub_pending: "+{p} nach Prüfung",
            l2_line: "Freunde deiner Freunde: {n}", lad_1: "Erster Freund", lad_3: "Beschwörer", lad_5: "Rudel", lad_10: "Anführer", lad_25: "Legende",
            invite_btn: "Freund einladen"
        },
        pl: {
            season_label: "SEZON 1 · KONKURS", top5: "top 5", per_day: "Dziś", per_week: "Tydzień", per_season: "Sezon",
            hint_score: "Najlepsza gra w sezonie · top 5 wygrywa USDT", hint_score_day: "Dziś do 00:00 UTC · najlepsza gra", hint_score_week: "Tydzień pn–nd · najlepsza gra",
            hint_ref_pts: "Znajomy gra = 1 pkt · wierny +1 · znajomy znajomego +0.5",
            board_local: "Ranking ruszy ze startem sezonu.<br>Twój rekord na tym urządzeniu: {n}.",
            pin_no_rank: "Zagraj grę rankingową, by trafić do tabeli", pin_no_rank_ref: "Zaproś znajomego — punkty za tych, którzy grają",
            pin_season_soon: "Sezon wkrótce", pin_in_prize: "Jesteś w nagrodach — trzymaj się!", pin_goal: "Do nagrody (miejsce {n}) jeszcze {d}", you_cap: "Ty",
            lcd_soon: "WKRÓTCE", lcd_d: "D",
            rk_0: "Robak", rk_1: "Zaskroniec", rk_2: "Boa", rk_3: "Kobra", rk_4: "Anakonda",
            rank_next: "Do «{r}» jeszcze {n} pkt rekordu", rank_max: "Najwyższa ranga. Legenda!",
            streak_days: "{n} dni", place_season: "#{n} w sezonie", no_place: "bez miejsca",
            lcd_record: "REKORD", lcd_last: "OSTATNIE 12", lcd_games: "GIER", lcd_avg: "ŚR.", lcd_lv: "POZ.", lcd_h: "G", lcd_min: "M",
            ach_title: "Osiągnięcia", ach_first: "Pierwsza gra", ach_1000: "1000 pkt", ach_lv10: "Poziom 10", ach_7d: "7 dni", ach_ref3: "Zaklinacz", ach_wrap: "Bez ścian",
            tasks_title: "Zadania dnia", tasks_left: "jeszcze {t}", task_games: "Zagraj 3 gry", task_score: "Zdobądź 300 w grze", task_share: "Udostępnij grę",
            friends_card: "Moi znajomi · punkty", friends_card_none: "Zaproś znajomych — punkty za tych, którzy grają", friends_card_rank: "#{r} wśród zapraszających",
            fr_title: "Moi znajomi", fr_points: "PUNKTÓW", fr_rank: "#{n} wśród zapraszających", fr_norank: "Na razie bez punktów",
            fr_prize_line: "Nagrody top {n}, do {p}", fr_how: "Jak liczą się punkty",
            fr_s1: "Zagrał {g} gier w {d} różne dni", fr_s2: "Wrócił w dniu {n}", fr_s3: "Jego znajomy też zaliczony",
            fr_note: "Samo wejście z linku = 0 pkt. Punkty pojawiają się {h} h po sprawdzeniu. Boty i fejki są usuwane.",
            fr_offline: "Lista pojawi się ze startem sezonu. Link możesz wysyłać już teraz.",
            fr_empty: "Na razie nikt. Wyślij link znajomym!", fr_list: "Znajomi", fr_joined: "weszło {n}", fr_ladder: "Odznaki za znajomych",
            st_joined: "Wszedł", st_playing: "{g}/{m} gier", st_counted: "Zaliczony", st_loyal: "Wierny", st_review: "Weryfikacja", st_revoked: "Usunięty",
            sub_joined: "jeszcze nie grał — przypomnij", sub_playing: "jeszcze {n} gier, dni: {d}", sub_counted: "dzień {n} z {m}", sub_loyal: "rekord {b}", sub_pending: "+{p} po weryfikacji",
            l2_line: "Znajomi twoich znajomych: {n}", lad_1: "Pierwszy", lad_3: "Zaklinacz", lad_5: "Wataha", lad_10: "Przywódca", lad_25: "Legenda",
            invite_btn: "Zaproś znajomego"
        },
        tr: {
            season_label: "SEZON 1 · ÇEKİLİŞ", top5: "ilk 5", per_day: "Bugün", per_week: "Hafta", per_season: "Sezon",
            hint_score: "Sezonun en iyi oyunu · ilk 5 USDT kazanır", hint_score_day: "Bugün 00:00 UTC'ye kadar · en iyi oyun", hint_score_week: "Hafta Pzt–Paz · en iyi oyun",
            hint_ref_pts: "Oynayan arkadaş = 1 puan · sadık +1 · arkadaşın arkadaşı +0.5",
            board_local: "Sıralama sezon başlayınca açılır.<br>Bu cihazdaki rekorun: {n}.",
            pin_no_rank: "Tabloya girmek için sıralama oyunu oyna", pin_no_rank_ref: "Arkadaş davet et — oynayanlar için puan",
            pin_season_soon: "Sezon yakında başlıyor", pin_in_prize: "Ödül bölgesindesin — yerini koru!", pin_goal: "Ödüle ({n}. sıra) {d} kaldı", you_cap: "Sen",
            lcd_soon: "YAKINDA", lcd_d: "G",
            rk_0: "Solucan", rk_1: "Su yılanı", rk_2: "Boa", rk_3: "Kobra", rk_4: "Anakonda",
            rank_next: "«{r}» için {n} rekor puanı kaldı", rank_max: "En yüksek rütbe. Efsane!",
            streak_days: "{n} gün", place_season: "Sezonda #{n}", no_place: "sıra yok",
            lcd_record: "REKOR", lcd_last: "SON 12 OYUN", lcd_games: "OYUN", lcd_avg: "ORT.", lcd_lv: "SV.", lcd_h: "S", lcd_min: "D",
            ach_title: "Başarımlar", ach_first: "İlk oyun", ach_1000: "1000 puan", ach_lv10: "Seviye 10", ach_7d: "7 gün", ach_ref3: "Yılan oynatıcı", ach_wrap: "Duvarsız",
            tasks_title: "Günlük görevler", tasks_left: "{t} kaldı", task_games: "3 oyun oyna", task_score: "Bir oyunda 300 yap", task_share: "Oyunu paylaş",
            friends_card: "Arkadaşlarım · puan", friends_card_none: "Arkadaş davet et — oynayanlar için puan", friends_card_rank: "Davet edenler arasında #{r}",
            fr_title: "Arkadaşlarım", fr_points: "PUAN", fr_rank: "Davet edenler arasında #{n}", fr_norank: "Henüz puan yok",
            fr_prize_line: "İlk {n} için ödül, {p}'e kadar", fr_how: "Puanlar nasıl sayılır",
            fr_s1: "{d} farklı günde {g} oyun", fr_s2: "{n}. gün geri döndü", fr_s3: "Onun arkadaşı da sayıldı",
            fr_note: "Sadece bağlantıyı açmak = 0 puan. Puanlar kontrolden {h} saat sonra görünür. Botlar ve sahteler silinir.",
            fr_offline: "Liste sezon başlayınca görünecek. Bağlantını şimdiden gönderebilirsin.",
            fr_empty: "Henüz kimse yok. Bağlantını gönder!", fr_list: "Arkadaşlar", fr_joined: "{n} katıldı", fr_ladder: "Arkadaş rozetleri",
            st_joined: "Katıldı", st_playing: "{g}/{m} oyun", st_counted: "Sayıldı", st_loyal: "Sadık", st_review: "İnceleme", st_revoked: "Silindi",
            sub_joined: "henüz oynamadı — hatırlat", sub_playing: "{n} oyun, {d} gün kaldı", sub_counted: "{m} günün {n}.", sub_loyal: "rekor {b}", sub_pending: "kontrolden sonra +{p}",
            l2_line: "Arkadaşlarının arkadaşları: {n}", lad_1: "İlk arkadaş", lad_3: "Oynatıcı", lad_5: "Sürü", lad_10: "Lider", lad_25: "Efsane",
            invite_btn: "Arkadaş davet et"
        }
    };
    for (var lg2 in TABS2) for (var k2 in TABS2[lg2]) D[lg2][k2] = TABS2[lg2][k2];
    D.uk.ends_tba = "дати, оголошеної в боті"; D.en.ends_tba = "the date announced in the bot"; D.ru.ends_tba = "даты, объявленной в боте";
    var FAIR = {"uk": "Чесна гра і безпека", "en": "Fair play & security", "ru": "Честная игра и безопасность", "es": "Juego limpio y seguridad", "pt": "Jogo limpo e segurança", "de": "Fair Play & Sicherheit", "pl": "Uczciwa gra i bezpieczeństwo", "tr": "Adil oyun ve güvenlik"};
    for (var lf in FAIR) D[lf].fair_title = FAIR[lf];
    D.uk.privacy = "Конфіденційність"; D.uk.privacy_title = "Політика конфіденційності"; D.en.privacy_title = "Privacy policy"; D.ru.privacy_title = "Политика конфиденциальности";

    /* ================= Legal texts =================
     * Full versions in Ukrainian, English and Russian; other languages show English.
     * a = { contact, ends, pool, sumScore, sumRef, prizesScore, prizesRef, g, d, l, h, cap, list(arr) }
     */
    var LEGAL = {
        uk: {
            place: "місце",
            rules: function (a) {
                return "" +
                "<p class='lead'>Офіційні правила розіграшу «GGSNAKE · Сезон 1». Беручи участь, ви погоджуєтеся з цими правилами та Політикою конфіденційності.</p>" +
                "<h4>1. Організатор</h4>" +
                "<p>Розіграш проводить команда гри GGSNAKE (далі — Організатор). Офіційний бот гри — @ggsnake_game_bot. Зв'язок з Організатором: " + a.contact + ".</p>" +
                "<p>Telegram не є організатором, спонсором чи партнером розіграшу і не несе за нього відповідальності.</p>" +
                "<h4>2. Строки</h4>" +
                "<p>Сезон 1 триває до <b>" + a.ends + "</b> (час показано за налаштуваннями вашого пристрою). Результати, отримані після цього моменту, не враховуються. Про продовження сезону Організатор повідомляє в боті та офіційному каналі.</p>" +
                "<h4>3. Хто може брати участь</h4><ul>" +
                "<li>Повнолітні (18+) користувачі Telegram, яким участь у подібних розіграшах дозволяє законодавство країни проживання.</li>" +
                "<li>Один учасник — один акаунт Telegram.</li>" +
                "<li>Члени команди Організатора призів не отримують.</li>" +
                "<li>Участь безкоштовна. Жодних покупок, внесків чи переказів для участі не потрібно.</li></ul>" +
                "<h4>4. Як узяти участь</h4>" +
                "<p>Відкрийте гру через @ggsnake_game_bot і грайте в режимі «Рейтинг». Режим «Тренування» в розіграші не враховується. Результат гри зараховується лише після автоматичної перевірки на сервері.</p>" +
                "<h4>5. Номінація «Рекорди» — " + a.sumScore + "</h4>" +
                "<p>Місце визначає найкращий результат однієї рейтингової гри за сезон.</p><ul>" + a.list(a.prizesScore) + "</ul>" +
                "<p>Якщо результати однакові, вище той, хто досяг свого результату раніше.</p>" +
                "<h4>6. Номінація «Друзі» — " + a.sumRef + "</h4>" +
                "<p>Місце визначає кількість балів за запрошених друзів. Друг — це новий для гри користувач, який уперше відкрив гру за вашим особистим посиланням.</p><ul>" +
                "<li><b>+1 бал</b> — друг зіграв " + a.g + " рейтингових ігор у " + a.d + " різні дні;</li>" +
                "<li><b>+1 бал</b> — той самий друг зіграв на " + a.l + "-й день або пізніше після першого входу;</li>" +
                "<li><b>+0,5 бала</b> — друг вашого друга теж набрав свій перший бал;</li>" +
                "<li><b>0 балів</b> — перехід за посиланням без гри.</li></ul>" +
                "<p>Бали з'являються в рейтингу через " + a.h + " год після нарахування. Якщо за добу нараховано понад " + a.cap + " нових друзів, такі бали зараховуються після ручної перевірки. Щоб претендувати на приз у цій номінації, запрошувач має сам зіграти щонайменше " + a.g + " рейтингових ігор. Якщо бали однакові, вище той, хто набрав їх раніше.</p><ul>" + a.list(a.prizesRef) + "</ul>" +
                "<h4>7. Перевірка та дискваліфікація</h4>" +
                "<p>Кожну рейтингову гру сервер перепроходить повністю й сам рахує очки. Перед виплатою Організатор додатково переглядає записи ігор і список друзів переможців. За порушення правил чесної гри (див. «Чесна гра і безпека») результати та бали анулюються, а акаунт може бути виключено з розіграшу. Оскаржити рішення можна протягом 48 годин після оголошення переможців, написавши Організатору.</p>" +
                "<h4>8. Оголошення переможців і виплата</h4><ul>" +
                "<li>Переможців оголошуємо в боті та офіційному каналі протягом 3 днів після завершення сезону. Публікуємо лише ім'я з Telegram, місце та результат.</li>" +
                "<li>Кожен переможець отримує повідомлення в @ggsnake_game_bot і має відповісти протягом 72 годин, надавши адресу свого гаманця.</li>" +
                "<li>Приз виплачується в USDT (мережа TON) або в TON за курсом на день виплати — протягом 7 днів після підтвердження. Комісію мережі сплачує Організатор.</li>" +
                "<li>Якщо переможець не відповів вчасно або відмовився від призу, приз переходить до наступного учасника рейтингу.</li>" +
                "<li>Приз не обмінюється на інші цінності й не передається третім особам. За правильність адреси гаманця відповідає переможець.</li></ul>" +
                "<p class='warn'>Організатор <b>ніколи</b> не просить оплатити «комісію» чи «доставку» призу, не запитує паролі, коди з SMS, seed-фрази чи доступ до гаманця і пише лише з @ggsnake_game_bot.</p>" +
                "<h4>9. Податки</h4><p>Податки та інші обов'язкові платежі, пов'язані з отриманням призу, переможець сплачує самостійно відповідно до законодавства своєї країни.</p>" +
                "<h4>10. Зміни правил і непередбачені обставини</h4>" +
                "<p>Організатор може змінити ці правила, повідомивши про це в боті й каналі. Зміни не зменшують уже зарахованих результатів і балів. У разі технічного збою, масових спроб шахрайства, вимоги закону чи інших обставин поза контролем Організатора сезон може бути призупинено, продовжено або скасовано з повідомленням для всіх учасників.</p>" +
                "<h4>11. Відповідальність</h4>" +
                "<p>Гра надається «як є». Організатор не відповідає за перебої в роботі Telegram, інтернету чи пристрою учасника, через які гру не вдалося зіграти або результат не було надіслано.</p>";
            },
            privacy: function (a) {
                return "" +
                "<p class='lead'>Ми збираємо мінімум даних — лише те, без чого не працюють гра, рейтинг, захист від накруток і виплата призів.</p>" +
                "<h4>1. Хто обробляє дані</h4><p>Команда гри GGSNAKE (бот @ggsnake_game_bot). Питання щодо даних: " + a.contact + ".</p>" +
                "<h4>2. Які дані ми отримуємо</h4><ul>" +
                "<li><b>Від Telegram</b>, коли ви відкриваєте гру: ваш Telegram ID, ім'я, прізвище (якщо вказане), username, мову інтерфейсу та ознаку Premium. Ми <b>не</b> отримуємо ваш номер телефону, контакти чи повідомлення.</li>" +
                "<li><b>Ігрові дані</b>: результати, кількість ігор і днів гри, запис ходів рекордних ігор (для перевірки чесності), хто кого запросив, бали за друзів.</li>" +
                "<li><b>Технічні дані</b>: IP-адресу й дані браузера бачать хостинг-провайдери в службових журналах. У нашій базі даних IP-адреси не зберігаються.</li>" +
                "<li><b>Дані для виплати</b> (лише переможці): адреса гаманця й листування щодо призу.</li></ul>" +
                "<h4>3. Що зберігається на вашому пристрої</h4><p>Налаштування, особиста статистика, серія днів і завдання дня зберігаються в пам'яті Telegram на вашому пристрої та нікуди не надсилаються.</p>" +
                "<h4>4. Навіщо</h4><ul><li>Робота гри, рейтингу й системи друзів.</li><li>Захист від ботів, накруток і мультиакаунтів.</li><li>Проведення розіграшу та виплата призів.</li><li>Повідомлення в боті про гру й розіграш — їх можна вимкнути, зупинивши бота.</li></ul>" +
                "<h4>5. Що бачать інші гравці</h4><p>У рейтингу показуються лише ваше ім'я з Telegram і результат чи бали. Telegram ID та username нікому не показуються. Той, хто вас запросив, бачить ваше ім'я та статус гри у своєму списку друзів.</p>" +
                "<h4>6. Кому передаються дані</h4><p>Тільки сервісам, на яких працює гра: Cloudflare (сервер і база даних), GitHub (сторінка гри), Telegram (платформа). Ми не продаємо дані, не використовуємо рекламні мережі та сторонні трекери. Розкриття можливе лише на законну вимогу державних органів.</p>" +
                "<h4>7. Скільки зберігаємо</h4><p>Дані сезону — протягом сезону та до 12 місяців після нього для розгляду звернень. Дані про виплати — стільки, скільки цього вимагає закон. Решту видаляємо раніше на ваш запит, крім даних, потрібних для незавершеної перевірки порушень.</p>" +
                "<h4>8. Ваші права</h4><p>Ви можете попросити показати, виправити чи видалити ваші дані, а також заперечити проти їх обробки, написавши " + a.contact + ". Відповідаємо протягом 30 днів. Після видалення даних участь у поточному розіграші неможлива.</p>" +
                "<h4>9. Захист</h4><p>Усі з'єднання шифруються (HTTPS). Кожен запит гри підтверджується цифровим підписом Telegram, тож видати себе за іншого гравця неможливо. Доступ до адмін-функцій мають лише відповідальні особи Організатора. Паролів ми не збираємо й не зберігаємо.</p>" +
                "<h4>10. Діти</h4><p>Розіграш — лише для повнолітніх. Якщо ми дізнаємося, що дані належать дитині без згоди батьків, ми їх видалимо.</p>" +
                "<h4>11. Зміни</h4><p>Про суттєві зміни цієї політики повідомляємо в боті та каналі.</p>";
            },
            fair: function (a) {
                return "" +
                "<p class='lead'>Розіграш чесний лише тоді, коли всі грають за однаковими правилами. Ось як ми це забезпечуємо і як захистити себе.</p>" +
                "<h4>Як ми перевіряємо кожну гру</h4><ul>" +
                "<li>Сервер видає кожній рейтинговій грі власне випадкове «зерно» — розташування їжі неможливо передбачити заздалегідь.</li>" +
                "<li>Після гри сервер перепроходить її хід за ходом і сам рахує очки. Число, яке надсилає телефон, не має значення.</li>" +
                "<li>Гра, зіграна швидше, ніж це можливо з реальною швидкістю змійки, не зараховується.</li>" +
                "<li>Кожну гру можна надіслати лише один раз. Діють ліміти частоти ігор.</li>" +
                "<li>Бали за друзів мають затримку " + a.h + " год. Надто швидкий приріст друзів перевіряється вручну.</li>" +
                "<li>Записи ігор і списки друзів переможців переглядаються вручну перед виплатою.</li></ul>" +
                "<h4>Що заборонено</h4><ul>" +
                "<li>Боти, скрипти, автоклікери, емулятори натискань.</li>" +
                "<li>Змінений код гри, підміна запитів, використання помилок гри.</li>" +
                "<li>Кілька акаунтів одного учасника, купівля чи передача акаунтів, гра за іншу людину.</li>" +
                "<li>Фейкові друзі: ботоферми, купівля переходів, змушування людей заходити без гри.</li></ul>" +
                "<h4>Наслідки</h4><p>Анулювання результатів і балів, виключення з розіграшу та блокування в рейтингу. Бали, отримані через заблокованих «друзів», знімаються автоматично.</p>" +
                "<h4>Захистіть себе від шахраїв</h4><ul>" +
                "<li>Офіційний бот — лише <b>@ggsnake_game_bot</b>. Перевіряйте username, а не назву чи аватар.</li>" +
                "<li>Ми ніколи не просимо оплату за отримання призу, паролі, коди з SMS чи Telegram, seed-фрази або доступ до гаманця.</li>" +
                "<li>Ми не пишемо першими з особистих акаунтів і не просимо перейти на сторонні сайти для «отримання виграшу».</li>" +
                "<li>Отримали підозріле повідомлення від імені GGSNAKE? Не відповідайте й повідомте нам: " + a.contact + ".</li></ul>" +
                "<h4>Знайшли помилку чи вразливість?</h4><p>Повідомте " + a.contact + " і не використовуйте її в рейтингу. Того, хто першим повідомив про суттєву вразливість, ми відзначимо в каналі.</p>";
            }
        },
        ru: {
            place: "место",
            rules: function (a) {
                return "" +
                "<p class='lead'>Официальные правила розыгрыша «GGSNAKE · Сезон 1». Участвуя, вы соглашаетесь с этими правилами и Политикой конфиденциальности.</p>" +
                "<h4>1. Организатор</h4>" +
                "<p>Розыгрыш проводит команда игры GGSNAKE (далее — Организатор). Официальный бот игры — @ggsnake_game_bot. Связь с Организатором: " + a.contact + ".</p>" +
                "<p>Telegram не является организатором, спонсором или партнёром розыгрыша и не несёт за него ответственности.</p>" +
                "<h4>2. Сроки</h4>" +
                "<p>Сезон 1 длится до <b>" + a.ends + "</b> (время показано по настройкам вашего устройства). Результаты после этого момента не учитываются. О продлении сезона Организатор сообщает в боте и официальном канале.</p>" +
                "<h4>3. Кто может участвовать</h4><ul>" +
                "<li>Совершеннолетние (18+) пользователи Telegram, которым участие в подобных розыгрышах разрешено законодательством страны проживания.</li>" +
                "<li>Один участник — один аккаунт Telegram.</li>" +
                "<li>Члены команды Организатора призы не получают.</li>" +
                "<li>Участие бесплатное. Никаких покупок, взносов или переводов для участия не требуется.</li></ul>" +
                "<h4>4. Как участвовать</h4>" +
                "<p>Откройте игру через @ggsnake_game_bot и играйте в режиме «Рейтинг». Режим «Тренировка» в розыгрыше не учитывается. Результат засчитывается только после автоматической проверки на сервере.</p>" +
                "<h4>5. Номинация «Рекорды» — " + a.sumScore + "</h4>" +
                "<p>Место определяет лучший результат одной рейтинговой игры за сезон.</p><ul>" + a.list(a.prizesScore) + "</ul>" +
                "<p>При равных результатах выше тот, кто достиг своего результата раньше.</p>" +
                "<h4>6. Номинация «Друзья» — " + a.sumRef + "</h4>" +
                "<p>Место определяет количество баллов за приглашённых друзей. Друг — новый для игры пользователь, который впервые открыл игру по вашей личной ссылке.</p><ul>" +
                "<li><b>+1 балл</b> — друг сыграл " + a.g + " рейтинговых игр в " + a.d + " разных дня;</li>" +
                "<li><b>+1 балл</b> — тот же друг сыграл на " + a.l + "-й день или позже после первого входа;</li>" +
                "<li><b>+0,5 балла</b> — друг вашего друга тоже получил свой первый балл;</li>" +
                "<li><b>0 баллов</b> — переход по ссылке без игры.</li></ul>" +
                "<p>Баллы появляются в рейтинге через " + a.h + " ч после начисления. Если за сутки начислено более " + a.cap + " новых друзей, такие баллы засчитываются после ручной проверки. Чтобы претендовать на приз в этой номинации, приглашающий должен сам сыграть минимум " + a.g + " рейтинговых игр. При равных баллах выше тот, кто набрал их раньше.</p><ul>" + a.list(a.prizesRef) + "</ul>" +
                "<h4>7. Проверка и дисквалификация</h4>" +
                "<p>Каждую рейтинговую игру сервер переигрывает полностью и сам считает очки. Перед выплатой Организатор дополнительно просматривает записи игр и список друзей победителей. За нарушение правил честной игры (см. «Честная игра и безопасность») результаты и баллы аннулируются, аккаунт может быть исключён из розыгрыша. Обжаловать решение можно в течение 48 часов после объявления победителей, написав Организатору.</p>" +
                "<h4>8. Объявление победителей и выплата</h4><ul>" +
                "<li>Победителей объявляем в боте и официальном канале в течение 3 дней после окончания сезона. Публикуем только имя из Telegram, место и результат.</li>" +
                "<li>Каждый победитель получает сообщение в @ggsnake_game_bot и должен ответить в течение 72 часов, указав адрес своего кошелька.</li>" +
                "<li>Приз выплачивается в USDT (сеть TON) или в TON по курсу на день выплаты — в течение 7 дней после подтверждения. Комиссию сети оплачивает Организатор.</li>" +
                "<li>Если победитель не ответил вовремя или отказался от приза, приз переходит следующему участнику рейтинга.</li>" +
                "<li>Приз не обменивается на другие ценности и не передаётся третьим лицам. За правильность адреса кошелька отвечает победитель.</li></ul>" +
                "<p class='warn'>Организатор <b>никогда</b> не просит оплатить «комиссию» или «доставку» приза, не запрашивает пароли, коды из SMS, seed-фразы или доступ к кошельку и пишет только из @ggsnake_game_bot.</p>" +
                "<h4>9. Налоги</h4><p>Налоги и иные обязательные платежи, связанные с получением приза, победитель уплачивает самостоятельно по законодательству своей страны.</p>" +
                "<h4>10. Изменение правил и непредвиденные обстоятельства</h4>" +
                "<p>Организатор может изменить эти правила, сообщив об этом в боте и канале. Изменения не уменьшают уже засчитанных результатов и баллов. В случае технического сбоя, массовых попыток мошенничества, требования закона или иных обстоятельств вне контроля Организатора сезон может быть приостановлен, продлён или отменён с уведомлением всех участников.</p>" +
                "<h4>11. Ответственность</h4>" +
                "<p>Игра предоставляется «как есть». Организатор не отвечает за сбои Telegram, интернета или устройства участника, из-за которых игру не удалось сыграть или результат не был отправлен.</p>";
            },
            privacy: function (a) {
                return "" +
                "<p class='lead'>Мы собираем минимум данных — только то, без чего не работают игра, рейтинг, защита от накруток и выплата призов.</p>" +
                "<h4>1. Кто обрабатывает данные</h4><p>Команда игры GGSNAKE (бот @ggsnake_game_bot). Вопросы о данных: " + a.contact + ".</p>" +
                "<h4>2. Какие данные мы получаем</h4><ul>" +
                "<li><b>От Telegram</b>, когда вы открываете игру: ваш Telegram ID, имя, фамилию (если указана), username, язык интерфейса и признак Premium. Мы <b>не</b> получаем ваш номер телефона, контакты или сообщения.</li>" +
                "<li><b>Игровые данные</b>: результаты, количество игр и игровых дней, запись ходов рекордных игр (для проверки честности), кто кого пригласил, баллы за друзей.</li>" +
                "<li><b>Технические данные</b>: IP-адрес и данные браузера видят хостинг-провайдеры в служебных журналах. В нашей базе данных IP-адреса не хранятся.</li>" +
                "<li><b>Данные для выплаты</b> (только победители): адрес кошелька и переписка о призе.</li></ul>" +
                "<h4>3. Что хранится на вашем устройстве</h4><p>Настройки, личная статистика, серия дней и задания дня хранятся в памяти Telegram на вашем устройстве и никуда не отправляются.</p>" +
                "<h4>4. Зачем</h4><ul><li>Работа игры, рейтинга и системы друзей.</li><li>Защита от ботов, накруток и мультиаккаунтов.</li><li>Проведение розыгрыша и выплата призов.</li><li>Сообщения в боте об игре и розыгрыше — их можно отключить, остановив бота.</li></ul>" +
                "<h4>5. Что видят другие игроки</h4><p>В рейтинге показываются только ваше имя из Telegram и результат или баллы. Telegram ID и username никому не показываются. Пригласивший вас видит ваше имя и статус игры в своём списке друзей.</p>" +
                "<h4>6. Кому передаются данные</h4><p>Только сервисам, на которых работает игра: Cloudflare (сервер и база данных), GitHub (страница игры), Telegram (платформа). Мы не продаём данные, не используем рекламные сети и сторонние трекеры. Раскрытие возможно только по законному требованию государственных органов.</p>" +
                "<h4>7. Сколько храним</h4><p>Данные сезона — в течение сезона и до 12 месяцев после него для рассмотрения обращений. Данные о выплатах — столько, сколько требует закон. Остальное удаляем раньше по вашему запросу, кроме данных, нужных для незавершённой проверки нарушений.</p>" +
                "<h4>8. Ваши права</h4><p>Вы можете попросить показать, исправить или удалить ваши данные, а также возразить против их обработки, написав " + a.contact + ". Отвечаем в течение 30 дней. После удаления данных участие в текущем розыгрыше невозможно.</p>" +
                "<h4>9. Защита</h4><p>Все соединения шифруются (HTTPS). Каждый запрос игры подтверждается цифровой подписью Telegram, поэтому выдать себя за другого игрока невозможно. Доступ к админ-функциям есть только у ответственных лиц Организатора. Пароли мы не собираем и не храним.</p>" +
                "<h4>10. Дети</h4><p>Розыгрыш — только для совершеннолетних. Если мы узнаем, что данные принадлежат ребёнку без согласия родителей, мы их удалим.</p>" +
                "<h4>11. Изменения</h4><p>О существенных изменениях этой политики сообщаем в боте и канале.</p>";
            },
            fair: function (a) {
                return "" +
                "<p class='lead'>Розыгрыш честный только тогда, когда все играют по одинаковым правилам. Вот как мы это обеспечиваем и как защитить себя.</p>" +
                "<h4>Как мы проверяем каждую игру</h4><ul>" +
                "<li>Сервер выдаёт каждой рейтинговой игре собственное случайное «зерно» — расположение еды невозможно предсказать заранее.</li>" +
                "<li>После игры сервер переигрывает её ход за ходом и сам считает очки. Число, которое присылает телефон, не имеет значения.</li>" +
                "<li>Игра, сыгранная быстрее, чем это возможно с реальной скоростью змейки, не засчитывается.</li>" +
                "<li>Каждую игру можно отправить только один раз. Действуют лимиты частоты игр.</li>" +
                "<li>Баллы за друзей имеют задержку " + a.h + " ч. Слишком быстрый прирост друзей проверяется вручную.</li>" +
                "<li>Записи игр и списки друзей победителей просматриваются вручную перед выплатой.</li></ul>" +
                "<h4>Что запрещено</h4><ul>" +
                "<li>Боты, скрипты, автокликеры, эмуляторы нажатий.</li>" +
                "<li>Изменённый код игры, подмена запросов, использование ошибок игры.</li>" +
                "<li>Несколько аккаунтов одного участника, покупка или передача аккаунтов, игра за другого человека.</li>" +
                "<li>Фейковые друзья: ботофермы, покупка переходов, принуждение заходить без игры.</li></ul>" +
                "<h4>Последствия</h4><p>Аннулирование результатов и баллов, исключение из розыгрыша и блокировка в рейтинге. Баллы, полученные через заблокированных «друзей», снимаются автоматически.</p>" +
                "<h4>Защитите себя от мошенников</h4><ul>" +
                "<li>Официальный бот — только <b>@ggsnake_game_bot</b>. Проверяйте username, а не название или аватар.</li>" +
                "<li>Мы никогда не просим оплату за получение приза, пароли, коды из SMS или Telegram, seed-фразы или доступ к кошельку.</li>" +
                "<li>Мы не пишем первыми с личных аккаунтов и не просим переходить на сторонние сайты для «получения выигрыша».</li>" +
                "<li>Получили подозрительное сообщение от имени GGSNAKE? Не отвечайте и сообщите нам: " + a.contact + ".</li></ul>" +
                "<h4>Нашли ошибку или уязвимость?</h4><p>Сообщите " + a.contact + " и не используйте её в рейтинге. Первого, кто сообщит о существенной уязвимости, мы отметим в канале.</p>";
            }
        },
        en: {
            place: "place",
            rules: function (a) {
                return "" +
                "<p class='lead'>Official rules of the “GGSNAKE · Season 1” giveaway. By taking part you accept these rules and the Privacy Policy.</p>" +
                "<h4>1. Organizer</h4>" +
                "<p>The giveaway is run by the GGSNAKE game team (the Organizer). The official game bot is @ggsnake_game_bot. Contact: " + a.contact + ".</p>" +
                "<p>Telegram is not an organizer, sponsor or partner of this giveaway and bears no responsibility for it.</p>" +
                "<h4>2. Dates</h4>" +
                "<p>Season 1 runs until <b>" + a.ends + "</b> (shown in your device's time). Results achieved after that moment don't count. Any extension is announced in the bot and the official channel.</p>" +
                "<h4>3. Who can take part</h4><ul>" +
                "<li>Telegram users aged 18+ for whom taking part in such giveaways is allowed by the laws of their country of residence.</li>" +
                "<li>One participant — one Telegram account.</li>" +
                "<li>Members of the Organizer's team are not eligible for prizes.</li>" +
                "<li>Participation is free. No purchase, fee or transfer is required.</li></ul>" +
                "<h4>4. How to take part</h4>" +
                "<p>Open the game via @ggsnake_game_bot and play in Ranked mode. Training mode does not count. A result counts only after the automatic server check.</p>" +
                "<h4>5. “High scores” — " + a.sumScore + "</h4>" +
                "<p>Places are decided by your best single ranked game of the season.</p><ul>" + a.list(a.prizesScore) + "</ul>" +
                "<p>On a tie, whoever reached their result first ranks higher.</p>" +
                "<h4>6. “Friends” — " + a.sumRef + "</h4>" +
                "<p>Places are decided by friend points. A friend is a user new to the game who opened it for the first time via your personal link.</p><ul>" +
                "<li><b>+1 point</b> — the friend played " + a.g + " ranked games on " + a.d + " different days;</li>" +
                "<li><b>+1 point</b> — the same friend played on day " + a.l + " or later after first joining;</li>" +
                "<li><b>+0.5 point</b> — a friend of your friend earned their first point too;</li>" +
                "<li><b>0 points</b> — opening the link without playing.</li></ul>" +
                "<p>Points appear on the leaderboard " + a.h + " hours after they are earned. If more than " + a.cap + " new friends are counted within a day, those points are credited after a manual check. To be eligible for a prize in this category, the inviter must also play at least " + a.g + " ranked games. On a tie, whoever reached the points first ranks higher.</p><ul>" + a.list(a.prizesRef) + "</ul>" +
                "<h4>7. Verification and disqualification</h4>" +
                "<p>The server replays every ranked game in full and calculates the score itself. Before paying out, the Organizer also reviews the winners' game records and friend lists. Breaking the fair play rules (see “Fair play & security”) voids results and points and may exclude the account from the giveaway. Decisions can be appealed within 48 hours after winners are announced by contacting the Organizer.</p>" +
                "<h4>8. Winners and payout</h4><ul>" +
                "<li>Winners are announced in the bot and the official channel within 3 days after the season ends. Only the Telegram first name, place and result are published.</li>" +
                "<li>Each winner receives a message from @ggsnake_game_bot and must reply within 72 hours with their wallet address.</li>" +
                "<li>Prizes are paid in USDT (TON network) or in TON at the rate on the payout day, within 7 days after confirmation. Network fees are paid by the Organizer.</li>" +
                "<li>If a winner doesn't reply in time or declines, the prize goes to the next participant on the leaderboard.</li>" +
                "<li>Prizes cannot be exchanged or transferred. The winner is responsible for the correct wallet address.</li></ul>" +
                "<p class='warn'>The Organizer will <b>never</b> ask you to pay a “fee” to receive a prize, never asks for passwords, SMS codes, seed phrases or wallet access, and only writes from @ggsnake_game_bot.</p>" +
                "<h4>9. Taxes</h4><p>Winners are responsible for any taxes and mandatory payments related to their prize under the laws of their country.</p>" +
                "<h4>10. Rule changes and unforeseen circumstances</h4>" +
                "<p>The Organizer may change these rules with notice in the bot and channel. Changes never reduce results or points already earned. In case of technical failure, mass fraud attempts, legal requirements or other circumstances beyond the Organizer's control, the season may be paused, extended or cancelled with notice to all participants.</p>" +
                "<h4>11. Liability</h4>" +
                "<p>The game is provided “as is”. The Organizer is not responsible for outages of Telegram, the internet or a participant's device that prevented a game from being played or a result from being sent.</p>";
            },
            privacy: function (a) {
                return "" +
                "<p class='lead'>We collect as little data as possible — only what the game, leaderboard, anti-cheat and prize payouts need.</p>" +
                "<h4>1. Who processes the data</h4><p>The GGSNAKE game team (bot @ggsnake_game_bot). Data questions: " + a.contact + ".</p>" +
                "<h4>2. What we receive</h4><ul>" +
                "<li><b>From Telegram</b>, when you open the game: your Telegram ID, first and last name (if set), username, interface language and Premium flag. We do <b>not</b> receive your phone number, contacts or messages.</li>" +
                "<li><b>Game data</b>: results, number of games and days played, move records of best games (to verify fair play), who invited whom, friend points.</li>" +
                "<li><b>Technical data</b>: hosting providers see IP addresses and browser data in service logs. Our database does not store IP addresses.</li>" +
                "<li><b>Payout data</b> (winners only): wallet address and correspondence about the prize.</li></ul>" +
                "<h4>3. Stored on your device</h4><p>Settings, personal stats, day streak and daily tasks are kept in Telegram's storage on your device and are not sent anywhere.</p>" +
                "<h4>4. Why</h4><ul><li>Running the game, leaderboard and friend system.</li><li>Protection against bots, cheating and multiple accounts.</li><li>Running the giveaway and paying prizes.</li><li>Bot messages about the game and giveaway — you can turn them off by stopping the bot.</li></ul>" +
                "<h4>5. What other players see</h4><p>The leaderboard shows only your Telegram first name and your score or points. Telegram IDs and usernames are never shown. Whoever invited you sees your name and play status in their friends list.</p>" +
                "<h4>6. Who receives data</h4><p>Only the services the game runs on: Cloudflare (server and database), GitHub (game page), Telegram (platform). We don't sell data and use no ad networks or third-party trackers. Disclosure happens only on a lawful request from authorities.</p>" +
                "<h4>7. Retention</h4><p>Season data — during the season and up to 12 months after for handling requests. Payout records — as long as the law requires. Anything else is deleted earlier on request, except data needed for an open fraud investigation.</p>" +
                "<h4>8. Your rights</h4><p>You can ask to see, correct or delete your data, or object to its processing, by writing to " + a.contact + ". We reply within 30 days. Once data is deleted you can no longer take part in the current giveaway.</p>" +
                "<h4>9. Security</h4><p>All connections are encrypted (HTTPS). Every game request is verified with Telegram's digital signature, so nobody can pretend to be another player. Only authorized Organizer staff can access admin functions. We never collect or store passwords.</p>" +
                "<h4>10. Children</h4><p>The giveaway is for adults only. If we learn that data belongs to a child without parental consent, we delete it.</p>" +
                "<h4>11. Changes</h4><p>We announce significant changes to this policy in the bot and channel.</p>";
            },
            fair: function (a) {
                return "" +
                "<p class='lead'>A giveaway is fair only when everyone plays by the same rules. Here's how we make sure of it — and how to protect yourself.</p>" +
                "<h4>How every game is checked</h4><ul>" +
                "<li>The server gives every ranked game its own random seed, so food positions can't be predicted in advance.</li>" +
                "<li>After the game the server replays it move by move and calculates the score itself. The number your phone sends doesn't matter.</li>" +
                "<li>A game played faster than the snake's real speed allows is rejected.</li>" +
                "<li>Each game can be submitted only once, and rate limits apply.</li>" +
                "<li>Friend points are held for " + a.h + " hours. Unusually fast growth in friends is reviewed manually.</li>" +
                "<li>Winners' game records and friend lists are reviewed by hand before payout.</li></ul>" +
                "<h4>Not allowed</h4><ul>" +
                "<li>Bots, scripts, auto-clickers, input emulators.</li>" +
                "<li>Modified game code, tampered requests, exploiting bugs.</li>" +
                "<li>Several accounts per person, buying or transferring accounts, playing for someone else.</li>" +
                "<li>Fake friends: bot farms, bought clicks, pushing people to join without playing.</li></ul>" +
                "<h4>Consequences</h4><p>Results and points are voided, the account is excluded from the giveaway and removed from the leaderboard. Points earned through banned “friends” are removed automatically.</p>" +
                "<h4>Protect yourself from scammers</h4><ul>" +
                "<li>The only official bot is <b>@ggsnake_game_bot</b>. Check the username, not the name or avatar.</li>" +
                "<li>We never ask for payment to receive a prize, passwords, SMS or Telegram codes, seed phrases or wallet access.</li>" +
                "<li>We don't message first from personal accounts and never send you to other websites to “claim a prize”.</li>" +
                "<li>Got a suspicious message in GGSNAKE's name? Don't reply and tell us: " + a.contact + ".</li></ul>" +
                "<h4>Found a bug or vulnerability?</h4><p>Report it to " + a.contact + " and don't use it on the leaderboard. The first person to report a significant vulnerability gets a shout-out in the channel.</p>";
            }
        }
    };
    function legal(kind, lang, a) { return (LEGAL[lang] || LEGAL.en)[kind](a); }
    function rulesHtml(lang, a) { return legal("rules", lang, a); }
    function privacyHtml(lang, a) { return legal("privacy", lang, a); }
    function fairHtml(lang, a) { return legal("fair", lang, a); }
    function placeWord(lang) { return (LEGAL[lang] || LEGAL.en).place; }

    function detect(tgUser) {
        var code = (tgUser && tgUser.language_code) || (root.navigator && root.navigator.language) || "en";
        code = String(code).slice(0, 2).toLowerCase();
        if (code === "be") code = "ru";
        return LANGS.indexOf(code) >= 0 ? code : "en";
    }

    root.GGI18N = { LANGS: LANGS, dict: D, detect: detect, rulesHtml: rulesHtml, privacyHtml: privacyHtml, fairHtml: fairHtml, placeWord: placeWord };
})(typeof globalThis !== "undefined" ? globalThis : this);
