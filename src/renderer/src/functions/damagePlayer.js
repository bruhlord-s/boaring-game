import { useGameStore } from '../stores/gameStore'
import { Howl } from 'howler'

export const damagePlayer = (amount, sound = false) => {
  const game = useGameStore()

  if (sound) {
    damagePlayerSound.play()
  }
  game.player.currentHealth -= amount
}

const damagePlayerSound = new Howl({
  src: ['../../assets/sounds/boar_bite.ogg']
})
