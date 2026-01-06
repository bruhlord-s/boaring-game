import { useGameStore } from '../stores/gameStore'
import { Howl } from 'howler'
import BoarDamage from '@sounds/boar_damage1.ogg'
import BoarDeath from '@sounds/boar_death.ogg'

export const damageEnemy = (amount) => {
  const game = useGameStore()

  game.boar.currentHealth -= amount
  boarDamageSound.play()
  console.log('Damage done: ', game.currentToken.length)
}

const boarDamageSound = new Howl({
  src: [BoarDamage],
  volume: 0.7
})

export const boarDeadSound = new Howl({
  src: [BoarDeath],
  volume: 1.5
})
