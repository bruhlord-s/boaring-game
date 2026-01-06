import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { shouldSkip } from '../functions/shouldSkip'
import { processSpaceInput } from '../functions/processSpace'
import { processDelete } from '../functions/processDelete'
import { damagePlayer } from '../functions/damagePlayer'
import { checkIfPlayerCloseToDeath, checkIfPlayerDead } from '../functions/playerChecks'
import { boarDeadSound } from '../functions/damageEnemy'
import { getIncorrectIndexes } from '../functions/wordCompare'

export const useGameStore = defineStore('game-store', () => {
  const boar = ref({
    baseHealth: 60,
    maxHealth: 60,
    currentHealth: 60,
    baseDamage: 2,
    damage: 2,
    isDead: false
  })

  const spawnBoar = (level = 1) => {
    boar.value.currentHealth = boar.value.baseHealth + 15 * level
    boar.value.maxHealth = boar.value.baseHealth + 15 * level
    boar.value.damage = boar.value.baseDamage * level
    boar.value.isDead = false
  }

  const player = ref({
    maxHealth: 100,
    currentHealth: 100
  })

  /** Текст для ввода */
  const textToType = ref('')
  /** Массив слов из текста */
  const textTokens = ref([])
  /** Текущее слово */
  const currentToken = ref('')
  /** Индекс слова из всего текста */
  const currentTokenIndex = ref(0)
  /** Текущая введенная часть слова */
  const typedText = ref('')
  /** Массив веденных слов */
  const typedTextTokens = ref([''])
  /** Индекс позиции каретки */
  const currentTypeIndex = ref(0)
  /** Состояние перед началом раунда (тум где ентер надо жмать) */
  const isPreGame = ref(false)
  /** Состояние поле поражения */
  const isGameOver = ref(false)
  /** Состояние поле победы в игре */
  const isGameWon = ref(false)
  /** Состояние победы в раунде */
  const isRoundWon = ref(false)
  /** Близок ли игрок к поражению */
  const playerCloseToDeath = ref(false)
  /** Интервал нанесения урона */
  const playerDamageInterval = ref()
  const round = ref(1)

  const resetTextData = () => {
    currentTokenIndex.value = 0
    currentToken.value = textTokens.value[currentTokenIndex.value]
    typedText.value = ''
    typedTextTokens.value = ['']
    currentTypeIndex.value = 0
  }

  const reset = () => {
    resetTextData()
    round.value = 1
    isGameOver.value = false
    isRoundWon.value = false
    isPreGame.value = false
    gameStarted.value = false
    playerCloseToDeath.value = false

    stopPlayerDamageInterval()
  }

  const gameStarted = ref(false)
  const startGame = () => {
    gameStarted.value = true
    isPreGame.value = false
    startPlayerDamageInterval()
    spawnBoar(1)
    setupText()
    console.warn('Игра запущена')
  }

  const prepareGame = () => {
    isPreGame.value = true
    gameStarted.value = true
    console.warn('Game prepared')
  }

  const endGame = () => {
    boar.value.currentHealth = boar.value.maxHealth
    player.value.currentHealth = player.value.maxHealth

    reset()
  }

  const endRound = () => {
    stopPlayerDamageInterval()

    if (round.value < 7) {
      isRoundWon.value = true
    } else {
      isGameWon.value = true
    }

    resetTextData()
  }

  const nextRound = () => {
    round.value++
    spawnBoar(round.value)

    player.value.currentHealth = player.value.maxHealth
    playerCloseToDeath.value = false

    isRoundWon.value = false

    resetTextData()
    setupText()
    startPlayerDamageInterval()
    console.warn('Следующий раунд запущен')
  }

  const stopPlayerDamageInterval = () => {
    if (playerDamageInterval.value) {
      clearInterval(playerDamageInterval.value)
      playerDamageInterval.value = undefined
    }
  }

  const startPlayerDamageInterval = () => {
    if (playerDamageInterval.value === undefined) {
      console.log('Created player damage interval')

      playerDamageInterval.value = setInterval(() => {
        damagePlayer(1.5)

        if (checkIfPlayerCloseToDeath()) {
          playerCloseToDeath.value = true
        }

        if (checkIfPlayerDead()) {
          isGameOver.value = true
        }
      }, 1000)
    }
  }

  const texts = [
    'Дикие кабаны это удивительные животные. Они очень сильны и выносливы. Их тело покрыто густой щетиной. У самцов есть опасные клыки. Кабаны живут в лесах и зарослях. Они активны в основном ночью. Питаются кабаны всем подряд. Они едят коренья и желуди. Ловят насекомых и мелких грызунов. Не брезгуют грибами и ягодами. Кабаны любят валяться в грязи. Это их способ охладиться и избавиться от паразитов. У кабанов крепкие семьи. Самки с поросятами ходят стадом. Взрослые самцы живут отдельно. Эти звери очень умны и осторожны.',
    'В кабаньем лесу жил старый секач, которого все звали дедом морозом. Каждую зиму его белая щетина сверкала как снег, а глаза светились мудростью. Он не спеша обходил все знакомые тропы, его тяжелые копыта оставляли четкие следы. Вместо мешка он нес во рту старый корень, доверху наполненный дубовыми желудями, сладкими кореньями и замороженными ягодами. Маленькие поросята радостно визжали, завидев его, и получали свой лесной подарок. Взрослые кабаны почтительно фыркали, им он приносил крепкую соль и место для теплой лежки.',
    'В тени вековых дубов проживал уважаемый кабан предприниматель по имени Кабан Кабаныч. Он основал первое в роще предприятие по заготовке и оптовой торговле желудями. Под его чутким руководством работники, а это были его же шустрые поросята, аккуратно сбивали отборные плоды. Кабан Кабаныч лично вел переговоры с белками, сойками и мышами, заключая выгодные бартерные сделки. Его просторные кладовые в старом буреломе всегда были полны товаром, а слава о честном секаче разошлась далеко за пределы рощи.',
    'В глубине бурелома, в уютной землянке, трудился кабан хакер. Его мощным инструментом было не рыло, а клавиатура, подключенная к старому корню-серверу. Он взламывал не стволы деревьев, а пароли к базам данных, где сороки хранили списки блестящих находок. Его излюбленной добычей были цифровые запасы желудей с ферм белок и карты подземных ходов кротов. Работая по ночам, при свете светлячков, он оставлял на порталах лишь след своего копыта как цифровую подпись. Так этот секач стал призраком лесной паутины, самым неуловимым и технически подкованным специалистом во всей округе.',
    'В самом сердце старого мшистого леса обитал необычный кабан альбинос. Его кожа и щетина сияли фарфоровой белизной, а глаза были цвета утренней зари. Он вел жизнь отшельника, скрываясь в самых глухих чащобах от палящих лучей солнца. На поиски кореньев и личинок он выходил лишь в предрассветный туман или под сенью густых крон. Сородители сперва обходили его стороной, но со временем признали его особенность знаком древнего лесного духа. В лунные ночи его силуэт, бледный как призрак, скользил между деревьями, не нарушая тишины.',
    'Среди обычных кабанов выделялся один невероятный секач. Он принципиально передвигался вверх ногами, опираясь на мощную щетину спины. Его копыта бездельничали, уставившись в небо, а путь он прокладывал, отталкиваясь корпусом. Сородичи крутили головами, не понимая этой затеи, но кабан был непреклонен. Он утверждал, что так мир выглядит правильнее, а желуди на земле висят как созвездия. Его перевернутый образ жизни стал причиной многих курьезов, например, дождь он считал восходящим потоком из земли. Но это лишь укрепляло его веру в свою правоту.',
    'Из черной глубины космоса прибыл кабан неземной породы. Его шкура переливалась цветами туманностей, а вместо щетины росли гибкие кристаллы. Он парил над лесной подстилкой, не касаясь земли, изучая местную флору и фауну безмолвным сканером, встроенным в рыло. Земные сородичи в страхе разбегались, чувствуя энергию иных миров. Космический кабан искал не желуди, а редкие образцы углеродной жизни, аккуратно собирая папоротники и лишайники в сияющий контейнер. Закончив миссию, он бесшумно растворился в луче света, оставив после лишь круг примятой травы и всеобщее изумление.'
  ]

  const setupText = () => {
    textTokens.value = texts[round.value - 1].split(' ')
    currentTokenIndex.value = 0
    currentToken.value = textTokens.value[currentTokenIndex.value]
    currentTypeIndex.value = 0
  }

  /** По индексу слова возвращает верно ли оно было введено */
  const wordIsCorrect = (wordIndex) => {
    if (wordIndex < 0) {
      return false
    }

    return typedTextTokens.value[wordIndex] === textTokens.value[wordIndex]
  }

  watch(
    () => boar.value.currentHealth,
    () => {
      if (boar.value.currentHealth <= 0) {
        boar.value.isDead = true
        boarDeadSound.play()
        endRound()
      }
    }
  )

  const handleInput = (input) => {
    console.log(`Handle input: ${input}`)
    const startMistakes = getIncorrectIndexes(currentTypeWord.value, currentToken.value).length

    const isSpace = input[input.length - 1] === ' '
    const isDelete = typedText.value.length > input.length
    console.log(`Is delete: ${isDelete}`)
    console.log(`Typed text: ${typedText.value}`)

    if (shouldSkip(input, isDelete)) {
      return
    }

    if (!isDelete && isSpace) {
      processSpaceInput(input)
      return
    }

    if (isDelete) {
      processDelete(input)
      return
    }

    typedText.value = input
    typedTextTokens.value = typedText.value.split(' ')

    currentTypeIndex.value++

    const endMistakes = getIncorrectIndexes(currentTypeWord.value, currentToken.value).length

    if (endMistakes - startMistakes > 0) {
      damagePlayer(boar.value.damage, true)
    }
  }

  const currentTypeWord = computed(() => typedTextTokens.value[currentTokenIndex.value])

  return {
    boar,
    player,
    textToType,
    textTokens,
    currentToken,
    currentTokenIndex,
    typedText,
    typedTextTokens,
    currentTypeIndex,
    currentTypeWord,
    gameStarted,
    isPreGame,
    playerCloseToDeath,
    isGameOver,
    isRoundWon,
    isGameWon,
    round,

    nextRound,
    setupText,
    prepareGame,
    startGame,
    endGame,
    handleInput,
    wordIsCorrect
  }
})
