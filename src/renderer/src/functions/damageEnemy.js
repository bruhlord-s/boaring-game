import { useGameStore } from '../stores/gameStore'

export const damageEnemy = (amount) => {
  const game = useGameStore()

  game.boar.currentHealth -= amount
  console.log('Damage done: ', game.currentToken.length)
}
