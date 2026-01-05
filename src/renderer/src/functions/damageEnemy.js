import { useGameStore } from '../stores/gameStore'
import { Howl } from 'howler'

export const damageEnemy = (amount) => {
  const game = useGameStore()

  game.boar.currentHealth -= amount
  boarDamageSound.play()
  console.log('Damage done: ', game.currentToken.length)
}

const boarDamageSound = new Howl({
  src: ['../../assets/sounds/boar_damage1.ogg'],
  volume: 0.7
})

export const boarDeadSound = new Howl({
  src: ['../../assets/sounds/boar_death.ogg'],
  volume: 1.5
})
