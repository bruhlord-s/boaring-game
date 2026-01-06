import { useGameStore } from '../stores/gameStore'
import { Howl } from 'howler'
import BoarBite from '@sounds/boar_bite.ogg'

export const damagePlayer = (amount, sound = false) => {
  const game = useGameStore()

  if (game.isRoundWon || game.isPreGame || game.isGameOver) {
    return
  }

  if (sound) {
    damagePlayerSound.play()
  }
  game.player.currentHealth -= amount
}

const damagePlayerSound = new Howl({
  src: [BoarBite]
})
