import { useGameStore } from '../stores/gameStore'

export const checkIfPlayerDead = () => {
  const game = useGameStore()

  return game.player.currentHealth <= 0
}

export const checkIfPlayerCloseToDeath = () => {
  const game = useGameStore()

  return game.player.currentHealth <= 20
}
